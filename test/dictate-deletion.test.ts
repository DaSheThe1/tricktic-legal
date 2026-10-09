import assert from "node:assert/strict";
import { test } from "node:test";
import { documentPages, legacyUrl } from "../src/site.ts";
import { canonical, links, mainText, metaContent, readBuilt, trackerProblems } from "./helpers.ts";

test("Dictate deletion is public, indexable and absent from the legal index", () => {
  const path = "/tricktic-dictate/delete-account";
  const page = documentPages.find((entry) => entry.path === path);
  assert.ok(page);
  assert.equal(page.listedUnder, null);
  assert.equal(legacyUrl(path), null);
  const html = readBuilt("tricktic-dictate/delete-account.html");
  assert.equal(canonical(html), "https://legal.tricktic.com/tricktic-dictate/delete-account");
  assert.equal(metaContent(html, "robots"), "index, follow");
  assert.deepEqual(trackerProblems(html), []);
  assert.ok(!links(readBuilt("index.html")).some((link) => link.href === path));
});

test("deletion supplies an independent request method and accurate deletion boundaries", () => {
  const html = readBuilt("tricktic-dictate/delete-account.html");
  const body = mainText(html);
  for (const clause of [
    "Settings → Account",
    "Account and cloud data",
    "Choose Delete account.",
    "A recent Google sign-in is required to verify ownership.",
    "send it from the Google email address you used to sign in",
    "You do not need to reinstall the app.",
    "synced settings, dictionary entries and snippets, synced raw and processed transcript text",
    "Deleting your Writer account does not delete your Google account.",
    "A request made by email cannot erase files from your devices.",
    "currently have no automatic expiry",
    "within 180 days",
  ]) assert.ok(body.includes(clause), `missing deletion commitment: ${clause}`);
  assert.ok(links(html).some((link) => link.href === "mailto:contact@tricktic.com"));
});

test("privacy traces account categories, SDK metadata and retained deletion proof", () => {
  const html = readBuilt("tricktic-dictate/privacy.html");
  const body = mainText(html);
  for (const clause of [
    "account identifier, display name and email",
    "The Android app from Google Play remains account-free.",
    "Android builds that offer accounts, including the private Dev build",
    "IP address for authentication security and abuse prevention",
    "custom polishing instructions",
    "spelling hints, corrections and snippets",
    "raw, corrected, polished and edited text",
    "app-generated device identifier",
    "currently have no automatic expiry",
  ]) assert.ok(body.includes(clause), `missing account disclosure: ${clause}`);
  assert.ok(links(html).some((link) => link.href === "https://legal.tricktic.com/tricktic-dictate/delete-account"));
});
