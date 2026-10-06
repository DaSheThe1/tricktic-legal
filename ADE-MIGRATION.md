# ADE privacy and pilot terms

Prepared 2026-10-06. **Not published.** Merging this repository's PR publishes
its generated `docs/` through GitHub Pages. Review the new terms before merge.

## Documents for review

- [Privacy policy](docs/tricktic-ade/privacy.html): existing approved ADE text,
  with its original effective date, moved into this site's static format.
- [Terms of Service](docs/tricktic-ade/terms.html): new terms for the free,
  invitation-only pilot. Source: [content/tricktic-ade.ts](content/tricktic-ade.ts).

The terms preserve the agreed five-customer, one-month-free pilot; no card,
subscription or automatic charge. They address authorized machine/account access,
agent actions, third-party costs, content ownership and limited processing
permission, reasonable suspension, availability, deletion and contact. These
pages do not prove acceptance recording or legal enforceability.

### Owner decisions (Daniel, in chat, 2026-10-06)

Already confirmed before this review: operator brand TrickTic and
contact@tricktic.com (privacy approval 2026-09-29); five invited users, free
for one month from activation, no card or automatic charge (remote-sessions
`docs/plans/hosted-ade-release.md`); 18+ intended audience (2026-09-30 Play
declaration). Source check: the hosted server calls only Google (sign-in,
notifications) and OpenAI (voice), matching the approved privacy provider list.

Decided on 2026-10-06:

- Operator named as **TrickTic (Daniel Shedrinsky)**; no postal address.
- Users must be **18 or older**.
- Pilot offer unchanged for now. A later switch to card payment or no free month
  needs a terms revision and notice; the terms already require separate
  agreement before any charge.
- If access does not continue after the pilot: **at least 30 days' notice**,
  then the hosted account is deleted like a normal deletion request.
- Notice of planned material changes or shutdown: **"where practical"**, no
  fixed number of days.
- Liability: excluded **to the fullest extent permitted by law**, including
  agent actions, lost files/data and indirect damage. Daniel asked that users
  not be able to blame him for anything; a blanket waiver cannot override
  non-waivable rights, so the carve-out for fraud, intentional harm, gross
  negligence, death/personal injury and mandatory consumer rights stays.
- **Israeli law** governs, without a forced court: consumers keep the
  mandatory protections and courts of their own country.

Final wording approval: pending Daniel's review of the rendered terms.

The mandatory-rights wording follows the principle that consumer contracts
cannot override non-waivable rights; see the European Commission's
[unfair contract terms guidance](https://commission.europa.eu/law/law-topic/consumer-protection-law/consumer-contract-law/unfair-contract-terms-directive_en).
No claim is made that every jurisdiction's requirements have been reviewed.

## Privacy provenance

Source: `DaSheThe1/remote-sessions`,
`docs/releases/android-play/public-pages/privacy.html` rendered with
`owner-inputs.approved.json` (owner approval 2026-09-29).
Verified against `https://ade.tricktic.com/privacy` on 2026-10-06. Public HTML
SHA-256: `f78bf3e5110fa019ad7ad63688697a663f0b74ecfea0360d96731d14639fec2b`.
The only source/live difference was HTML entity encoding of apostrophes.

The immutable public fixture in `test/fixtures/ade-privacy-20260929.html`
anchors paragraph/list/heading parity. Navigation and presentation change;
every policy clause, operational link and its effective date remain intact.
The existing Android/voice statements are preserved, not re-certified: this task
does not change Android, ADE-Mobile, store disclosures or underlying data flows.

## Ordered publication handoff

1. Review the terms and merge the qualified legal PR when publication is authorized.
2. Wait for anonymous HTTPS 200 on both canonical URLs, correct canonical tags,
   no scripts/analytics and DNS-only serving:
   `https://legal.tricktic.com/tricktic-ade/privacy` and
   `https://legal.tricktic.com/tricktic-ade/terms`.
3. Integrate the companion remote-sessions `agent/ade-legal-links` PR. It links
   both documents before public sign-in and in the account view, and prepares
   the reviewed origin redirect/configuration migration. It must not be
   deployed before step 2 or users would receive broken legal links.
4. The authorized pilot release owner updates the configured privacy URL to
   the canonical URL and activates the reviewed nginx include: `/privacy` 301s
   to the canonical privacy page; `/terms` and `/terms-of-service` 301 to terms.
   Support and `/account/delete` remain on ADE. Keep the old privacy file for
   rollback; do not delete operational account routes.
5. Run `pnpm check:live` after the ADE redirect is active, plus the companion
   public sign-in/account checks. Before that, its ADE legacy redirect check
   correctly fails; a branch build is not live migration evidence.

Any store-console URL change belongs to its product owner. Android in the
remote-sessions repository remains frozen. Existing Timer/Dictate/TikTok URLs,
clauses, dates, redirects and generated pages are unchanged.

ADE's application move from `/ade/` to `/` is separate: RS-RELEASE-70.

## Validation

`pnpm build` and `pnpm check`: 65 tests passed. Checks cover the full published
privacy-clause sequence, operating links, pilot promises, safe inline references,
all existing document contracts and generated-file freshness. Existing Timer,
Dictate and TikTok generated document files have no diff.
