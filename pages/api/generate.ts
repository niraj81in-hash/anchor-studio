import type { NextApiRequest, NextApiResponse } from 'next';
import {
  generateNewsletter,
  annotateGame,
  generateTournamentRecap,
  generateSocialPost,
  generateLesson,
} from '@/lib/chess-hub';
import type { GenerateRequest, GenerateResponse } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ content: '', type: 'newsletter', error: 'Method not allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ content: '', type: 'newsletter', error: 'Server configuration error' });
  }

  const { type, club, data } = req.body as GenerateRequest;

  if (!type || !club) {
    return res.status(400).json({ content: '', type: 'newsletter', error: 'Missing type or club' });
  }

  try {
    let content = '';

    switch (type) {
      case 'newsletter':
        content = await generateNewsletter({
          clubName: club,
          totalGames: (data.totalGames as number) ?? 0,
          players: (data.players as string[]) ?? [],
          recentResults: (data.recentResults as Parameters<typeof generateNewsletter>[0]['recentResults']) ?? [],
        });
        break;

      case 'game-annotation':
        content = await annotateGame(data.game as Parameters<typeof annotateGame>[0]);
        break;

      case 'tournament-recap':
        content = await generateTournamentRecap(
          club,
          (data.games as Parameters<typeof generateTournamentRecap>[1]) ?? [],
          (data.winner as string) ?? '',
        );
        break;

      case 'social-post':
        content = await generateSocialPost(
          club,
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
