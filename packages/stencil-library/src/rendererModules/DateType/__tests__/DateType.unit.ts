import { describe, expect, it } from 'vitest';
import { DateType } from '../DateType';
import { DATE_examples } from '../../../../../../examples';

describe('DateType', () => {
  describe('quickCheck()', () => {
    it('returns true for valid ISO 8601 with positive timezone offset', () => {
      const dt = new DateType(DATE_examples.ISO_8601_ALT);
      expect(dt.quickCheck()).toBe(true);
    });

    it('returns true for valid ISO 8601 with Z (UTC) timezone', () => {
      const dt = new DateType(DATE_examples.ISO_8601);
      expect(dt.quickCheck()).toBe(true);
    });

    it('returns true for valid ISO 8601 with negative timezone offset', () => {
      const dt = new DateType('2024-01-01T00:00:00-05:00');
      expect(dt.quickCheck()).toBe(true);
    });

    it('returns false for plain date without time', () => {
      const dt = new DateType(DATE_examples.DATE_ONLY);
      expect(dt.quickCheck()).toBe(false);
    });

    it('returns false for random text', () => {
      const dt = new DateType(DATE_examples.INVALID_NOT_A_DATE);
      expect(dt.quickCheck()).toBe(false);
    });

    it('returns false for date with time but no timezone', () => {
      const dt = new DateType(DATE_examples.INVALID_NO_TIMEZONE);
      expect(dt.quickCheck()).toBe(false);
    });

    it('returns false for empty string', () => {
      const dt = new DateType(DATE_examples.INVALID_EMPTY);
      expect(dt.quickCheck()).toBe(false);
    });
  });

  describe('hasMeaningfulInformation()', () => {
    it('matches quickCheck() result for a valid date', async () => {
      const dt = new DateType(DATE_examples.ISO_8601_ALT);
      const quick = dt.quickCheck();
      const full = await dt.hasMeaningfulInformation();
      expect(full).toBe(quick);
    });

    it('matches quickCheck() result for an invalid date', async () => {
      const dt = new DateType(DATE_examples.INVALID_NOT_A_DATE);
      const quick = dt.quickCheck();
      const full = await dt.hasMeaningfulInformation();
      expect(full).toBe(quick);
    });
  });

  describe('getSettingsKey()', () => {
    it('returns "DateType"', () => {
      const dt = new DateType(DATE_examples.ISO_8601);
      expect(dt.getSettingsKey()).toBe('DateType');
    });
  });

  describe('init()', () => {
    it('completes without error for a valid date', async () => {
      const dt = new DateType(DATE_examples.ISO_8601_ALT);
      await expect(dt.init()).resolves.toBeUndefined();
    });
  });

  describe('constructor', () => {
    it('stores the value', () => {
      const dt = new DateType(DATE_examples.ISO_8601);
      expect(dt.value).toBe(DATE_examples.ISO_8601);
    });
  });
});
