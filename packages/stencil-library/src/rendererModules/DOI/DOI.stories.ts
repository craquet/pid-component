import { Meta, StoryObj } from '@storybook/web-components-vite';
import { DOI_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/DOI',
  component: 'pid-component',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The DOI renderer module provides two renderers: DataCiteDOIType and CrossRefDOIType. See subdirectories for detailed examples.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DataCiteExample: Story = {
  name: 'DataCite - Journal Paper',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    openByDefault: true,
    renderers: '["DataCiteDOIType"]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a DataCite DOI rendered using the DataCiteDOIType renderer.',
      },
    },
  },
};

export const CrossRefExample: Story = {
  name: 'CrossRef - Journal Paper',
  args: {
    value: DOI_examples.CROSSREF_JOURNAL_PAPER,
    openByDefault: true,
    renderers: '["CrossRefDOIType"]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a CrossRef DOI rendered using the CrossRefDOIType renderer.',
      },
    },
  },
};

export const CrossRefFunderExample: Story = {
  name: 'CrossRef - Funder',
  args: {
    value: DOI_examples.CROSSREF_FUNDING,
    openByDefault: true,
    renderers: '["CrossRefDOIType"]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a funder DOI rendered using the CrossRefDOIType renderer.',
      },
    },
  },
};
