import { Meta, StoryObj } from '@storybook/web-components-vite';
import { LOCALE_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/Locale',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: LOCALE_examples.EN_US,
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The locale value to parse and render',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: LOCALE_examples.EN_US,
  },
};

export const German: Story = {
  name: 'German (de-DE)',
  args: {
    value: LOCALE_examples.DE_DE,
  },
};

export const British: Story = {
  name: 'British English (en-GB)',
  args: {
    value: LOCALE_examples.EN_GB,
  },
};

export const French: Story = {
  name: 'French (fr-FR)',
  args: {
    value: LOCALE_examples.FR_FR,
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: LOCALE_examples.DE_DE,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};