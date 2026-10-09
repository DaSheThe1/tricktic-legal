import type { AppDocument } from "./types";

// TrickTic Dictate (Windows and Android) — privacy policy, terms of use and
// security policy. Served at /legal/tricktic-dictate/{privacy,terms,security}.
//
// The privacy URL is typed into the Google Play listing and, with the terms
// URL, compiled into the Android app (LegalLinks in the Metrix Writer repo).
// All three URLs are permanent.
//
// The text below is VERBATIM and is matched clause by clause against the app's
// code and the Play Console Data safety declaration. The clause-to-code trace
// lives in the app repository at docs/release/legal/README.md, and the Data
// safety answers in docs/release/play-declarations.md.
//
// DO NOT edit the wording, add or drop a permission row, or bump
// `lastUpdated` unless the app's actual behavior changed AND the Data safety
// form was updated to match. Desktop accounts are public; current Play remains
// account-free. MW-RELEASE-12 records the next account-enabled Play worksheet.
//
// Unlike TrickTic Timer, this app sends audio and text off the device to the
// provider the user selects, with the user's own key. The developer still
// offers optional desktop accounts and opt-in sync through its Firebase project.

const SLUG = "tricktic-dictate";
const APP_NAME = "TrickTic Dictate";

// Must stay identical to the contact email on the Play Store listing —
// Google cross-checks the two. Not an alias, not a contact form.
const CONTACT_EMAIL = "contact@tricktic.com";
const SECURITY_EMAIL = "report@tricktic.com";
const LEGAL_BASE = `https://legal.tricktic.com/${SLUG}`;
export const DICTATE_ACCOUNT_DELETION_PATH = `/${SLUG}/delete-account`;
const ACCOUNT_DELETION_URL = `${LEGAL_BASE}/delete-account`;

// Bump only the document whose text actually changes.
const PRIVACY_UPDATED = "Last updated: October 9, 2026";
const TERMS_UPDATED = "Last updated: October 4, 2026";
const SECURITY_UPDATED = "Last updated: October 9, 2026";

/** MW-RELEASE-12: public request route independent of an installed app. */
export const trickticDictateAccountDeletion: AppDocument = {
  slug: SLUG,
  appName: APP_NAME,
  title: `${APP_NAME} Account and Data Deletion`,
  lastUpdated: "Last updated: October 9, 2026",
  description: `Request deletion of your ${APP_NAME} account and its cloud data in the app or by email.`,
  intro: [
    { type: "paragraph", text: `${APP_NAME} is published by TrickTic. Accounts are optional. This page lets you request deletion of your Writer account and its cloud data without installing or opening the app. The current Google Play release has no accounts; these controls apply to builds that offer Google sign-in, including Windows and macOS.` },
  ],
  sections: [
    {
      heading: "Delete your account in the app",
      blocks: [
        { type: "list", items: [
          "Open Settings → Account and find Account and cloud data.",
          "Choose Delete account. Review which downloaded account copies to keep or remove on this device, then confirm. A recent Google sign-in is required to verify ownership.",
          "Wait for the account service to report completion. If deletion fails or is interrupted, use the unfinished account deletion control to retry; a failed request is not confirmation of deletion.",
        ] },
        { type: "paragraph", text: "To erase synced data while keeping your Writer account, use Delete cloud data and choose settings/dictionary or transcript history. Turning sync off, signing out or uninstalling does not by itself delete cloud data." },
      ],
    },
    {
      heading: "Request deletion without the app",
      blocks: [
        { type: "email", label: "Email your account and cloud-data deletion request to", address: CONTACT_EMAIL },
        { type: "paragraph", text: `Use the subject “${APP_NAME} account deletion” and send it from the Google email address you used to sign in. Say whether you want your entire Writer account and its cloud data deleted, or only a synced data category. We verify account ownership before acting and confirm the result by email. You do not need to reinstall the app.` },
        { type: "paragraph", text: "Do not send your password, API keys, sign-in codes, recordings or transcripts. If you cannot email from the account address, contact us to arrange ownership verification. A request email alone is not confirmation that deletion is complete." },
      ],
    },
    {
      heading: "What account deletion removes",
      blocks: [
        { type: "paragraph", text: "Account deletion removes the Writer user in Firebase Authentication and the account content stored under that user in Cloud Firestore: synced settings, dictionary entries and snippets, synced raw and processed transcript text, and the synced device and record metadata used to manage that content. The account service deletes the cloud data before removing the Firebase user." },
        { type: "paragraph", text: "Deleting your Writer account does not delete your Google account. Signing in with Google again later creates a new, empty Writer account." },
      ],
    },
    {
      heading: "What stays and how to remove it",
      blocks: [
        { type: "paragraph", text: "Local recordings, original transcripts, provider keys and downloaded models stay on your devices. You can separately keep or remove downloaded account copies when using the in-app controls. Delete everywhere can remove synced copies as devices reconnect; an offline device can retain a local copy. A request made by email cannot erase files from your devices." },
        { type: "paragraph", text: "Delete local audio and transcripts using the app's storage controls. Shared or exported files must be deleted where you saved them. Copies held by a speech or text provider are managed under your own account with that provider and must be deleted there." },
        { type: "paragraph", text: "Cloud data remains until the deletion service completes the request; interrupted jobs are retried. A minimal account-deletion fence and cleanup-job receipts remain to prevent stale sync writes and make deletion retries safe. They retain account and operation identifiers and deletion state, not recordings, transcripts or dictionary content, and currently have no automatic expiry. Deletion-request emails remain in our correspondence. Firebase Authentication keeps logged IP addresses for a few weeks and removes other deleted authentication information from its live and backup systems within 180 days." },
      ],
    },
  ],
};

export const trickticDictatePrivacyPolicy: AppDocument = {
  slug: SLUG,
  appName: APP_NAME,
  title: "TrickTic Dictate Privacy Policy",
  lastUpdated: PRIVACY_UPDATED,
  description:
    "TrickTic Dictate turns your speech into text, either on your device or through a speech provider you choose, using your own API key.",
  intro: [
    {
      type: "paragraph",
      text: "TrickTic Dictate turns your speech into text, either on your device or through a speech provider you choose, using your own API key. This policy covers Windows, macOS and Android builds. TrickTic Dictate is published by TrickTic.",
    },
  ],
  sections: [
    {
      heading: "What the developer receives",
      blocks: [
        {
          type: "paragraph",
          text: "The app has no advertising, tracking or crash reporting and no app-usage analytics system. Account-free use sends no recordings or transcripts to TrickTic. If you choose sign-in or cloud sync, the account and selected synced data described below are handled through services operated for TrickTic. Firebase also processes authentication security and service-maintenance information as described below. If you email us, we receive what you send.",
        },
      ],
    },
    {
      heading: "Optional accounts and sync",
      blocks: [
        {
          type: "paragraph",
          text: "Windows and macOS desktop builds can offer Google sign-in through Firebase Authentication in TrickTic's metrix-writer project. Google and Firebase process your sign-in; the app keeps your account identifier, display name and email and stores its session credential using Windows data protection or the macOS Keychain. Dictation does not require an account. The Android app from Google Play remains account-free.",
        },
        {
          type: "paragraph",
          text: "Android builds that offer accounts, including the private Dev build, use Google sign-in through Firebase Authentication too. Their sign-in credential is held in app-private storage excluded from Android backup and device transfer; their provider API keys are separately encrypted with Android Keystore. Firebase Authentication processes your IP address for authentication security and abuse prevention, plus device, operating-system, app and SDK metadata to provide, maintain and improve its services. This does not enable advertising or dictation-content analytics.",
        },
        {
          type: "paragraph",
          text: "Signing in alone does not upload your settings, dictionary or history. You separately choose settings and dictionary sync and, with separate consent, text-only transcript history sync. Enabled categories are sent over HTTPS to Cloud Firestore in TrickTic's project so your signed-in devices can restore and sync them. Synced records include device identifiers, revisions and timestamps needed to coordinate changes. Recordings, provider API keys, downloaded models and captured application or clipboard context are excluded from account sync.",
        },
        {
          type: "paragraph",
          text: "Synced settings include language, theme, model and dictation preferences and custom polishing instructions. Dictionary sync includes spelling hints, corrections and snippets. Transcript sync includes raw, corrected, polished and edited text and the associated language, model and creation-time metadata. Sync also stores an app-generated device identifier, account consent, change revisions and deletion state to coordinate your devices. These are stored until you request cloud or account deletion; simply disabling sync does not erase them.",
        },
        {
          type: "paragraph",
          text: "The Firestore database is in Tel Aviv (me-west1); this is not a promise that Google Authentication or every supporting service processes data only in Israel. Cloud sync is not end-to-end encrypted. Google and authorized service administrators can process the stored data. Google's terms and privacy policy apply to its services. Account deletion and session revocation use TrickTic's account service at writer-account.tricktic.com, which receives the authentication needed to act on your account.",
        },
        {
          type: "paragraph",
          text: "Turning sync off or signing out stops future syncing; it does not itself delete cloud copies or the local files on your devices. In Settings, Account, use the cloud-data deletion controls or Delete account to remove the cloud data or the Firebase account. Account deletion requires a recent Google sign-in. Your local recordings, original transcripts and provider keys stay on your device. You can separately choose whether to keep or remove downloaded account copies; Delete everywhere removes synced copies from other devices when they reconnect. An offline device can retain local copies. The app reports deletion progress and completion; a failed request is not confirmation of deletion. If you cannot access the app, contact contact@tricktic.com for help with a deletion request; we need to verify account ownership before acting.",
        },
        {
          type: "linked-paragraph",
          parts: ["Request account deletion without the app using the ", { text: "account and data deletion page", href: ACCOUNT_DELETION_URL }, ". Account deletion removes synced content and the Firebase user. A minimal account-deletion fence and cleanup-job receipts retain account and operation identifiers, consent and deletion state to prevent stale sync writes and make retries safe; they contain no dictation or dictionary content and currently have no automatic expiry. Deletion-request emails remain in our correspondence. Firebase Authentication keeps logged IP addresses for a few weeks and removes other deleted authentication information from live and backup systems within 180 days; see ", { text: "Firebase's retention information", href: "https://firebase.google.com/support/privacy" }, "."],
        },
      ],
    },
    {
      heading: "Where your audio and text go",
      blocks: [
        {
          type: "paragraph",
          text: "The app records only when you start a dictation. You choose where each dictation is transcribed:",
        },
        {
          type: "table",
          head: ["Your choice", "Audio", "Text"],
          rows: [
            [
              "On-device model",
              "Transcribed on your phone or computer. It is not sent anywhere.",
              "Stays on your device, unless you turn on cloud text processing or optional desktop transcript sync.",
            ],
            [
              "Cloud speech provider",
              "Sent from your device directly to the provider you choose (Google Gemini, OpenAI, xAI Grok, or Groq on Android) over HTTPS, using your API key.",
              "The transcript is returned to your device.",
            ],
            [
              "Cloud text processing (optional, off by default)",
              "Not sent.",
              "The transcript is sent to the text provider you choose. OpenRouter passes it on to the company that hosts the model you select.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Speech requests include the language you selected and can include the words in your dictionary, as spelling hints. Text requests include the transcript and, on Windows, any custom instructions and context you enable in Modes. Your API key is sent only to the provider that issued it.",
        },
        {
          type: "paragraph",
          text: "Each provider handles what you send under its own terms and privacy policy and your account with it. A provider may retain a request, or charge for it, even after you cancel it in the app. Deleting data in TrickTic Dictate does not delete copies a provider holds. Review your provider's terms before you use it.",
        },
      ],
    },
    {
      heading: "Windows: context and early processing",
      blocks: [
        {
          type: "paragraph",
          text: "Modes can send context with a text request: the title of the active window, the text you selected and the contents of your clipboard. Each is off unless the mode enables it. The Regular mode sends none of them, and the Command mode sends the selected text. You can change this in Settings, Modes. Context can contain material unrelated to your dictation.",
        },
        {
          type: "paragraph",
          text: "With Process while speaking, the Super mode can send partial text to its text provider before you stop recording. If a mode has a fallback model, the same request can also go to the fallback model's provider. Cancelling cannot recall a request that was already sent.",
        },
        {
          type: "paragraph",
          text: "After a request succeeds, its context is erased from the saved request. A failed or interrupted request keeps its context so it can be retried, until you delete your history.",
        },
      ],
    },
    {
      heading: "Other connections",
      blocks: [
        {
          type: "list",
          items: [
            "Model downloads: when you choose to download an on-device model, the app downloads it from Hugging Face (huggingface.co) and its download servers.",
            "Key checks: to confirm that a key works, and on Windows to prepare a connection while you speak, the app contacts the provider with your key and no audio or text.",
            "Windows updates: the Windows app checks updates.tricktic.com for a new version shortly after it starts and every six hours. The check carries no identifier and no app data. An update downloads only when you choose to install it.",
            "Android updates: the Android app from Google Play is updated by Google Play and makes no update checks of its own.",
          ],
        },
        {
          type: "paragraph",
          text: "All of these connections use HTTPS. Like any internet service, the services you connect to receive standard connection information, such as your IP address.",
        },
      ],
    },
    {
      heading: "Data stored on your device",
      blocks: [
        {
          type: "paragraph",
          text: "Your recordings, transcripts, processed text, dictionary and settings are stored on your device, so a failed transcription can be retried without recording again. They are kept until you delete them; there is no automatic expiry. The app does not encrypt them itself, so use your device's lock screen and disk encryption.",
        },
        {
          type: "paragraph",
          text: "Your API keys are stored encrypted: on Windows with Windows data protection for your Windows account, and on Android with a key held in the Android Keystore.",
        },
        {
          type: "paragraph",
          text: "On Android, app data is stored in the app's private storage and is excluded from Android backup and device transfer. On Windows, data is stored in your user folder (%LOCALAPPDATA%\\MetrixWriter) and is included in any backups you make of that folder.",
        },
      ],
    },
    {
      heading: "Android accessibility service",
      blocks: [
        {
          type: "paragraph",
          text: "The optional accessibility service, TrickTic Dictate · voice insertion, puts your dictation into the text field you are typing in, in any app. The app asks for your consent before it opens Android's Accessibility settings, and the service does nothing until you accept.",
        },
        {
          type: "paragraph",
          text: "While it is on, it reads the text, cursor position and ID of the focused field, notices when focus, text or windows change, and sees which app window is in front and where the keyboard is. It skips password, number and private fields and never presses Send. What it reads is used only on your phone. It is not saved and not sent anywhere. If you decline or turn the service off, you can still record and copy your text from History.",
        },
      ],
    },
    {
      heading: "Clipboard, sharing and export",
      blocks: [
        {
          type: "paragraph",
          text: "On Windows, the app pastes your dictation through the clipboard and restores the previous clipboard contents where possible. Windows may keep the dictation in clipboard history, or sync it, depending on your Windows settings. Turn on Private clipboard delivery to ask Windows not to.",
        },
        {
          type: "paragraph",
          text: "When you insert, copy, share or export a dictation, a copy goes to the app or location you choose and is controlled by it.",
        },
      ],
    },
    {
      heading: "Permissions",
      blocks: [
        { type: "paragraph", text: "Android:" },
        {
          type: "table",
          head: ["Permission", "Purpose"],
          rows: [
            ["Microphone", "Record your dictation, including from the floating control"],
            ["Display over other apps", "Show the floating microphone beside your keyboard"],
            ["Accessibility service", "Insert your dictation into the focused text field in other apps"],
            ["Notifications", "Show recording status with Stop and Discard controls"],
            ["Internet", "Cloud transcription and text processing, key checks and model downloads"],
          ],
        },
        { type: "paragraph", text: "Windows:" },
        {
          type: "table",
          head: ["Access", "Purpose"],
          rows: [
            ["Microphone", "Record your dictation"],
            ["Keyboard shortcuts", "Start and stop dictation with a shortcut from any app"],
            ["UI Automation", "Read selected text, only for modes that enable it"],
            ["Clipboard", "Paste your dictation, and read clipboard context only for modes that enable it"],
            ["Launch at login", "Start the app when you sign in, if you turn this on"],
          ],
        },
        {
          type: "paragraph",
          text: "Revoking a permission stops future access. It does not delete recordings already saved.",
        },
      ],
    },
    {
      heading: "Deleting your data",
      blocks: [
        {
          type: "list",
          items: [
            "Android: delete a single dictation in History, or everything in Settings, Storage & about, Delete all audio and transcripts. This removes the audio, transcripts and the app's shared copies. Models, your dictionary, settings and keys are kept. Uninstalling the app deletes all of its data and keys.",
            "Windows: use Settings, Data & Privacy, Delete all audio and transcripts. Models, your dictionary, settings and keys are kept. Deleting a single recording's audio keeps its text.",
            "Uninstalling on Windows does not delete your data folder, %LOCALAPPDATA%\\MetrixWriter. Delete that folder yourself to remove your recordings, text and saved keys.",
            "Copies you shared or exported, and copies held by a provider, are deleted where they are kept.",
          ],
        },
      ],
    },
    {
      heading: "Children",
      blocks: [
        {
          type: "paragraph",
          text: "TrickTic Dictate is not directed at children. Cloud providers set their own minimum ages for their accounts.",
        },
      ],
    },
    {
      heading: "Security",
      blocks: [
        {
          type: "paragraph",
          text: `To report a security problem, see the security policy at ${LEGAL_BASE}/security.`,
        },
      ],
    },
    {
      heading: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: "When the app's handling of data changes, this page is updated and the date above changes with it.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [
        { type: "email", label: "Email:", address: CONTACT_EMAIL },
      ],
    },
  ],
};

export const trickticDictateTermsOfUse: AppDocument = {
  slug: SLUG,
  appName: APP_NAME,
  title: "TrickTic Dictate Terms of Use",
  lastUpdated: TERMS_UPDATED,
  description:
    "The terms that apply to the TrickTic Dictate apps for Windows and Android, under the laws of the State of Israel.",
  intro: [
    {
      type: "paragraph",
      text: "These terms apply to the TrickTic Dictate apps for Windows and Android. They are governed by the laws of the State of Israel.",
    },
  ],
  sections: [
    {
      heading: "1. Acceptance of these terms",
      blocks: [
        {
          type: "paragraph",
          text: "These terms of use (the “Terms”) apply to your use of the TrickTic Dictate apps (the “App”), published by TrickTic (“TrickTic”, “we” or “us”). By installing or using the App you accept these Terms. If you do not agree to them, do not use the App.",
        },
      ],
    },
    {
      heading: "2. The App",
      blocks: [
        {
          type: "paragraph",
          text: "The App records your speech when you ask it to and turns it into text, either with a model on your device or through a speech or text provider you choose. The App is free. We may change, suspend or discontinue it, or any feature of it, at any time.",
        },
        {
          type: "paragraph",
          text: "Your use of the App is also subject to the terms of the store or website you got it from.",
        },
      ],
    },
    {
      heading: "3. Your provider accounts and keys",
      blocks: [
        {
          type: "paragraph",
          text: "Cloud features use your own account and API key with the provider you choose. The App sends requests from your device directly to that provider. We are not a party to your agreement with the provider, and we do not control its service, retention or charges.",
        },
        {
          type: "paragraph",
          text: "You are responsible for your provider accounts, for keeping your keys secret, for any fees your provider charges, and for following your provider's terms, including its age requirements. A provider may process, retain or charge for a request even after you cancel or retry it in the App.",
        },
      ],
    },
    {
      heading: "4. Your content",
      blocks: [
        {
          type: "paragraph",
          text: "Your recordings and text are yours. Recordings are not uploaded to TrickTic. If you enable desktop transcript sync, the text you choose to sync is stored in TrickTic's Firebase project as described in the Privacy Policy. You are responsible for what you record and where you send, insert or share the text, and for having any consent the law requires to record other people.",
        },
      ],
    },
    {
      heading: "5. Accuracy",
      blocks: [
        {
          type: "paragraph",
          text: "Speech recognition and text processing can be wrong, can leave words out and can change meaning. Review the text before you rely on it or send it. Do not rely on the App where a transcription error could cause harm, such as for medical, legal, safety or emergency purposes.",
        },
      ],
    },
    {
      heading: "6. Permitted use",
      blocks: [
        { type: "paragraph", text: "You agree not to use the App:" },
        {
          type: "list",
          items: [
            "for any unlawful purpose;",
            "to record people without the consent the law requires;",
            "in breach of your provider's terms or usage policies;",
            "to interfere with other apps, devices or services.",
          ],
        },
      ],
    },
    {
      heading: "7. Intellectual property and open source",
      blocks: [
        {
          type: "paragraph",
          text: "The App's own code and design are owned by TrickTic or licensed to it, and are protected by the Copyright Law, 5768-2007 and other applicable law. We grant you a personal, non-exclusive, non-transferable licence to use the App.",
        },
        {
          type: "paragraph",
          text: "The App includes open-source components and can download open models. Each is licensed under its own licence, listed in the App, and those licences apply to those components.",
        },
      ],
    },
    {
      heading: "8. Disclaimer of warranties",
      blocks: [
        {
          type: "paragraph",
          text: "The App is provided “as is” and “as available”, without warranty of any kind, express or implied, to the fullest extent permitted by law. We do not warrant that the App will be uninterrupted, error-free or accurate, that saved recordings will never be lost, or that any provider's service will remain available or unchanged. Keep copies of anything important.",
        },
      ],
    },
    {
      heading: "9. Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the fullest extent permitted by applicable law, TrickTic shall not be liable for any indirect, incidental, special or consequential damage, for provider charges, or for loss of data, arising from the use of the App or from any inability to use it. Nothing in these Terms limits liability that cannot be excluded under applicable law, or rights you have under the mandatory consumer law of your country of residence.",
        },
      ],
    },
    {
      heading: "10. Governing law and jurisdiction",
      blocks: [
        {
          type: "paragraph",
          text: "These Terms are governed by and construed in accordance with the laws of the State of Israel, without regard to its conflict of law rules. The competent courts of the Tel Aviv-Yafo district shall have exclusive jurisdiction over any dispute arising from or relating to the App or to these Terms, subject to any mandatory consumer law that gives you the right to bring proceedings where you live.",
        },
      ],
    },
    {
      heading: "11. Changes to these terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may amend these Terms from time to time. The current version will always appear at this URL, and the “Last updated” date above reflects the most recent change. Continued use of the App after a change constitutes acceptance of the amended Terms.",
        },
      ],
    },
    {
      heading: "12. Contact",
      blocks: [
        {
          type: "paragraph",
          text: "Questions about these Terms can be sent to the address below.",
        },
        { type: "email", label: "Email:", address: CONTACT_EMAIL },
      ],
    },
  ],
};

export const trickticDictateSecurityPolicy: AppDocument = {
  slug: SLUG,
  appName: APP_NAME,
  title: "TrickTic Dictate Security Policy",
  lastUpdated: SECURITY_UPDATED,
  description:
    "How to report a security vulnerability in TrickTic Dictate, and which versions receive security fixes.",
  intro: [
    {
      type: "paragraph",
      text: "This page explains how to report a security vulnerability in TrickTic Dictate, and which versions receive security fixes. For how the app handles your data and which permissions it uses, see the privacy policy at " +
        `${LEGAL_BASE}/privacy.`,
    },
  ],
  sections: [
    {
      heading: "Reporting a vulnerability",
      blocks: [
        {
          type: "paragraph",
          text: "Report suspected vulnerabilities privately by email. Do not post exploit details, keys, recordings or transcripts in public.",
        },
        { type: "email", label: "Security reports:", address: SECURITY_EMAIL },
        { type: "paragraph", text: "Please include:" },
        {
          type: "list",
          items: [
            "the platform (Windows or Android), the app version and where you installed it from;",
            "a short description of the impact;",
            "minimal steps to reproduce it.",
          ],
        },
        {
          type: "paragraph",
          text: "Use synthetic audio and invented text where you can. Remove API keys, personal paths and other people's data from attachments. If reproducing the problem would require sensitive material, describe it first and we will agree on a private way to transfer it. Email is not end-to-end encrypted.",
        },
      ],
    },
    {
      heading: "What to expect",
      blocks: [
        {
          type: "paragraph",
          text: "We acknowledge receipt, confirm the problem and its severity, and agree with you on follow-up and disclosure. This is a small project: there is no 24/7 response, no guaranteed response or fix time, no bug bounty and no legal safe-harbour programme. If you do not hear back, follow up on the same email thread.",
        },
        {
          type: "paragraph",
          text: "Once a fix or workaround is available, we publish an advisory that names the affected and fixed versions and any action users need to take, and credit you if you wish. If no safe fix is ready, we publish a workaround or withdraw the affected release.",
        },
      ],
    },
    {
      heading: "Testing rules",
      blocks: [
        {
          type: "list",
          items: [
            "Test only installations and accounts you own or are explicitly authorised to test.",
            "Do not probe the release and update servers, access other people's data, run up charges on another person's provider account, or disrupt a service.",
          ],
        },
      ],
    },
    {
      heading: "Supported versions",
      blocks: [
        {
          type: "table",
          head: ["Platform", "Security fixes"],
          rows: [
            ["Windows", "The latest version from tricktic.com, delivered by the app's built-in updates"],
            ["Android", "The latest version on Google Play"],
          ],
        },
        {
          type: "paragraph",
          text: "Older versions are fixed by updating to the latest version; there are no separate fixes for older versions. Windows and Android can have different version numbers.",
        },
      ],
    },
    {
      heading: "How updates are protected",
      blocks: [
        {
          type: "paragraph",
          text: "The Windows installer is not signed with a Microsoft code-signing certificate, so Windows SmartScreen shows it as coming from an unknown publisher. The download page lists the installer's SHA-256 checksum so you can check the file. After installation, the app verifies every update against TrickTic Dictate's own update signing key before installing it.",
        },
        {
          type: "paragraph",
          text: "The Android app is installed and updated by Google Play.",
        },
      ],
    },
    {
      heading: "Other questions",
      blocks: [
        { type: "email", label: "Email:", address: CONTACT_EMAIL },
      ],
    },
  ],
};
