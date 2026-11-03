# Anchor Studio — Website & Code Review

_Reviewed 2026-10-14. Perspectives: entrepreneur, senior engineer, designer._
_Scope: live site (getanchorstudio.com) + full codebase (pages, components, AI layer, security, config)._

---

## 🔴 Fix first — actively costing money or credibility

### 1. `/api/generate` is unauthenticated when `GENERATE_API_KEY` is unset
**File:** `pages/api/generate.ts:49`
```ts
if (GENERATE_API_KEY && providedKey !== GENERATE_API_KEY) { ... }
```
If the env var is missing in production, the auth check is skipped entirely — anyone can generate unlimited **Sonnet** content on the Anthropic bill. **Fix:** fail closed — if the key is not configured, reject every request rather than allowing all.

### 2. Rate limiting does not work on serverless/Vercel
**File:** `lib/security.ts:4`
The limiter is an in-memory `Map`. On Vercel each invocation may be a fresh instance, so counters reset constantly and on every cold start. Combined with #1, the endpoints are effectively open to abuse. **Fix:** use a shared store (Upstash Redis / Vercel KV) or a managed WAF rate rule.

### 3. Homepage contradicts the documented pricing strategy
`CLAUDE.md` says prices moved to `/internal` and public pages should use "Book a call" CTAs. `/pricing` follows this, but `pages/index.tsx:244-267` renders `$400/mo` and `$900/mo` from `lib/config.ts:31`, while `COMPARE_ROWS` lists Anchor as "Custom — Book a Call." **Fix:** pick one strategy. Recommendation: show the founding-client prices (strong anchor, filters tire-kickers) — but stop the site arguing with itself.

### 4. Chatbot persona is stale — describes a business you no longer run
**File:** `lib/anthropic.ts:18-38`
`ANCHOR_STUDIO_SYSTEM` still sells "Content Package: 4 blog posts + 12 social captions" and targets "financial advisors, tutors, real estate agents." Site has repositioned to chess-first + education with Chess ($400) / Growth ($900) tiers. The highest-touch sales surface is off-message. **Fix:** rewrite the system prompt to match current positioning and tiers.

---

## 🧑‍💼 Entrepreneur lens

- **Meta title undercuts the repositioning.** `pages/index.tsx:25` reads "Done-for-You Content for Growing Businesses" — generic, and it's what Google/social previews show. Hero is sharply chess-positioned; the SEO-visible title is not. Rewrite `<title>` + OG tags to lead with chess.
- **You sell SEO but have no SEO infrastructure.** No `public/` directory exists — no `robots.txt`, `sitemap.xml`, OG share image, or favicon. For an agency whose Growth tier ranks clients for "[city] chess lessons," this is a credibility tell. Add them.
- **"National Master" claim is load-bearing.** Appears in hero stat, bio, service copy, bot persona. If verifiable, link the USCF profile — proof should be one click away. If aspirational, resolve before scaling spend.
- **Brand leak in CTA.** CTAs point to `calendly.com/nirajshriva` while the founder persona is "Nivaan." A branded slug (`/anchorstudio`) tightens polish and hides the real name.
- **Keep leaning on "cancel anytime / risk-free" and founder-led direct access** — genuinely differentiated vs agencies; copy already nails it.

## 🛠️ Senior engineer lens

- **`coverage/` is committed to git** (19 tracked files, all currently showing as modified). Generated artifacts don't belong in version control. Add `coverage/` to `.gitignore` and `git rm -r --cached coverage/`.
- **Upgrade Sonnet model.** `lib/anthropic.ts:14` pins `claude-sonnet-4-6`. `claude-sonnet-5` is the current recommended Sonnet — near-Opus quality on long-form content, with introductory pricing ($2/$10 per MTok vs $3/$15) through 2026-08-31. Low-risk string swap, likely better output at lower cost. Haiku 4.5 for the chatbot is correct — leave it.
- **Chatbot "demo mode" silently masks outages.** `components/ChatBot.tsx:97-106` falls back to hardcoded responses + a "Running in demo mode" banner on any API error. A misconfigured key in prod serves fake answers with no signal. Add server-side logging/alerting; reconsider whether canned fallbacks are the right UX.
- **Dead parameter.** `setCorsHeaders` (`lib/security.ts:46`) accepts `allowedOrigins` but never uses it; origin comes from env. Drop the param.
- **`CLAUDE.md` is stale.** Says "No test suite exists yet," but there's a full Jest setup and `__tests__/` for components, lib, and API routes. Update it.
- **Sanitization is shallow** (`lib/security.ts:32`). Stripping `<>` + length cap is fine for the text-output chat surface but won't stop prompt injection into Claude calls. Low risk given the surface; add a comment noting the threat model.

## 🎨 Designer lens

Visual system is strong — ink/teal/warm palette, fluid serif display type (`clamp()`), chess-pattern hero with radial glow, scroll-reveal via `IntersectionObserver`. Reads premium, not templated. Refinements:

- **Hero credibility strip mixes units** (`index.tsx:62-66`): "72hrs / 15min / National Master" — two durations + one credential at the same `2rem` serif weight; the text item strains the three-column rhythm. Give the credential its own treatment (glyph + label).
- **Emoji icons undercut the refined type.** Services use 📈 📧; positioning uses 👤 🤖 🛡️. OS-rendered emoji are inconsistent cross-platform. Swap for a consistent SVG/icon set, or lean fully into chess glyphs (♟ ♛).
- **Verify keyboard focus styling site-wide.** The ChatBot has excellent a11y (aria-modal, aria-live, `focus:ring`); confirm the hero/nav links have visible focus to match that bar.
- **Section tone rhythm merges two blocks.** About/Founder and Positioning are both `bg-warm` back-to-back (`index.tsx:139,161`) and visually blend. Add a divider or alternate the tone.

---

## Suggested order of attack

1. Fail-close `/api/generate` auth + real rate limiting _(money + abuse)_
2. Update the chatbot system prompt to current positioning _(sales surface)_
3. Resolve the homepage-vs-`/pricing` price contradiction _(pick a strategy)_
4. Fix generic `<title>`/OG tags; add `public/` with robots, sitemap, favicon, OG image _(SEO you sell)_
5. `.gitignore` coverage/, update `CLAUDE.md`, bump Sonnet 4.6 → Sonnet 5
6. Design polish: credibility strip, icon consistency, section separation

> **Status (2026-11-03):** all six items above — plus the US Chess credibility work, Vercel Web Analytics, the Edison location fix, and the broken-Calendly-link fix — are shipped and live in production (PRs #1–#6).

---

# Production Review — 2026-11-03

_Reviewed the live production site end-to-end (every route, headers, redirects, meta, API, rendered UI) after PRs #1–#6 shipped. Perspectives: entrepreneur, senior engineer._

**Working well:** distinctive chess-first design; real US Chess credibility (feature + annotated sample + editor testimonial); working CTA → Calendly (`getanchorstudio`); live Claude chatbot; cookieless Vercel analytics; SEO basics (chess-first title/OG, og-image, robots, sitemap, favicon); HTTPS + HSTS; apex → www redirect; accessibility floor (focus-visible, reduced-motion).

## 🧑‍💼 Entrepreneur

1. **Only one, high-friction conversion path.** Everything funnels to "Book a call". Add a low-friction **email capture / lead magnet** (e.g. a chess-club newsletter template or 90-day content calendar) to capture the majority who aren't ready to book. _Biggest funnel gap._
2. **The content agency publishes no content.** Sells SEO/blogging but has no blog — credibility + ranking miss. Publish a few real posts (annotated games, "how a chess club runs its newsletter").
3. **Portfolio is mostly fictional.** 1 real sample (Girsh–Gao) vs 3 invented ("Westfield Chess Academy", "Brightpath Tutoring" w/ fake contact info). Replace mocks with real work; keep the US Chess piece leading.
4. **Thin social proof** — one editorial testimonial, zero client testimonials/case studies/metrics. Land 1–2 pilot clients → case study with a number. _#1 conversion lever for a new agency._
5. **Positioning slightly split** — "chess + education". Lead ~90% chess (the real edge); education secondary.
6. **Risk reversal** is good; consider a stronger first-order guarantee (first deliverable free / money-back).

## 🛠️ Senior engineer

1. **🔴 Security headers missing on HTML pages.** Only HSTS present (Vercel-added). `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, CSP are set on `/api/*` but not on pages. Add a global `headers()` in `next.config.js` / `vercel.json`. _Highest technical priority; ~20 min._
2. **🔴 Durable rate limiting NOT active — CONFIRMED.** `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` are **not set in Vercel** (confirmed 2026-11-03), so `/api/chat` and `/api/generate` fall back to per-instance in-memory limiting = effectively none on serverless. Both call Claude (real cost) → a scripted client could run up the Anthropic bill. **Set the Upstash vars in Vercel (Production + Preview) + redeploy.** Code already supports it.
3. **No error monitoring/alerting.** Failures only hit Vercel logs (why the Calendly 404 and demo-mode masking went unnoticed). Add Sentry or a Slack webhook on the API routes + client error boundary.
4. **Redirect + HSTS hardening.** Apex → www and `/integration` → `/chess-clubs` are 307 (temporary) → make permanent 308/301 for SEO. Add `includeSubDomains; preload` to HSTS.
5. **SEO technical depth.** No `<link rel="canonical">`, no JSON-LD structured data (Organization/LocalBusiness + Article for samples). High ROI for an SEO-selling site.
6. **CI gate + booking smoke test.** Vercel builds but doesn't run Jest. Add a GitHub Action (type-check/lint/test on PRs) + a tiny Playwright test asserting the CTA → a 200 Calendly link and chat returns a reply — would auto-catch the Calendly-404 class of bug.
7. **Minor:** sample diagrams use raw `<img>` not `next/image` (small LCP cost); `eslint@8` is EOL; add a global daily token-budget alarm on the chatbot.

### Suggested order
Quick, real-exposure wins first: **(1) page security headers**, **(2) set Upstash rate-limiting vars**. Then permanent redirects + HSTS hardening, canonical + JSON-LD, then error monitoring and CI. Entrepreneur items (lead capture, testimonials, own blog) are the growth levers but need owner input/content.

**Claude can implement (no owner input needed):** security headers, permanent 308 redirects, HSTS hardening, canonical + JSON-LD, and a CI workflow — as one PR.
**Owner actions:** set `UPSTASH_REDIS_REST_*` in Vercel; decide on lead-capture/testimonials/blog; choose an error-monitoring provider.
