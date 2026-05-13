import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components-vite';
import { DOI_examples } from '../../../../../../examples';

const meta: Meta = {
  title: 'Renderer/DOI/DataCite',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    openByDefault: false,
    renderers: '["DataCiteDOIType"]',
  },
  argTypes: {
    value: {
      description: 'The DOI value to parse and render',
      control: { type: 'text' },
    },
    openByDefault: {
      description: 'Whether to show the component in its expanded state by default',
      control: { type: 'boolean' },
    },
    settings: {
      description: 'Settings for the DataCiteDOIType renderer',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
  },
};

export const DataCiteJournalPaper: Story = {
  name: 'Journal Paper',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    openByDefault: true,
  },
};

export const DataCiteSoftware: Story = {
  name: 'Software (Zenodo)',
  args: {
    value: DOI_examples.DATACITE_SOFTWARE,
    openByDefault: true,
  },
};

export const DataCiteSlides: Story = {
  name: 'Slides/Presentation',
  args: {
    value: DOI_examples.DATACITE_SLIDES,
    openByDefault: true,
  },
};

export const DataCitePreprint: Story = {
  name: 'Preprint (arXiv)',
  args: {
    value: DOI_examples.DATACITE_PREPRINT,
    openByDefault: true,
  },
};

export const CitationStyleAPA: Story = {
  name: 'Citation Style: APA',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    settings: JSON.stringify([{ type: 'DataCiteDOIType', values: [{ name: 'citationStyle', value: 'APA' }] }]),
  },
};

export const CitationStyleIEEE: Story = {
  name: 'Citation Style: IEEE',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    settings: JSON.stringify([{ type: 'DataCiteDOIType', values: [{ name: 'citationStyle', value: 'IEEE' }] }]),
  },
};

export const CitationStyleChicago: Story = {
  name: 'Citation Style: Chicago',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    settings: JSON.stringify([{ type: 'DataCiteDOIType', values: [{ name: 'citationStyle', value: 'Chicago' }] }]),
  },
};

export const WithURLPrefix: Story = {
  name: 'With URL Prefix',
  args: {
    value: DOI_examples.VALID_WITH_PREFIX,
    openByDefault: true,
  },
};

export const InlineInText: Story = {
  name: 'Inline in Text',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    openByDefault: false,
    emphasizeComponent: false,
  },
  decorators: [
    (story: () => unknown) => html`
      <p class="w-2/3 items-center align-middle">
        This research paper was published in 2024. See DOI ${''}
        ${story()} for more details.
      </p>
    `,
  ],
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    openByDefault: true,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};