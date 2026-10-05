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
legal.tricktic.com URL; the redirect below would still send an
`/automation/legal/...` form of it to the same place.

## Where the redirect lives

tricktic.com's nginx answers it, configured in the tricktic-infra repo
(`sites.json`, entry `legal`). While that entry's status is `live`, every
`https://tricktic.com/automation/legal/<path>` answers
`301 https://legal.tricktic.com/<path>` with the query string kept. The
mapping is one to one, so a new document needs no change there. Turning it on
or off is a tricktic-infra edge deploy (its `docs/cutover.md`, step 3).

Notes:

- **Plain `http://` requests.** On 2026-10-05, `http://tricktic.com/...`
  answered Cloudflare error 522 for every path ("Always Use HTTPS" off). An
  old URL typed with `http://` reaches the redirect only once Always Use HTTPS
  is on for the zone.
- **Trailing slashes.** The published URLs have none. The redirect drops a
  trailing slash from an old URL (automations-website used to answer those
  with its own redirect), so `/automation/legal/tiktok-privacy/` still lands
  on `https://legal.tricktic.com/tiktok-privacy`. A new URL typed with a
  trailing slash gets GitHub Pages' 404.

## After the redirect is live

1. Run `pnpm check:live`. It checks every new URL and that every old URL
   answers a single 301 to it.
2. Update the URLs where they are configured, at your own pace:
   - Play Console: the TrickTic Timer and TrickTic Dictate privacy policy URLs.
   - TikTok developer console: the privacy policy and terms of service URLs.
   - TrickTic Dictate: the compiled `LegalLinks` in the Dictate app's source
     (privacy and terms).
3. The Dictate documents' own text names the old address twice: the privacy
   policy points to the security policy, and the security policy points to
   the privacy policy, both at
   `https://tricktic.com/automation/legal/tricktic-dictate/...`. That text is
   verbatim legal text, so it changes only with the next real revision of
   those documents. The redirect covers it until then.
4. automations-website can then drop its `/legal` routes; nginx redirects
   before a request reaches the app.
