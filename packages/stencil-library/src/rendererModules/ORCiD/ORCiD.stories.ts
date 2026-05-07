import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components-vite';
import { ORCID_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/ORCiD',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: ORCID_examples.VALID,
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The ORCiD value to parse and render',
      control: { type: 'text' },
    },
    openByDefault: {
      description: 'Whether to show the component in its expanded state by default',
      control: { type: 'boolean' },
    },
    settings: {
      description: 'Settings for the ORCiD renderer',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: ORCID_examples.VALID,
  },
};

export const WithHTTPS: Story = {
  name: 'With HTTPS Prefix',
  args: {
    value: ORCID_examples.VALID_WITH_HTTPS,
    openByDefault: true,
  },
};

export const WithAffiliationDate: Story = {
  name: 'With Affiliation at Date',
  args: {
    value: ORCID_examples.VALID,
    openByDefault: true,
    settings: JSON.stringify([
      {
        type: 'ORCIDType',
        values: [{ name: 'affiliationAt', value: '2000-02-01' }, { name: 'showAffiliation', value: true }],
      },
    ]),
  },
};

export const ShowAffiliationOnly: Story = {
  name: 'Show Affiliation Only',
  args: {
    value: ORCID_examples.VALID,
    openByDefault: true,
    settings: JSON.stringify([{ type: 'ORCIDType', values: [{ name: 'showAffiliation', value: true }] }]),
  },
};

export const HideAffiliation: Story = {
  name: 'Hide Affiliation',
  args: {
    value: ORCID_examples.VALID,
    openByDefault: true,
    settings: JSON.stringify([{ type: 'ORCIDType', values: [{ name: 'showAffiliation', value: false }] }]),
  },
};

export const InlineInText: Story = {
  name: 'Inline in Text',
  args: {
    value: ORCID_examples.VALID,
    openByDefault: false,
    emphasizeComponent: false,
  },
  decorators: [
    (story: () => unknown) => html`
      <p class="w-2/3 items-center align-middle">
        This research was conducted by ${story()}. Contact for questions.
      </p>
    `,
  ],
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: ORCID_examples.VALID,
    openByDefault: true,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
