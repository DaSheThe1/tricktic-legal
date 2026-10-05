# tricktic-legal

The legal documents for TrickTic's apps and platform integrations, served as
a static site at **https://legal.tricktic.com** by GitHub Pages.

| Document | URL |
| --- | --- |
| TrickTic Timer privacy policy | https://legal.tricktic.com/tricktic-timer/privacy |
| TrickTic Dictate privacy policy | https://legal.tricktic.com/tricktic-dictate/privacy |
| TrickTic Dictate terms of use | https://legal.tricktic.com/tricktic-dictate/terms |
| TrickTic Dictate security policy | https://legal.tricktic.com/tricktic-dictate/security |
| TikTok integration privacy policy | https://legal.tricktic.com/tiktok-privacy |
| TikTok integration terms of service | https://legal.tricktic.com/tiktok-terms |

These used to live at `https://tricktic.com/automation/legal/...`. Each old
URL redirects to its new one with a single 301; see [REDIRECTS.md](REDIRECTS.md).

The pages are plain HTML with an inline stylesheet: no scripts, fonts, images,
analytics or other external resources, in light and dark. Rules for editing
them are in [AGENTS.md](AGENTS.md).

## Build and check

Node 24 or newer runs the TypeScript directly; there are no dependencies.

```bash
pnpm build        # content/ -> docs/ (commit the result)
pnpm check        # docs/ matches a fresh build, then every test
pnpm serve        # preview docs/ at http://127.0.0.1:4173/
pnpm check:live   # check the live site and the old URLs' redirects
```

Run `scripts/dev/install-git-hooks.sh` once per clone so every push runs
`pnpm check` first. There is no cloud CI.

## How it is served

GitHub Pages serves the `docs/` folder of `main` as-is (`docs/.nojekyll`
turns Jekyll off). It answers an extensionless path from the matching `.html`
file, so `/tricktic-timer/privacy` serves `docs/tricktic-timer/privacy.html`
with no redirect. `docs/CNAME` holds the custom domain, and unknown paths get
`docs/404.html` with status 404.

Repository settings: Settings → Pages → Build and deployment → Source "Deploy
from a branch", branch `main`, folder `/docs`. Custom domain
`legal.tricktic.com`, with "Enforce HTTPS" on.

## Go-live

Done on 2026-10-05:

1. **The repository:** public, under the TrickTicAI organization. That
   organization has verified `tricktic.com` for GitHub Pages, so only its
   repositories can publish on `tricktic.com` and its subdomains.
2. **Settings → Pages:** deploy from branch `main`, folder `/docs`, with the
   custom domain `legal.tricktic.com` and "Enforce HTTPS" on.
3. **Cloudflare DNS:** `CNAME legal → trickticai.github.io`, **DNS only**
   (grey cloud), and it stays that way. Proxied, Cloudflare would inject its
   analytics beacon into pages that state the apps have no tracking, and
   GitHub's certificate renewals would fail.
4. **tricktic-infra:** `legal` is `live` in `sites.json`, so every old
   address redirects here.
5. **`pnpm check:live`** passes.

Still to do, at Daniel's pace, is pointing these at the new URLs:
- Play Console: the TrickTic Timer and TrickTic Dictate privacy policy URLs.
- TikTok developer console: the privacy policy and terms of service URLs.
- TrickTic Dictate's compiled `LegalLinks` (the Dictate app's source).
