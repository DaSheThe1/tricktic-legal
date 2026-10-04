# Agent playbook: tricktic-legal

## What this repo serves

Legal documents for the apps TrickTic ships and for the platform integrations
it submits for review, as a static site on GitHub Pages at
https://legal.tricktic.com. They moved here from automations-website
(`tricktic.com/automation/legal/...`), and every old URL 301s to its new one
(REDIRECTS.md). The marketing sites' own privacy, cookie and accessibility
pages are not here.

| Document | Path | Indexed |
| --- | --- | --- |
| TrickTic Timer privacy policy | `/tricktic-timer/privacy` | yes (Play Store) |
| TrickTic Dictate privacy policy, terms of use, security policy | `/tricktic-dictate/{privacy,terms,security}` | yes (Play Store) |
| TikTok integration privacy policy, terms of service | `/tiktok-privacy`, `/tiktok-terms` | no (`noindex`) |

## Rules: these are published contracts

- **URLs are permanent.** They are typed into the Play Console and the TikTok
  developer console and compiled into apps. Never rename or remove a path.
  `test/site.test.ts` lists the published ones by hand.
- **Text is verbatim.** It is matched clause by clause against store Data
  safety declarations, the apps' code and the TikTok developer console. Do not
  rephrase, add or drop a permission row, or bump `lastUpdated` unless the
  app's real behavior changed and the store form was updated to match.
- **The contact address equals the store listing's** (`contact@tricktic.com`).
  Not an alias, not a form. Google cross-checks the two.
- **Nothing that tracks or loads.** No scripts, analytics, fonts, images or
  embeds: the documents state the apps have no tracking. `legal.tricktic.com`
  stays **DNS only** in Cloudflare; proxied, Cloudflare injects its analytics
  beacon, and GitHub Pages cannot send the `no-transform` header that stops it.
- **200 on a cold anonymous request.** No auth, geo rules, cookie walls,
  interstitials, JavaScript gates or redirect chains. A reviewer may fetch a
  page with a plain HTTP client.
- **Indexing:** Play Store documents stay indexable. The TikTok documents are
  `noindex` through the robots meta tag. Never use robots.txt for either: a
  blocked URL can look broken to a reviewer.
- **Verbatim tests stay hardcoded.** Never make a test import the content
  module; that would make it tautological.

## Layout

- `content/`: the documents as plain data. `types.ts`, `tiktok.ts`,
  `tricktic-dictate.ts` and `tricktic-timer.ts` are byte-identical copies from
  automations-website, comments included, so paths in comments still name the
  old site. `index.ts` is the registry.
- `src/site.ts` lists every URL; `src/render.ts` writes the HTML;
  `src/build.ts` writes `docs/`.
- `docs/` is **generated and committed**. GitHub Pages serves it from `main`.
  Never edit it by hand: run `pnpm build`.
- `test/`: node:test checks. `scripts/check-live.ts`: the live check.

## Adding an app document

1. Add `content/<slug>.ts` exporting an `AppDocument` (copy an existing one).
2. List it in `content/index.ts` (`appPrivacyPolicies`, `appTermsOfUse` or
   `appSecurityPolicies`). Its page, metadata and index link follow from that.
3. Add a test with its key clauses as hardcoded strings.
4. `pnpm build`, then `pnpm check`. Commit the content and `docs/` together.
5. Once its URL is in a store listing or an app, add the path to the
   hand-written list in `test/site.test.ts`.

## Checking

- `pnpm check` runs the gate: `docs/` matches a fresh build, then every test.
  The pre-push hook runs the same thing. Install it once per clone:
  `scripts/dev/install-git-hooks.sh`.
- `pnpm serve` previews `docs/` locally, answering the way GitHub Pages does.
- `pnpm check:live` checks the live site, including the old URLs' redirects.
  Run it after go-live and after any DNS or Cloudflare change.
- Node 24+ runs the TypeScript directly. There is nothing to install.

## Workflow

Work on an `agent/<task>` branch and open a PR into `main`. No direct pushes
to `main` unless Daniel asks, no force-pushes to `main`. Merging publishes:
GitHub Pages serves `main`'s `docs/` a minute or two later. Every change to
what the site serves bumps `version` in `package.json` and gets a
`CHANGELOG.md` entry: PATCH for a fix, MINOR for a new document.
