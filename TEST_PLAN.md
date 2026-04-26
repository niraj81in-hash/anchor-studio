# Test Plan - Anchor Studio

## Overview
This document outlines the comprehensive testing strategy for Anchor Studio, covering security, UI/UX, and code quality improvements.

## Test Categories

### 1. Security Testing

#### Rate Limiting
- ✅ Test that requests under limit are allowed
- ✅ Test that requests over limit (30/min) are blocked
- ✅ Test that rate limit resets after 60 seconds
- ✅ Test different client IPs have independent limits

#### Input Validation & Sanitization
- ✅ Test XSS prevention (angle brackets removed)
- ✅ Test input size limits (5000 chars max)
- ✅ Test whitespace trimming
- ✅ Test email validation (RFC compliant)
- ✅ Test empty input rejection

#### API Security
- ✅ Test CORS headers are set correctly
- ✅ Test security headers present (CSP, X-Frame-Options, etc.)
- ✅ Test 405 Method Not Allowed for non-POST
- ✅ Test 413 Payload Too Large for oversized requests
- ✅ Test authentication on /api/generate (GENERATE_API_KEY)

### 2. UI/UX Testing

#### ChatBot Component
- ✅ Test component renders without error
- ✅ Test chat opens/closes with button click
- ✅ Test suggestion buttons trigger messages
- ✅ Test message input and send functionality
- ✅ Test loading state with typing animation
- ✅ Test error message display
- ✅ Test keyboard shortcuts (Enter to send, Escape to close)
- ✅ Test accessibility attributes (ARIA labels, roles)

#### Accessibility
- ✅ Test ARIA labels present on buttons
- ✅ Test keyboard navigation (Tab, Enter, Escape)
- ✅ Test focus indicators visible
- ✅ Test role attributes (dialog, log, status)
- ✅ Test aria-live regions for dynamic updates

### 3. Error Handling

#### Error Boundary
- ✅ Test component renders children when no error
- ✅ Test error message displayed on crash
- ✅ Test error details expandable
- ✅ Test console.error logging
- ✅ Test graceful UI degradation

#### API Error Handling
- ✅ Test 500 errors return user-friendly messages
- ✅ Test network errors don't crash app
- ✅ Test timeout handling (30s abort signal)
- ✅ Test API key missing scenario
- ✅ Test malformed JSON handling

### 4. Integration Tests

#### Chat Flow
- User sends message → message appears → loading state → AI response → message history
- Suggestion button clicked → message sent → response received
- Chat opened → message input focused → send button enabled

#### API Routes
- Chat API: message validation → sanitization → API call → response → state update
- Generate API: auth check → rate limit → data validation → generation → response

## Test Execution

### Running Tests
```bash
npm test              # Run all tests with coverage
npm run test:watch    # Watch mode for development
```

### Coverage Goals
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

## Security Test Cases

### Test Case: Rate Limiting
**Objective:** Verify rate limit enforcement
**Steps:**
1. Make 30 requests to /api/chat within 1 minute
2. Make 31st request
**Expected:** 31st request returns 429 Too Many Requests

### Test Case: XSS Prevention
**Objective:** Verify input sanitization
**Steps:**
1. Send message: `<script>alert('XSS')</script>`
2. Verify sanitized output
**Expected:** Angle brackets removed, message safe

### Test Case: CORS Headers
**Objective:** Verify CORS configuration
**Steps:**
1. Make cross-origin request to API
2. Check response headers
**Expected:** Correct Access-Control headers present

### Test Case: Authentication on Generate API
**Objective:** Verify /api/generate requires API key
**Steps:**
1. Call /api/generate without Authorization header
2. Call with invalid Bearer token
3. Call with valid Bearer token
**Expected:** 401, 401, 200

## Performance Test Cases

### Test Case: Response Time
**Objective:** Verify acceptable response times
**Expected:**
- Chat API: < 5 seconds
- Generate API: < 10 seconds

### Test Case: Load Handling
**Objective:** Verify API stability under load
**Steps:**
1. Send 100 concurrent requests
2. Monitor response times and error rates
**Expected:** < 5% errors, response times stable

## Manual Testing Checklist

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Manual Testing
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Mobile zoom works
- [ ] Touch targets appropriate

### Security Manual Testing
- [ ] No console errors/warnings
- [ ] No API keys in localStorage
- [ ] HTTPS enforced
- [ ] CSP violations checked
- [ ] Sensitive data not logged

## Known Issues & Limitations

1. Jest configuration requires mocking Next.js specific modules
2. Some async operations may need additional waits in tests
3. End-to-end tests would require Playwright/Cypress setup

## Continuous Integration

Tests should run on:
- Pull request creation
- Before merge to main
- Before deployment
- On schedule (daily)

## Test Maintenance

- Update tests when features change
- Keep mocks in sync with actual implementations
- Monitor coverage trends
- Remove obsolete test cases
- Review and refactor annually
