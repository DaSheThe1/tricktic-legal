import { SITE_ORIGIN, canonicalUrl, documentPages, legacyUrl } from "../src/site.ts";

// Checks the LIVE site after go-live: `pnpm check:live`. Not part of the
// pre-push gate, because it depends on DNS, GitHub Pages and Cloudflare.
//
// For every document it checks that:
//  - https://legal.tricktic.com/<path> answers 200 with text/html, carries no
//    script and no Cloudflare analytics beacon, declares itself canonical and
//    has the right robots policy;
//  - the response did not pass through Cloudflare's proxy (legal.tricktic.com
//    must be DNS only, or Cloudflare injects its beacon);
//  - the old https://tricktic.com/automation/legal/<path> answers a single 301
//    straight to the new URL.

type Check = { ok: boolean; label: string; detail?: string };

const checks: Check[] = [];

function check(ok: boolean, label: string, detail?: string): void {
  checks.push({ ok, label, detail });
}

async function get(url: string): Promise<{ status: number; headers: Headers; body: string }> {
  const response = await fetch(url, {
    redirect: "manual",
    headers: { "user-agent": "tricktic-legal check-live" },
  });
  return { status: response.status, headers: response.headers, body: await response.text() };
}

for (const page of documentPages) {
  const url = canonicalUrl(page.path);
  const live = await get(url);
  const robots = page.indexable ? "index, follow" : "noindex, nofollow";

  check(live.status === 200, `${url} answers 200`, `got ${live.status}`);
  check(
    (live.headers.get("content-type") ?? "").startsWith("text/html"),
    `${url} is text/html`,
    `got ${live.headers.get("content-type")}`
  );
  check(
    !/cloudflareinsights|beacon\.min\.js/i.test(live.body),
    `${url} carries no Cloudflare analytics beacon`
  );
  check(!/<script\b/i.test(live.body), `${url} has no script`);
  check(
    !live.headers.has("cf-ray"),
    `${url} is not proxied by Cloudflare (DNS only)`,
    "cf-ray header present: set legal.tricktic.com to DNS only"
  );
  check(
    live.body.includes(`<link rel="canonical" href="${url}">`),
    `${url} declares itself canonical`
  );
  check(
    live.body.includes(`<meta name="robots" content="${robots}">`),
    `${url} is ${robots}`
  );

  const old = legacyUrl(page.path);
  if (!old) continue;
  const moved = await get(old);
  const location = moved.headers.get("location");
  check(
    moved.status === 301 && location === url,
    `${old} answers 301 to ${url}`,
    `got ${moved.status} -> ${location}`
  );
}

const index = await get(`${SITE_ORIGIN}/`);
check(index.status === 200, `${SITE_ORIGIN}/ answers 200`, `got ${index.status}`);

const missing = await get(`${SITE_ORIGIN}/not-an-app/privacy`);
check(missing.status === 404, `${SITE_ORIGIN}/not-an-app/privacy answers 404`, `got ${missing.status}`);

const firstPath = documentPages[0].path;
const withQuery = await get(`${legacyUrl(firstPath)}?source=check-live`);
check(
  withQuery.headers.get("location") === `${canonicalUrl(firstPath)}?source=check-live`,
  "the redirect keeps the query string",
  `got ${withQuery.headers.get("location")}`
);

for (const { ok, label, detail } of checks) {
  console.log(`${ok ? "ok  " : "FAIL"} ${label}${ok || !detail ? "" : ` (${detail})`}`);
}

const failed = checks.filter((entry) => !entry.ok).length;
console.log(failed === 0 ? `\nAll ${checks.length} live checks passed.` : `\n${failed} of ${checks.length} live checks failed.`);
process.exit(failed === 0 ? 0 : 1);
