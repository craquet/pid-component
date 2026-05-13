import { FunctionalComponent, h } from '@stencil/core';
import { GenericIdentifierType } from '../../utils/GenericIdentifierType';
import { DOI } from './DOI';
import { DataCiteInfo } from './DataCite/DataCiteInfo';
import { FoldableItem } from '../../utils/FoldableItem';
import { FoldableAction } from '../../utils/FoldableAction';
import { DataCiteLogo } from './ResourceTypeIcons';
import { formatCitationPreview, getCitationStyleFromSettings } from './CitationStyles';

export class DataCiteDOIType extends GenericIdentifierType {
  private _doi: DOI;
  private _dataCiteInfo: DataCiteInfo;

  get data(): string {
    return JSON.stringify(this._dataCiteInfo?.toObject() ?? {});
  }

  quickCheck(): boolean {
    return DOI.isDOI(this.value);
  }

  async hasMeaningfulInformation(): Promise<boolean> {
    this._doi = DOI.getDOIFromString(this.value);
    this._dataCiteInfo = await DataCiteInfo.fetch(this._doi);
    return this._dataCiteInfo !== null && this._dataCiteInfo.title !== '';
  }

  async init(data?: string): Promise<void> {
    if (data !== undefined) {
      this._dataCiteInfo = DataCiteInfo.fromObject(this._doi, JSON.parse(data));
      console.debug('reload DataCiteDOIInfo from data', this._dataCiteInfo);
    } else {
      this._doi = DOI.getDOIFromString(this.value);
      this._dataCiteInfo = await DataCiteInfo.fetch(this._doi);
      console.debug('load DataCiteDOIInfo from API', this._dataCiteInfo);
    }

    this.items.push(
      new FoldableItem(
        0,
        'DOI',
        this._doi.toString(),
        'The DOI used for this resource. Digital Object Identifier is a persistent identifier for academic and research resources.',
        'https://www.doi.org/',
        undefined,
        false,
      ),
    );

    this.items.push(
      new FoldableItem(
        1,
        'Metadata Source',
        'DataCite',
        'Metadata provided by DataCite',
        'https://datacite.org',
      ),
    );

    const metadataItems = this._dataCiteInfo.generateItems();
    this.items.push(...metadataItems);

    if (this._dataCiteInfo.url) {
      this.actions.push(
        new FoldableAction(
          0,
          'Open Resource',
          this._dataCiteInfo.url,
          'primary',
        ),
      );
    }

    this.actions.push(
      new FoldableAction(
        1,
        'Resolve DOI',
        this._doi.toURL(),
        'secondary',
      ),
    );

    this.actions.push(
      new FoldableAction(
        2,
        'View DataCite Metadata',
        `https://api.datacite.org/dois/${encodeURIComponent(this._doi.toString())}`,
        'secondary',
      ),
    );
  }

  isResolvable(): boolean {
    return this._dataCiteInfo !== null && this._dataCiteInfo.title !== '';
  }

  renderPreview(): FunctionalComponent {
    const citationStyle = getCitationStyleFromSettings(this.settings);
    const creators = this._dataCiteInfo?.creators || [];
    const year = this._dataCiteInfo?.publicationDate;

    const { citation, tooltip } = formatCitationPreview(
      this._dataCiteInfo?.title || '',
      creators,
      year,
      citationStyle,
    );

    return (
      <span
        class={`inline-flex flex-nowrap items-baseline font-mono min-w-0 max-w-full ${this.isDarkMode ? 'text-gray-200' : ''}`}>
        <span class={'flex-none px-0.5 h-4 self-center'}>{DataCiteLogo()}</span>
        <span class={'min-w-0 pl-2 overflow-hidden text-ellipsis whitespace-nowrap'} title={tooltip}>
          {citation}
        </span>
      </span>
    );
  }

  getSettingsKey(): string {
    return 'DataCiteDOIType';
  }
}