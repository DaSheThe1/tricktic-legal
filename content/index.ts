import {
  trickticDictatePrivacyPolicy,
  trickticDictateSecurityPolicy,
  trickticDictateTermsOfUse,
} from "./tricktic-dictate.ts";
import { trickticTimerPrivacyPolicy } from "./tricktic-timer.ts";
import type { AppDocument, AppPrivacyPolicy } from "./types";

export type {
  AppDocument,
  AppPrivacyPolicy,
  LegalBlock,
  LegalDocument,
  LegalSection,
} from "./types";
export { tiktokPrivacyPolicy, tiktokTermsOfService } from "./tiktok.ts";

// Registry of app-store legal documents served at /<slug>/privacy on
// https://legal.tricktic.com (moved from tricktic.com/automation/legal/...).
//
// To publish another app's policy: add `content/<slug>.ts` and list it here.
// Nothing else changes: the page, its metadata and the index list all derive
// from this array (see src/site.ts). Then run `pnpm build` and commit docs/.
//
// These documents are listed on the legal site's index page only, never on a
// marketing site's nav or footer: they exist to be opened directly from a store
// listing. They are NOT hidden from crawlers. A store reviewer must be able to
// open the URL cold, so nothing here may add noindex, auth, or a redirect.
export const appPrivacyPolicies: readonly AppPrivacyPolicy[] = [
  trickticTimerPrivacyPolicy,
  trickticDictatePrivacyPolicy,
];

// Terms of use at /<slug>/terms and security policies at /<slug>/security.
// Same rules as the privacy registry: public, indexable, and the URL is
// permanent once an app links to it.
export const appTermsOfUse: readonly AppDocument[] = [trickticDictateTermsOfUse];
export const appSecurityPolicies: readonly AppDocument[] = [
  trickticDictateSecurityPolicy,
];

export function appPrivacyPolicySlugs(): string[] {
  return appPrivacyPolicies.map((policy) => policy.slug);
}

export function findAppPrivacyPolicy(
  slug: string
): AppPrivacyPolicy | undefined {
  return appPrivacyPolicies.find((policy) => policy.slug === slug);
}

/** Public path for an app's privacy policy on legal.tricktic.com. */
export function appPrivacyPolicyPath(slug: string): string {
  return `/${slug}/privacy`;
}

/** Public path for another app document on legal.tricktic.com. */
export function appDocumentPath(slug: string, document: "terms" | "security"): string {
  return `/${slug}/${document}`;
}

export function findAppDocument(
  registry: readonly AppDocument[],
  slug: string
): AppDocument | undefined {
  return registry.find((doc) => doc.slug === slug);
}
