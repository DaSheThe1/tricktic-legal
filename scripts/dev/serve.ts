import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { join, normalize, sep } from "node:path";

import { DOCS_DIR } from "../../src/build.ts";

// Local preview of docs/ that answers like GitHub Pages does: "/" serves
// index.html, an extensionless path serves the matching .html file, and any
// other path gets 404.html with status 404.
//
//   pnpm serve            then open http://127.0.0.1:4173/
//   PORT=5000 pnpm serve

const port = Number(process.env.PORT ?? 4173);

function candidates(pathname: string): string[] {
  if (pathname.endsWith("/")) return [`${pathname}index.html`];
  return [pathname, `${pathname}.html`];
}

async function readInside(relativePath: string): Promise<Buffer | null> {
  const file = normalize(join(DOCS_DIR, relativePath));
  if (!file.startsWith(DOCS_DIR + sep)) return null;
  try {
    return await readFile(file);
  } catch {
    return null;
  }
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url ?? "/", "http://localhost");
  for (const candidate of candidates(decodeURIComponent(pathname))) {
    const body = await readInside(candidate);
    if (body) {
      const type = candidate.endsWith(".html") ? "text/html; charset=utf-8" : "text/plain; charset=utf-8";
      response.writeHead(200, { "content-type": type });
      response.end(body);
      return;
    }
  }
  response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
  response.end(await readInside("404.html"));
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving docs/ at http://127.0.0.1:${port}/`);
});
