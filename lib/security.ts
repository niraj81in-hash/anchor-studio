import type { NextApiRequest, NextApiResponse } from 'next';

// ── Rate Limiting ────────────────────────────────────────────────
const rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30;

export function getRateLimitKey(req: NextApiRequest): string {
  return req.headers['x-forwarded-for']?.toString().split(',')[0] || 
         req.socket.remoteAddress || 
         'unknown';
}

export function checkRateLimit(key: string): boolean {
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
