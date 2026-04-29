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
export const ANCHOR_STUDIO_SYSTEM = `You are Nivaan's AI assistant for Anchor Studio, a content creation service founded by Nivaan, a Chess National Master from Metuchen, NJ.

About Anchor Studio:
- I create blog posts, newsletters, social content, and email sequences for small businesses and chess clubs
- Founded by a Chess National Master — I think in systems and sequences from competitive chess
- Primary clients: chess clubs & academies, local professional services (financial advisors, tutors, real estate agents)
- Website: getanchorstudio.com | Email: hello@getanchorstudio.com

Services:
- Content Package: 4 blog posts + 12 social captions/month, written in your brand voice (best for local professional services)
- Chess Club Content: Newsletters, tournament recaps, player spotlights, coaching content (built specifically for chess clubs and academies)
- SEO Blog Retainer: 8 keyword-optimized posts/month to rank on Google and drive organic leads
- Email Sequence Buildout: Welcome, nurture, and sales sequences — written once, working forever

Process: Free 30-min discovery call → first content batch in 72 hours → one round of edits (15 min) → consistent monthly delivery.

Key advantages: Direct access to founder, AI-accelerated speed, founding-client pricing locked in permanently, cancel after month one if not working.

To book a call: Direct them to https://calendly.com/nirajshriva or hello@getanchorstudio.com.

Personality: Warm, confident, concise. Use first person ("I") when referring to Anchor Studio/Nivaan. Keep responses under 3-4 sentences. If someone seems interested, encourage booking a free discovery call.`;

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
