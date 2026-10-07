import assert from "node:assert/strict";
import { test } from "node:test";
import { readBuilt, mainText, links } from "./helpers.ts";
import { legacyUrl } from "../src/site.ts";

test("Studio privacy keeps its provider, retention and deletion clauses", () => {
  const html = readBuilt("tricktic-studio/privacy.html");
  const visible = mainText(html);
  for (const clause of [
    "Published and operated by TrickTic (Daniel Shedrinsky)",
    "invitation-only hosted TrickTic Studio service at studio.tricktic.com",
    "We do not keep your Google profile picture or Google access tokens.",
    "It does not use advertising or cross-site tracking cookies.",
    "Providers may change as the service develops",
    "We configure these providers not to use your content to train their models.",
    "A current list is available from the privacy contact above.",
    "We do not sell your information or use it for advertising.",
    "Studio is not end-to-end encrypted",
    "Encrypted backups are made daily and kept for at most 30 days.",
    "Files are then removed from storage after at least 125 seconds",
    "Studio is intended for people aged 18 or older",
  ]) assert.ok(visible.includes(clause), clause);
  assert.ok(links(html).some((link) => link.href === "mailto:contact@tricktic.com"));
  // Providers are described by role so infrastructure can change (owner, 2026-10-07).
  for (const name of ["HOSTKEY", "Cloudflare", "OpenAI", "France", "R2"]) {
    assert.ok(!visible.includes(name), `names a provider or location: ${name}`);
  }
});

test("Studio terms keep the free pilot, content rights and liability boundaries", () => {
  const html = readBuilt("tricktic-studio/terms.html");
  const visible = mainText(html);
  for (const clause of [
    "operated by TrickTic (Daniel Shedrinsky)",
    "at least 18 years old",
    "free for 30 days from each customer's activation",
    "does not automatically turn into a paid subscription",
    "require your agreement before a charge",
    "at least 30 days' notice before deleting your account",
    "These terms do not transfer ownership",
    "TrickTic does not verify it and does not grant any licence to third-party material",
    "Studio is not a backup or archive service",
    "To the fullest extent permitted by applicable law",
    "Nothing in these terms excludes liability that cannot lawfully be excluded",
    "governed by the laws of the State of Israel",
    "mandatory laws of the country where you live",
  ]) assert.ok(visible.includes(clause), clause);
  assert.ok(links(html).some((link) => link.href === "https://legal.tricktic.com/tricktic-studio/privacy"));
});

test("Studio documents are new and have no legacy URL", () => {
  assert.equal(legacyUrl("/tricktic-studio/privacy"), null);
  assert.equal(legacyUrl("/tricktic-studio/terms"), null);
});
