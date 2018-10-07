import { emailRegex } from './validation';

describe('Services Helpers Validation', () => {
  describe('Email Regex', () => {
    it('should return true when testing well formed email', () => {
      expect(emailRegex.test('test@gmail.com')).toBe(true);
    });

    it('sould return true if it contains 2 prefixes', () => {
      expect(emailRegex.test('test.test@test.fr')).toBe(true);
    });

    it('sould return false if it lacks a prefix', () => {
      expect(emailRegex.test('@gmail.com')).toBe(false);
    });

    it('sould return false if it lacks a suffix', () => {
      expect(emailRegex.test('test.com')).toBe(false);
    });

    it('sould return false if there is number in the suffix', () => {
      expect(emailRegex.test('test@test.2r')).toBe(false);
    });
  });
});
