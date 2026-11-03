import type { NextApiRequest, NextApiResponse } from 'next';
import { timingSafeEqual } from 'crypto';
import {
  generateNewsletter,
  annotateGame,
  generateTournamentRecap,
  generateSocialPost,
  generateLesson,
} from '@/lib/chess-hub';
import type { GenerateRequest, GenerateResponse } from '@/types';
import {
  checkRateLimit,
  getRateLimitKey,
  sanitizeInput,
  setSecurityHeaders,
  setCorsHeaders,
  validateRequestSize,
} from '@/lib/security';

// API key for chess-club-hub integration (stored as env var)
const GENERATE_API_KEY = process.env.GENERATE_API_KEY;

// Constant-time comparison to avoid leaking the key via timing.
function keysMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>,
) {
  // Set security headers
  setSecurityHeaders(res);
  setCorsHeaders(res);

  if (req.method !== 'POST') {
    return res.status(405).json({ content: '', type: 'newsletter', error: 'Method not allowed' });
  }

  // Check request size
  if (!validateRequestSize(req)) {
    return res.status(413).json({ content: '', type: 'newsletter', error: 'Request payload too large' });
  }

  // Rate limiting
  const clientKey = getRateLimitKey(req);
  if (!(await checkRateLimit(clientKey))) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ content: '', type: 'newsletter', error: 'Too many requests. Please try again later.' });
  }

  // Authenticate with API key — fail closed. A missing GENERATE_API_KEY is a
  // server misconfiguration, not an invitation to serve unauthenticated (and
  // billable) content generation to the public.
  if (!GENERATE_API_KEY) {
    console.error('GENERATE_API_KEY is not set — rejecting all /api/generate requests');
    return res.status(500).json({ content: '', type: 'newsletter', error: 'Server configuration error' });
  }
  const authHeader = req.headers['authorization'];
  const providedKey = authHeader?.replace('Bearer ', '') ?? '';
  if (!keysMatch(providedKey, GENERATE_API_KEY)) {
    return res.status(401).json({ content: '', type: 'newsletter', error: 'Unauthorized' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ content: '', type: 'newsletter', error: 'Server configuration error' });
  }

  const { type, club, data } = req.body as GenerateRequest;

  if (!type || !club) {
    return res.status(400).json({ content: '', type: 'newsletter', error: 'Missing type or club' });
  }

  // Sanitize inputs
  const sanitizedClub = sanitizeInput(club);

  try {
    let content = '';

    switch (type) {
      case 'newsletter':
        content = await generateNewsletter({
          clubName: sanitizedClub,
          totalGames: (data.totalGames as number) ?? 0,
          players: (data.players as string[])?.map(p => sanitizeInput(p)) ?? [],
          recentResults: (data.recentResults as Parameters<typeof generateNewsletter>[0]['recentResults']) ?? [],
        });
        break;

      case 'game-annotation':
        content = await annotateGame(data.game as Parameters<typeof annotateGame>[0]);
        break;

      case 'tournament-recap':
        content = await generateTournamentRecap(
          sanitizedClub,
          (data.games as Parameters<typeof generateTournamentRecap>[1]) ?? [],
          sanitizeInput((data.winner as string) ?? ''),
        );
        break;

      case 'social-post':
        content = await generateSocialPost(
          sanitizedClub,
          data.game as Parameters<typeof generateSocialPost>[1],
        );
        break;

      case 'lesson':
        content = await generateLesson(
          data.position as string,
          data.evalScore as number,
          data.bestMove as string,
        );
        break;

      default:
        return res.status(400).json({ content: '', type, error: `Unknown content type: ${type}` });
    }

    return res.status(200).json({ content, type });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Content generation error:', message);
    return res.status(500).json({ content: '', type, error: message });
  }
}
