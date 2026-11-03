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
  icon: string;
}

export interface PricingPlan {
  name: string;
  price?: string;
  features: string[];
  popular?: boolean;
  chessHub?: boolean;
}

export interface PortfolioSampleSection {
  heading?: string;
  body: string;
  /** Optional diagram/illustration shown after the body (path under /public). */
  image?: string;
  /** Caption rendered beneath the image. */
  caption?: string;
}

export interface PortfolioSample {
  title: string;
  type: string;
  excerpt: string;
  content: string;
  slug: string;
  sections: PortfolioSampleSection[];
  /** Surfaces the sample first and shows a credibility badge. */
  featured?: boolean;
  /** Short "as featured in" label, e.g. "Featured in US Chess". */
  sourceLabel?: string;
  /** External link backing the sourceLabel (e.g. the published article). */
  sourceUrl?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface PositioningFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Positioning {
  paragraph: string;
  features: PositioningFeature[];
}
