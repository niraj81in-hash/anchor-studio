import { generateContent } from '@/lib/anthropic';
import type { ChessGame, ClubStats, ContentType } from '@/types';

// ── System prompts per content type ─────────────────────────────────
const CHESS_CONTENT_PROMPTS: Record<ContentType, string> = {
  newsletter: `You are a chess club content writer creating a weekly newsletter.
Write in a warm, engaging tone suitable for club members of all ages.
Include: highlights from recent games, upcoming events, a chess tip of the week.
Keep it under 300 words. Format with clear sections.`,

  'tournament-recap': `You are a chess journalist writing a tournament recap.
Be enthusiastic but accurate. Highlight key moments, standout players, and decisive games.
Include the final standings and any notable upsets. Under 250 words.`,

  'game-annotation': `You are a chess coach (National Master level) annotating a game.
Explain moves in plain English suitable for club players rated 800-1400.
Identify key turning points, tactical motifs, and lessons to learn.
Use chess notation but always explain it in plain language immediately after.`,

  'player-spotlight': `You are writing a player spotlight for a school chess club newsletter.
Be encouraging and celebrate achievements. Mention their rating progress if available.
Ask a fun chess-related question and answer it. Under 150 words, upbeat tone.`,

  'social-post': `You are a social media writer for a school chess club.
Write an engaging post suitable for Instagram or X. Include 3-5 relevant hashtags.
Keep it under 100 words. Be enthusiastic without being cheesy.
Do not start with "Are you..." or "Did you know..."`,

  lesson: `You are a chess coach (National Master) writing a beginner lesson.
Explain one concept clearly with a concrete example. Use plain English throughout.
Suitable for players rated 500-1200. Include a takeaway tip at the end. Under 200 words.`,
};

// ── Newsletter generator (uses db.js game data) ──────────────────────
export async function generateNewsletter(
  stats: ClubStats,
): Promise<string> {
  const prompt = `Generate a weekly newsletter for ${stats.clubName}.

Club stats this week:
- Total games played: ${stats.totalGames}
- Active players: ${stats.players.join(', ')}
- Recent results:
${stats.recentResults
  .slice(0, 5)
  .map(g => `  ${g.white} vs ${g.black}: ${g.result} (${g.event ?? 'Club game'})`)
  .join('\n')}

Write the full newsletter now.`;

  return generateContent(prompt, CHESS_CONTENT_PROMPTS.newsletter);
}

// ── Game annotation (uses pgn.js parsed game) ────────────────────────
export async function annotateGame(game: ChessGame): Promise<string> {
  const prompt = `Annotate this chess game for club players:

White: ${game.white}
Black: ${game.black}
Result: ${game.result}
Date: ${game.date}
${game.event ? `Event: ${game.event}` : ''}

PGN:
${game.pgn}

Provide a coach-quality annotation highlighting the key moments, tactical ideas, and lessons.`;

  return generateContent(prompt, CHESS_CONTENT_PROMPTS['game-annotation'], 1000);
}

// ── Tournament recap (uses db.js standings) ──────────────────────────
export async function generateTournamentRecap(
  clubName: string,
  games: ChessGame[],
  winner: string,
): Promise<string> {
  const standings = games.reduce<Record<string, number>>((acc, g) => {
    if (g.result === '1-0') { acc[g.white] = (acc[g.white] ?? 0) + 1; }
    if (g.result === '0-1') { acc[g.black] = (acc[g.black] ?? 0) + 1; }
    return acc;
  }, {});

  const prompt = `Write a tournament recap for ${clubName}'s club tournament.

Winner: ${winner}
Total games played: ${games.length}
Point standings:
${Object.entries(standings)
  .sort(([, a], [, b]) => b - a)
  .map(([player, points]) => `  ${player}: ${points} points`)
  .join('\n')}

Some notable games:
${games
  .slice(0, 3)
  .map(g => `  ${g.white} vs ${g.black}: ${g.result}`)
  .join('\n')}

Write an engaging tournament recap now.`;

  return generateContent(prompt, CHESS_CONTENT_PROMPTS['tournament-recap']);
}

// ── Social post from game result ─────────────────────────────────────
export async function generateSocialPost(
  clubName: string,
  game: ChessGame,
): Promise<string> {
  const prompt = `Write a social media post for ${clubName} celebrating this game result:

${game.white} vs ${game.black}: ${game.result}
${game.event ? `Event: ${game.event}` : ''}
${game.date}

Make it engaging and suitable for Instagram/X.`;

  return generateContent(prompt, CHESS_CONTENT_PROMPTS['social-post'], 200);
}

// ── Lesson from engine evaluation ────────────────────────────────────
export async function generateLesson(
  position: string,   // FEN string from engine.js
  evalScore: number,  // centipawn evaluation
  bestMove: string,   // best move from engine.js
): Promise<string> {
  const prompt = `Create a beginner chess lesson from this position.

FEN: ${position}
Engine evaluation: ${evalScore > 0 ? '+' : ''}${(evalScore / 100).toFixed(1)} (${evalScore > 0 ? 'White' : 'Black'} is better)
Best move according to engine: ${bestMove}

Explain why ${bestMove} is the best move and what concept it demonstrates.
Make it accessible to a beginner rated 500-1000.`;

  return generateContent(prompt, CHESS_CONTENT_PROMPTS.lesson, 300);
}
