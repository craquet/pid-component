import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components-vite';
import { ROR_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/ROR',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: ROR_examples.VALID,
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The ROR ID value to parse and render',
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
    value: ROR_examples.VALID,
  },
};

export const WithHTTPS: Story = {
  name: 'With HTTPS Prefix',
  args: {
    value: ROR_examples.VALID,
    openByDefault: true,
  },
};

export const BareID: Story = {
  name: 'Bare ID (without prefix)',
  args: {
    value: ROR_examples.VALID_BARE,
    openByDefault: true,
  },
};

export const SecondOrganization: Story = {
  name: 'Second Organization',
  args: {
    value: ROR_examples.SECOND,
    openByDefault: true,
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: ROR_examples.VALID,
    openByDefault: true,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};