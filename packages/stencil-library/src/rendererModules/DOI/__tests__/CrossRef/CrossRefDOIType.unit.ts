import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CrossRefDOIType } from '../../CrossRef/CrossRefDOIType';
import { DOI } from '../../DOI';

const workFixture = {
  status: 'ok',
  'message-type': 'work',
  message: {
    DOI: '10.1109/escience65000.2025.00022',
    title: ['FAIR Digital Objects in Practice'],
    author: [
      { given: 'Maximilian', family: 'Inckmann', ORCID: 'https://orcid.org/0009-0005-2800-4833' },
      { given: 'Andreas', family: 'Pfeil' },
    ],
    publisher: 'IEEE',
    type: 'journal-article',
    abstract: '<jats:p>This paper presents FDO capabilities.</jats:p>',
    URL: 'https://doi.org/10.1109/escience65000.2025.00022',
    subject: ['Computer Science'],
    published: { 'date-parts': [[2025, 1, 15]] },
    'container-title': ['IEEE eScience'],
  },
};

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
    descendants: [
      { name: 'DFG Projekt', id: 'abc123' },
    ],
  },
};

let originalFetch: typeof global.fetch;

describe('CrossRefDOIType', () => {
  const testDOI = new DOI('10.1109/escience65000.2025.00022');

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('quickCheck()', () => {
    it('returns true for valid DOI value', () => {
      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      expect(type.quickCheck()).toBe(true);
    });

    it('returns false for invalid DOI value', () => {
      const type = new CrossRefDOIType('not-a-doi');
      expect(type.quickCheck()).toBe(false);
    });
  });

  describe('hasMeaningfulInformation()', () => {
    it('returns true when fetch returns valid work info', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(true);
    });

    it('returns true when fetch returns valid funder info', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('/funders/')) {
          return Promise.resolve({
            ok: true,
            json: vi.fn().mockResolvedValue(funderFixture),
          });
        }
        return Promise.resolve({ ok: false, status: 404 });
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(true);
    });

    it('returns false when fetch returns null', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ status: 'ok' }),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(false);
    });

    it('returns false when work has empty title', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          status: 'ok',
          message: { DOI: '10.1109/escience65000.2025.00022', title: [] },
        }),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(false);
    });

    it('returns false when network error occurs', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(false);
    });
  });

  describe('init()', () => {
    it('initializes with fetched work data', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      expect(type.items.length).toBeGreaterThan(0);
      expect(type.actions.length).toBeGreaterThan(0);

      const doiItem = type.items.find(i => i.keyTitle === 'DOI');
      expect(doiItem).toBeDefined();
      expect(doiItem?.value).toBe('10.1109/escience65000.2025.00022');

      const metadataSource = type.items.find(i => i.keyTitle === 'Metadata Source');
      expect(metadataSource).toBeDefined();
      expect(metadataSource?.value).toBe('CrossRef');
    });

    it('initializes with fetched funder data', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('/funders/')) {
          return Promise.resolve({
            ok: true,
            json: vi.fn().mockResolvedValue(funderFixture),
          });
        }
        return Promise.resolve({ ok: false, status: 404 });
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const metadataSource = type.items.find(i => i.keyTitle === 'Metadata Source');
      expect(metadataSource?.value).toBe('CrossRef (Funder)');
    });

    it('returns early when info is null', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: vi.fn().mockRejectedValue(new Error('Not found')),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      expect(type.items.length).toBe(0);
      expect(type.actions.length).toBe(0);
    });

    it('creates Open Resource action when url exists', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const openResourceAction = type.actions.find(a => a.title === 'Open Resource');
      expect(openResourceAction).toBeDefined();
      expect(openResourceAction?.link).toBe('https://doi.org/10.1109/escience65000.2025.00022');
      expect(openResourceAction?.style).toBe('primary');
    });

    it('falls back to DOI URL when resource url is missing', async () => {
      const noUrlFixture = {
        status: 'ok',
        'message-type': 'work',
        message: {
          DOI: '10.1109/escience65000.2025.00022',
          title: ['Test'],
        },
      };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(noUrlFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const openResourceAction = type.actions.find(a => a.title === 'Open Resource');
      expect(openResourceAction).toBeDefined();
      expect(openResourceAction?.link).toBe('https://doi.org/10.1109/escience65000.2025.00022');
    });

    it('creates View CrossRef Metadata action for work', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const viewMetadataAction = type.actions.find(a => a.title === 'View CrossRef Metadata');
      expect(viewMetadataAction).toBeDefined();
      expect(viewMetadataAction?.link).toContain('https://api.crossref.org/works/10.1109/escience65000.2025.00022');
    });

    it('creates View CrossRef Metadata action for funder', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('/funders/')) {
          return Promise.resolve({
            ok: true,
            json: vi.fn().mockResolvedValue(funderFixture),
          });
        }
        return Promise.resolve({ ok: false, status: 404 });
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const viewMetadataAction = type.actions.find(a => a.title === 'View CrossRef Metadata');
      expect(viewMetadataAction).toBeDefined();
      expect(viewMetadataAction?.link).toContain('https://api.crossref.org/funders/10.1109/escience65000.2025.00022');
    });

    it('creates Resolve DOI action', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const resolveDOIAction = type.actions.find(a => a.title === 'Resolve DOI');
      expect(resolveDOIAction).toBeDefined();
      expect(resolveDOIAction?.link).toBe('https://doi.org/10.1109/escience65000.2025.00022');
      expect(resolveDOIAction?.style).toBe('secondary');
    });

    it('initializes from serialized data', async () => {
      const info = {
        doi: JSON.stringify({ doi: '10.1109/escience65000.2025.00022' }),
        rawMetadata: workFixture,
        type: 'work',
      };

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.hasMeaningfulInformation();
      await type.init(JSON.stringify(info));

      expect(type.items.length).toBeGreaterThan(0);
    });
  });

  describe('isResolvable()', () => {
    it('returns true when info exists with title', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.hasMeaningfulInformation();

      expect(type.isResolvable()).toBe(true);
    });

    it('returns false when info is null', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: vi.fn().mockRejectedValue(new Error('Not found')),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.hasMeaningfulInformation();

      expect(type.isResolvable()).toBe(false);
    });

    it('returns false when title is empty', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({
          status: 'ok',
          message: { DOI: '10.1109/escience65000.2025.00022', title: [] },
        }),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.hasMeaningfulInformation();

      expect(type.isResolvable()).toBe(false);
    });
  });

  describe('renderPreview()', () => {
    it('renders preview with creators and year', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });

    it('renders preview for funder type', async () => {
      global.fetch = vi.fn().mockImplementation((url: string) => {
        if (url.includes('/funders/')) {
          return Promise.resolve({
            ok: true,
            json: vi.fn().mockResolvedValue(funderFixture),
          });
        }
        return Promise.resolve({ ok: false, status: 404 });
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });

    it('renders preview with dark mode setting', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022', [
        { name: 'darkMode', value: 'dark' },
      ]);
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });

    it('renders preview with light mode setting', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022', [
        { name: 'darkMode', value: 'light' },
      ]);
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });

    it('renders preview without creators', async () => {
      const noCreatorsFixture = {
        status: 'ok',
        'message-type': 'work',
        message: {
          DOI: '10.1109/escience65000.2025.00022',
          title: ['Test Title'],
          published: { 'date-parts': [[2025]] },
        },
      };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(noCreatorsFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });
  });

  describe('getSettingsKey()', () => {
    it('returns CrossRefDOIType', () => {
      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      expect(type.getSettingsKey()).toBe('CrossRefDOIType');
    });
  });

  describe('data getter', () => {
    it('returns JSON string of info', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(workFixture),
      });

      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      await type.init();

      const data = type.data;
      expect(typeof data).toBe('string');
      const parsed = JSON.parse(data as string);
      expect(parsed).toBeDefined();
    });

    it('returns empty object JSON when info is null', () => {
      const type = new CrossRefDOIType('10.1109/escience65000.2025.00022');
      const data = type.data;
      expect(data).toBe('{}');
    });
  });
});