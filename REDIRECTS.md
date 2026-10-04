# Redirects from the old addresses

The app legal documents used to be served by automations-website under
`https://tricktic.com/automation/legal/`. They now live on
`https://legal.tricktic.com` (this repo, GitHub Pages). Every old URL answers
one permanent redirect (301) straight to its new URL, so store listings, the
TikTok developer console and app builds that still carry an old URL keep
working. Keep the redirect forever.

| Old URL | New URL |
| --- | --- |
| https://tricktic.com/automation/legal/tricktic-timer/privacy | https://legal.tricktic.com/tricktic-timer/privacy |
| https://tricktic.com/automation/legal/tricktic-dictate/privacy | https://legal.tricktic.com/tricktic-dictate/privacy |
| https://tricktic.com/automation/legal/tricktic-dictate/terms | https://legal.tricktic.com/tricktic-dictate/terms |
| https://tricktic.com/automation/legal/tricktic-dictate/security | https://legal.tricktic.com/tricktic-dictate/security |
| https://tricktic.com/automation/legal/tiktok-privacy | https://legal.tricktic.com/tiktok-privacy |
| https://tricktic.com/automation/legal/tiktok-terms | https://legal.tricktic.com/tiktok-terms |

`test/site.test.ts` fails if one of these moved URLs drops out of the
registry or out of this table. A document added later lives only at its
legal.tricktic.com URL; the wildcard rule below would still send an
`/automation/legal/...` form of it to the same place.

## The Cloudflare rule

Cloudflare dashboard → `tricktic.com` zone → Rules → Redirect Rules → Create
rule → Single Redirect:

- **Rule name:** `Legal documents moved to legal.tricktic.com`
- **If incoming requests match:** Wildcard pattern
  - **Request URL:** `https://tricktic.com/automation/legal/*`
- **Then:**
  - **Target URL:** `https://legal.tricktic.com/${1}`
  - **Status code:** `301`
  - **Preserve query string:** on

`${1}` is everything after `/automation/legal/`, so the mapping is one to one
and a new document needs no rule change. The rule runs at Cloudflare's edge,
before the request reaches the VPS, so the old URLs keep redirecting while the
VPS is down or redeploying.

Notes:

- **Plain `http://` requests.** On 2026-10-05, `http://tricktic.com/...`
  answered Cloudflare error 522 for every path ("Always Use HTTPS" off, origin
  port 80 unreachable). The rule above matches `https://` only. To also catch
  an old URL typed with `http://`, use the pattern
  `*://tricktic.com/automation/legal/*` with the target
  `https://legal.tricktic.com/${2}`, or turn on Always Use HTTPS for the zone.
- **Trailing slashes.** The published URLs have none. An old URL typed with a
  trailing slash lands on the new URL with a trailing slash, which GitHub
  Pages answers with 404.

## After the rule is live

1. Run `pnpm check:live`. It checks every new URL and that every old URL
   answers a single 301 to it.
2. Update the URLs where they are configured, at your own pace:
   - Play Console: the TrickTic Timer and TrickTic Dictate privacy policy URLs.
   - TikTok developer console: the privacy policy and terms of service URLs.
   - TrickTic Dictate: the compiled `LegalLinks` in the Metrix Writer repo
     (privacy and terms).
3. The Dictate documents' own text names the old address twice: the privacy
   policy points to the security policy, and the security policy points to
   the privacy policy, both at
   `https://tricktic.com/automation/legal/tricktic-dictate/...`. That text is
   verbatim legal text, so it changes only with the next real revision of
   those documents. The redirect covers it until then.
4. automations-website can then drop its `/legal` routes; the Cloudflare rule
   answers before a request reaches the app.
