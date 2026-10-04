import type { LegalDocument } from "./types";

// Legal documents for the TrickTic Automation TikTok integration, submitted to
// TikTok for Content Posting API review. Served at:
//
//   /legal/tiktok-privacy   (Privacy Policy URL in the developer console)
//   /legal/tiktok-terms     (Terms of Service URL in the developer console)
//
// THE URLS ARE A PUBLISHED CONTRACT. Both are typed into the TikTok developer
// app submission and read by a human reviewer, so they must keep resolving. If
// these routes ever move, leave a redirect behind.
//
// Unlike the Play Store policies in this directory, these two pages are
// `noindex` on purpose (see the route files): they describe a private internal
// tool with no public audience, so there is nothing to gain from indexing them.
// They are still fully public — 200 on a cold anonymous request, no auth, no
// redirect, no JS gate — because a reviewer may fetch them with a plain client.
//
// EVERY FACTUAL CLAIM BELOW MUST MATCH WHAT THE INTEGRATION ACTUALLY DOES and
// what is declared in the TikTok developer console. Two clauses in particular
// are live commitments, not boilerplate:
//
//  1. "never publishes publicly" — uploads go to the account inbox as DRAFTS.
//     If the integration ever calls a direct-post endpoint, this text is wrong.
//  2. "no third-party or customer content" — true while the operator uploads
//     only their own videos. If client content is ever run through the same
//     app, this text is wrong and must change before that ships.

const CONTACT_EMAIL = "contact@tricktic.com";

// Bump both documents together only when their text actually changes.
const LAST_UPDATED = "Last updated: September 9, 2026";

export const tiktokPrivacyPolicy: LegalDocument = {
  title: "TikTok Integration Privacy Policy",
  lastUpdated: LAST_UPDATED,
  description:
    "How the TrickTic Automation TikTok integration handles data. It is a private, single-operator internal automation tool.",
  intro: [
    {
      type: "paragraph",
      text: "This policy describes how the TrickTic Automation TikTok integration (the “integration”) handles data. The integration is operated by TrickTic Automation (Daniel Shedrinsky).",
    },
    {
      type: "paragraph",
      text: "The integration is a private, single-operator internal automation tool. It is not a public product and has no users other than the operator. It authorises exactly one TikTok account: the operator’s own.",
    },
  ],
  sections: [
    {
      heading: "Permissions requested",
      blocks: [
        {
          type: "table",
          head: ["Permission", "Why it is requested"],
          rows: [
            [
              "user.info.basic",
              "Read the authorising account’s basic profile (open ID, display name, avatar) to confirm which account is connected.",
            ],
            [
              "video.upload",
              "Upload a video file to that account’s TikTok inbox as a draft.",
            ],
          ],
        },
      ],
    },
    {
      heading: "Publishing behaviour",
      blocks: [
        {
          type: "paragraph",
          text: "Uploads are delivered to the TikTok inbox as drafts. The integration never publishes a video publicly. The operator reviews each draft and posts it manually in the TikTok app.",
        },
      ],
    },
    {
      heading: "Data received from TikTok and stored",
      blocks: [
        {
          type: "list",
          items: [
            "OAuth access and refresh tokens, encrypted at rest.",
            "The account’s open ID and display name.",
            "The upload identifier (publish_id) returned for each upload, kept as an audit record.",
          ],
        },
      ],
    },
    {
      heading: "Data sent to TikTok",
      blocks: [
        {
          type: "paragraph",
          text: "Only video files the operator produced themselves, and the caption text for them. No third-party or customer content is sent to TikTok.",
        },
      ],
    },
    {
      heading: "How the data is used",
      blocks: [
        {
          type: "paragraph",
          text: "The data is used solely to place drafts in the operator’s own TikTok account. It is not sold, not shared with any third party, and not used for advertising, profiling, or analytics.",
        },
      ],
    },
    {
      heading: "Retention",
      blocks: [
        {
          type: "paragraph",
          text: "Tokens are held until they are revoked or until they expire. Upload records are retained as an operational audit log and are deleted on request.",
        },
      ],
    },
    {
      heading: "Revoking access and deleting data",
      blocks: [
        {
          type: "paragraph",
          text: "Access can be revoked at any time in the TikTok app, under Profile → Settings and privacy → Security and permissions → Manage app permissions.",
        },
        {
          type: "paragraph",
          text: "To request deletion of stored data, email the address below.",
        },
      ],
    },
    {
      heading: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: "This policy may be updated. The current version is always the one published at this URL, and the “Last updated” date above reflects the most recent change.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [{ type: "email", label: "Email:", address: CONTACT_EMAIL }],
    },
  ],
};

export const tiktokTermsOfService: LegalDocument = {
  title: "TikTok Integration Terms of Service",
  lastUpdated: LAST_UPDATED,
  description:
    "The terms that apply to the TrickTic Automation TikTok integration, a private single-operator internal automation tool, under the laws of the State of Israel.",
  intro: [
    {
      type: "paragraph",
      text: "These terms apply to the TrickTic Automation TikTok integration. They are governed by the laws of the State of Israel.",
    },
  ],
  sections: [
    {
      heading: "1. Acceptance of these terms",
      blocks: [
        {
          type: "paragraph",
          text: "These terms of service (the “Terms”) apply to the access to and use of the TrickTic Automation TikTok integration (the “Service”), operated by TrickTic Automation (“TrickTic”, “we” or “us”). Using the Service constitutes acceptance of these Terms. If you do not agree to them, do not use the Service.",
        },
      ],
    },
    {
      heading: "2. Description of the Service",
      blocks: [
        {
          type: "paragraph",
          text: "The Service is a private, single-operator internal automation tool. It is not a public product and has no users other than the operator. It authorises exactly one TikTok account, the operator’s own.",
        },
        {
          type: "paragraph",
          text: "The Service uploads video files to that account’s TikTok inbox as drafts. It never publishes a video publicly. The operator reviews each draft and posts it manually in the TikTok app.",
        },
        {
          type: "paragraph",
          text: "No account registration, subscription, or public access is offered, and no service level is promised.",
        },
      ],
    },
    {
      heading: "3. Permitted use",
      blocks: [
        { type: "paragraph", text: "The operator agrees not to:" },
        {
          type: "list",
          items: [
            "use the Service to upload content the operator does not own or does not have the right to publish;",
            "use the Service to upload third-party or customer content;",
            "use the Service in breach of TikTok’s terms, developer policies, or API limits;",
            "use the Service for any unlawful purpose.",
          ],
        },
        {
          type: "paragraph",
          text: "Use of the Service is additionally subject to TikTok’s own terms and developer policies. Access may be withdrawn at any time by the authorising account or by TikTok.",
        },
      ],
    },
    {
      heading: "4. Intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: "The videos and captions uploaded through the Service are produced by the operator and remain the operator’s property. The Service’s own code and configuration are owned by TrickTic or licensed to it, and are protected by the Copyright Law, 5768-2007 and other applicable law.",
        },
        {
          type: "paragraph",
          text: "TikTok, its platform, and its trademarks belong to TikTok, and are referred to here only as its developer documentation permits.",
        },
      ],
    },
    {
      heading: "5. Disclaimer of warranties",
      blocks: [
        {
          type: "paragraph",
          text: "The Service is provided “as is” and “as available”, without warranty of any kind, express or implied, to the fullest extent permitted by law. We do not warrant that the Service will operate uninterrupted, error-free, or free of harmful components, and we do not warrant that TikTok’s API will remain available or unchanged.",
        },
      ],
    },
    {
      heading: "6. Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the fullest extent permitted by applicable law, TrickTic shall not be liable for any indirect, incidental, special, or consequential damage arising from the use of the Service or from any inability to use it. Nothing in these Terms limits liability that cannot be excluded under mandatory Israeli law.",
        },
      ],
    },
    {
      heading: "7. Governing law and jurisdiction",
      blocks: [
        {
          type: "paragraph",
          text: "These Terms are governed by and construed in accordance with the laws of the State of Israel, without regard to its conflict of law rules. The competent courts of the Tel Aviv-Yafo district shall have exclusive jurisdiction over any dispute arising from or relating to the Service or to these Terms.",
        },
      ],
    },
    {
      heading: "8. Changes to these terms",
      blocks: [
        {
          type: "paragraph",
          text: "We may amend these Terms from time to time. The current version will always appear at this URL, and the “Last updated” date above reflects the most recent change. Continued use of the Service after a change constitutes acceptance of the amended Terms.",
        },
      ],
    },
    {
      heading: "9. Contact",
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
