# Security Guide — Anchor Studio

## Overview

Anchor Studio implements comprehensive security measures across authentication, data validation, rate limiting, and secure headers. This guide outlines all security features and best practices.

## 1. Input Validation & Sanitization

### XSS Prevention
All user inputs are sanitized to prevent Cross-Site Scripting (XSS) attacks:

```typescript
// lib/security.ts
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, 5000); // Max 5000 chars
}
```

**Where Applied:**
- Chat messages (`/api/chat`)
- Club names in generate endpoint (`/api/generate`)
- Player names and all user-provided text

### Email Validation
Strict RFC-compliant email validation:

```typescript
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}
```

## 2. Rate Limiting

### Configuration
- **Window:** 60 seconds
- **Max Requests:** 30 per client per minute
- **Client ID:** IP address (from `x-forwarded-for` or socket)

### Implementation
```typescript
export function checkRateLimit(key: string): boolean {
  // Enforced on all API endpoints
  // Returns 429 Too Many Requests when exceeded
}
```

### Response
```json
{
  "error": "Too many requests. Please try again later.",
  "Retry-After": "60"
}
```

## 3. API Authentication

### `/api/generate` Authentication
The chess-club-hub integration endpoint requires Bearer token authentication:

```bash
# Request with authentication
curl -X POST https://api.getanchorstudio.com/api/generate \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"type":"newsletter","club":"Chess Club","data":{...}}'
```

**Setup:**
1. Set `GENERATE_API_KEY` in `.env.local`
2. Share key securely with chess-club-hub integrations
3. Never commit keys to version control

## 4. Security Headers

All API responses include security headers:

| Header | Purpose | Value |
|--------|---------|-------|
| `X-Content-Type-Options` | Prevent MIME sniffing | `nosniff` |
| `X-XSS-Protection` | XSS protection | `1; mode=block` |
| `X-Frame-Options` | Clickjacking protection | `SAMEORIGIN` |
| `Content-Security-Policy` | Control resource loading | `default-src 'self'` |
| `Referrer-Policy` | Privacy control | `strict-origin-when-cross-origin` |

## 5. CORS Configuration

CORS is strictly configured to allow only:
- **Origin:** `NEXT_PUBLIC_SITE_URL` environment variable
- **Methods:** GET, POST, PUT, PATCH, DELETE, OPTIONS
- **Credentials:** Allowed

```typescript
// Always set to your domain
res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_SITE_URL);
```

## 6. Request Size Limits

- **Max Payload:** 100 KB
- **Returns 413** if exceeded

```typescript
export function validateRequestSize(req: NextApiRequest): boolean {
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  return contentLength <= 100 * 1024;
}
```

## 7. Environment Variables

### Required for Production

```env
# API Key (never expose to browser)
ANTHROPIC_API_KEY=sk-ant-xxx

# Chess Hub integration key
GENERATE_API_KEY=secret-key-xxx

# Public configuration
NEXT_PUBLIC_SITE_URL=https://www.getanchorstudio.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/...
```

### Never Use NEXT_PUBLIC_ Prefix For:
- API keys
- Secrets
- Sensitive configuration

## 8. API Endpoint Security

### `/api/chat`
- ✅ Rate limited (30/min)
- ✅ Input sanitized
- ✅ Message history limited to 10 turns
- ✅ Request size validated
- ✅ Security headers applied
- ✅ CORS configured
- ✅ Error messages user-friendly

### `/api/generate`
- ✅ All `/api/chat` security measures
- ✅ Bearer token authentication
- ✅ Club names sanitized
- ✅ ContentType validation
- ✅ API key stored server-side only

## 9. Error Handling

### User-Facing Messages
All errors return safe, non-informative messages:

```json
{
  "error": "Having a moment — please email hello@getanchorstudio.com"
}
```

### Server Logging
Detailed errors logged to console (server-side only):

```typescript
console.error('Claude API error:', message); // Never exposed to client
```

## 10. Best Practices for Users

### When Deploying
1. ✅ Generate strong `GENERATE_API_KEY` (use `crypto.randomUUID()`)
2. ✅ Set `NEXT_PUBLIC_SITE_URL` to your domain
3. ✅ Never commit `.env.local` to version control
4. ✅ Rotate `GENERATE_API_KEY` periodically
5. ✅ Monitor API usage for unusual patterns

### When Integrating with chess-club-hub
1. ✅ Use HTTPS for all requests
2. ✅ Store API key securely (never in frontend code)
3. ✅ Implement timeout handling (30 seconds)
4. ✅ Log and monitor all API calls
5. ✅ Handle 429 responses gracefully

## 11. Incident Response

### Rate Limit Attacks
- Automatically blocked after 30 requests/min
- Client receives 429 with `Retry-After: 60`
- IP logged for analysis

### Invalid Input
- Automatically sanitized
- XSS patterns removed
- Oversized payloads rejected with 413

### Authentication Failures
- `/api/generate` returns 401 Unauthorized
- Check `Authorization` header format
- Verify `GENERATE_API_KEY` is set and correct

## 12. Security Checklist

- [ ] ANTHROPIC_API_KEY set (server-side only)
- [ ] GENERATE_API_KEY configured and secure
- [ ] NEXT_PUBLIC_SITE_URL set to your domain
- [ ] No API keys in repository
- [ ] HTTPS enabled in production
- [ ] Regular security updates applied
- [ ] Monitoring/logging configured
- [ ] Rate limits tested
- [ ] CORS origin validated
- [ ] Error messages don't leak info

## 13. Vulnerability Reporting

If you discover a security vulnerability:
1. **DO NOT** open a public issue
2. Email hello@getanchorstudio.com with:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
3. Wait for response before public disclosure

## 14. Dependencies & Vulnerabilities

Regular security audits recommended:

```bash
npm audit
npm audit fix  # For non-breaking updates
npm audit fix --force  # For breaking updates (test first!)
```

## 15. Content Security Policy (CSP)

Current CSP allows:
- Scripts: same-origin only
- Styles: same-origin + inline (Tailwind)
- Images: same-origin, data URIs, HTTPS
- Fonts: same-origin

To modify, update `lib/security.ts`:

```typescript
res.setHeader(
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self' 'unsafe-inline';"
);
```

## Additional Resources

- [OWASP Top 10](https://owasp.org/Top10/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Authentication for APIs](https://auth0.com/intro-to-iam)
