import type { AppDocument } from "./types";

// Existing privacy clauses are unchanged; provenance and publication gate: ADE-MIGRATION.md.
export const trickticAdePrivacyPolicy: AppDocument = {
  "slug": "tricktic-ade",
  "appName": "TrickTic ADE",
  "title": "TrickTic ADE Privacy Policy",
  "lastUpdated": "Effective: September 29, 2026",
  "description": "Privacy policy for the invitation-only hosted TrickTic ADE service.",
  "intro": [
    {
      "type": "linked-paragraph",
      "parts": [
        "Effective 2026-09-29. Published and operated by TrickTic. For privacy questions, contact ",
        {
          "href": "mailto:contact@tricktic.com",
          "text": "contact@tricktic.com"
        },
        "."
      ]
    },
    {
      "type": "paragraph",
      "text": "This policy covers the invitation-only hosted TrickTic ADE service and its Android app, com.tricktic.ade. The service connects your phone or browser to coding agents on computers you connect."
    }
  ],
  "sections": [
    {
      "heading": "Information we process and why",
      "blocks": [
        {
          "type": "list",
          "items": [
            "Google sign-in identity, email address, account identifiers and invitation records let us identify your account and control access.",
            "Phone, browser and computer registrations and credentials let us connect, authenticate and revoke your devices.",
            "Session titles, messages, prompts, agent replies, terminal output, project paths, computer names and usage records support remote work and session history.",
            "Images or files you upload, including filenames and any embedded metadata, are delivered to the connected computer or agent. Do not assume uploads have their metadata removed.",
            "Hosted skills and their revisions, workspace layouts, preferences and notification records support the features you choose to use.",
            "Network addresses and operational records support service operation, troubleshooting and access protection. The server journal is bounded by 30 days and a 1 GiB size limit. Database logs rotate by size, keeping up to five 10 MiB files. The origin web proxy does not keep an access log; it records critical errors. These limits do not set a deletion deadline for separate provider logs or copies already included in backups."
          ]
        }
      ]
    },
    {
      "heading": "Notifications and Google Firebase",
      "blocks": [
        {
          "type": "paragraph",
          "text": "The Android app uses Firebase Cloud Messaging and Firebase Installations in the public project ade-remote-sessions. Google processes an installation identifier and notification registration token. The app registers the token with our server to route alerts to your phone. The server removes its push-token registration on logout, device revocation or account deletion, and replaces it when refreshed."
        },
        {
          "type": "paragraph",
          "text": "Push content sent through Google uses a generic alert title and category, opaque session and computer identifiers, a sequence number and a hashed repository routing key. It does not include session titles, prompts, output, code, paths or credentials. You can turn off system notifications in Android; session controls remain available."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            "Removing your account's push registration from our server does not itself delete the Firebase installation identifier held by Google. Google's handling of that identifier is described in its ",
            {
              "href": "https://firebase.google.com/support/privacy",
              "text": "Firebase privacy information"
            },
            "."
          ]
        }
      ]
    },
    {
      "heading": "Service providers and your connected agents",
      "blocks": [
        {
          "type": "paragraph",
          "text": "The hosted service uses OVH infrastructure in France, Cloudflare for the public connection and encrypted backup storage in R2, Google for sign-in and Firebase notifications, and OpenAI for enabled voice assistant conversations. These providers process the information needed for their respective services and may process information outside your country. Work you send through the hosted service is available to its operator; do not use it for information you cannot permit the service to process."
        },
        {
          "type": "paragraph",
          "text": "When you direct work to an agent on your computer, that agent may send your content to its provider under your account with that provider. Hosted account deletion does not delete those provider accounts or their independent records."
        },
        {
          "type": "paragraph",
          "text": "Public app and browser connections to the hosted service use HTTPS and encrypted WebSockets. Account authentication and device credentials control access, and off-site database backups are encrypted. The hosted service processes readable session content. It is not an end-to-end encrypted service that hides content from the operator."
        }
      ]
    },
    {
      "heading": "Microphone and voice",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Voice is optional and requires microphone permission and an enabled, configured voice service. When you start a voice conversation in Android, microphone audio travels through the hosted service to OpenAI for recognition and responses. In the browser, audio may connect directly to OpenAI through WebRTC or use the hosted relay. Captions, your requests, relevant account/session context and results of actions you request may be processed by the hosted service and OpenAI so the assistant can respond and act."
        },
        {
          "type": "paragraph",
          "text": "The hosted voice service does not save raw audio recordings. Saved caption retention is off by default; if enabled in voice settings, finalized captions are kept for the selected period, up to 30 days, and removed by a periodic sweep. Ended conversations can remain in memory for up to ten minutes for event catch-up. Usage and operation records have separate retention: voice usage receipts become eligible for removal 90 days after the conversation ends, while daily spend records become eligible 90 days after their recorded day. A periodic sweep removes eligible records. These are hosted-service limits, not promises about OpenAI's storage. Its processing is governed by the provider's terms and the configured provider account. Disabling or deleting voice history does not undo actions already completed or erase content sent into a coding session."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            "See ",
            {
              "href": "https://developers.openai.com/api/docs/guides/your-data",
              "text": "OpenAI's API data controls"
            },
            " for its processing and retention rules. We do not promise that deleting hosted voice history deletes copies already processed by that provider."
          ]
        }
      ]
    },
    {
      "heading": "Retention and account deletion",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Active session events are retained while the session is active. Under the normal retention settings, completed-session events become eligible for deletion after 90 days and are removed by a daily sweep; session summaries remain. Staged uploads expire after 24 hours. Hosted skills keep the ten newest revisions plus revisions still needed by active delivery or automation. Account deletion removes the live hosted data described below."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            "Open ",
            {
              "href": "https://ade.tricktic.com/account/delete",
              "text": "Delete your hosted account"
            },
            " in a browser, sign in with your account's Google identity, read the effects and type DELETE MY ACCOUNT to confirm. You do not need to reinstall the Android app. The app also offers Settings → Hosted account → Delete account."
          ]
        },
        {
          "type": "paragraph",
          "text": "When the request completes, the service revokes browser, phone and computer access and removes hosted records of computers, sessions, server-stored history, uploads, notifications, usage, workspaces, settings and hosted skills. A minimal deleted-account record, revoked credential records and deletion/export receipts remain. These records document completed requests and help prevent revoked access or conflicting account identities from being reused. There is currently no general automatic expiry for these retained account and request records."
        },
        {
          "type": "paragraph",
          "text": "Deletion does not rewrite existing backup bundles. The normal rotation retains all backups for 48 hours, daily copies for 14 days and weekly copies for eight weeks. It also keeps at least the newest three verified copies regardless of age. Copies can remain longer if new backups or pruning fail, and separately made recovery copies have a separate lifetime. Eight weeks is therefore not a guaranteed deadline for removal from every backup."
        },
        {
          "type": "paragraph",
          "text": "Deletion does not remove projects, files, terminal sessions or agent accounts on your computers. It does not uninstall the daemon or delete your Google account. The account page offers a data summary export; it is not a full archive of all session content."
        }
      ]
    },
    {
      "heading": "Your requests and support",
      "blocks": [
        {
          "type": "paragraph",
          "text": "For questions about your information or a request for access, correction or deletion, email the privacy contact above. We may need to verify that the request concerns your account. Your rights may depend on the laws that apply to you. Do not send passwords, access tokens or sign-in codes."
        },
        {
          "type": "linked-paragraph",
          "parts": [
            "If sign-in or deletion fails, contact ",
            {
              "href": "mailto:contact@tricktic.com",
              "text": "contact@tricktic.com"
            },
            " for help verifying ownership and handling your request. Do not send passwords or access tokens."
          ]
        }
      ]
    }
  ]
};

// New pilot terms: owner review before publication, tracked in ADE-MIGRATION.md.
export const trickticAdeTermsOfUse: AppDocument = {
  slug: "tricktic-ade",
  appName: "TrickTic ADE",
  title: "TrickTic ADE Terms of Service",
  lastUpdated: "Last updated: October 6, 2026",
  description: "Terms for the invitation-only TrickTic ADE hosted pilot and its connected clients and daemons.",
  intro: [{ type: "paragraph", text: "These terms apply to the invitation-only TrickTic ADE hosted service, operated by TrickTic, and the clients and daemons you use to connect to it. Please read them before accepting an invitation or using the service. By using the service, you agree to these terms. If you do not agree, do not use the service." }],
  sections: [
    { heading: "1. The service", blocks: [
      { type: "paragraph", text: "TrickTic ADE lets you access coding-agent sessions and browser terminals on computers you connect, including from another browser or device. Supported platforms, available features and resource limits are described in the current installation instructions. A connected computer and its agent providers must be available for work to run. The service is not a backup service or a security sandbox for executing untrusted code." },
    ] },
    { heading: "2. Your account and connected computers", blocks: [
      { type: "paragraph", text: "You must have the legal capacity and any permission needed to use the service. If you act for an organization, you must have authority to do so. Use your own invited Google identity, keep access credentials and invitation or enrollment codes private, and tell us promptly if you believe your account has been compromised." },
      { type: "paragraph", text: "Connect only computers, operating-system accounts, project folders and provider accounts that you own or are authorized to control. Choose allowed project folders carefully and revoke devices you no longer use. The daemon and agent tools run with the permissions of their operating-system account. Memory limits do not prevent every harmful action or isolate arbitrary code from your files and credentials." },
    ] },
    { heading: "3. Free pilot and future pricing", blocks: [
      { type: "paragraph", text: "The initial pilot is limited to five invited customers and is free for one month from each customer's activation. No payment method is required for this pilot, and it does not automatically turn into a paid subscription or generate an automatic charge. Your own agent-provider subscriptions, API usage, internet and computer costs remain yours." },
      { type: "paragraph", text: "At the end of the pilot we will tell you whether hosted access will continue, change or end. Any paid offer will state its price and terms separately and require your agreement before a charge. Ending hosted access does not authorize us to delete your local projects or force-stop work running on your computers." },
    ] },
    { heading: "4. Agent actions and third-party services", blocks: [
      { type: "paragraph", text: "Coding agents and shell commands can change or delete files, run programs, install dependencies and communicate with external services. Review the permissions and instructions you give them, keep backups of important work, and check generated code and other results before relying on or publishing them. Generated output may be inaccurate, insecure or inappropriate for your intended use." },
      { type: "paragraph", text: "You install and authenticate supported agent tools under your own provider accounts. Their terms, prices and data-processing rules apply independently. Optional hosted voice and other integrations process information as described in the privacy policy. Availability or correctness of a provider's service is not guaranteed by TrickTic." },
    ] },
    { heading: "5. Your content and our permission to process it", blocks: [
      { type: "paragraph", text: "These terms do not transfer ownership of your projects, prompts, files, skills or other content to TrickTic. You must have the rights and permissions needed to use and share that content. You permit us and the service providers described in the privacy policy to host, copy, transmit and otherwise process it as necessary to operate the features you request, maintain the service and carry out your support or deletion requests. This permission does not give us a general right to sell or publicly publish your content." },
      { type: "linked-paragraph", parts: ["The hosted service processes readable session content and is not end-to-end encrypted against its operator. Data handling, retention, providers and deletion are described in the ", { text: "TrickTic ADE privacy policy", href: "https://legal.tricktic.com/tricktic-ade/privacy" }, ". Do not send information you are not permitted to have processed in this way."] },
    ] },
    { heading: "6. Acceptable use", blocks: [
      { type: "list", items: [
        "Do not use the service for unlawful activity, unauthorized access, credential theft, malware distribution or infringement of another person's rights.",
        "Do not try to access another customer's sessions or data, bypass authentication or resource limits, or deliberately disrupt the service.",
        "Do not share or resell account access without our agreement. Only authorize people and devices you are entitled to authorize.",
        "Report a suspected vulnerability privately to contact@tricktic.com. Do not access other users' data or disrupt their work to demonstrate it.",
      ] },
    ] },
    { heading: "7. Availability, changes and suspension", blocks: [
      { type: "paragraph", text: "This is an early pilot. Features and limits may change, and outages, lost connections or errors can occur. We do not offer an uptime or response-time guarantee for the free pilot. We may limit or suspend hosted access when reasonably necessary to address misuse, security risks, legal obligations or operational failures. Where practical, we will explain the reason and give notice of a planned material change or discontinuation; urgent security or legal action may require immediate restrictions." },
      { type: "paragraph", text: "Except for rights that applicable law does not allow us to limit, the pilot is provided as available without a promise that it will always be uninterrupted, error-free or suitable for a particular purpose. Nothing in these terms excludes liability that cannot lawfully be excluded or takes away mandatory consumer rights or remedies. These terms do not require you to waive a legal claim or agree to compulsory arbitration." },
    ] },
    { heading: "8. Leaving the service and deleting your account", blocks: [
      { type: "linked-paragraph", parts: ["You can stop using the service and request deletion through ", { text: "Delete your hosted account", href: "https://ade.tricktic.com/account/delete" }, ". The privacy policy explains which hosted data is removed, which records remain and how existing backups expire. The account export is a data summary, not a full backup of every session or project."] },
      { type: "paragraph", text: "Deleting the hosted account does not uninstall the daemon, delete local files or projects, terminate your provider accounts or delete your Google account. You manage those separately. Previously completed agent actions are not undone by signing out, revoking access or deleting the hosted account." },
    ] },
    { heading: "9. Changes to these terms", blocks: [
      { type: "paragraph", text: "We will identify revisions with an updated date and notify affected users of material changes before they apply where practical and as required by law. Changes do not retrospectively authorize new uses of previously collected information or introduce charges without agreement. If you do not accept a material change, you can stop using the service and request account deletion. Mandatory rights continue to apply." },
    ] },
    { heading: "10. Contact and disputes", blocks: [
      { type: "email", label: "For support, a concern about these terms or a dispute, contact:", address: "contact@tricktic.com" },
      { type: "paragraph", text: "We will consider concerns in good faith. Contacting us does not limit your right to approach a competent court, consumer authority or other legally available dispute-resolution body, and these terms do not shorten statutory time limits." },
    ] },
  ],
};
