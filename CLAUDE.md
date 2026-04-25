# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Production build
npm run lint         # ESLint via next lint
npm run type-check   # TypeScript check without emitting (tsc --noEmit)
```

No test suite exists yet. Type-checking is the primary correctness gate.

## Environment setup

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Server-side only — never use `NEXT_PUBLIC_` prefix |
| `NEXT_PUBLIC_SITE_URL` | Full URL including `https://` |
| `NEXT_PUBLIC_CALENDLY_URL` | Booking link used in CTA buttons |

## Architecture

**Next.js 14 Pages Router** (not App Router). All routing is file-based under `pages/`.

### Single source of truth

`lib/config.ts` owns all site copy — services, pricing, niches, comparison table, founder bio, how-it-works steps. Pages import from here; never hardcode content in page files.

### Claude / AI layer

- `lib/anthropic.ts` — instantiates the Anthropic client once, exports `chat()` (Haiku, 400 tokens, for the chatbot) and `generateContent()` (Sonnet, for long-form content). Contains `ANCHOR_STUDIO_SYSTEM` — the chatbot's persona prompt.
- `lib/chess-hub.ts` — builds chess-specific prompts and calls `generateContent()`. Contains one exported function per `ContentType`: `generateNewsletter`, `annotateGame`, `generateTournamentRecap`, `generateSocialPost`, `generateLesson`.

All Claude calls are **server-side only**. `ANTHROPIC_API_KEY` never reaches the browser.

### API routes

- `pages/api/chat.ts` — chatbot proxy. Accepts `POST { messages: Message[] }`, strips history to last 10 turns, returns `{ reply }`. Used by `ChatBot.tsx`.
- `pages/api/generate.ts` — chess-club-hub content endpoint. Accepts `POST { type: ContentType, club: string, data: {...} }`, dispatches to the matching `lib/chess-hub.ts` function. Called by the external chess-club-hub platform.

### Type system

All shared types live in `types/index.ts`. The `ContentType` union drives both the API route's switch statement and `lib/chess-hub.ts`'s prompt map — keep them in sync when adding new content types.

## chess-club-hub integration

`chess-club-hub` is a separate repo and brand. This site serves as its AI content backend. The `pages/api/generate.ts` endpoint is the contract surface — the chess-club-hub platform POSTs to it. Changes to that endpoint's request/response shape are breaking changes for an external consumer.

## Path aliases

`@/` maps to the project root (configured in `tsconfig.json`). Use `@/lib/...`, `@/types`, `@/components/...` for imports.
