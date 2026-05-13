import { DOI } from '../DOI';
import { FoldableItem } from '../../../utils/FoldableItem';
import { Creator } from '../DataCite/DataCiteInfo';
import { beautifyResourceType } from '../ResourceTypeIcons';

/** CrossRef API response shape for works */
interface CrossRefMessage {
  title?: string[];
  subtitle?: string[];
  author?: Array<{
    given?: string;
    family?: string;
    name?: string;
    ORCID?: string;
    affiliation?: Array<{
      name?: string;
    }>;
    sequence?: string;
  }>;
  publisher?: string;
  published?: {
    'date-parts'?: number[][];
  };
  created?: {
    'date-parts'?: number[][];
  };
  issued?: {
    'date-parts'?: number[][];
  };
  type?: string;
  abstract?: string;
  URL?: string;
  resource?: {
    primary?: {
      URL?: string;
    };
  };
  subject?: string[];
}

/** CrossRef API response shape for funders */
interface FunderMessage {
  name?: string;
  location?: string;
  established?: number;
  'alternate-name'?: string[];
  url?: string;
  id?: string;
  uri?: string;
  'work-count'?: number;
  'descendant-work-count'?: number;
  'hierarchy-names'?: Record<string, string>;
  hierarchy?: Record<string, unknown>;
  'replaced-by'?: Array<{ name?: string; id?: string }>;
  replaces?: Array<{ name?: string; id?: string }>;
  descendants?: Array<{ name?: string; id?: string }>;
  tokens?: string[];
  'last-modified'?: {
    date?: string;
  };
  deleted?: {
    date?: string;
    reason?: string;
  };
  'relationship-type'?: string;
}

interface CrossRefResponse {
  status: 'ok' | 'error';
  'message-type'?: string;
  'message-version'?: string;
  message: CrossRefMessage | string;
}

interface FunderResponse {
  status: 'ok' | 'error';
  'message-type'?: string;
  'message-version'?: string;
  message: FunderMessage | string;
}

export type CrossRefInfoType = 'work' | 'funder';

export class CrossRefInfo {
  private readonly _rawMetadata: object;
  private readonly _doi: DOI;
  private readonly _message: CrossRefMessage;
  private readonly _type: CrossRefInfoType;

  constructor(doi: DOI, response: CrossRefResponse | FunderResponse, type: CrossRefInfoType = 'work') {
    this._doi = doi;
    this._type = type;
    this._rawMetadata = response;
    if (type === 'funder') {
      this._message = {} as CrossRefMessage;
    } else {
      const cr = response as CrossRefResponse;
      this._message = typeof cr.message === 'string' ? {} as CrossRefMessage : cr.message || {} as CrossRefMessage;
    }
  }

  get type(): CrossRefInfoType {
    return this._type;
  }

  get title(): string {
    if (this._type === 'funder') {
      const funderResponse = this._rawMetadata as FunderResponse;
      const funderMsg = typeof funderResponse.message === 'string' ? null : funderResponse.message;
      return funderMsg?.name || '';
    }
    const titles = this._message.title || [];
    return titles[0] || '';
  }

  get creators(): Creator[] {
    if (this._type === 'funder') return [];
    const authors = this._message.author || [];
    return authors.map((author) => {
      const result: Creator = {
        name: author.name || '',
        givenName: author.given,
        familyName: author.family,
      };

      if (!result.name) {
        if (author.given && author.family) {
          result.name = `${author.given} ${author.family}`;
        } else {
          result.name = author.given || author.family || '';
        }
      }

      if (author.ORCID) {
        result.orcid = author.ORCID.replace(/^https?:\/\/orcid\.org\//i, '');
      }

      if (author.affiliation && author.affiliation.length > 0) {
        result.affiliation = author.affiliation[0].name;
      }

      return result;
    }).filter((c) => c.name);
  }

  get correspondingAuthor(): Creator | undefined {
    if (this._type === 'funder') return undefined;
    const authors = this._message.author || [];
    const firstAuthor = authors.find((a) => a.sequence === 'first') || authors[0];
    if (!firstAuthor) return undefined;

    const result: Creator = {
      name: firstAuthor.name || '',
      givenName: firstAuthor.given,
      familyName: firstAuthor.family,
      isCorresponding: true,
    };

    if (!result.name) {
      if (firstAuthor.given && firstAuthor.family) {
        result.name = `${firstAuthor.given} ${firstAuthor.family}`;
      } else {
        result.name = firstAuthor.given || firstAuthor.family || '';
      }
    }

    if (firstAuthor.ORCID) {
      result.orcid = firstAuthor.ORCID.replace(/^https?:\/\/orcid\.org\//i, '');
    }

    if (firstAuthor.affiliation && firstAuthor.affiliation.length > 0) {
      result.affiliation = firstAuthor.affiliation[0].name;
    }

    return result;
  }

  get publisher(): string | undefined {
    if (this._type === 'funder') return undefined;
    return this._message.publisher;
  }

  get publicationDate(): string | undefined {
    if (this._type === 'funder') {
      const funderResponse = this._rawMetadata as FunderResponse;
      const funderMsg = typeof funderResponse.message === 'string' ? null : funderResponse.message;
      if (funderMsg?.established) {
        return `${funderMsg.established}`;
      }
      return undefined;
    }
    const dateObj = this._message.issued || this._message.published || this._message.created;
    if (!dateObj?.['date-parts']?.[0]) return undefined;

    const parts = dateObj['date-parts'][0];
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    if (year && month && day) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } else if (year && month) {
      return `${year}-${String(month).padStart(2, '0')}`;
    } else if (year) {
      return `${year}`;
    }
    return undefined;
  }

  get resourceType(): string | undefined {
    if (this._type === 'funder') return 'Funder';
    return this._message.type;
  }

  get description(): string | undefined {
    if (this._type === 'funder') return undefined;
    const abstract = this._message.abstract;
    return abstract ? this.parseJATS(abstract) : undefined;
  }

  get url(): string {
    if (this._type === 'funder') {
      const funderResponse = this._rawMetadata as FunderResponse;
      const funderMsg = typeof funderResponse.message === 'string' ? null : funderResponse.message;
      return funderMsg?.url || this._doi.toURL();
    }
    return this._message.URL || this._message.resource?.primary?.URL || this._doi.toURL();
  }

  get subjects(): string[] {
    if (this._type === 'funder') {
      const funderResponse = this._rawMetadata as FunderResponse;
      const funderMsg = typeof funderResponse.message === 'string' ? null : funderResponse.message;
      return funderMsg?.['alternate-name'] || [];
    }
    return this._message.subject || [];
  }

  get rawMetadata(): object {
    return this._rawMetadata;
  }

  static async fetch(doi: DOI): Promise<CrossRefInfo | null> {
    const workResponse = await CrossRefInfo.fetchWork(doi);
    if (workResponse) {
      return new CrossRefInfo(doi, workResponse, 'work');
    }

    const funderResponse = await CrossRefInfo.fetchFunder(doi);
    if (funderResponse) {
      return new CrossRefInfo(doi, funderResponse, 'funder');
    }

    return null;
  }

  private static async fetchWork(doi: DOI): Promise<CrossRefResponse | null> {
    try {
      const apiUrl = `https://api.crossref.org/works/${doi.toString()}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        console.debug(`CrossRef works error: ${response.status}`);
        return null;
      }

      const data = await response.json() as CrossRefResponse;
      if (data.status !== 'ok' || !data.message || typeof data.message === 'string') {
        return null;
      }

      return data;
    } catch (error) {
      console.debug('CrossRef works fetch error:', error);
      return null;
    }
  }

  private static async fetchFunder(doi: DOI): Promise<FunderResponse | null> {
    try {
      const apiUrl = `https://api.crossref.org/funders/${doi.toString()}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        console.debug(`CrossRef funders error: ${response.status}`);
        return null;
      }

      const data = await response.json() as FunderResponse;
      if (data.status !== 'ok' || !data.message || typeof data.message === 'string') {
        return null;
      }

      return data;
    } catch (error) {
      console.debug('CrossRef funders fetch error:', error);
      return null;
    }
  }

  static fromObject(doiObj: DOI, obj: ReturnType<CrossRefInfo['toObject']>): CrossRefInfo {
    return new CrossRefInfo(doiObj, obj.rawMetadata as CrossRefResponse, obj.type || 'work');
  }

  generateItems(): FoldableItem[] {
    const items: FoldableItem[] = [];
    const index = 10;

    if (this._type === 'funder') {
      return this.generateFunderItems(index);
    }
    return this.generateWorkItems(items, index);
  }

  private generateWorkItems(items: FoldableItem[], index: number): FoldableItem[] {
    if (this.title) {
      items.push(new FoldableItem(index++, 'Title', this.title, 'The title of the resource.', undefined, undefined, false));
    }

    const correspondingAuthor = this.correspondingAuthor;
    if (correspondingAuthor) {
      items.push(new FoldableItem(
        index++,
        'Corresponding Author',
        correspondingAuthor.orcid || `${correspondingAuthor.name}${correspondingAuthor.affiliation ? ` (${correspondingAuthor.affiliation})` : ''}`,
        'The first author of the resource, often the corresponding author.',
      ));
    }

    const creators = this.creators;
    creators.forEach((creator, idx) => {
      if (idx === 0 && correspondingAuthor) return;
      items.push(new FoldableItem(
        index++,
        'Author',
        creator.orcid || `${creator.name}${creator.affiliation ? ` (${creator.affiliation})` : ''}`,
        'A creator/author of the resource.',
        creator.orcid ? `https://orcid.org/${creator.orcid}` : undefined,
      ));
    });

    if (this.publisher) {
      items.push(new FoldableItem(index++, 'Publisher', this.publisher, 'The publisher of the resource.'));
    }

    if (this.publicationDate) {
      items.push(new FoldableItem(index++, 'Publication Date', this.publicationDate, 'The publication date in ISO 8601 format.'));
    }

    if (this.resourceType) {
      items.push(new FoldableItem(index++, 'Resource Type', beautifyResourceType(this.resourceType), 'The type of the resource.'));
    }

    if (this.description) {
      items.push(new FoldableItem(index++, 'Abstract', this.description, 'The abstract of the resource.', undefined, undefined, false));
    }

    this.subjects.forEach((subject) => {
      items.push(new FoldableItem(index++, 'Subject', subject, 'A subject area or keyword.'));
    });

    return items;
  }

  private generateFunderItems(index: number): FoldableItem[] {
    const items: FoldableItem[] = [];
    const funderResponse = this._rawMetadata as FunderResponse;
    const funderMsg = typeof funderResponse.message === 'string' ? null : funderResponse.message;

    if (this.title) {
      items.push(new FoldableItem(index++, 'Name', this.title, 'The name of the funder.', undefined, undefined, false));
    }

    if (funderMsg?.location) {
      items.push(new FoldableItem(index++, 'Location', funderMsg.location, 'The location of the funder.'));
    }

    if (funderMsg?.established) {
      items.push(new FoldableItem(index++, 'Established', `${funderMsg.established}`, 'The year the funder was established.'));
    }

    if (funderMsg?.id) {
      items.push(new FoldableItem(index++, 'CrossRef Funder ID', funderMsg.id, 'The CrossRef identifier for this funder.'));
    }

    if (funderMsg?.url) {
      items.push(new FoldableItem(index++, 'Website', funderMsg.url, 'The website of the funder.', funderMsg.url));
    }

    if (funderMsg?.['alternate-name'] && funderMsg['alternate-name'].length > 0) {
      items.push(new FoldableItem(index++, 'Alternate Names', funderMsg['alternate-name'].join(', '), 'Alternate names for the funder.', undefined, undefined, false));
    }

    if (funderMsg?.['hierarchy-names'] && Object.keys(funderMsg['hierarchy-names']).length > 0) {
      const hierarchyNames = Object.entries(funderMsg['hierarchy-names'])
        .map(([id, name]) => `${name} (${id})`)
        .join(', ');
      items.push(new FoldableItem(index++, 'Hierarchy', hierarchyNames, 'The funder hierarchy in the CrossRef organization tree.', undefined, undefined, false));
    }

    if (funderMsg?.['replaced-by'] && funderMsg['replaced-by'].length > 0) {
      const replacedBy = funderMsg['replaced-by']
        .map(f => f.name || f.id)
        .filter(Boolean)
        .join(', ');
      if (replacedBy) {
        items.push(new FoldableItem(index++, 'Replaced By', replacedBy, 'Funders that have replaced this funder.'));
      }
    }

    if (funderMsg?.replaces && funderMsg.replaces.length > 0) {
      const replaces = funderMsg.replaces
        .map(f => f.name || f.id)
        .filter(Boolean)
        .join(', ');
      if (replaces) {
        items.push(new FoldableItem(index++, 'Replaces', replaces, 'Funders that this funder replaces.'));
      }
    }

    if (funderMsg?.descendants && funderMsg.descendants.length > 0) {
      const descendants = funderMsg.descendants
        .map(d => d.name || d.id)
        .filter(Boolean)
        .join(', ');
      if (descendants) {
        // eslint-disable-next-line no-useless-assignment -- index++ is used correctly
        items.push(new FoldableItem(index++, 'Descendants', descendants, 'Descendant funders in the hierarchy.', undefined, undefined, false));
      }
    }

    return items;
  }

  toObject() {
    return {
      doi: JSON.stringify(this._doi.toObject()),
      rawMetadata: this._rawMetadata,
      type: this._type,
    };
  }

  private parseJATS(text: string): string {
    if (!text) return text;
    return text
      .replace(/<jats:p>/g, '')
      .replace(/<\/jats:p>/g, '\n')
      .replace(/<jats:italic>/g, '<i>')
      .replace(/<\/jats:italic>/g, '</i>')
      .replace(/<jats:bold>/g, '<b>')
      .replace(/<\/jats:bold>/g, '</b>')
      .replace(/<jats:sub>/g, '<sub>')
      .replace(/<\/jats:sub>/g, '</sub>')
      .replace(/<jats:sup>/g, '<sup>')
      .replace(/<\/jats:sup>/g, '</sup>')
      .replace(/<jats:title>/g, '<strong>')
      .replace(/<\/jats:title>/g, '</strong>')
      .replace(/\n\n+/g, '\n\n')
      .trim();
  }
}