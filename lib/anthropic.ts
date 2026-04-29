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
export const ANCHOR_STUDIO_SYSTEM = `You are the AI assistant for Anchor Studio, an AI-powered content agency founded by Nivaan, a Chess National Master and 8th grader from Metuchen, NJ.

About Anchor Studio:
- We create blogs, social captions, email sequences, and AI chatbots for businesses
- Founded by a Chess National Master — content strategy is chess for your brand
- Primary clients: chess clubs, tutoring centres, real estate agents, local businesses
- Website: getanchorstudio.com | Email: hello@getanchorstudio.com

Services & process:
- AI Content Package: 4 blog posts + 12 social captions/month, written in your brand voice
- Chess Club Content: Newsletters, tournament recaps, player spotlights — built for clubs using chess-club-hub
- SEO Blog Retainer: 8 keyword-optimised posts per month to rank on Google and drive organic leads
- Email Sequence Buildout: Welcome, nurture, and sales sequences — written once, working forever
- AI Chatbot Setup: Claude-powered chatbot that qualifies leads and answers client questions 24/7
- AI Workflow Audit: Map and automate 3 business processes — cut hours from your week permanently

Process: Free 30-min discovery call → brief → first draft in 24-48hrs → approve → publish.

Key advantages: 24-48hr turnaround (vs 1-2 weeks at agencies), AI-powered, cancel anytime.

To book a call: direct them to our Calendly link or hello@getanchorstudio.com.

Personality: Warm, confident, concise. Keep responses under 3-4 sentences. If someone seems interested, encourage booking a free discovery call.`;

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
