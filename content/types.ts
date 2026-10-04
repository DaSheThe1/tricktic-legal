// Content model for standalone legal documents that belong to a SHIPPED APP
// (Play Store / App Store) or to a PLATFORM INTEGRATION we submit for review,
// not to this marketing site.
//
// These documents are compliance artifacts: their wording is matched
// clause-by-clause against a store data-safety declaration or a platform's
// developer submission, so the strings in `src/content/app-legal/*` are
// verbatim legal text. Rephrasing one — even to "improve" it — can create a
// policy mismatch. Change the app's declared behavior first, then the document,
// then the store listing or developer console.
//
// Blocks are deliberately a tiny closed union rather than raw HTML: it keeps
// the text as plain data (greppable, diffable, impossible to smuggle markup
// or a tracking pixel into) while the renderer owns all presentation.

export type LegalBlock =
  | { type: "paragraph"; text: string }
  /** A paragraph of the form `<label> <address>`, where the address is a mailto link. */
  | { type: "email"; label: string; address: string }
  /** An unordered list. Each item is one plain sentence or clause. */
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

/**
 * A standalone legal document rendered by `AppLegalDocument`. Everything the
 * renderer needs lives here; where the document is *served* is the route's
 * concern, not the content's.
 */
export type LegalDocument = {
  /** Document <h1>, e.g. "TrickTic Timer Privacy Policy". */
  title: string;
  /** Rendered verbatim, e.g. "Last updated: July 27, 2026". Bump ONLY when the text changes. */
  lastUpdated: string;
  /** Meta description. Must not assert anything the body does not — reuse a body sentence. */
  description: string;
  /** Blocks shown before the first section heading. */
  intro: LegalBlock[];
  sections: LegalSection[];
};

/**
 * A legal document for an app we ship to a store. These are registry-driven and
 * served at `/legal/<slug>/<document>`; see `src/content/app-legal/index.ts`.
 */
export type AppDocument = LegalDocument & {
  /** URL segment: /legal/<slug>/... Permanent — it is typed into the store listing. */
  slug: string;
  /** Human name of the app, used for the document title and page metadata. */
  appName: string;
};

/** A privacy policy, served at `/legal/<slug>/privacy`. */
export type AppPrivacyPolicy = AppDocument;
