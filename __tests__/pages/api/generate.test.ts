import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';

// Mock the security module (async checkRateLimit)
jest.mock('@/lib/security', () => ({
  checkRateLimit: jest.fn(async () => true),
  getRateLimitKey: jest.fn(() => '127.0.0.1'),
  sanitizeInput: jest.fn((input: string) => input),
  setSecurityHeaders: jest.fn(),
  setCorsHeaders: jest.fn(),
  validateRequestSize: jest.fn(() => true),
}));

// Mock the chess-hub content generators
jest.mock('@/lib/chess-hub', () => ({
  generateNewsletter: jest.fn(async () => 'newsletter content'),
  annotateGame: jest.fn(async () => ''),
  generateTournamentRecap: jest.fn(async () => ''),
  generateSocialPost: jest.fn(async () => ''),
  generateLesson: jest.fn(async () => ''),
}));

// GENERATE_API_KEY is captured at module load, so each test sets env then
// re-imports the handler via jest.resetModules().
function loadHandler() {
  let handler!: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  jest.isolateModules(() => {
    handler = require('@/pages/api/generate').default;
  });
  return handler;
}

const validBody = { type: 'newsletter', club: 'Test Club', data: {} };

describe('/api/generate auth', () => {
  const ORIGINAL = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ORIGINAL, ANTHROPIC_API_KEY: 'test-anthropic-key' };
  });

  afterAll(() => {
    process.env = ORIGINAL;
  });

  it('fails closed with 500 when GENERATE_API_KEY is not set', async () => {
    delete process.env.GENERATE_API_KEY;
    const handler = loadHandler();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: validBody,
      headers: { 'content-length': '20', authorization: 'Bearer anything' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData()).error).toBe('Server configuration error');
  });

  it('rejects with 401 when the provided key is wrong', async () => {
    process.env.GENERATE_API_KEY = 'correct-key';
    const handler = loadHandler();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: validBody,
      headers: { 'content-length': '20', authorization: 'Bearer wrong-key' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData()).error).toBe('Unauthorized');
  });

  it('rejects with 401 when no Authorization header is provided', async () => {
    process.env.GENERATE_API_KEY = 'correct-key';
    const handler = loadHandler();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: validBody,
      headers: { 'content-length': '20' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  it('accepts a request with the correct key', async () => {
    process.env.GENERATE_API_KEY = 'correct-key';
    const handler = loadHandler();

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: validBody,
      headers: { 'content-length': '20', authorization: 'Bearer correct-key' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.content).toBe('newsletter content');
    expect(data.type).toBe('newsletter');
  });
});
