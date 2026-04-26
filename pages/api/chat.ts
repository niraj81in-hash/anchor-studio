import type { NextApiRequest, NextApiResponse } from 'next';
import { chat } from '@/lib/anthropic';
import type { ChatRequest, ChatResponse } from '@/types';
import {
  checkRateLimit,
  getRateLimitKey,
  sanitizeInput,
  setSecurityHeaders,
  setCorsHeaders,
  validateRequestSize,
} from '@/lib/security';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>,
) {
  // Set security headers
  setSecurityHeaders(res);
  setCorsHeaders(res);

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: '', error: 'Method not allowed' });
  }

  // Check request size
  if (!validateRequestSize(req)) {
    return res.status(413).json({ reply: '', error: 'Request payload too large' });
  }

  // Rate limiting
  const clientKey = getRateLimitKey(req);
  if (!checkRateLimit(clientKey)) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ reply: '', error: 'Too many requests. Please try again later.' });
  }

  // Validate API key is configured
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return res.status(500).json({ reply: '', error: 'Server configuration error' });
  }

  const { messages } = req.body as ChatRequest;

  // Validate messages array
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ reply: '', error: 'Invalid messages array' });
  }

  // Sanitise — only allow valid roles, limit history to last 10 turns
  const cleanMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .filter(m => typeof m.content === 'string' && m.content.trim().length > 0)
    .map(m => ({
      ...m,
      content: sanitizeInput(m.content),
    }))
    .slice(-10);

  try {
    const reply = await chat(cleanMessages);
    return res.status(200).json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Claude API error:', message);

    // Return a graceful user-facing message
    return res.status(500).json({
      reply: 'Having a moment — please email hello@getanchorstudio.com and we will get right back to you.',
      error: message,
    });
  }
}
