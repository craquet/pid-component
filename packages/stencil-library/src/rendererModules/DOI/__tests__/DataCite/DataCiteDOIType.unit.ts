import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DataCiteDOIType } from '../../DataCite/DataCiteDOIType';
import { DOI } from '../../DOI';
import * as DataCache from '../../../../utils/DataCache';

const dataCiteFixture = {
  data: {
    id: '10.5445/ir/1000185135',
    type: 'dois',
    attributes: {
      doi: '10.5445/ir/1000185135',
      titles: [{ title: 'The PID Component' }],
      creators: [{
        name: 'Inckmann, Maximilian',
        givenName: 'Maximilian',
        familyName: 'Inckmann',
        nameIdentifiers: [{
          nameIdentifier: 'https://orcid.org/0009-0005-2800-4833',
          nameIdentifierScheme: 'ORCID',
        }],
      }],
      publisher: { name: 'Karlsruhe Institute of Technology' },
      publicationYear: 2024,
      types: { resourceTypeGeneral: 'Software', resourceType: 'Software' },
      descriptions: [{ description: 'A web component for PIDs.', descriptionType: 'Abstract' }],
      url: 'https://github.com/kit-data-manager/pid-component',
      subjects: [{ subject: 'Computer Science' }],
      dates: [{ date: '2024-06-15', dateType: 'Issued' }],
    },
  },
};

let cachedFetchSpy: any;

describe('DataCiteDOIType', () => {
  const testDOI = new DOI('10.5445/ir/1000185135');

  beforeEach(() => {
    cachedFetchSpy = vi.spyOn(DataCache, 'cachedFetch');
  });

  afterEach(() => {
    cachedFetchSpy.mockRestore();
  });

  describe('quickCheck()', () => {
    it('returns true for valid DOI value', () => {
      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      expect(type.quickCheck()).toBe(true);
    });

    it('returns false for invalid DOI value', () => {
      const type = new DataCiteDOIType('not-a-doi');
      expect(type.quickCheck()).toBe(false);
    });
  });

  describe('hasMeaningfulInformation()', () => {
    it('returns true when fetch returns valid info', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(true);
    });

    it('returns false when fetch returns null', async () => {
      cachedFetchSpy.mockResolvedValue(null);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(false);
    });

    it('returns false when fetch returns empty response', async () => {
      cachedFetchSpy.mockResolvedValue({});

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(false);
    });

    it('returns false when info has empty title', async () => {
      const noTitleFixture = {
        data: {
          attributes: {
            titles: [],
          },
        },
      };
      cachedFetchSpy.mockResolvedValue(noTitleFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(false);
    });

    it('returns false when network error occurs', async () => {
      cachedFetchSpy.mockRejectedValue(new Error('Network error'));

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      const result = await type.hasMeaningfulInformation();

      expect(result).toBe(false);
    });
  });

  describe('init()', () => {
    it('initializes with fetched data', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      expect(type.items.length).toBeGreaterThan(0);
      expect(type.actions.length).toBeGreaterThan(0);

      const doiItem = type.items.find(i => i.keyTitle === 'DOI');
      expect(doiItem).toBeDefined();
      expect(doiItem?.value).toBe('10.5445/ir/1000185135');

      const metadataSource = type.items.find(i => i.keyTitle === 'Metadata Source');
      expect(metadataSource).toBeDefined();
      expect(metadataSource?.value).toBe('DataCite');
    });

    it('returns early when info is null', async () => {
      cachedFetchSpy.mockResolvedValue(null);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      expect(type.items.length).toBe(0);
      expect(type.actions.length).toBe(0);
    });

    it('returns early when response has no data', async () => {
      cachedFetchSpy.mockResolvedValue({});

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      expect(type.items.length).toBe(0);
      expect(type.actions.length).toBe(0);
    });

    it('creates Open Resource action when url exists', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      const openResourceAction = type.actions.find(a => a.title === 'Open Resource');
      expect(openResourceAction).toBeDefined();
      expect(openResourceAction?.link).toBe('https://github.com/kit-data-manager/pid-component');
      expect(openResourceAction?.style).toBe('primary');
    });

    it('falls back to DOI URL when resource url is missing', async () => {
      const noUrlFixture = {
        data: {
          attributes: {
            titles: [{ title: 'Test' }],
          },
        },
      };
      cachedFetchSpy.mockResolvedValue(noUrlFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      const openResourceAction = type.actions.find(a => a.title === 'Open Resource');
      expect(openResourceAction).toBeDefined();
      expect(openResourceAction?.link).toBe('https://doi.org/10.5445/ir/1000185135');
    });

    it('creates View DataCite Metadata action', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      const viewMetadataAction = type.actions.find(a => a.title === 'View DataCite Metadata');
      expect(viewMetadataAction).toBeDefined();
      expect(viewMetadataAction?.link).toContain('https://api.datacite.org/dois/10.5445%2Fir%2F1000185135');
    });

    it('creates Resolve DOI action', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      const resolveDOIAction = type.actions.find(a => a.title === 'Resolve DOI');
      expect(resolveDOIAction).toBeDefined();
      expect(resolveDOIAction?.link).toBe('https://doi.org/10.5445/ir/1000185135');
      expect(resolveDOIAction?.style).toBe('secondary');
    });

    it('initializes from serialized data', async () => {
      const info = {
        doi: JSON.stringify({ doi: '10.5445/ir/1000185135' }),
        rawMetadata: dataCiteFixture,
      };

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.hasMeaningfulInformation();
      await type.init(JSON.stringify(info));

      expect(type.items.length).toBeGreaterThan(0);
    });
  });

  describe('isResolvable()', () => {
    it('returns true when info exists with title', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.hasMeaningfulInformation();

      expect(type.isResolvable()).toBe(true);
    });

    it('returns false when info is null', async () => {
      cachedFetchSpy.mockResolvedValue(null);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.hasMeaningfulInformation();

      expect(type.isResolvable()).toBe(false);
    });

    it('returns false when title is empty', async () => {
      const noTitleFixture = {
        data: {
          attributes: {
            titles: [],
          },
        },
      };
      cachedFetchSpy.mockResolvedValue(noTitleFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.hasMeaningfulInformation();

      expect(type.isResolvable()).toBe(false);
    });
  });

  describe('renderPreview()', () => {
    it('renders preview with creators and year', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });

    it('renders preview with dark mode setting', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135', [
        { name: 'darkMode', value: 'dark' },
      ]);
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });

    it('renders preview with light mode setting', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135', [
        { name: 'darkMode', value: 'light' },
      ]);
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });

    it('renders preview without creators', async () => {
      const noCreatorsFixture = {
        data: {
          attributes: {
            titles: [{ title: 'Test Title' }],
            publicationYear: 2024,
          },
        },
      };
      cachedFetchSpy.mockResolvedValue(noCreatorsFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      const preview = type.renderPreview();
      expect(preview).toBeDefined();
    });
  });

  describe('getSettingsKey()', () => {
    it('returns DataCiteDOIType', () => {
      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      expect(type.getSettingsKey()).toBe('DataCiteDOIType');
    });
  });

  describe('data getter', () => {
    it('returns JSON string of info', async () => {
      cachedFetchSpy.mockResolvedValue(dataCiteFixture);

      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      await type.init();

      const data = type.data;
      expect(typeof data).toBe('string');
      const parsed = JSON.parse(data as string);
      expect(parsed).toBeDefined();
    });

    it('returns empty object JSON when info is null', () => {
      const type = new DataCiteDOIType('10.5445/ir/1000185135');
      const data = type.data;
      expect(data).toBe('{}');
    });
  });
});