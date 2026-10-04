import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { describe, test } from "node:test";

import {
  headings,
  htmlLang,
  links,
  mainText,
  metaContent,
  paragraphs,
  readBuilt,
  tables,
  title,
  trackerProblems,
} from "./helpers.ts";

// Guards the TikTok integration's legal documents, ported from
// automations-website's e2e/tiktok-legal.spec.ts. Both URLs are submitted to
// TikTok for Content Posting API review and read by a human reviewer:
//
//  - The body text is asserted VERBATIM and hardcoded here on purpose. It is
//    matched against what the integration actually does and what is declared
//    in the TikTok developer console. Do not "fix" this test by importing the
//    content module: that would make it tautological.
//  - Two clauses are live commitments and get their own test: uploads are
//    drafts that are never published publicly, and no third-party or customer
//    content is sent to TikTok.
//  - Both are noindex through the robots meta tag. GitHub Pages cannot send an
//    X-Robots-Tag header, and robots.txt must never block them: a blocked URL
//    can look broken to a reviewer fetching it.

const LAST_UPDATED = "Last updated: September 9, 2026";

const privacyVerbatim = [
  "The integration is a private, single-operator internal automation tool. It is not a public product and has no users other than the operator. It authorises exactly one TikTok account: the operator’s own.",
  "Uploads are delivered to the TikTok inbox as drafts. The integration never publishes a video publicly. The operator reviews each draft and posts it manually in the TikTok app.",
  "OAuth access and refresh tokens, encrypted at rest.",
  "The upload identifier (publish_id) returned for each upload, kept as an audit record.",
  "Only video files the operator produced themselves, and the caption text for them. No third-party or customer content is sent to TikTok.",
  "The data is used solely to place drafts in the operator’s own TikTok account. It is not sold, not shared with any third party, and not used for advertising, profiling, or analytics.",
  "Tokens are held until they are revoked or until they expire. Upload records are retained as an operational audit log and are deleted on request.",
  "Access can be revoked at any time in the TikTok app, under Profile → Settings and privacy → Security and permissions → Manage app permissions.",
];

const privacyHeadings = [
  "Permissions requested",
  "Publishing behaviour",
  "Data received from TikTok and stored",
  "Data sent to TikTok",
  "How the data is used",
  "Retention",
  "Revoking access and deleting data",
  "Changes to this policy",
  "Contact",
];

// Exactly the two scopes requested in the developer console. A row appearing
// here that is not requested there (or the reverse) is a submission mismatch.
const permissionRows = [
  [
    "user.info.basic",
    "Read the authorising account’s basic profile (open ID, display name, avatar) to confirm which account is connected.",
  ],
  ["video.upload", "Upload a video file to that account’s TikTok inbox as a draft."],
];

const termsHeadings = [
  "1. Acceptance of these terms",
  "2. Description of the Service",
  "3. Permitted use",
  "4. Intellectual property",
  "5. Disclaimer of warranties",
  "6. Limitation of liability",
  "7. Governing law and jurisdiction",
  "8. Changes to these terms",
  "9. Contact",
];

const termsVerbatim = [
  "The Service is a private, single-operator internal automation tool. It is not a public product and has no users other than the operator. It authorises exactly one TikTok account, the operator’s own.",
  "The Service uploads video files to that account’s TikTok inbox as drafts. It never publishes a video publicly. The operator reviews each draft and posts it manually in the TikTok app.",
  "use the Service to upload third-party or customer content;",
  "These Terms are governed by and construed in accordance with the laws of the State of Israel, without regard to its conflict of law rules. The competent courts of the Tel Aviv-Yafo district shall have exclusive jurisdiction over any dispute arising from or relating to the Service or to these Terms.",
];

const documents = [
  {
    name: "Privacy Policy",
    file: "tiktok-privacy.html",
    title: "TikTok Integration Privacy Policy",
    headings: privacyHeadings,
    verbatim: privacyVerbatim,
  },
  {
    name: "Terms of Service",
    file: "tiktok-terms.html",
    title: "TikTok Integration Terms of Service",
    headings: termsHeadings,
    verbatim: termsVerbatim,
  },
] as const;

describe("TikTok integration legal documents", () => {
  for (const doc of documents) {
    const html = readBuilt(doc.file);

    test(`${doc.name} serves the document verbatim`, () => {
      assert.equal(title(html), doc.title);
      assert.deepEqual(headings(html, 1), [doc.title]);
      // The date tracks the CONTENT, not the deploy. Only bump it with the text.
      assert.deepEqual(paragraphs(html, "updated"), [LAST_UPDATED]);

      const body = mainText(html);
      for (const paragraph of doc.verbatim) {
        assert.ok(body.includes(paragraph), `missing or reworded: "${paragraph.slice(0, 40)}..."`);
      }

      const h2 = headings(html, 2);
      for (const heading of doc.headings) {
        assert.ok(h2.includes(heading), `missing section heading: ${heading}`);
      }

      assert.ok(
        links(html).some(
          (link) =>
            link.text === "contact@tricktic.com" && link.href === "mailto:contact@tricktic.com"
        ),
        "contact@tricktic.com mailto link"
      );
    });

    // The reviewer is at TikTok, so the URL must serve English.
    test(`${doc.name} is served in English`, () => {
      assert.equal(htmlLang(html), "en");
    });

    test(`${doc.name} is noindex`, () => {
      assert.equal(metaContent(html, "robots"), "noindex, nofollow");
    });

    test(`${doc.name} loads no analytics or third-party scripts`, () => {
      assert.deepEqual(trackerProblems(html), []);
    });
  }

  test("declares exactly the two requested TikTok scopes", () => {
    const [table, ...others] = tables(readBuilt("tiktok-privacy.html"));
    assert.equal(others.length, 0, "one scopes table");
    assert.deepEqual(table.rows, permissionRows);
  });

  // Two live commitments. The first is what makes an unaudited client eligible
  // for the Content Posting API at all; the second stops being true the moment
  // client content runs through the same app. If either behavior changes, the
  // documents must change BEFORE this test is relaxed.
  test("commits to draft-only uploads and no third-party content", () => {
    for (const doc of documents) {
      const body = mainText(readBuilt(doc.file));
      assert.ok(body.includes("never publishes a video publicly"), `${doc.file} must state uploads are drafts`);
      assert.ok(body.includes("third-party or customer content"), `${doc.file} must disclaim third-party content`);
    }
  });

  // Public but unlisted: not on the index page, never blocked by robots.txt,
  // and in no sitemap.
  test("stays unlisted without being blocked", () => {
    const index = readBuilt("index.html");
    assert.ok(!index.includes("tiktok"), "the index page must not list the TikTok documents");
    for (const file of ["robots.txt", "sitemap.xml"]) {
      if (existsSync(new URL(`../docs/${file}`, import.meta.url))) {
        assert.ok(!readBuilt(file).includes("tiktok"), `${file} must not mention the TikTok documents`);
      }
    }
  });

  // The Play Store policies are indexable on purpose. Adding noindex there
  // would break a live store listing, so prove the TikTok rule did not spill.
  test("leaves the store-facing policy crawlable", () => {
    assert.equal(metaContent(readBuilt("tricktic-timer/privacy.html"), "robots"), "index, follow");
  });
});
