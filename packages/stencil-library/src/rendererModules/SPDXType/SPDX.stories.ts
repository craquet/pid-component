import { Meta, StoryObj } from '@storybook/web-components-vite';
import { SPDX_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/SPDX',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: SPDX_examples.APACHE_2_0,
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The SPDX license value to parse and render',
      control: { type: 'text' },
    },
    openByDefault: {
      description: 'Whether to show the component in its expanded state by default',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: SPDX_examples.APACHE_2_0,
  },
};

export const ApacheBare: Story = {
  name: 'Apache-2.0 (Bare)',
  args: {
    value: SPDX_examples.APACHE_2_0_BARE,
  },
};

export const MIT: Story = {
  name: 'MIT License',
  args: {
    value: SPDX_examples.MIT,
    openByDefault: true,
  },
};

export const MITBare: Story = {
  name: 'MIT License (Bare)',
  args: {
    value: SPDX_examples.MIT_BARE,
  },
};

export const CCBY: Story = {
  name: 'CC BY 4.0',
  args: {
    value: SPDX_examples.CC_BY_4_0,
    openByDefault: true,
  },
};

export const CCBYBare: Story = {
  name: 'CC BY 4.0 (Bare)',
  args: {
    value: SPDX_examples.CC_BY_4_0_BARE,
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: SPDX_examples.APACHE_2_0,
    openByDefault: true,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};