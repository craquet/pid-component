import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ISBNType } from '../ISBNType';
import { ISBN_examples } from '../../../../../../examples';

describe('ISBNType', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn() as unknown as typeof fetch;
  });

  afterEach(() => {
    delete (global as { fetch?: typeof fetch }).fetch;
  });

  describe('quickCheck()', () => {
    it('returns true for valid ISBN-13 with hyphens', () => {
      const renderer = new ISBNType(ISBN_examples.VALID_13_HYPHENATED);
      expect(renderer.quickCheck()).toBe(true);
    });

    it('returns true for valid ISBN-10', () => {
      const renderer = new ISBNType(ISBN_examples.VALID_10);
      expect(renderer.quickCheck()).toBe(true);
    });

    it('returns true for valid ISBN-10 with X checksum', () => {
      const renderer = new ISBNType(ISBN_examples.VALID_10_X_CHECKSUM);
      expect(renderer.quickCheck()).toBe(true);
    });

    it('returns false for ISBN with invalid checksum', () => {
      const renderer = new ISBNType(ISBN_examples.INVALID_13_CHECKSUM);
      expect(renderer.quickCheck()).toBe(false);
    });

    it('returns false for non-isbn values', () => {
      const renderer = new ISBNType(ISBN_examples.INVALID_NOT_ISBN);
      expect(renderer.quickCheck()).toBe(false);
    });
  });

  describe('getSettingsKey()', () => {
    it('returns ISBNType', () => {
      const renderer = new ISBNType(ISBN_examples.VALID_13_HYPHENATED);
      expect(renderer.getSettingsKey()).toBe('ISBNType');
    });
  });

  describe('hasMeaningfulInformation()', () => {
    it('returns true when OpenLibrary provides meaningful metadata', async () => {
      (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          'ISBN:9781449373320': {
            title: 'Designing Data-Intensive Applications',
            authors: [{ name: 'Martin Kleppmann' }],
            publish_date: '2017',
            publishers: [{ name: 'O’Reilly Media' }],
            thumbnail_url: 'https://covers.openlibrary.org/b/id/8434671-S.jpg',
          },
        }),
      });

      const renderer = new ISBNType(ISBN_examples.VALID_13_HYPHENATED);
      const result = await renderer.hasMeaningfulInformation();

      expect(result).toBe(true);
    });

    it('returns false when OpenLibrary response is empty', async () => {
      (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      });

      const renderer = new ISBNType(ISBN_examples.VALID_13_HYPHENATED);
      const result = await renderer.hasMeaningfulInformation();

      expect(result).toBe(false);
    });
  });

  describe('init()', () => {
    it('creates foldable items and actions for valid metadata', async () => {
      (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          'ISBN:9781449373320': {
            title: 'Designing Data-Intensive Applications',
            subtitle: 'The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',
            authors: [{ name: 'Martin Kleppmann' }],
            publish_date: '2017',
            publishers: [{ name: 'O’Reilly Media' }],
            preview_url: '/books/OL26780701M',
            thumbnail_url: 'https://covers.openlibrary.org/b/id/8434671-S.jpg',
            description: { value: 'A practical guide to modern data systems.' },
          },
        }),
      });

      const renderer = new ISBNType(ISBN_examples.VALID_13_HYPHENATED);
      await renderer.init();

      expect(renderer.items.find(i => i.keyTitle === 'Title')?.value).toBe('Designing Data-Intensive Applications');
      expect(renderer.items.find(i => i.keyTitle === 'Author')?.value).toContain('Martin Kleppmann');
      expect(renderer.actions.find(a => a.title === 'View on OpenLibrary')).toBeDefined();
      expect(renderer.actions.find(a => a.title === 'Open Preview')).toBeDefined();
    });

  });

  describe('render methods', () => {
    it('returns a preview component', () => {
      const renderer = new ISBNType(ISBN_examples.VALID_13_HYPHENATED);
      expect(renderer.renderPreview()).toBeTruthy();
    });

    it('returns a body component when cover image is present', async () => {
      (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          'ISBN:9781449373320': {
            title: 'Designing Data-Intensive Applications',
            authors: [{ name: 'Martin Kleppmann' }],
            thumbnail_url: 'https://covers.openlibrary.org/b/id/8434671-S.jpg',
          },
        }),
      });

      const renderer = new ISBNType(ISBN_examples.VALID_13_HYPHENATED);
      await renderer.init();
      expect(renderer.renderBody()).toBeTruthy();
    });
  });

  describe('data getter', () => {
    it('returns serialized isbn metadata after init', async () => {
      (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          'ISBN:9781449373320': {
            title: 'Designing Data-Intensive Applications',
            authors: [{ name: 'Martin Kleppmann' }],
            publish_date: '2017',
            publishers: [{ name: 'O’Reilly Media' }],
          },
        }),
      });

      const renderer = new ISBNType(ISBN_examples.VALID_13_HYPHENATED);
      await renderer.init();
      const data = renderer.data;
      expect(typeof data).toBe('string');
      const parsed = JSON.parse(data);
      expect(parsed.isbn).toBe('9781449373320');
    });
  });
});
