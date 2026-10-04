import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";

import { DOCS_DIR, checkFresh, listFiles } from "../src/build.ts";
import {
  SITE_ORIGIN,
  canonicalUrl,
  documentPages,
  legacyUrl,
  outputFile,
} from "../src/site.ts";
import { canonical, htmlLang, links, metaContent, readBuilt, trackerProblems } from "./helpers.ts";

// Structure of the whole site: what GitHub Pages serves from docs/.

// PUBLISHED CONTRACTS. These paths are typed into store listings and a
// developer console and compiled into apps, and each one moved here from
// tricktic.com/automation/legal (REDIRECTS.md). Removing one from the registry
// must fail loudly, so they are listed here by hand. When a new document's URL
// goes into a store listing or an app, add it here too.
const PUBLISHED_PATHS = [
  "/tricktic-timer/privacy",
  "/tricktic-dictate/privacy",
  "/tricktic-dictate/terms",
  "/tricktic-dictate/security",
  "/tiktok-privacy",
  "/tiktok-terms",
];

const htmlFiles = [
  ...documentPages.map((page) => outputFile(page.path)),
  "index.html",
  "404.html",
];

describe("site structure", () => {
  test("docs/ matches a fresh build", async () => {
    assert.deepEqual(await checkFresh(), [], "run `pnpm build` and commit docs/");
  });

  test("serves exactly the expected files", async () => {
    const expected = [...htmlFiles, "CNAME", ".nojekyll"].sort();
    assert.deepEqual(await listFiles(DOCS_DIR), expected);
  });

  test("keeps every published URL", () => {
    const paths = documentPages.map((page) => page.path);
    for (const path of PUBLISHED_PATHS) {
      assert.ok(paths.includes(path), `published URL dropped from the registry: ${path}`);
    }
  });

  test("points the custom domain at legal.tricktic.com and skips Jekyll", () => {
    assert.equal(readBuilt("CNAME"), "legal.tricktic.com\n");
    assert.equal(readBuilt(".nojekyll"), "");
    assert.equal(SITE_ORIGIN, "https://legal.tricktic.com");
  });

  for (const file of htmlFiles) {
    test(`${file} is a plain English page with no trackers or external resources`, () => {
      const html = readBuilt(file);
      assert.ok(html.startsWith("<!doctype html>\n"), "doctype first");
      assert.equal(htmlLang(html), "en");
      assert.ok(html.includes('<meta charset="utf-8">'), "charset");
      assert.ok(html.includes('<meta name="viewport" content="width=device-width, initial-scale=1">'), "viewport");
      assert.equal(metaContent(html, "color-scheme"), "light dark");
      assert.deepEqual(trackerProblems(html), []);
    });
  }

  for (const page of documentPages) {
    const file = outputFile(page.path);

    test(`${file} has the right canonical URL and robots policy`, () => {
      const html = readBuilt(file);
      assert.equal(canonical(html), canonicalUrl(page.path));
      assert.equal(metaContent(html, "robots"), page.indexable ? "index, follow" : "noindex, nofollow");
    });

    test(`${file} links nowhere but mail addresses`, () => {
      const html = readBuilt(file);
      // Attribute URLs: the canonical (link rel + og:url), the empty icon and
      // mailto links. Plain-text URLs inside the legal text are not links.
      const attributeUrls = [...html.matchAll(/\s(?:href|content)="((?:https?:|data:|mailto:|\/)[^"]*)"/g)].map(
        (match) => match[1]
      );
      for (const url of attributeUrls) {
        const allowed =
          url === canonicalUrl(page.path) || url === "data:," || url.startsWith("mailto:");
        assert.ok(allowed, `unexpected URL in an attribute: ${url}`);
      }
    });
  }

  test("the index lists the app documents and nothing else", () => {
    const html = readBuilt("index.html");
    assert.equal(canonical(html), `${SITE_ORIGIN}/`);
    assert.equal(metaContent(html, "robots"), "index, follow");
    const listed = documentPages.filter((page) => page.listedUnder !== null).map((page) => page.path);
    assert.deepEqual(
      links(html).map((link) => link.href),
      listed
    );
    assert.deepEqual(listed, [
      "/tricktic-timer/privacy",
      "/tricktic-dictate/privacy",
      "/tricktic-dictate/terms",
      "/tricktic-dictate/security",
    ]);
  });

  test("the 404 page is noindex and links home", () => {
    const html = readBuilt("404.html");
    assert.equal(metaContent(html, "robots"), "noindex, nofollow");
    assert.deepEqual(
      links(html).map((link) => link.href),
      ["/"]
    );
  });

  // The pages carry their own palette: a reviewer may open them in either
  // scheme. Dark is the default; light comes from prefers-color-scheme.
  test("paints its own light and dark palette", () => {
    const html = readBuilt("tricktic-timer/privacy.html");
    const style = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
    const [dark, light] = style.split("@media (prefers-color-scheme: light)");
    assert.match(dark, /--background: #06080b;/);
    assert.match(light, /--background: #f5fbf8;/);
    assert.match(style, /body \{\s*background: var\(--background\);/);
  });

  test("REDIRECTS.md maps every moved URL to its new URL", () => {
    const redirects = readFileSync(new URL("../REDIRECTS.md", import.meta.url), "utf8");
    for (const path of PUBLISHED_PATHS) {
      const row = `| ${legacyUrl(path)} | ${canonicalUrl(path)} |`;
      assert.ok(redirects.includes(row), `REDIRECTS.md is missing the row: ${row}`);
    }
  });
});
