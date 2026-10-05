# Changelog

All notable changes to what legal.tricktic.com serves. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the version is
`version` in `package.json`: PATCH for a fix, MINOR for a new document.

## [Unreleased]

- Docs: the old addresses are redirected by tricktic.com's nginx
  (tricktic-infra), not a Cloudflare rule. No change to the site.
- Live on legal.tricktic.com since 2026-10-05. The repository moved to the
  TrickTicAI organization, which has verified tricktic.com for GitHub Pages.

## [1.0.0] - 2026-10-05

### Added

- The TrickTic app legal documents as a static site for legal.tricktic.com,
  moved from tricktic.com/automation/legal with their text unchanged:
  - TrickTic Timer privacy policy
  - TrickTic Dictate privacy policy, terms of use and security policy
  - TikTok integration privacy policy and terms of service (not indexed)
- An index page listing the Timer and Dictate documents, and a 404 page.
- REDIRECTS.md: the old-to-new URL table and the Cloudflare rule that
  redirects the old addresses.
- Local checks before every push: verbatim text, no trackers or external
  resources, robots and canonical tags per page, and a fresh build. A live
  check (`pnpm check:live`) for after go-live.
