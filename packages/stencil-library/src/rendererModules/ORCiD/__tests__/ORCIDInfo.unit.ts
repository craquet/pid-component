import { describe, expect, it, vi } from 'vitest';
import { ORCIDInfo } from '../ORCIDInfo';
import { ORCID_examples } from '../../../../../../examples';

// Mock the cachedFetch dependency to prevent real network calls
vi.mock('../../../utils/DataCache', () => ({
  cachedFetch: vi.fn(),
}));

describe('ORCIDInfo', () => {
  describe('isORCiD()', () => {
    it('returns true for a bare ORCiD', () => {
      expect(ORCIDInfo.isORCiD(ORCID_examples.VALID)).toBe(true);
    });

    it('returns true for ORCiD with https://orcid.org/ prefix', () => {
      expect(ORCIDInfo.isORCiD(ORCID_examples.VALID_WITH_HTTPS)).toBe(true);
    });

    it('returns true for ORCiD ending with X', () => {
      expect(ORCIDInfo.isORCiD(ORCID_examples.VALID_THIRD + 'X')).toBe(true);
    });

    it('returns false for random text', () => {
      expect(ORCIDInfo.isORCiD('not-an-orcid')).toBe(false);
    });

    it('returns false for too-short numeric segments', () => {
      expect(ORCIDInfo.isORCiD('1234-5678')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(ORCIDInfo.isORCiD('')).toBe(false);
    });
  });

  describe('constructor and getters', () => {
    const info = new ORCIDInfo(
      ORCID_examples.VALID,
      { raw: 'json' },
      'Doe',
      ['Jane'],
      [],
      'en',
      'A biography',
      [{ email: 'jane@example.com', primary: true, verified: true }],
      [{ content: 'science', index: 0 }],
      [{ url: 'https://example.com', name: 'Website', index: 0 }],
      'US',
    );

    it('returns the orcid', () => {
      expect(info.orcid).toBe(ORCID_examples.VALID);
    });

    it('returns the family name', () => {
      expect(info.familyName).toBe('Doe');
    });

    it('returns the given names', () => {
      expect(info.givenNames).toEqual(['Jane']);
    });

    it('returns the biography', () => {
      expect(info.biography).toBe('A biography');
    });

    it('returns the country', () => {
      expect(info.country).toBe('US');
    });

    it('returns the preferred locale', () => {
      expect(info.preferredLocale).toBe('en');
    });

    it('returns the raw JSON', () => {
      expect(info.ORCiDJSON).toEqual({ raw: 'json' });
    });

    it('returns emails', () => {
      expect(info.emails).toHaveLength(1);
      expect(info.emails[0].email).toBe('jane@example.com');
    });

    it('returns keywords', () => {
      expect(info.keywords).toHaveLength(1);
      expect(info.keywords[0].content).toBe('science');
    });

    it('returns researcher URLs', () => {
      expect(info.researcherUrls).toHaveLength(1);
      expect(info.researcherUrls[0].url).toBe('https://example.com');
    });
  });
});
