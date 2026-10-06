import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { readBuilt, mainText, headings, links } from "./helpers.ts";
import { legacyUrl } from "../src/site.ts";
import { renderDocumentPage } from "../src/render.ts";

const published = readFileSync(new URL("./fixtures/ade-privacy-20260929.html", import.meta.url), "utf8");
const text = (html: string) => mainText(`<main>${html.replace(/&#x27;/g, "'")}</main>`);
const clauses = (html: string) => [...html.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)]
  .filter((match) => !match[0].includes('class="updated"'))
  .map((match) => text(match[2]));

test("ADE privacy preserves every published paragraph and list item in order", () => {
  const html = readBuilt("tricktic-ade/privacy.html");
  assert.deepEqual(clauses(html), clauses(published));
  assert.deepEqual(headings(html, 2), headings(published, 2));
  assert.ok(html.includes("Effective: September 29, 2026"));
  assert.ok(mainText(html).includes("It is not an end-to-end encrypted service that hides content from the operator."));
  assert.ok(mainText(html).includes("Eight weeks is therefore not a guaranteed deadline for removal from every backup."));
  for (const { href } of links(published).filter(({ href }) => !href.endsWith('/support') && !href.endsWith('/account-deletion-info'))) {
    assert.ok(links(html).some(link => link.href === href), `lost operational reference: ${href}`);
  }
});

test("ADE terms preserve the agreed free pilot and access boundaries", () => {
  const html = readBuilt("tricktic-ade/terms.html");
  const visible = mainText(html);
  for (const clause of [
    "free for one month from each customer's activation",
    "does not automatically turn into a paid subscription",
    "require your agreement before a charge",
    "does not authorize us to delete your local projects or force-stop work",
    "These terms do not transfer ownership",
    "not a backup service or a security sandbox",
    "Nothing in these terms excludes liability that cannot lawfully be excluded",
    "not a full backup of every session or project",
  ]) assert.ok(visible.includes(clause), clause);
  assert.ok(links(html).some(link => link.href === "https://legal.tricktic.com/tricktic-ade/privacy"));
  assert.ok(links(html).some(link => link.href === "https://ade.tricktic.com/account/delete"));
});

test("ADE migration records its real former privacy address; new terms have no invented legacy URL", () => {
  assert.equal(legacyUrl("/tricktic-ade/privacy"), "https://ade.tricktic.com/privacy");
  assert.equal(legacyUrl("/tricktic-ade/terms"), null);
  assert.equal(legacyUrl("/tricktic-dictate/privacy"), "https://tricktic.com/automation/legal/tricktic-dictate/privacy");
});

test("linked paragraphs escape markup and reject executable or credential-bearing references", () => {
  const render = (href: string) => renderDocumentPage({ path: "/fixture", listedUnder: null, indexable: false,
    doc: { title: "Fixture", lastUpdated: "", description: "", sections: [],
      intro: [{ type: "linked-paragraph", parts: ["<script>", { text: "<img>", href }] }] } });
  const html = render("https://example.com/?a=1&b=2");
  assert.ok(html.includes("&lt;script&gt;"));
  assert.ok(html.includes("&lt;img&gt;"));
  assert.ok(html.includes('href="https://example.com/?a=1&amp;b=2"'));
  for (const href of ["javascript:alert(1)", "data:text/html,x", "http://example.com", "https://name:secret@example.com"]) {
    assert.throws(() => render(href));
  }
});
