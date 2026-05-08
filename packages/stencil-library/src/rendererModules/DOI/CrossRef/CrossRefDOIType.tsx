import { FunctionalComponent, h } from '@stencil/core';
import { GenericIdentifierType } from '../../../utils/GenericIdentifierType';
import { DOI } from '../DOI';
import { CrossRefInfo } from './CrossRefInfo';
import { FoldableItem } from '../../../utils/FoldableItem';
import { FoldableAction } from '../../../utils/FoldableAction';
import { CrossRefLogo } from '../ResourceTypeIcons';
import { formatCitationPreview, getCitationStyleFromSettings } from '../CitationStyles';

export class CrossRefDOIType extends GenericIdentifierType {
  private _doi: DOI;
  private _crossRefInfo: CrossRefInfo;

  get data(): string {
    return JSON.stringify(this._crossRefInfo?.toObject() ?? {});
  }

  quickCheck(): boolean {
    return DOI.isDOI(this.value);
  }

  async hasMeaningfulInformation(): Promise<boolean> {
    this._doi = DOI.getDOIFromString(this.value);
    this._crossRefInfo = await CrossRefInfo.fetch(this._doi);
    return this._crossRefInfo !== null && this._crossRefInfo.title !== '';
  }

  async init(data?: string): Promise<void> {
    if (data !== undefined) {
      this._crossRefInfo = CrossRefInfo.fromObject(this._doi, JSON.parse(data));
    } else {
      this._doi = DOI.getDOIFromString(this.value);
      this._crossRefInfo = await CrossRefInfo.fetch(this._doi);
    }

    if (!this._crossRefInfo) return;

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

    const metadataSource = this._crossRefInfo.type === 'funder' ? 'CrossRef (Funder)' : 'CrossRef';
    this.items.push(
      new FoldableItem(1, 'Metadata Source', metadataSource, 'Metadata provided by CrossRef', 'https://www.crossref.org'),
    );

    const metadataItems = this._crossRefInfo.generateItems();
    this.items.push(...metadataItems);

    if (this._crossRefInfo.url) {
      this.actions.push(new FoldableAction(0, 'Open Resource', this._crossRefInfo.url, 'primary'));
    }

    this.actions.push(new FoldableAction(1, 'Resolve DOI', this._doi.toURL(), 'secondary'));

    const apiUrl = this._crossRefInfo.type === 'funder'
      ? `https://api.crossref.org/funders/${this._doi.toString()}`
      : `https://api.crossref.org/works/${this._doi.toString()}`;
    this.actions.push(new FoldableAction(2, 'View CrossRef Metadata', apiUrl, 'secondary'));
  }

  isResolvable(): boolean {
    return this._crossRefInfo !== null && this._crossRefInfo.title !== '';
  }

  renderPreview(): FunctionalComponent {
    const citationStyle = getCitationStyleFromSettings(this.settings);
    const creators = this._crossRefInfo?.creators || [];
    const year = this._crossRefInfo?.publicationDate;
    const type = this._crossRefInfo?.type;

    let citation: string;
    let tooltip: string;

    if (type === 'funder') {
      citation = this._crossRefInfo?.title || '';
      tooltip = `Funder: ${citation}`;
    } else {
      const result = formatCitationPreview(this._crossRefInfo?.title || '', creators, year, citationStyle);
      citation = result.citation;
      tooltip = result.tooltip;
    }

    return (
      <span
        class={`inline-flex flex-nowrap items-baseline font-mono min-w-0 max-w-full ${this.isDarkMode ? 'text-gray-200' : ''}`}>
        <span class={'flex-none px-0.5 h-4 self-center'}>{CrossRefLogo()}</span>
        <span class={'min-w-0 pl-2 overflow-hidden text-ellipsis whitespace-nowrap'} title={tooltip}>
          {citation}
        </span>
      </span>
    );
  }

  getSettingsKey(): string {
    return 'CrossRefDOIType';
  }
}
