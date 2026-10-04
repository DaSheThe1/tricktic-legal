import { readFileSync } from "node:fs";

// Reads the COMMITTED docs/ output, which is exactly what GitHub Pages serves.
// test/site.test.ts proves docs/ matches a fresh build, so asserting on these
// files asserts on both.

const DOCS = new URL("../docs/", import.meta.url);

export function readBuilt(file: string): string {
  return readFileSync(new URL(file, DOCS), "utf8");
}

function decode(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

/** Text of an HTML fragment: links stay inline, other tags separate words. */
function text(fragment: string): string {
  return decode(
    fragment
      .replace(/<\/?a\b[^>]*>/g, "")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** The visible text of <main>, whitespace collapsed (like innerText + replace(/\s+/g, " ")). */
export function mainText(html: string): string {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/);
  if (!main) throw new Error("page has no <main>");
  return text(main[1]);
}

export function title(html: string): string {
  return text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
}

export function headings(html: string, level: 1 | 2): string[] {
  return [...html.matchAll(new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)</h${level}>`, "g"))].map(
    (match) => text(match[1])
  );
}

export function paragraphs(html: string, className: string): string[] {
  return [
    ...html.matchAll(new RegExp(`<p class="${className}">([\\s\\S]*?)</p>`, "g")),
  ].map((match) => text(match[1]));
}

export function metaContent(html: string, name: string): string | null {
  const match = html.match(new RegExp(`<meta name="${name}" content="([^"]*)">`));
  return match ? decode(match[1]) : null;
}

export function canonical(html: string): string | null {
  const match = html.match(/<link rel="canonical" href="([^"]*)">/);
  return match ? decode(match[1]) : null;
}

export function htmlLang(html: string): string | null {
  return html.match(/<html lang="([^"]*)">/)?.[1] ?? null;
}

/** Every link in <main>: its href and its text. */
export function links(html: string): { href: string; text: string }[] {
  return [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((match) => ({
    href: decode(match[1]),
    text: text(match[2]),
  }));
}

export type Table = { head: string[]; rows: string[][] };

export function tables(html: string): Table[] {
  return [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/g)].map((match) => {
    const [, thead = "", tbody = ""] =
      match[1].match(/<thead>([\s\S]*?)<\/thead>[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/) ?? [];
    return {
      head: [...thead.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((cell) => text(cell[1])),
      rows: [...tbody.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) =>
        [...row[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map((cell) => text(cell[1]))
      ),
    };
  });
}

/** Fails if a page could load a script, a tracker or any other resource. */
export function trackerProblems(html: string): string[] {
  const problems: string[] = [];
  if (/<script\b/i.test(html)) problems.push("has a <script> element");
  if (/gtag|dataLayer|umami|googletagmanager|cloudflareinsights|beacon\.min\.js/i.test(html)) {
    problems.push("mentions an analytics tag");
  }
  if (/cc-main/.test(html)) problems.push("has a cookie-consent container");
  if (/<(iframe|img|video|audio|source|object|embed)\b/i.test(html)) {
    problems.push("embeds media or a frame");
  }
  if (/<link\b[^>]*rel="(stylesheet|preload|prefetch|preconnect|dns-prefetch|modulepreload)"/i.test(html)) {
    problems.push("links an external resource");
  }
  if (/@import|url\(/i.test(html)) problems.push("CSS loads a resource");
  if (/\ssrc=/i.test(html)) problems.push("has a src attribute");
  return problems;
}
