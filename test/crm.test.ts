import assert from "node:assert/strict";
import { test } from "node:test";
import { readBuilt, mainText, links } from "./helpers.ts";
import { legacyUrl } from "../src/site.ts";

test("CRM privacy keeps its provider, retention and deletion clauses", () => {
  const html = readBuilt("tricktic-crm/privacy.html");
  const visible = mainText(html);
  for (const clause of [
    "Provider: TrickTic, operated by Daniel Shedrinsky",
    "TrickTic-CRM at crm.tricktic.com",
    "CRM does not store card or payment details and does not send messages to your leads.",
    "CRM's features do not use AI to read, sort or score your leads.",
    "CRM gets no access to your Gmail, Drive or contacts",
    "Open and click tracking are off",
    "Providers may change as the service develops",
    "A current list is available from support.",
    "Server logs keep request status and timing only, not form contents.",
    "A deleted lead can stay inside older backups for up to about 8 weeks",
    "Deletions are applied again before anyone gets access",
    "A record that a deletion happened is kept indefinitely",
    "You may request an export through support for 30 days",
    "no later than 72 hours after becoming aware",
  ]) assert.ok(visible.includes(clause), clause);
  assert.ok(links(html).some((link) => link.href === "mailto:support@tricktic.com"));
  // Providers other than Google are described by role (owner, 2026-10-07).
  for (const name of ["HOSTKEY", "Cloudflare", "SMTP2GO", "n8n"]) {
    assert.ok(!visible.includes(name), `names a provider: ${name}`);
  }
});

test("CRM terms keep the free pilot, support and liability boundaries", () => {
  const html = readBuilt("tricktic-crm/terms.html");
  const visible = mainText(html);
  for (const clause of [
    "Provider: TrickTic, operated by Daniel Shedrinsky",
    "opening a link does not record contact; you mark contact yourself",
    "The pilot is free and has no fixed end date.",
    "Nothing is charged without a separate written agreement.",
    "answered within 7 working days",
    "Be at least 18 years old",
    "Contacting leads is your action. CRM does not contact anyone for you.",
    "Either side can end the pilot at any time.",
    "To the fullest extent permitted by applicable law",
    "Nothing in these terms excludes liability that cannot lawfully be excluded",
    "at least 30 days before they apply",
    "governed by the laws of the State of Israel",
    "mandatory laws of the country where you live",
  ]) assert.ok(visible.includes(clause), clause);
  assert.ok(links(html).some((link) => link.href === "https://legal.tricktic.com/tricktic-crm/privacy"));
});

test("CRM documents are new and have no legacy URL", () => {
  assert.equal(legacyUrl("/tricktic-crm/privacy"), null);
  assert.equal(legacyUrl("/tricktic-crm/terms"), null);
});
