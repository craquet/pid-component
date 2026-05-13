import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components-vite';
import { DOI_examples } from '../../../../../../examples';

const meta: Meta = {
  title: 'Renderer/DOI/CrossRef',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
    openByDefault: false,
    renderers: '["CrossRefDOIType"]',
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
      description: 'Settings for the CrossRefDOIType renderer',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
  },
};

export const CrossRefJournalPaper: Story = {
  name: 'Journal Paper',
  args: {
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
    openByDefault: true,
  },
};

export const CrossRefBook: Story = {
  name: 'Book',
  args: {
    value: DOI_examples.CROSSREF_BOOK,
    openByDefault: true,
  },
};

export const CrossRefFunding: Story = {
  name: 'Funding (Funder)',
  args: {
    value: DOI_examples.CROSSREF_FUNDING,
    openByDefault: true,
  },
};

export const RFC: Story = {
  name: 'DOI for RFC',
  args: {
    value: DOI_examples.DATACITE_RFC,
    openByDefault: true,
  },
};

export const CitationStyleAPA: Story = {
  name: 'Citation Style: APA',
  args: {
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
    settings: JSON.stringify([{ type: 'CrossRefDOIType', values: [{ name: 'citationStyle', value: 'APA' }] }]),
  },
};

export const CitationStyleIEEE: Story = {
  name: 'Citation Style: IEEE',
  args: {
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
    settings: JSON.stringify([{ type: 'CrossRefDOIType', values: [{ name: 'citationStyle', value: 'IEEE' }] }]),
  },
};

export const CitationStyleChicago: Story = {
  name: 'Citation Style: Chicago',
  args: {
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
    settings: JSON.stringify([{ type: 'CrossRefDOIType', values: [{ name: 'citationStyle', value: 'Chicago' }] }]),
  },
};

export const InlineInText: Story = {
  name: 'Inline in Text',
  args: {
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
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
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
    openByDefault: true,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
