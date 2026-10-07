import type { AppDocument } from "./types";

// New documents for the invitation-only hosted Studio pilot. Facts trace to the
// TrickTic Studio repository (DaSheThe1/tricktic-studio, docs/ops and
// deploy/policy.json). Providers are described by role, not name or location,
// at the owner's request (2026-10-07), so infrastructure can change under them.
// Wording approved by Daniel on 2026-10-07. Pilot email, per-person pilot dates
// and the operator's overview added at Daniel's request on 2026-10-08 (Studio TTS-47).
export const trickticStudioPrivacyPolicy: AppDocument = {
  slug: "tricktic-studio",
  appName: "TrickTic Studio",
  title: "TrickTic Studio Privacy Policy",
  lastUpdated: "Effective: October 8, 2026",
  description: "Privacy policy for the invitation-only hosted TrickTic Studio service.",
  intro: [
    { type: "linked-paragraph", parts: ["Effective 2026-10-08. Published and operated by TrickTic (Daniel Shedrinsky). For privacy questions, contact ", { text: "contact@tricktic.com", href: "mailto:contact@tricktic.com" }, "."] },
    { type: "paragraph", text: "This policy covers the invitation-only hosted TrickTic Studio service at studio.tricktic.com. Studio turns pre-cut spoken clips into finished downloadable videos." },
  ],
  sections: [
    { heading: "Information we process and why", blocks: [
      { type: "list", items: [
        "Your sign-in identity: the verified email address and display name supplied by your sign-in provider, matched against your invitation, let us identify your account and control access. We also store the latest accepted profile photo URL and your optional preset icon choice. If you use the photo, your browser loads it directly from the sign-in provider's image service without sending a referrer; that service receives your network address. Choosing a preset uses bundled artwork instead. Your avatar fields are included in your account export and cleared when you delete your account. We do not accept photo uploads or keep provider access tokens.",
        "Your content: projects, clips, voice recordings, still images, scripts, topics, hooks, transcripts, captions, Copilot discussion, library assets such as music, fonts and branding, their rights receipts, templates, renders and exports. We store and process it to provide the features you use. Uploaded files are kept as you provide them, including filenames and any embedded metadata.",
        "AI and usage records: for each AI request, the input it was given, the prompt version, the model and the usage it consumed, plus spending counters that enforce usage caps. Job progress and a project activity feed show you what happened.",
        "Sign-in sessions: a random session identifier, of which the server stores only a one-way hash, a coarse browser and platform label and the time it was last used.",
        "Technical information: network addresses, browser and device details, error details and timings, used to deliver the service, limit abuse and diagnose and fix problems. We keep it only as long as needed for those purposes and do not intentionally include your media, transcripts, scripts or discussion in logs or error reports.",
        "Feedback you send through Help & feedback: its category, your text and, if you choose, the app version, browser and a project identifier.",
        "Your invitation and pilot: the email address you were invited at, when you were invited and the free days offered, the start and end of your free pilot, any extension, and the support time the operator records for your account.",
        "Emails we send you: the invitation and a reminder before your pilot ends. For each message we keep the address, its dates and whether it was delivered. The messages contain only your own address, dates and public Studio links.",
      ] },
    ] },
    { heading: "Cookies and browser storage", blocks: [
      { type: "paragraph", text: "Studio uses essential cookies to sign you in and keep you signed in. It does not use advertising or cross-site tracking cookies." },
      { type: "paragraph", text: "Studio keeps a few things in your browser, for your account only: device settings, unsaved edits to projects and scripts for up to 14 days, the list of recent exports and the details of paused uploads. It does not keep download or upload links, credentials, file contents or AI answers there. Signing out or deleting your account clears it. Browser notifications are off until you allow them; when on, they show project titles." },
    ] },
    { heading: "Service providers", blocks: [
      { type: "paragraph", text: "We use service providers to run Studio. They process information only as needed to provide their service to us:" },
      { type: "list", items: [
        "Hosting, network and storage providers run Studio's servers and database, carry the connection to your browser and store uploaded media, finished videos and encrypted backups.",
        "Google provides sign-in.",
        "Transcription of your audio and video may run on hardware we operate or with a speech-recognition provider.",
        "AI model providers power Copilot and other AI features. A request sends the project information needed for it, such as the script, transcript or captions, recent discussion and only the library descriptions you choose to share. It does not send your account credentials. We configure these providers not to use your content to train their models.",
        "Error-monitoring and operational services help us detect and fix problems, using the technical information described above.",
        "An email delivery provider sends invitation and reminder emails. It receives your email address and the message.",
      ] },
      { type: "paragraph", text: "Providers may change as the service develops, and they may process information outside your country. A current list is available from the privacy contact above. We do not sell your information or use it for advertising. We do not promise that deleting your Studio data deletes copies already processed by a provider under its own retention rules." },
    ] },
    { heading: "Who can see your content", blocks: [
      { type: "paragraph", text: "Your projects, scripts, library and renders are private to your account. Another account cannot see them, even if it uploads identical files, and does not gain your rights to an asset that way." },
      { type: "paragraph", text: "To run the pilot, the operator sees for each pilot account: your name and email from Google, your invitation, pilot start and end dates, when you last used Studio, counts of your projects, renders, failures (as error codes), waiting times and AI use, the feedback you send and the support time recorded. This overview does not include your videos, clips, transcripts, scripts, project names or Copilot conversations." },
      { type: "paragraph", text: "Studio is not end-to-end encrypted: the operator runs its servers and can technically access content stored there. Operator tools are restricted and their use is recorded. We access your content only to provide the service, to handle a support request you make, or when needed for security or legal reasons." },
    ] },
    { heading: "Retention", blocks: [
      { type: "list", items: [
        "Your content is kept until you delete it or your account.",
        "Upload sessions expire after 24 hours, and unfinished uploads are removed after 48 hours.",
        "The project activity feed keeps 30 days. Feedback is deleted after 90 days and is not included in backups. Operator audit records are kept for 90 days.",
        "Records of invitation and reminder emails are kept for 30 days. An invitation that is never used is deleted 30 days after it expires or is revoked. Your invitation, pilot dates and recorded support time are kept until your account is deleted.",
        "Expired sign-in sessions are removed a day after they expire.",
        "Encrypted backups are made daily and kept for at most 7 days.",
      ] },
      { type: "paragraph", text: "When your free pilot ends, Studio stops taking new uploads, edits, renders and AI requests for your account, and you can still sign in to watch, download and export your data or delete your account. Your content is not silently erased; the terms of service explain the notice we give before closing an account." },
    ] },
    { heading: "Exporting and deleting your data", blocks: [
      { type: "paragraph", text: "Settings → Data & deletion lets you download your account's project, script, library, render and AI metadata as a JSON file. Original media and finished videos download separately from the app." },
      { type: "paragraph", text: "You can delete a single project, or your whole account in Settings → Data & deletion by typing DELETE ACCOUNT. Deletion ends every session, cancels uploads and active renders and ends access to projects, scripts, discussion and private assets at once. Files are then removed from storage after at least 125 seconds, with retries; links already issued may work for up to 120 seconds. Copies you already downloaded stay with you." },
      { type: "paragraph", text: "Deletion does not rewrite existing backups. They expire within 7 days, and if a backup is restored before then, deletions are applied again first. A deleted-account identifier, minimal deletion records and minimal usage counters remain, so that a restore cannot bring back deleted data and usage caps cannot be reset. They contain no media, transcripts, scripts or discussion." },
    ] },
    { heading: "Security", blocks: [
      { type: "paragraph", text: "Connections to Studio use HTTPS. Uploaded files are scanned for malware and inspected in isolation before use. Backups are encrypted, and the key that decrypts them is not held by the backup service. No service is perfectly secure; tell us promptly at the address above if you believe your account has been compromised." },
    ] },
    { heading: "Age", blocks: [
      { type: "paragraph", text: "Studio is intended for people aged 18 or older and is not directed to children." },
    ] },
    { heading: "Your requests and changes", blocks: [
      { type: "paragraph", text: "For questions about your information or a request for access, correction or deletion, email the privacy contact above. We may need to verify that the request concerns your account. Your rights may depend on the laws that apply to you. Do not send passwords, session cookies, sign-in codes or download links." },
      { type: "paragraph", text: "We will identify revisions with an updated date and tell affected users about material changes before they apply where practical." },
    ] },
  ],
};

// New pilot terms, adapted from the approved ADE pilot terms; the ADE owner
// decisions apply (Daniel, 2026-10-07). Per-person free period, reminder and
// extension added at Daniel's request on 2026-10-08 (Studio TTS-47).
export const trickticStudioTermsOfUse: AppDocument = {
  slug: "tricktic-studio",
  appName: "TrickTic Studio",
  title: "TrickTic Studio Terms of Service",
  lastUpdated: "Last updated: October 8, 2026",
  description: "Terms for the invitation-only TrickTic Studio hosted pilot.",
  intro: [{ type: "paragraph", text: "These terms apply to the invitation-only TrickTic Studio hosted service at studio.tricktic.com, operated by TrickTic (Daniel Shedrinsky). Please read them before accepting an invitation or using the service. By using the service, you agree to these terms. If you do not agree, do not use the service." }],
  sections: [
    { heading: "1. The service", blocks: [
      { type: "paragraph", text: "TrickTic Studio turns pre-cut spoken clips into finished downloadable videos, with transcription, captions, scripts, a private asset library and AI features such as the Copilot assistant. Supported formats, upload and storage limits, render queues and Copilot usage caps are shown in the app and may change during the pilot. Studio is not a backup or archive service; keep your own copies of your source files and finished videos." },
    ] },
    { heading: "2. Your account", blocks: [
      { type: "paragraph", text: "You must be at least 18 years old and have the legal capacity and any permission needed to use the service. If you act for an organization, you must have authority to do so. Sign in with the Google identity your invitation was sent to, keep your access private, and tell us promptly if you believe your account has been compromised." },
    ] },
    { heading: "3. Free pilot and future pricing", blocks: [
      { type: "paragraph", text: "The initial pilot is limited to five invited customers and is free for at least 30 days from each customer's activation, which is the first sign-in. Your invitation states the free period, the app shows the days left, and we email you a reminder before it ends. We may extend it. No payment method is required, and the pilot does not automatically turn into a paid subscription or generate an automatic charge." },
      { type: "paragraph", text: "At the end of the pilot we will tell you whether hosted access will continue, change or end. Any paid offer will state its price and terms separately and require your agreement before a charge." },
      { type: "paragraph", text: "If your hosted access does not continue after the pilot, you can no longer create or render, but you can still export, download and delete your data. We will give you at least 30 days' notice before deleting your account. After the notice period we delete it in the same way as a deletion request, as described in the privacy policy." },
    ] },
    { heading: "4. Your content and our permission to process it", blocks: [
      { type: "paragraph", text: "These terms do not transfer ownership of your clips, recordings, scripts, library assets, renders or other content to TrickTic, and we claim no ownership of the videos you make. You permit us and the service providers described in the privacy policy to host, copy, transcribe, transform, render, transmit and otherwise process your content as necessary to operate the features you request, maintain the service and carry out your support or deletion requests. This permission does not give us a right to sell, publish or advertise with your content." },
      { type: "linked-paragraph", parts: ["The service is not end-to-end encrypted against its operator. Data handling, retention, providers and deletion are described in the ", { text: "TrickTic Studio privacy policy", href: "https://legal.tricktic.com/tricktic-studio/privacy" }, "."] },
    ] },
    { heading: "5. Rights to what you upload", blocks: [
      { type: "paragraph", text: "You must own or have permission to use everything you upload or include in a video, including footage, voices and likenesses of the people in it, music, fonts, logos and other branding. A rights receipt you attach to a library asset is your own statement of that permission; TrickTic does not verify it and does not grant any licence to third-party material." },
      { type: "paragraph", text: "You are responsible for the videos you make and for where you publish them, including compliance with the rules of the platforms you post to." },
    ] },
    { heading: "6. AI features and generated output", blocks: [
      { type: "paragraph", text: "Copilot suggestions, scripts, hooks, captions, transcripts, editing plans and other automatically generated output may be inaccurate, incomplete or inappropriate for your purpose. Review it before you rely on or publish it. AI requests are processed by the providers described in the privacy policy and are subject to usage caps." },
    ] },
    { heading: "7. Acceptable use", blocks: [
      { type: "list", items: [
        "Do not use the service for unlawful activity or to infringe another person's rights, including copyright, trademark, privacy and publicity rights.",
        "Do not upload or create content that sexually exploits minors, depicts someone in intimate content without consent, harasses or threatens people, or is designed to deceive people about who is speaking.",
        "Do not upload malware, try to access another customer's data, bypass authentication or usage limits, or deliberately disrupt the service.",
        "Do not share or resell account access without our agreement.",
        "Report a suspected vulnerability privately to contact@tricktic.com. Do not access other users' data or disrupt their work to demonstrate it.",
      ] },
      { type: "paragraph", text: "If we receive a credible complaint that content in your account infringes someone's rights or breaks these terms, we may restrict that content and will tell you where practical." },
    ] },
    { heading: "8. Availability, changes and suspension", blocks: [
      { type: "paragraph", text: "This is an early pilot. Features and limits may change, and outages, failed uploads or renders and errors can occur. We do not offer an uptime or turnaround guarantee for the free pilot. We may limit or suspend access when reasonably necessary to address misuse, security risks, legal obligations or operational failures. Where practical, we will explain the reason and give notice of a planned material change or discontinuation; urgent security or legal action may require immediate restrictions." },
    ] },
    { heading: "9. No warranty and limitation of liability", blocks: [
      { type: "paragraph", text: "The pilot is provided free of charge, “as is” and “as available”, without any warranty that it will be uninterrupted, error-free, secure or suitable for a particular purpose." },
      { type: "paragraph", text: "To the fullest extent permitted by applicable law, TrickTic and Daniel Shedrinsky are not liable for any loss or damage arising from your use of, or inability to use, the service. This includes lost or changed files, projects or videos; inaccurate transcripts, captions or Copilot output; claims about content you upload or publish; outages, errors or failed renders; third-party services; and lost profits or any indirect, incidental or consequential damage. You are responsible for keeping copies of your files and for the content you upload and publish." },
      { type: "paragraph", text: "Nothing in these terms excludes liability that cannot lawfully be excluded, such as liability for fraud, intentional harm or gross negligence, or for death or personal injury caused by negligence, or takes away mandatory consumer rights or remedies." },
    ] },
    { heading: "10. Leaving the service and deleting your account", blocks: [
      { type: "paragraph", text: "You can stop using the service at any time and delete your account in Settings → Data & deletion. Export your metadata and download any media or videos you want to keep first. The privacy policy explains which data is removed, which minimal records remain and how existing backups expire. Copies you already downloaded or published are not affected." },
    ] },
    { heading: "11. Changes to these terms", blocks: [
      { type: "paragraph", text: "We will identify revisions with an updated date and notify affected users of material changes before they apply where practical and as required by law. Changes do not retrospectively authorize new uses of previously collected information or introduce charges without agreement. If you do not accept a material change, you can stop using the service and delete your account. Mandatory rights continue to apply." },
    ] },
    { heading: "12. Governing law, contact and disputes", blocks: [
      { type: "paragraph", text: "These terms are governed by the laws of the State of Israel. If you use the service as a consumer, this does not take away the protection of mandatory laws of the country where you live, and you may bring a claim in any court available to you under those laws." },
      { type: "email", label: "For support, a concern about these terms or a dispute, contact:", address: "contact@tricktic.com" },
      { type: "paragraph", text: "We will consider concerns in good faith. Contacting us does not limit your right to approach a competent court, consumer authority or other legally available dispute-resolution body, and these terms do not shorten statutory time limits." },
    ] },
  ],
};
