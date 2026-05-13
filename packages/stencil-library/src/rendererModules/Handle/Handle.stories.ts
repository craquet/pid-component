import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components-vite';
import { HANDLE_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/Handle',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: HANDLE_examples.FDO_BARE,
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The Handle value to parse and render',
      control: { type: 'text' },
    },
    openByDefault: {
      description: 'Whether to show the component in its expanded state by default',
      control: { type: 'boolean' },
    },
    hideSubcomponents: {
      description: 'Whether to hide subcomponents',
      control: { type: 'boolean' },
    },
    emphasizeComponent: {
      description: 'Whether to emphasize the component with border and shadow',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  id: 'handle-default',
  args: {
    value: HANDLE_examples.FDO_BARE,
  },
};

export const FullPID: Story = {
  id: 'handle-full-pid',
  name: 'Full PID (Typed)',
  args: {
    value: HANDLE_examples.FDO_TYPED,
    openByDefault: true,
  },
};

export const WithHTTPS: Story = {
  id: 'handle-with-https',
  name: 'With HTTPS Prefix',
  args: {
    value: HANDLE_examples.FDO_WITH_HTTPS,
    openByDefault: true,
  },
};

export const WithoutSubcomponents: Story = {
  id: 'handle-without-subcomponents',
  name: 'Without Subcomponents',
  args: {
    value: HANDLE_examples.FDO_BARE,
    hideSubcomponents: true,
  },
};

export const InlineInText: Story = {
  id: 'handle-inline-in-text',
  name: 'Inline in Text',
  args: {
    value: HANDLE_examples.FDO_TYPED,
    openByDefault: false,
    emphasizeComponent: false,
  },
  decorators: [
    (story: () => unknown) => html`
      <p class="w-2/3 items-center align-middle">
        The Typed PID Maker is an entry point to integrate digital resources into the FAIR Digital Object (FAIR DO) ecosystem.
        It allows creating PIDs for resources and to provide them with the necessary metadata.
        ${story()}
      </p>
    `,
  ],
};

export const DarkMode: Story = {
  id: 'handle-dark-mode',
  name: 'Dark Mode',
  args: {
    value: HANDLE_examples.FDO_BARE,
    openByDefault: true,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};