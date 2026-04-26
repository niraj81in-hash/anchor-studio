import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/chat';
import * as security from '@/lib/security';

// Mock the security module
jest.mock('@/lib/security', () => ({
  checkRateLimit: jest.fn(() => true),
  getRateLimitKey: jest.fn(() => '127.0.0.1'),
  sanitizeInput: jest.fn(input => input),
  setSecurityHeaders: jest.fn(),
  setCorsHeaders: jest.fn(),
  validateRequestSize: jest.fn(() => true),
}));

// Mock the anthropic module
jest.mock('@/lib/anthropic', () => ({
  chat: jest.fn(async () => 'Test response'),
}));

describe('/api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reject non-POST requests', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      reply: '',
      error: 'Method not allowed',
    });
  });

  it('should reject if ANTHROPIC_API_KEY is not set', async () => {
    const originalKey = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: { 'content-length': '10' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      reply: '',
      error: 'Server configuration error',
    });

    process.env.ANTHROPIC_API_KEY = originalKey;
  });

  it('should reject empty messages array', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { messages: [] },
      headers: { 'content-length': '10' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      reply: '',
      error: 'Invalid messages array',
    });
  });

  it('should return 429 if rate limited', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';
    (security.checkRateLimit as jest.Mock).mockReturnValueOnce(false);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { messages: [{ role: 'user', content: 'hello' }] },
      headers: { 'content-length': '10' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(429);
    expect(res._getHeaders()['retry-after']).toBe('60');
  });

  it('should return 413 if request too large', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';
    (security.validateRequestSize as jest.Mock).mockReturnValueOnce(false);

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { messages: [{ role: 'user', content: 'hello' }] },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(413);
    expect(JSON.parse(res._getData())).toEqual({
      reply: '',
      error: 'Request payload too large',
    });
  });

  it('should accept valid messages', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: { messages: [{ role: 'user', content: 'hello' }] },
      headers: { 'content-length': '10' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const response = JSON.parse(res._getData());
    expect(response).toHaveProperty('reply');
  });
});
