import type { AppDocument } from "./types";

// Published from the client privacy information and pilot terms Daniel approved
// on 2026-10-05 (TrickTic-CRM repository, docs/pilot/client/{privacy,terms}.md,
// with the owner choices in docs/pilot/decisions.md). Owner changes on
// 2026-10-07: providers are described by role, not name, except Google, as on
// the Studio page; the terms gain the approved Studio age, warranty, liability
// and governing-law clauses. Support stays support@tricktic.com, the CRM's
// chosen contact; CRM has no store listing.
export const trickticCrmPrivacyPolicy: AppDocument = {
  slug: "tricktic-crm",
  appName: "TrickTic-CRM",
  title: "TrickTic-CRM Privacy Policy",
  lastUpdated: "Effective: October 7, 2026",
  description: "What TrickTic-CRM stores, who processes it, how long it is kept and how to export or delete it.",
  intro: [
    { type: "linked-paragraph", parts: ["Effective 2026-10-07. Provider: TrickTic, operated by Daniel Shedrinsky. Questions or requests: ", { text: "support@tricktic.com", href: "mailto:support@tricktic.com" }, "."] },
    { type: "paragraph", text: "This policy covers TrickTic-CRM at crm.tricktic.com, an inbox for the leads that businesses receive from their landing pages. Access is by invitation." },
  ],
  sections: [
    { heading: "Who is responsible", blocks: [
      { type: "paragraph", text: "Your business decides which leads to collect and what to do with them. TrickTic runs TrickTic-CRM for you and processes lead data to provide the service." },
      { type: "paragraph", text: "Your landing page needs its own privacy notice for visitors. It should say that form submissions go to your business and its service providers." },
    ] },
    { heading: "What CRM stores", blocks: [
      { type: "table", head: ["Data", "Where it comes from"], rows: [
        ["Lead details: name, phone, email, message, requested service, preferred time", "Your connected forms and integrations, manual entry or a CSV file you import"],
        ["Source of each submission: site, page, form, time submitted, campaign (UTM) fields if your page sends them", "The sending site or the channel used"],
        ["Your work on leads: stages, notes, follow-ups, contact confirmations, outcomes and amounts you declare", "You"],
        ["Your login: the email address and account identifier Google returns", "Google sign-in"],
        ["History and audit records of changes, exports and deletions", "CRM"],
      ] },
      { type: "paragraph", text: "CRM does not store card or payment details and does not send messages to your leads. CRM's features do not use AI to read, sort or score your leads." },
    ] },
    { heading: "Who else processes data", blocks: [
      { type: "table", head: ["Service", "Role", "What it receives"], rows: [
        ["A hosting provider", "Hosts the CRM server and database", "All CRM data, on a server dedicated to CRM"],
        ["A network provider", "Network protection and HTTPS for crm.tricktic.com", "Traffic to CRM, including submitted forms in transit"],
        ["Google", "Sign-in only, with the openid and email permissions", "Your sign-in. CRM gets no access to your Gmail, Drive or contacts"],
        ["An email delivery provider", "Sends your new-lead and follow-up emails", "Your email address and a short notice with a lead number and a link. Not the lead's contact details or message. Open and click tracking are off"],
        ["Encrypted backups on a separate TrickTic-operated server", "Recovery", "Database copies, encrypted before they leave the CRM server"],
        ["Integration services used to deliver submissions", "Pass form submissions from your landing page to CRM", "The form submission"],
        ["AI tools from external providers", "Used by TrickTic when operating, maintaining, securing or supporting the service", "Lead data only where needed for those purposes, under the provider's confidentiality terms"],
      ] },
      { type: "paragraph", text: "Providers may change as the service develops, and they may process data outside your country. A current list is available from support." },
      { type: "paragraph", text: "Server logs keep request status and timing only, not form contents." },
    ] },
    { heading: "Access to your data", blocks: [
      { type: "paragraph", text: "Authorized TrickTic personnel and service providers may access lead data where necessary to operate, maintain, secure or support the service. Access is limited to what is needed for those purposes and is subject to confidentiality obligations." },
    ] },
    { heading: "How long data is kept", blocks: [
      { type: "table", head: ["Data", "Kept"], rows: [
        ["Leads and your work on them", "Until you delete them or your account is deleted"],
        ["After you delete a lead or your account", "Removed from the live database immediately"],
        ["Encrypted backups", "All copies for 48 hours, one a day for 14 days, one a week for 8 weeks. A deleted lead can stay inside older backups for up to about 8 weeks"],
        ["Restoring from a backup", "Deletions are applied again before anyone gets access, so deleted data does not come back"],
        ["Deletion record", "A record that a deletion happened is kept indefinitely, without names, phones or messages, so a restore or a repeated old submission cannot bring the lead back"],
        ["Your account after access ends", "You may request an export through support for 30 days, unless you request earlier deletion. After 30 days the account is deleted"],
      ] },
      { type: "paragraph", text: "Deleting data from CRM does not delete copies held in other systems, downloaded exports or previously delivered emails. Copies in systems you control must be deleted separately." },
    ] },
    { heading: "Exports and deletion", blocks: [
      { type: "paragraph", text: "In the app's privacy screen you can:" },
      { type: "list", items: [
        "download all your data (JSON) and your lead list (CSV),",
        "delete one lead (including leads merged into it),",
        "delete your whole account.",
      ] },
      { type: "paragraph", text: "Each deletion asks you to type a confirmation. If a lead asks you to see or delete their details, you can do it in the app, or ask support to help." },
    ] },
    { heading: "Security incidents", blocks: [
      { type: "paragraph", text: "We will notify you without undue delay after becoming aware of a security incident affecting your personal data, and no later than 72 hours after becoming aware. We will share the information available and provide further updates as our investigation progresses. Where applicable law requires earlier notification or reporting, we will comply with that requirement." },
    ] },
    { heading: "Contact", blocks: [
      { type: "email", label: "Questions or requests:", address: "support@tricktic.com" },
    ] },
  ],
};

export const trickticCrmTermsOfUse: AppDocument = {
  slug: "tricktic-crm",
  appName: "TrickTic-CRM",
  title: "TrickTic-CRM Pilot Terms",
  lastUpdated: "Effective: October 7, 2026",
  description: "Terms for the invitation-only TrickTic-CRM pilot: service scope, responsibilities, support and ending the pilot.",
  intro: [
    { type: "linked-paragraph", parts: ["Effective 2026-10-07. Provider: TrickTic, operated by Daniel Shedrinsky. Support: ", { text: "support@tricktic.com", href: "mailto:support@tricktic.com" }, "."] },
    { type: "paragraph", text: "These terms apply to the invitation-only TrickTic-CRM pilot at crm.tricktic.com." },
  ],
  sections: [
    { heading: "The service", blocks: [
      { type: "paragraph", text: "TrickTic-CRM is a Hebrew, phone-first inbox for your leads. During the pilot it includes:" },
      { type: "list", items: [
        "leads received from connected forms and integrations, manual entry and CSV import, each labelled with its source,",
        "stages, notes, history, follow-ups and the Today list,",
        "WhatsApp, phone and email links (opening a link does not record contact; you mark contact yourself),",
        "email notices for new leads and due follow-ups,",
        "paying-client outcomes and a report per source,",
        "export and deletion of your data.",
      ] },
      { type: "paragraph", text: "Not included: invoicing, payments, billing, sending messages to leads for you, Instagram, AI features, teams with several users, and public signup." },
    ] },
    { heading: "Price", blocks: [
      { type: "list", items: [
        "The pilot is free and has no fixed end date.",
        "If TrickTic introduces pricing, it tells you at least 30 days before. Nothing is charged without a separate written agreement.",
      ] },
    ] },
    { heading: "Availability and support", blocks: [
      { type: "list", items: [
        "The pilot is a test service without an uptime guarantee. TrickTic monitors CRM and its backups and responds to alerts during working hours (Sunday–Thursday), and on a best-effort basis at other times.",
        "Support: support@tricktic.com, answered within 7 working days.",
        "We will notify you without undue delay after becoming aware of a security incident affecting your personal data, and no later than 72 hours after becoming aware. We will share the information available and provide further updates as our investigation progresses. Where applicable law requires earlier notification or reporting, we will comply with that requirement.",
      ] },
    ] },
    { heading: "Your responsibilities", blocks: [
      { type: "list", items: [
        "Be at least 18 years old and have authority to act for the business that uses CRM.",
        "Collect leads lawfully and keep a privacy notice on your landing page.",
        "Import only data you are allowed to use.",
        "Keep your Google account secure and tell support if you think it is compromised.",
        "Contacting leads is your action. CRM does not contact anyone for you.",
      ] },
    ] },
    { heading: "TrickTic's responsibilities", blocks: [
      { type: "linked-paragraph", parts: ["TrickTic will use lead data only to provide the service, as described in the ", { text: "TrickTic-CRM privacy policy", href: "https://legal.tricktic.com/tricktic-crm/privacy" }, ". It will also:"] },
      { type: "list", items: [
        "keep your business's data separate from other businesses,",
        "keep encrypted backups and test restoring them,",
        "give you your data on request and delete it as described.",
      ] },
    ] },
    { heading: "Ending the pilot", blocks: [
      { type: "list", items: [
        "Either side can end the pilot at any time.",
        "Before access ends, you can export your data from the privacy screen.",
        "When access ends, TrickTic stops receiving leads for you and ends your sessions. After access ends, you may request an export through support for 30 days, unless you request earlier deletion. After 30 days your account is deleted.",
        "Deleting data from CRM does not delete copies held in other systems, downloaded exports or previously delivered emails. Copies in systems you control must be deleted separately.",
      ] },
    ] },
    { heading: "No warranty and limitation of liability", blocks: [
      { type: "paragraph", text: "The pilot is provided free of charge, “as is” and “as available”, without any warranty that it will be uninterrupted, error-free, secure or suitable for a particular purpose." },
      { type: "paragraph", text: "To the fullest extent permitted by applicable law, TrickTic and Daniel Shedrinsky are not liable for any loss or damage arising from your use of, or inability to use, the service. This includes lost, delayed or duplicated leads; missed follow-ups or email notices; outages or errors; third-party services, including the sites and integration services that send submissions; and lost profits, lost business or any indirect, incidental or consequential damage. You are responsible for how you contact and handle your leads." },
      { type: "paragraph", text: "Nothing in these terms excludes liability that cannot lawfully be excluded, such as liability for fraud, intentional harm or gross negligence, or for death or personal injury caused by negligence, or takes away mandatory consumer rights or remedies." },
    ] },
    { heading: "Changes", blocks: [
      { type: "paragraph", text: "TrickTic tells you about changes to these terms at least 30 days before they apply." },
    ] },
    { heading: "Governing law, contact and disputes", blocks: [
      { type: "paragraph", text: "These terms are governed by the laws of the State of Israel. If you use the service as a consumer, this does not take away the protection of mandatory laws of the country where you live, and you may bring a claim in any court available to you under those laws." },
      { type: "email", label: "For support, a concern about these terms or a dispute, contact:", address: "support@tricktic.com" },
      { type: "paragraph", text: "We will consider concerns in good faith. Contacting us does not limit your right to approach a competent court, consumer authority or other legally available dispute-resolution body, and these terms do not shorten statutory time limits." },
    ] },
  ],
};
