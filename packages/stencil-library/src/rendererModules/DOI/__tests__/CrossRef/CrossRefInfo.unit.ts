import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CrossRefInfo } from '../../CrossRef/CrossRefInfo';
import { DOI } from '../../DOI';
import { DOI_examples, ORCID_examples } from '../../../../../../examples';
import crossRefFixture from '../../../../../../../examples/fixtures/doi-crossref.json';

let originalFetch: typeof global.fetch;

describe('CrossRefInfo', () => {
  const testDOI = new DOI(DOI_examples.CROSSREF_JOURNAL_PAPER);

  describe('fetch()', () => {

    beforeEach(() => {
      originalFetch = global.fetch;
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('parses a CrossRef API response from fixture data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(crossRefFixture),
      });

      const info = await CrossRefInfo.fetch(testDOI);

      expect(info).not.toBeNull();
      expect(info.title).toBe('FAIR Digital Objects in Practice');
      expect(info.publisher).toBe('IEEE');
      expect(info.resourceType).toBe('journal-article');
      expect(info.url).toBe(`https://doi.org/${DOI_examples.CROSSREF_JOURNAL_PAPER}`);
    });

    it('extracts creators correctly', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(crossRefFixture),
      });

      const info = await CrossRefInfo.fetch(testDOI);

      expect(info.creators).toHaveLength(2);
      expect(info.creators[0].name).toBe('Maximilian Inckmann');
      expect(info.creators[0].givenName).toBe('Maximilian');
      expect(info.creators[0].familyName).toBe('Inckmann');
      expect(info.creators[0].orcid).toBe(ORCID_examples.VALID_SECOND);
      expect(info.creators[1].name).toBe('Andreas Pfeil');
    });

    it('extracts publication date correctly', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(crossRefFixture),
      });

      const info = await CrossRefInfo.fetch(testDOI);

      expect(info.publicationDate).toBe('2025-01-15');
    });

    it('extracts subjects correctly', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(crossRefFixture),
      });

      const info = await CrossRefInfo.fetch(testDOI);

      expect(info.subjects).toContain('Computer Science');
    });

    it('parses JATS abstract', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(crossRefFixture),
      });

      const info = await CrossRefInfo.fetch(testDOI);

      expect(info.description).toBeDefined();
      // JATS tags should be cleaned up
      expect(info.description).not.toContain('<jats:p>');
      expect(info.description).toContain('This paper presents FDO capabilities.');
    });

    it('returns null when API returns no data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: vi.fn().mockRejectedValue(new Error('Not found')),
      });

      const info = await CrossRefInfo.fetch(testDOI);

      expect(info).toBeNull();
    });

    it('returns null when API returns empty message', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ status: 'ok' }),
      });

      const info = await CrossRefInfo.fetch(testDOI);

      expect(info).toBeNull();
    });

    it('returns null on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const info = await CrossRefInfo.fetch(testDOI);

      expect(info).toBeNull();
    });
  });

  describe('generateItems()', () => {
    it('creates FoldableItems from fixture data', () => {
      const info = new CrossRefInfo(testDOI, crossRefFixture as any);
      const items = info.generateItems();

      // Should have Title, Corresponding Author, Author, Publisher, Publication Date, Resource Type, Abstract, Subject
      expect(items.length).toBeGreaterThanOrEqual(5);

      const titleItem = items.find(i => i.keyTitle === 'Title');
      expect(titleItem).toBeDefined();
      expect(titleItem.value).toBe('FAIR Digital Objects in Practice');

      const publisherItem = items.find(i => i.keyTitle === 'Publisher');
      expect(publisherItem).toBeDefined();
      expect(publisherItem.value).toBe('IEEE');

      const dateItem = items.find(i => i.keyTitle === 'Publication Date');
      expect(dateItem).toBeDefined();
      expect(dateItem.value).toBe('2025-01-15');
    });

    it('includes corresponding author item', () => {
      const info = new CrossRefInfo(testDOI, crossRefFixture as any);
      const items = info.generateItems();

      const correspondingItem = items.find(i => i.keyTitle === 'Corresponding Author');
      expect(correspondingItem).toBeDefined();
    });
  });

  describe('fromObject()', () => {
    it('reconstructs a CrossRefInfo from a serialized object', () => {
      const original = new CrossRefInfo(testDOI, crossRefFixture as any);
      const serialized = original.toObject();
      const restored = CrossRefInfo.fromObject(testDOI, serialized);

      expect(restored.title).toBe(original.title);
      expect(restored.publisher).toBe(original.publisher);
      expect(restored.resourceType).toBe(original.resourceType);
      expect(restored.creators).toEqual(original.creators);
    });
  });

  describe('toObject()', () => {
    it('serializes the CrossRefInfo to an object', () => {
      const info = new CrossRefInfo(testDOI, crossRefFixture as any);
      const obj = info.toObject();

      expect(obj.doi).toBeDefined();
      expect(obj.rawMetadata).toEqual(crossRefFixture);
    });
  });

  describe('correspondingAuthor', () => {
    it('returns the first author as corresponding', () => {
      const info = new CrossRefInfo(testDOI, crossRefFixture as any);
      const corresponding = info.correspondingAuthor;

      expect(corresponding).toBeDefined();
      expect(corresponding.name).toBe('Maximilian Inckmann');
      expect(corresponding.isCorresponding).toBe(true);
    });

    it('returns undefined when no authors exist', () => {
      const emptyResponse = { message: { title: ['Test'] } };
      const info = new CrossRefInfo(testDOI, emptyResponse as any);

      expect(info.correspondingAuthor).toBeUndefined();
    });
  });

  describe('property getters with missing data', () => {
    const emptyResponse = { message: {} };
    const info = new CrossRefInfo(testDOI, emptyResponse as any);

    it('returns empty string for missing title', () => {
      expect(info.title).toBe('');
    });

    it('returns empty array for missing creators', () => {
      expect(info.creators).toEqual([]);
    });

    it('returns undefined for missing publisher', () => {
      expect(info.publisher).toBeUndefined();
    });

    it('returns undefined for missing publicationDate', () => {
      expect(info.publicationDate).toBeUndefined();
    });

    it('returns undefined for missing resourceType', () => {
      expect(info.resourceType).toBeUndefined();
    });

    it('returns empty array for missing subjects', () => {
      expect(info.subjects).toEqual([]);
    });

    it('falls back to DOI URL for missing url', () => {
      expect(info.url).toBe(testDOI.toURL());
    });

    it('returns rawMetadata correctly', () => {
      expect(info.rawMetadata).toEqual(emptyResponse);
    });
  });

  describe('publicationDate edge cases', () => {
    it('handles year only in published', () => {
      const yearOnlyResponse = {
        message: {
          title: ['Test'],
          published: { 'date-parts': [[2025]] },
        },
      };
      const info = new CrossRefInfo(testDOI, yearOnlyResponse as any);
      expect(info.publicationDate).toBe('2025');
    });

    it('handles year-month in published', () => {
      const yearMonthResponse = {
        message: {
          title: ['Test'],
          published: { 'date-parts': [[2025, 3]] },
        },
      };
      const info = new CrossRefInfo(testDOI, yearMonthResponse as any);
      expect(info.publicationDate).toBe('2025-03');
    });
  });

  describe('funder type', () => {
    const funderFixture = {
      status: 'ok',
      'message-type': 'funder',
      message: {
        name: 'Deutsche Forschungsgemeinschaft',
        location: 'Germany',
        established: 1951,
        'alternate-name': ['DFG', 'German Research Foundation'],
        url: 'https://www.dfg.de',
        id: '501100001659',
        'hierarchy-names': {
          '501100001659': 'Deutsche Forschungsgemeinschaft',
        },
        hierarchy: {
          '501100001659': {},
        },
        'replaced-by': [],
        replaces: [],
        descendants: [
          { name: 'DFG Projekt', id: 'abc123' },
        ],
      },
    };

    it('creates CrossRefInfo with funder type', () => {
      const info = new CrossRefInfo(testDOI, funderFixture as any, 'funder');

      expect(info.type).toBe('funder');
      expect(info.title).toBe('Deutsche Forschungsgemeinschaft');
      expect(info.resourceType).toBe('Funder');
      expect(info.url).toBe('https://www.dfg.de');
    });

    it('returns empty arrays for work-specific fields on funder', () => {
      const info = new CrossRefInfo(testDOI, funderFixture as any, 'funder');

      expect(info.creators).toEqual([]);
      expect(info.publishers).toBeUndefined();
      expect(info.description).toBeUndefined();
    });

    it('generates funder items correctly', () => {
      const info = new CrossRefInfo(testDOI, funderFixture as any, 'funder');
      const items = info.generateItems();

      const nameItem = items.find(i => i.keyTitle === 'Name');
      expect(nameItem?.value).toBe('Deutsche Forschungsgemeinschaft');

      const locationItem = items.find(i => i.keyTitle === 'Location');
      expect(locationItem?.value).toBe('Germany');

      const establishedItem = items.find(i => i.keyTitle === 'Established');
      expect(establishedItem?.value).toBe('1951');

      const idItem = items.find(i => i.keyTitle === 'CrossRef Funder ID');
      expect(idItem?.value).toBe('501100001659');

      const websiteItem = items.find(i => i.keyTitle === 'Website');
      expect(websiteItem?.value).toBe('https://www.dfg.de');

      const altNamesItem = items.find(i => i.keyTitle === 'Alternate Names');
      expect(altNamesItem?.value).toBe('DFG, German Research Foundation');

      const hierarchyItem = items.find(i => i.keyTitle === 'Hierarchy');
      expect(hierarchyItem?.value).toContain('Deutsche Forschungsgemeinschaft');

      const descendantsItem = items.find(i => i.keyTitle === 'Descendants');
      expect(descendantsItem?.value).toContain('DFG Projekt');

      expect(items.find(i => i.keyTitle === 'DOI URI')).toBeUndefined();
      expect(items.find(i => i.keyTitle === 'Work Count')).toBeUndefined();
      expect(items.find(i => i.keyTitle === 'Descendant Work Count')).toBeUndefined();
    });

    it('handles funder with hierarchy names', () => {
      const info = new CrossRefInfo(testDOI, funderFixture as any, 'funder');
      const items = info.generateItems();

      const hierarchyItem = items.find(i => i.keyTitle === 'Hierarchy');
      expect(hierarchyItem?.value).toContain('501100001659');
    });

    it('handles funder with descendants', () => {
      const info = new CrossRefInfo(testDOI, funderFixture as any, 'funder');
      const items = info.generateItems();

      const descendantsItem = items.find(i => i.keyTitle === 'Descendants');
      expect(descendantsItem?.value).toContain('DFG Projekt');
      expect(descendantsItem?.value).not.toContain('abc123');
    });

    it('omits empty optional fields', () => {
      const minimalFixture = {
        status: 'ok',
        'message-type': 'funder',
        message: {
          name: 'Minimal Funder',
          id: '12345',
        },
      };
      const info = new CrossRefInfo(testDOI, minimalFixture as any, 'funder');
      const items = info.generateItems();

      expect(items.find(i => i.keyTitle === 'Location')).toBeUndefined();
      expect(items.find(i => i.keyTitle === 'Established')).toBeUndefined();
    });
  });

  describe('ORCID and ROR extraction', () => {
    it('extracts ORCID from author', () => {
      const response = {
        message: {
          title: ['Test'],
          author: [
            {
              given: 'John',
              family: 'Doe',
              ORCID: 'https://orcid.org/0000-0002-1825-0097',
            },
          ],
        },
      };
      const info = new CrossRefInfo(testDOI, response as any);

      expect(info.creators[0].orcid).toBe('0000-0002-1825-0097');
    });

    it('handles author with no ORCID', () => {
      const response = {
        message: {
          title: ['Test'],
          author: [
            {
              given: 'John',
              family: 'Doe',
            },
          ],
        },
      };
      const info = new CrossRefInfo(testDOI, response as any);

      expect(info.creators[0].orcid).toBeUndefined();
      expect(info.creators[0].name).toBe('John Doe');
    });

    it('extracts affiliation name', () => {
      const response = {
        message: {
          title: ['Test'],
          author: [
            {
              name: 'Jane Doe',
              affiliation: [{ name: 'Karlsruhe Institute of Technology' }],
            },
          ],
        },
      };
      const info = new CrossRefInfo(testDOI, response as any);

      expect(info.creators[0].affiliation).toBe('Karlsruhe Institute of Technology');
    });

    it('CrossRef does not provide ROR directly', () => {
      const response = {
        message: {
          title: ['Test'],
          author: [
            {
              name: 'Jane Doe',
              affiliation: [{ name: 'KIT' }],
            },
          ],
        },
      };
      const info = new CrossRefInfo(testDOI, response as any);

      expect(info.creators[0].ror).toBeUndefined();
    });
  });
});
