import {
  checkRateLimit,
  sanitizeInput,
  validateEmail,
  validateRequestSize,
} from '@/lib/security';

describe('Security module', () => {
  beforeEach(() => {
    // Clear rate limit store between tests
    jest.clearAllMocks();
  });

  describe('sanitizeInput', () => {
    it('should remove angle brackets', () => {
      expect(sanitizeInput('<script>alert("XSS")</script>')).toBe('scriptalert("XSS")/script');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world');
    });

    it('should limit to 5000 characters', () => {
      const longString = 'a'.repeat(10000);
      const result = sanitizeInput(longString);
      expect(result.length).toBeLessThanOrEqual(5000);
    });

    it('should handle empty strings', () => {
      expect(sanitizeInput('   ')).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('should accept valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('hello@getanchorstudio.com')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });

    it('should reject emails over 254 characters', () => {
      const longEmail = 'a'.repeat(250) + '@test.com';
      expect(validateEmail(longEmail)).toBe(false);
    });
  });

  describe('checkRateLimit', () => {
    it('should allow requests under the limit', () => {
      const key = 'test-client';
      for (let i = 0; i < 29; i++) {
        expect(checkRateLimit(key)).toBe(true);
      }
    });

    it('should block requests over the limit', () => {
      const key = 'test-client-2';
      for (let i = 0; i < 30; i++) {
        checkRateLimit(key);
      }
      expect(checkRateLimit(key)).toBe(false);
    });

    it('should reset limit after time window', () => {
      const key = 'test-client-3';
      for (let i = 0; i < 30; i++) {
        checkRateLimit(key);
      }
      
      // Simulate time passing (in real test, would use fake timers)
      jest.useFakeTimers();
      jest.advanceTimersByTime(61000); // 61 seconds
      
      expect(checkRateLimit(key)).toBe(true);
      jest.useRealTimers();
    });
  });
});
