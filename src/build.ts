import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { siteFiles } from "./render.ts";

// Writes the static site into docs/, the folder GitHub Pages serves from the
// main branch. docs/ is generated output and is committed so every change to
// what the site serves shows up in the diff.
//
//   node src/build.ts               rebuild docs/
//   node src/build.ts --check       fail if docs/ differs from a fresh build
//   node src/build.ts --out <dir>   build somewhere else (an empty or new dir)

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const DOCS_DIR = join(ROOT, "docs");

function assertSafeOutDir(outDir: string): void {
  if (ROOT === outDir || ROOT.startsWith(outDir + sep)) {
    throw new Error(`Refusing to build into ${outDir}: it contains the repository.`);
  }
}

async function isEmptyDir(dir: string): Promise<boolean> {
  try {
    return (await readdir(dir)).length === 0;
  } catch {
    return true;
  }
}

export async function writeSite(outDir: string): Promise<void> {
  assertSafeOutDir(outDir);
  if (outDir !== DOCS_DIR && !(await isEmptyDir(outDir))) {
    throw new Error(`Refusing to build into ${outDir}: it is not empty.`);
  }
  await rm(outDir, { recursive: true, force: true });
  for (const [file, content] of siteFiles()) {
    const target = join(outDir, file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content);
  }
}

export async function listFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)).split(sep).join("/"))
    .sort();
}

/** Every difference between two built trees, as readable lines. */
export async function diffTrees(expectedDir: string, actualDir: string): Promise<string[]> {
  const expected = await listFiles(expectedDir);
  let actual: string[];
  try {
    actual = await listFiles(actualDir);
  } catch {
    return ["docs/ is missing"];
  }

  const problems: string[] = [];
  for (const file of actual) {
    if (!expected.includes(file)) problems.push(`docs/${file} is not produced by the build`);
  }
  for (const file of expected) {
    if (!actual.includes(file)) {
      problems.push(`docs/${file} is missing`);
      continue;
    }
    const [want, have] = await Promise.all([
      readFile(join(expectedDir, file)),
      readFile(join(actualDir, file)),
    ]);
    if (!want.equals(have)) problems.push(`docs/${file} is out of date`);
  }
  return problems;
}

/** Builds into a temporary directory and compares the result with docs/. */
export async function checkFresh(): Promise<string[]> {
  const temp = await mkdtemp(join(tmpdir(), "tricktic-legal-"));
  try {
    await writeSite(temp);
    return await diffTrees(temp, DOCS_DIR);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}

async function main(args: string[]): Promise<void> {
  if (args.includes("--check")) {
    const problems = await checkFresh();
    if (problems.length > 0) {
      console.error(
        [
          "docs/ does not match a fresh build:",
          ...problems.map((problem) => `  - ${problem}`),
          "Run `pnpm build` and commit docs/.",
        ].join("\n")
      );
      process.exit(1);
    }
    console.log("docs/ matches a fresh build.");
    return;
  }

  const outIndex = args.indexOf("--out");
  const outDir = outIndex === -1 ? DOCS_DIR : resolve(args[outIndex + 1] ?? "");
  await writeSite(outDir);
  console.log(`Wrote ${siteFiles().size} files to ${relative(process.cwd(), outDir) || "."}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await main(process.argv.slice(2));
}
