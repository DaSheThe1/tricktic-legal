import {
  appDocumentPath,
  appPrivacyPolicies,
  appPrivacyPolicyPath,
  appSecurityPolicies,
  appTermsOfUse,
  tiktokPrivacyPolicy,
  tiktokTermsOfService,
} from "../content/index.ts";
import type { LegalDocument } from "../content/index.ts";
import { DICTATE_ACCOUNT_DELETION_PATH, trickticDictateAccountDeletion } from "../content/tricktic-dictate.ts";

// Every URL this site serves. GitHub Pages serves docs/ at
// https://legal.tricktic.com and answers an extensionless path from the
// matching .html file (/tricktic-timer/privacy -> tricktic-timer/privacy.html),
// so each old /automation/legal/<path> URL maps to exactly one new URL with a
// single 301 and no trailing-slash hop. See REDIRECTS.md.

/** Where GitHub Pages serves docs/. Canonical URLs are built from it. */
export const SITE_ORIGIN = "https://legal.tricktic.com";

/** Where these documents lived before. Each old URL 301s to its new one. */
export const LEGACY_PREFIX = "https://tricktic.com/automation/legal";

export type DocumentPage = {
  /**
   * Public path, e.g. "/tricktic-timer/privacy". PERMANENT: typed into a store
   * listing or a developer console and compiled into apps.
   */
  path: string;
  doc: LegalDocument;
  /**
   * false renders `noindex, nofollow`. The Play Store documents must stay
   * indexable; the TikTok documents describe a private tool and are noindex.
   */
  indexable: boolean;
  /** App name to list the document under on the index page, or null to leave it off. */
  listedUnder: string | null;
};

export const documentPages: readonly DocumentPage[] = [
  ...appPrivacyPolicies.map((doc) => ({
    path: appPrivacyPolicyPath(doc.slug),
    doc,
    indexable: true,
    listedUnder: doc.appName,
  })),
  ...appTermsOfUse.map((doc) => ({
    path: appDocumentPath(doc.slug, "terms"),
    doc,
    indexable: true,
    listedUnder: doc.appName,
  })),
  ...appSecurityPolicies.map((doc) => ({
    path: appDocumentPath(doc.slug, "security"),
    doc,
    indexable: true,
    listedUnder: doc.appName,
  })),
  // Store deletion resource: public and crawlable, but absent from the site index.
  { path: DICTATE_ACCOUNT_DELETION_PATH, doc: trickticDictateAccountDeletion, indexable: true, listedUnder: null },
  // Submitted to TikTok for Content Posting API review. Public (200 on a cold
  // anonymous request, no gate) but noindex, and kept off the index page.
  { path: "/tiktok-privacy", doc: tiktokPrivacyPolicy, indexable: false, listedUnder: null },
  { path: "/tiktok-terms", doc: tiktokTermsOfService, indexable: false, listedUnder: null },
];

export function canonicalUrl(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export function legacyUrl(path: string): string | null {
  if (path === DICTATE_ACCOUNT_DELETION_PATH) return null; // New page; no migrated URL.
  if (path === "/tricktic-ade/privacy") return "https://ade.tricktic.com/privacy";
  if (path.startsWith("/tricktic-ade/")) return null; // New terms have no previously published URL.
  if (path.startsWith("/tricktic-studio/")) return null; // New documents; never published elsewhere.
  if (path.startsWith("/tricktic-crm/")) return null; // New documents; never published elsewhere.
  return `${LEGACY_PREFIX}${path}`;
}

/** The file under docs/ that GitHub Pages serves for an extensionless path. */
export function outputFile(path: string): string {
  return `${path.slice(1)}.html`;
}
