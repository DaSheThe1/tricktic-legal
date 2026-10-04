import type { AppPrivacyPolicy } from "./types";

// TrickTic Timer (Android) — privacy policy required by the Google Play
// listing. The text below is VERBATIM and is matched clause-by-clause against
// the Play Console Data Safety declaration.
//
// DO NOT edit the wording, add or drop a permission row, or bump `lastUpdated`
// unless the app's actual behavior changed AND the Data Safety form was
// updated to match. Drift here can get the app rejected or pulled.
//
// The declaration now answers "No" to data collection: the app has no
// crash-reporting component and the developer receives nothing. Any wording
// suggesting data reaches the developer would contradict it.
export const trickticTimerPrivacyPolicy: AppPrivacyPolicy = {
  slug: "tricktic-timer",
  appName: "TrickTic Timer",
  title: "TrickTic Timer Privacy Policy",
  lastUpdated: "Last updated: July 27, 2026",
  description: "TrickTic Timer is an offline-first timer and workout app.",
  intro: [
    {
      type: "paragraph",
      text: "TrickTic Timer is an offline-first timer and workout app.",
    },
  ],
  sections: [
    {
      heading: "Automatic collection",
      blocks: [
        {
          type: "paragraph",
          text: "Nothing is collected or sent, automatically or otherwise. The app has no internet permission, analytics, advertising, tracking, crash reporting, or account system. The developer receives no data from this app.",
        },
      ],
    },
    {
      heading: "Data stored on your device",
      blocks: [
        {
          type: "paragraph",
          text: "Timers, presets, workouts, exercise logs, settings, and attached images are stored locally. Android Auto Backup may store durable app data in the Google account backup controlled by your device settings. Backup export writes a file only to a location you choose.",
        },
      ],
    },
    {
      heading: "Crash reporting",
      blocks: [
        {
          type: "paragraph",
          text: "The app contains no crash-reporting or diagnostics component. Nothing about a crash is collected or sent to the developer.",
        },
        {
          type: "paragraph",
          text: "If you installed from Google Play, Google may collect crash and performance data under its own policies and your device settings, independently of this app.",
        },
      ],
    },
    {
      heading: "Permissions",
      blocks: [
        {
          type: "table",
          head: ["Permission", "Purpose"],
          rows: [
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
          ],
        },
      ],
    },
    {
      heading: "Deletion",
      blocks: [
        {
          type: "paragraph",
          text: "Uninstalling deletes the local app database. Google-account backups and files you exported are controlled separately by you. Individual history can also be removed inside the app.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [
        // Must stay identical to the contact email on the Play Store listing —
        // Google cross-checks the two. Not an alias, not a contact form.
        { type: "email", label: "Email:", address: "contact@tricktic.com" },
      ],
    },
  ],
};
