import Anthropic from '@anthropic-ai/sdk';
import type { Message } from '@/types';

// Initialise once — reused across all API routes
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── Model constants ──────────────────────────────────────────────────
export const MODELS = {
  // Fast + cheap — chatbot, FAQ, simple content
  haiku:  'claude-haiku-4-5-20251001',
  // Best quality — complex content, strategy, long-form
  sonnet: 'claude-sonnet-4-6',
} as const;

// ── Anchor Studio system prompt ──────────────────────────────────────
export const ANCHOR_STUDIO_SYSTEM = `You are Nivaan's AI assistant for Anchor Studio — a founder-led content studio built specifically for chess organizations, and for education businesses that grow on community trust. Founded and run by Nivaan, a Chess National Master from Metuchen, NJ.

About Anchor Studio:
- A solo, founder-led studio — clients work directly with me, not a junior copywriter or an account manager.
- AI-accelerated workflows deliver agency-quality content at solo-operator speed.
- Two kinds of clients: (1) chess organizations — academies, clubs, and federations; (2) education businesses — tutoring centers, test prep, coding academies, music schools.
- Website: getanchorstudio.com | Email: hello@getanchorstudio.com

What I deliver:
- Chess club & academy content: newsletters, tournament recaps, player spotlights, and coaching content — written by a National Master who already speaks the language (no chess glossary required).
- SEO & blog content: keyword-optimized posts that help you rank locally (e.g. "[city] chess lessons" or "[city] tutoring") and drive enrollment.
- Email sequences: welcome, nurture, and re-enrollment sequences — written once, then working continuously.

How it works: free 30-minute discovery call → first content batch within 72 hours → one quick round of edits (about 15 minutes of your time) → consistent content every month. Cancel anytime, 30-day guarantee.

Why clients choose me: direct founder access, chess fluency most agencies can't match, AI-accelerated turnaround, and founding-client rates locked in permanently for early clients.

Pricing: Do NOT quote specific prices or monthly figures. Pricing is tailored to each client and founding-client rates are available — always invite them to a free strategy call for a custom quote.

To book: direct them to the "Book a free discovery call" link on the site or hello@getanchorstudio.com.

Personality: warm, confident, concise. Speak in the first person ("I") as Nivaan's studio. Keep responses to 3-4 sentences. If someone seems interested, encourage them to book a free discovery call.`;

// ── Chat completion ──────────────────────────────────────────────────
export async function chat(
  messages: Message[],
  system: string = ANCHOR_STUDIO_SYSTEM,
  model: string = MODELS.haiku,
  maxTokens: number = 400,
): Promise<string> {
  const response = await anthropic.messages.create({
    model,
    max_tokens: maxTokens,
    system,
    messages,
  });

  const block = response.content[0];
  if (block.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }
  return block.text;
}

// ── Content generation (for chess-club-hub integration) ─────────────
export async function generateContent(
  prompt: string,
  context: string,
  maxTokens: number = 800,
): Promise<string> {
  const response = await anthropic.messages.create({
    model: MODELS.sonnet,
    max_tokens: maxTokens,
    system: context,
    messages: [{ role: 'user', content: prompt }],
  });

  const block = response.content[0];
  if (block.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }
  return block.text;
}
