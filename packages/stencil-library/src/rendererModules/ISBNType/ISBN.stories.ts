import { Meta, StoryObj } from '@storybook/web-components-vite';
import { ISBN_examples } from '../../../../../examples';

const meta: Meta = {
  title: 'Renderer/ISBN',
  component: 'pid-component',
  tags: ['autodocs'],
  args: {
    value: ISBN_examples.VALID_13_HYPHENATED,
    openByDefault: false,
  },
  argTypes: {
    value: {
      description: 'The ISBN value to parse and render',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: ISBN_examples.VALID_13_HYPHENATED,
  },
};

export const ISBN10: Story = {
  name: 'ISBN-10',
  args: {
    value: ISBN_examples.VALID_10,
  },
};

export const PrefixedISBN13: Story = {
  name: 'Prefixed ISBN-13',
  args: {
    value: ISBN_examples.VALID_13_PREFIXED,
    openByDefault: true,
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    value: ISBN_examples.VALID_13_HYPHENATED,
    openByDefault: true,
    darkMode: 'dark',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const ISBN_2: Story = {
  name: 'ISBN 978-0-321-20068-6',
  args: {
    value: ISBN_examples.VALID_13_ISBN_2,
  },
};

export const ISBN_3: Story = {
  name: 'ISBN 978-0-521-18984-2',
  args: {
    value: ISBN_examples.VALID_13_ISBN_3,
  },
};
