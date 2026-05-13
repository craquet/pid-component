import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components-vite';
import { EMAIL_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/Email',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: EMAIL_examples.VALID,
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The email address value to parse and render',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: EMAIL_examples.VALID,
  },
};

export const KITEmail: Story = {
  name: 'KIT Email',
  args: {
    value: EMAIL_examples.KIT_EMAIL,
  },
};

export const KITEmailAlt: Story = {
  name: 'KIT Email (Alt)',
  args: {
    value: EMAIL_examples.KIT_EMAIL_ALT,
  },
};

export const MultipleEmails: Story = {
  name: 'Multiple Emails',
  args: {
    value: `${EMAIL_examples.VALID}, ${EMAIL_examples.VALID_ALT}`,
  },
};

export const MultipleKITEmails: Story = {
  name: 'Multiple KIT Emails',
  args: {
    value: `${EMAIL_examples.KIT_EMAIL}, ${EMAIL_examples.KIT_EMAIL_ALT}`,
  },
};

export const InlineInText: Story = {
  name: 'Inline in Text',
  args: {
    value: EMAIL_examples.KIT_EMAIL,
    emphasizeComponent: false,
  },
  decorators: [
    (story: () => unknown) => html`
      <p class="w-2/3 items-center align-middle">
        For questions, contact ${story()}.
      </p>
    `,
  ],
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: EMAIL_examples.VALID,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};