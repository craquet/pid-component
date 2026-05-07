import { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Renderer/Fallback',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: 'This is a fallback text',
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The value to render as fallback',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: 'This is a fallback text',
  },
};

export const Empty: Story = {
  name: 'Empty Value',
  args: {
    value: '',
  },
};

export const ArbitraryText: Story = {
  name: 'Arbitrary Text',
  args: {
    value: 'Some arbitrary string that does not match any known type',
  },
};

export const Number: Story = {
  name: 'Number',
  args: {
    value: '42',
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: 'Fallback text in dark mode',
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};