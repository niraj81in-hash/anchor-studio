# Anchor Studio

**AI-powered content agency website — founded by Nivaan, Chess National Master.**

> Content strategy is just chess for your brand.

Live site: [getanchorstudio.com](https://www.getanchorstudio.com)

---

## Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Framework| Next.js 14 (Pages Router)         |
| Language | TypeScript                        |
| Styling  | Tailwind CSS                      |
| AI       | Claude (Anthropic SDK)            |
| Hosting  | Vercel                            |
| Domain   | Namecheap → Vercel DNS            |

---

## Project structure

```
anchor-studio/
├── pages/
│   ├── index.tsx          # Homepage
│   ├── about.tsx          # Nivaan founder profile
│   ├── integration.tsx    # chess-club-hub integration detail
│   ├── pricing.tsx        # Pricing page
│   └── api/
│       ├── chat.ts        # Claude chatbot proxy (server-side)
│       └── generate.ts    # Content generation API for chess-club-hub
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── FounderStrip.tsx   # National Master founder section
│   └── ChatBot.tsx        # Full chatbot widget
├── lib/
│   ├── anthropic.ts       # Claude API client + system prompts
│   ├── chess-hub.ts       # chess-club-hub integration layer
│   └── config.ts          # All site content (single source of truth)
├── styles/
│   └── globals.css
├── types/
│   └── index.ts           # Shared TypeScript types
└── .env.local.example     # Required environment variables
```

---

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/niraj81in-hash/anchor-studio.git
cd anchor-studio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
NEXT_PUBLIC_SITE_URL=https://www.getanchorstudio.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-actual-link
```

Get your Anthropic API key at [console.anthropic.com](https://console.anthropic.com).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import this repo
3. Add environment variables in Vercel dashboard (Settings → Environment Variables):
   - `ANTHROPIC_API_KEY` — your Anthropic key (mark as secret)
   - `NEXT_PUBLIC_SITE_URL` — `https://www.getanchorstudio.com`
   - `NEXT_PUBLIC_CALENDLY_URL` — your Calendly link
4. Deploy — Vercel auto-deploys on every push to `main`
5. Point `getanchorstudio.com` DNS to Vercel in Namecheap

> **Note:** `ANTHROPIC_API_KEY` is server-side only (no `NEXT_PUBLIC_` prefix). It never reaches the browser. The `/api/chat` route handles all Claude calls server-side.

---

## chess-club-hub integration

This repo integrates with [chess-club-hub](https://github.com/niraj81in-hash/chess-club-hub) — a separate chess platform for school clubs.

**How it works:**

- `lib/chess-hub.ts` — integration layer that wraps chess-club-hub data structures
- `pages/api/generate.ts` — REST endpoint chess-club-hub can call to generate content
- Supported content types: `newsletter`, `tournament-recap`, `game-annotation`, `player-spotlight`, `social-post`, `lesson`

**Example call from chess-club-hub:**

```typescript
const response = await fetch('https://www.getanchorstudio.com/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'newsletter',
    club: 'Metuchen Chess Club',
    data: { games, players, totalGames },
  }),
});
const { content } = await response.json();
```

---

## Key decisions

- **TypeScript** — strict mode, catches errors at write time
- **Pages Router** — simpler than App Router for a marketing site; easier to reason about
- **No database** — all content is in `lib/config.ts`; add a DB when needed
- **API key server-side** — `/api/chat.ts` runs on Vercel serverless, key never in browser
- **Separate from chess-club-hub** — two separate repos, two separate brands. Integration = premium Anchor Studio tier

---

## Updating site content

All copy, services, pricing, and niches live in one file:

```
lib/config.ts
```

Change services, pricing, or niches there and the entire site updates automatically.

---

## Environment variables reference

| Variable                    | Required | Description                              |
|-----------------------------|----------|------------------------------------------|
| `ANTHROPIC_API_KEY`         | Yes      | Anthropic API key — server-side only     |
| `NEXT_PUBLIC_SITE_URL`      | Yes      | Full site URL including https://         |
| `NEXT_PUBLIC_CALENDLY_URL`  | Yes      | Your Calendly booking link               |

---

## Contact

hello@getanchorstudio.com · [getanchorstudio.com](https://www.getanchorstudio.com)

© 2026 Anchor Studio · Founded by Nivaan, Chess National Master · Metuchen, NJ
