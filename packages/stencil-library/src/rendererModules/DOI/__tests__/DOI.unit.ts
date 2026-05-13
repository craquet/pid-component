import { describe, expect, it } from 'vitest';
import { DOI } from '../DOI';
import { DOI_examples } from '../../../../../../examples';

describe('DOI', () => {
  describe('isDOI()', () => {
    it('returns true for a bare DOI string', () => {
      expect(DOI.isDOI(DOI_examples.VALID_BARE)).toBe(true);
    });

    it('returns true for DOI with https://doi.org/ prefix', () => {
      expect(DOI.isDOI(DOI_examples.DATACITE_SOFTWARE)).toBe(true);
    });

    it('returns true for DOI with doi: prefix', () => {
      expect(DOI.isDOI('doi:' + DOI_examples.DATACITE_SOFTWARE.replace('https://doi.org/', ''))).toBe(true);
    });

    it('returns true for DOI with dx.doi.org prefix', () => {
      expect(DOI.isDOI('https://dx.doi.org/' + DOI_examples.VALID_BARE)).toBe(true);
    });

    it('returns false for non-DOI string', () => {
      expect(DOI.isDOI(DOI_examples.INVALID_NOT_A_DOI)).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(DOI.isDOI(DOI_examples.INVALID_EMPTY)).toBe(false);
    });

    it('returns false for a URL without DOI prefix', () => {
      expect(DOI.isDOI('https://example.com/something')).toBe(false);
    });

    it('returns true for DOI with slashes in suffix', () => {
      expect(DOI.isDOI(DOI_examples.DATACITE_SLIDES)).toBe(true);
    });

    it('returns true for DOI with multiple slashes in suffix', () => {
      expect(DOI.isDOI('10.1234/a/b/c/d/e')).toBe(true);
    });
  });

  describe('getDOIFromString()', () => {
    it('strips https://doi.org/ prefix', () => {
      const doi = DOI.getDOIFromString(DOI_examples.DATACITE_SOFTWARE);
      expect(doi.doi).toBe(DOI_examples.DATACITE_SOFTWARE.replace('https://doi.org/', ''));
    });

    it('strips doi: prefix', () => {
      const doi = DOI.getDOIFromString('doi:' + DOI_examples.CROSSREF_BOOK.replace('doi:', ''));
      expect(doi.doi).toBe(DOI_examples.CROSSREF_BOOK.replace('doi:', ''));
    });

    it('keeps bare DOI unchanged', () => {
      const doi = DOI.getDOIFromString(DOI_examples.VALID_BARE);
      expect(doi.doi).toBe(DOI_examples.VALID_BARE);
    });

    it('throws for invalid DOI', () => {
      expect(() => DOI.getDOIFromString(DOI_examples.INVALID_NOT_A_DOI)).toThrow('Invalid DOI format');
    });

    it('preserves slashes in the suffix', () => {
      const doi = DOI.getDOIFromString(DOI_examples.DATACITE_SLIDES);
      expect(doi.doi).toBe(DOI_examples.DATACITE_SLIDES);
      expect(doi.toString()).toBe(DOI_examples.DATACITE_SLIDES);
    });

    it('preserves multiple slashes in the suffix', () => {
      const doi = DOI.getDOIFromString('10.1234/a/b/c/d/e');
      expect(doi.doi).toBe('10.1234/a/b/c/d/e');
      expect(doi.toString()).toBe('10.1234/a/b/c/d/e');
    });
  });

  describe('toURL()', () => {
    it('returns a valid doi.org URL', () => {
      const doi = new DOI(DOI_examples.VALID_BARE);
      expect(doi.toURL()).toBe(`https://doi.org/${DOI_examples.VALID_BARE}`);
    });

    it('strips prefix before building URL', () => {
      const doi = new DOI(DOI_examples.DATACITE_SOFTWARE);
      expect(doi.toURL()).toBe(DOI_examples.DATACITE_SOFTWARE);
    });
  });

  describe('toString()', () => {
    it('returns the cleaned DOI string', () => {
      const doi = new DOI(DOI_examples.VALID_BARE);
      expect(doi.toString()).toBe(DOI_examples.VALID_BARE);
    });

    it('strips prefix in toString', () => {
      const doi = new DOI('doi:' + DOI_examples.DATACITE_SOFTWARE.replace('https://doi.org/', ''));
      expect(doi.toString()).toBe(DOI_examples.DATACITE_SOFTWARE.replace('https://doi.org/', ''));
    });
  });

  describe('constructor', () => {
    it('strips trailing dots', () => {
      const doi = new DOI(DOI_examples.VALID_BARE + '.');
      expect(doi.doi).toBe(DOI_examples.VALID_BARE);
    });

    it('trims whitespace', () => {
      const doi = new DOI('  ' + DOI_examples.VALID_BARE + '  ');
      expect(doi.doi).toBe(DOI_examples.VALID_BARE);
    });
  });

  describe('fromJSON()', () => {
    it('round-trips through toObject / fromJSON', () => {
      const original = new DOI(DOI_examples.VALID_BARE);
      const serialized = JSON.stringify(original.toObject());
      const restored = DOI.fromJSON(serialized);
      expect(restored.doi).toBe(original.doi);
    });
  });
});
