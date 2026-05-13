import { Meta, StoryObj } from '@storybook/web-components-vite';
import { URL_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/URL',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: URL_examples.KIT_WEBSITE,
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The URL value to parse and render',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: URL_examples.KIT_WEBSITE,
  },
};

export const GitHub: Story = {
  name: 'GitHub Repository',
  args: {
    value: URL_examples.GITHUB,
  },
};

export const Zenodo: Story = {
  name: 'Zenodo',
  args: {
    value: URL_examples.ZENODO,
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: URL_examples.KIT_WEBSITE,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};