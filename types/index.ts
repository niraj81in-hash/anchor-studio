// ── Chat types ───────────────────────────────────────────────────────
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: Message[];
}

export interface ChatResponse {
  reply: string;
  error?: string;
}

// ── Content generation types (chess-club-hub integration) ────────────
export type ContentType =
  | 'newsletter'
  | 'tournament-recap'
  | 'game-annotation'
  | 'player-spotlight'
  | 'social-post'
  | 'lesson';

export interface GenerateRequest {
  type: ContentType;
  club: string;
  data: Record<string, unknown>;
}

export interface GenerateResponse {
  content: string;
  type: ContentType;
  error?: string;
}

// ── chess-club-hub game types (mirrors db.js structure) ─────────────
export interface ChessGame {
  id: string;
  white: string;
  black: string;
  result: '1-0' | '0-1' | '1/2-1/2';
  pgn: string;
  date: string;
  event?: string;
}

export interface ClubStats {
  clubName: string;
  totalGames: number;
  players: string[];
  recentResults: ChessGame[];
}

// ── Service / pricing types ──────────────────────────────────────────
export interface Service {
  name: string;
  description: string;
  price: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  chessHub?: boolean;
}
