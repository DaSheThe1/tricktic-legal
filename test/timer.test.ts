import assert from "node:assert/strict";
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

// Guards the TrickTic Timer privacy policy, ported from automations-website's
// e2e/app-legal.spec.ts. This is a compliance document linked from the Play
// Store listing, so the checks are not cosmetic:
//
//  - The body text is asserted VERBATIM and hardcoded here on purpose. It is
//    matched clause by clause against the Play Console Data Safety declaration;
//    if someone rephrases the policy without updating the store form, this
//    fails. Do not "fix" this test by importing the content module: that would
//    make it tautological. Update both sides deliberately, or not at all.
//  - No analytics may load. The policy states the app has no analytics or
//    tracking, so a tracker on the page would contradict it.
//  - The page must stay crawlable: no noindex on a store-facing document.

const html = readBuilt("tricktic-timer/privacy.html");

const verbatimText = [
  "TrickTic Timer is an offline-first timer and workout app.",
  "Nothing is collected or sent, automatically or otherwise. The app has no internet permission, analytics, advertising, tracking, crash reporting, or account system. The developer receives no data from this app.",
  "Timers, presets, workouts, exercise logs, settings, and attached images are stored locally. Android Auto Backup may store durable app data in the Google account backup controlled by your device settings. Backup export writes a file only to a location you choose.",
  "The app contains no crash-reporting or diagnostics component. Nothing about a crash is collected or sent to the developer.",
  "If you installed from Google Play, Google may collect crash and performance data under its own policies and your device settings, independently of this app.",
  "Uninstalling deletes the local app database. Google-account backups and files you exported are controlled separately by you. Individual history can also be removed inside the app.",
];

const sectionHeadings = [
  "Automatic collection",
  "Data stored on your device",
  "Crash reporting",
  "Permissions",
  "Deletion",
  "Contact",
];

const permissionRows = [
  ["Notifications", "Running timer status and completion alerts"],
  ["Exact alarms", "Fire user-created timers at the selected time"],
  ["Full-screen alerts", "Show alarm controls while the device is locked"],
  ["Run at boot", "Recover timers after a device restart"],
  ["Vibrate", "Alarm vibration and haptic feedback"],
  ["Display over other apps", "Optional floating timer gadget"],
  [
    "Modify audio settings",
    "Temporarily align headphone media volume with alarm volume, then restore it",
  ],
];

describe("TrickTic Timer privacy policy", () => {
  test("serves the document verbatim", () => {
    assert.equal(title(html), "TrickTic Timer Privacy Policy");
    assert.deepEqual(headings(html, 1), ["TrickTic Timer Privacy Policy"]);
    // The date tracks the CONTENT, not the deploy. Only bump it with the text.
    assert.deepEqual(paragraphs(html, "updated"), ["Last updated: July 27, 2026"]);

    const body = mainText(html);
    for (const paragraph of verbatimText) {
      assert.ok(body.includes(paragraph), `missing or reworded: "${paragraph.slice(0, 40)}..."`);
    }

    const h2 = headings(html, 2);
    for (const heading of sectionHeadings) {
      assert.ok(h2.includes(heading), `missing section heading: ${heading}`);
    }

    // Must match the Play Store listing's contact email exactly. Google
    // cross-checks them, so this is a real failure, not a copy nit.
    assert.ok(
      links(html).some(
        (link) => link.text === "contact@tricktic.com" && link.href === "mailto:contact@tricktic.com"
      ),
      "contact@tricktic.com mailto link"
    );
  });

  // The app dropped crash reporting, and the Data Safety declaration now
  // answers "No" to data collection. Any wording implying the developer
  // receives something contradicts that, so the retired phrasing must not come
  // back via an edit or a bad merge.
  test("states no data reaches the developer", () => {
    const body = mainText(html);
    for (const retired of [
      "Optional crash-report emails",
      "the developer receives your sender email address",
      "stack trace",
      "prepare and send a report",
    ]) {
      assert.ok(!body.includes(retired), `retired crash-reporting wording is back: "${retired}"`);
    }
  });

  test("declares every permission row exactly once", () => {
    const [table, ...others] = tables(html);
    assert.equal(others.length, 0, "one permissions table");
    assert.deepEqual(table.head, ["Permission", "Purpose"]);
    assert.deepEqual(table.rows, permissionRows);
  });

  test("loads no analytics or third-party scripts", () => {
    assert.deepEqual(trackerProblems(html), []);
  });

  test("is crawlable: no noindex on a store-facing document", () => {
    assert.equal(metaContent(html, "robots"), "index, follow");
  });
});
