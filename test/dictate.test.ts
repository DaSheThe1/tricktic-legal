import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, test } from "node:test";

import {
  headings,
  links,
  mainText,
  metaContent,
  paragraphs,
  readBuilt,
  tables,
  title,
  trackerProblems,
} from "./helpers.ts";

// Guards TrickTic Dictate's legal pages, ported from automations-website's
// e2e/tricktic-dictate-legal.spec.ts. The privacy URL is typed into the Play
// Console listing, and the privacy and terms URLs are compiled into the
// Android app, so these checks are not cosmetic:
//
//  - The body text is asserted VERBATIM and hardcoded here on purpose. It is
//    matched clause by clause against the app's code and the Play Console Data
//    safety declaration (docs/release/play-declarations.md in the app repo). Do
//    not "fix" this test by importing the content module: that would make it
//    tautological. Update both sides deliberately, or not at all.
//  - No analytics may load: the policy states the app has none.
//  - The pages are store-facing and must stay crawlable: no noindex.
//
// The old site also asserted a `Cache-Control: no-transform` header, which
// stopped Cloudflare's proxy injecting its analytics beacon. GitHub Pages
// cannot send headers, so legal.tricktic.com is DNS-only in Cloudflare instead,
// and scripts/check-live.ts checks the live pages for the beacon.

const LAST_UPDATED = "Last updated: October 4, 2026";

const pages = [
  { file: "tricktic-dictate/privacy.html", title: "TrickTic Dictate Privacy Policy", updated: "Last updated: October 9, 2026" },
  { file: "tricktic-dictate/terms.html", title: "TrickTic Dictate Terms of Use", updated: LAST_UPDATED },
  {
    file: "tricktic-dictate/security.html",
    title: "TrickTic Dictate Security Policy",
    updated: "Last updated: October 9, 2026",
  },
];

// Clauses that carry a Data safety answer or a statement a reviewer checks.
const privacyVerbatim = [
  "Signing in alone does not upload your settings, dictionary or history.",
  "The Android app from Google Play remains account-free.",
  "Recordings, provider API keys, downloaded models and captured application or clipboard context are excluded from account sync.",
  "Cloud sync is not end-to-end encrypted.",
  "Turning sync off or signing out stops future syncing; it does not itself delete cloud copies or the local files on your devices.",
  "Account-free use sends no recordings or transcripts to TrickTic.",
  "Sent from your device directly to the provider you choose (Google Gemini, OpenAI, xAI Grok, or Groq on Android) over HTTPS, using your API key.",
  "Transcribed on your phone or computer. It is not sent anywhere.",
  "Your API key is sent only to the provider that issued it.",
  "Deleting data in TrickTic Dictate does not delete copies a provider holds.",
  "Model downloads: when you choose to download an on-device model, the app downloads it from Hugging Face (huggingface.co) and its download servers.",
  "Android updates: the Android app from Google Play is updated by Google Play and makes no update checks of its own.",
  "On Android, app data is stored in the app's private storage and is excluded from Android backup and device transfer.",
  "What it reads is used only on your phone. It is not saved and not sent anywhere.",
  "It skips password, number and private fields and never presses Send.",
  "Uninstalling on Windows does not delete your data folder, %LOCALAPPDATA%\\MetrixWriter.",
];

const privacyHeadings = [
  "What the developer receives",
  "Optional accounts and sync",
  "Where your audio and text go",
  "Windows: context and early processing",
  "Other connections",
  "Data stored on your device",
  "Android accessibility service",
  "Clipboard, sharing and export",
  "Permissions",
  "Deleting your data",
  "Children",
  "Security",
  "Changes to this policy",
  "Contact",
];

// Exactly the permissions the Android play build requests at runtime or
// declares, matching the Play Console. A row added or dropped here without the
// app changing is a declaration mismatch.
const androidPermissionRows = [
  ["Microphone", "Record your dictation, including from the floating control"],
  ["Display over other apps", "Show the floating microphone beside your keyboard"],
  ["Accessibility service", "Insert your dictation into the focused text field in other apps"],
  ["Notifications", "Show recording status with Stop and Discard controls"],
  ["Internet", "Cloud transcription and text processing, key checks and model downloads"],
];

const termsVerbatim = [
  "Cloud features use your own account and API key with the provider you choose. The App sends requests from your device directly to that provider.",
  "Your recordings and text are yours. Recordings are not uploaded to TrickTic.",
  "These Terms are governed by and construed in accordance with the laws of the State of Israel, without regard to its conflict of law rules.",
];

const securityVerbatim = [
  "Report suspected vulnerabilities privately by email. Do not post exploit details, keys, recordings or transcripts in public.",
  "Older versions are fixed by updating to the latest version; there are no separate fixes for older versions.",
  "After installation, the app verifies every update against TrickTic Dictate's own update signing key before installing it.",
];

function hasMailto(html: string, address: string): boolean {
  return links(html).some((link) => link.text === address && link.href === `mailto:${address}`);
}

describe("TrickTic Dictate legal pages", () => {
  for (const page of pages) {
    const html = readBuilt(page.file);

    test(`${page.title} serves the document`, () => {
      assert.equal(title(html), page.title);
      assert.deepEqual(headings(html, 1), [page.title]);
      // The date tracks the CONTENT, not the deploy. Only bump it with the text.
      assert.deepEqual(paragraphs(html, "updated"), [page.updated]);
      assert.equal(metaContent(html, "robots"), "index, follow");
    });

    test(`${page.title} loads no analytics or third-party scripts`, () => {
      assert.deepEqual(trackerProblems(html), []);
    });
  }

  test("privacy policy states the traced data flows verbatim", () => {
    const html = readBuilt("tricktic-dictate/privacy.html");
    const body = mainText(html);
    for (const clause of privacyVerbatim) {
      assert.ok(body.includes(clause), `missing or reworded: "${clause.slice(0, 40)}..."`);
    }
    const h2 = headings(html, 2);
    for (const heading of privacyHeadings) {
      assert.ok(h2.includes(heading), `missing section heading: ${heading}`);
    }

    // Must match the Play Store listing's contact email exactly. Google
    // cross-checks them, so this is a real failure, not a copy nit.
    assert.ok(hasMailto(html, "contact@tricktic.com"), "contact@tricktic.com mailto link");
  });

  test("privacy policy declares every Android permission row exactly once", () => {
    const android = tables(readBuilt("tricktic-dictate/privacy.html")).filter((table) =>
      table.head.includes("Permission")
    );
    assert.equal(android.length, 1, "one Android permissions table");
    assert.deepEqual(android[0].rows, androidPermissionRows);
  });

  test("terms and security policy carry their commitments", () => {
    const terms = mainText(readBuilt("tricktic-dictate/terms.html"));
    for (const clause of termsVerbatim) {
      assert.ok(terms.includes(clause), `missing or reworded: "${clause.slice(0, 40)}..."`);
    }

    const securityHtml = readBuilt("tricktic-dictate/security.html");
    const security = mainText(securityHtml);
    for (const clause of securityVerbatim) {
      assert.ok(security.includes(clause), `missing or reworded: "${clause.slice(0, 40)}..."`);
    }
    assert.ok(hasMailto(securityHtml, "report@tricktic.com"), "report@tricktic.com mailto link");
  });

  // Never a robots.txt block (a blocked URL can look broken to a reviewer
  // fetching it) and no sitemap entry.
  test("is never blocked by robots.txt", () => {
    for (const file of ["robots.txt", "sitemap.xml"]) {
      if (existsSync(new URL(`../docs/${file}`, import.meta.url))) {
        assert.ok(!readBuilt(file).includes("tricktic-dictate"), `${file} must not mention the Dictate documents`);
      }
    }
  });
});
