import type { NextApiRequest, NextApiResponse } from 'next';

// ── Rate Limiting ────────────────────────────────────────────────
// Durable, serverless-safe rate limiting.
//
// On Vercel (and any serverless platform) each invocation may run in a fresh
// instance, so an in-memory counter resets constantly and provides no real
// protection. When Upstash Redis REST credentials are present we use a shared
// Redis counter so limits hold across every instance. Without them we fall
// back to the in-memory store for local dev and log a one-time warning.
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30;
const RATE_LIMIT_WINDOW_SECONDS = Math.ceil(RATE_LIMIT_WINDOW / 1000);

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const useUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

let warnedInMemory = false;

// In-memory fallback — per-instance only, NOT durable across serverless instances.
const rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();

export function getRateLimitKey(req: NextApiRequest): string {
  return req.headers['x-forwarded-for']?.toString().split(',')[0] ||
         req.socket.remoteAddress ||
         'unknown';
}

function checkRateLimitInMemory(key: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  existing.count++;
  return true;
}

// Atomic fixed-window counter via the Upstash REST pipeline:
//   INCR  ratelimit:<key>          → current count in the window
//   EXPIRE ratelimit:<key> N NX    → set TTL only on first hit (NX), so the
//                                     window starts when the first request lands
async function checkRateLimitUpstash(key: string): Promise<boolean> {
  const redisKey = `ratelimit:${key}`;
  const res = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', redisKey],
      ['EXPIRE', redisKey, RATE_LIMIT_WINDOW_SECONDS, 'NX'],
    ]),
  });

  if (!res.ok) {
    throw new Error(`Upstash responded ${res.status}`);
  }

  const data = (await res.json()) as Array<{ result?: number; error?: string }>;
  const incr = data[0];
  if (!incr || typeof incr.result !== 'number') {
    throw new Error(`Unexpected Upstash response: ${JSON.stringify(data)}`);
  }

  return incr.result <= RATE_LIMIT_MAX_REQUESTS;
}

export async function checkRateLimit(key: string): Promise<boolean> {
  if (useUpstash) {
    try {
      return await checkRateLimitUpstash(key);
    } catch (err) {
      // Never let a rate-limiter outage take down the endpoint — degrade to
      // the in-memory limiter (per-instance) and surface the failure in logs.
      console.error('Rate limiter (Upstash) failed, falling back to in-memory:', err);
      return checkRateLimitInMemory(key);
    }
  }

  if (!warnedInMemory) {
    warnedInMemory = true;
    console.warn(
      'Rate limiting is using an in-memory store, which is NOT durable across ' +
        'serverless instances. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN ' +
        'for production-grade rate limiting.',
    );
  }
  return checkRateLimitInMemory(key);
}

// ── Input Sanitization ──────────────────────────────────────────
export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters but preserve content
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, 5000); // Max 5000 chars
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// ── CORS Headers ────────────────────────────────────────────────
export function setCorsHeaders(res: NextApiResponse, allowedOrigins: string[] = ['https://www.getanchorstudio.com']) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.getanchorstudio.com';
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
}

// ── Security Headers ────────────────────────────────────────────
export function setSecurityHeaders(res: NextApiResponse): void {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'"
  );
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}

// ── Request Size Validation ──────────────────────────────────────
export function validateRequestSize(req: NextApiRequest): boolean {
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  const maxSize = 100 * 1024; // 100KB max
  return contentLength <= maxSize;
}
