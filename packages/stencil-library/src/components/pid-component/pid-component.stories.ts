import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components-vite';
import { expect, waitFor } from 'storybook/test';
import {
  DOI_examples,
  HANDLE_examples,
} from '../../../../../examples';


/**
 * The pid-component is a versatile component for displaying and interacting with
 * persistent identifiers (PIDs). It supports various display modes, subcomponent
 * management, and adaptive pagination.
 */
const meta: Meta = {
  title: 'pid-component',
  id: '01-pid-component',
  component: 'pid-component',
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'The value to parse, evaluate and render',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    settings: {
      description: 'A stringified JSON object containing settings for this component',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: '[]' },
        type: { summary: 'string' },
      },
    },
    openByDefault: {
      description: 'Determines whether the component is open or not by default',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    itemsPerPage: {
      description: 'The number of items to show in the table per page',
      control: {
        type: 'number',
        min: 1,
      },
      table: {
        defaultValue: { summary: '10' },
        type: { summary: 'number' },
      },
    },
    levelOfSubcomponents: {
      description: 'The total number of levels of subcomponents to show',
      control: {
        type: 'number',
        min: 0,
      },
      table: {
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },
    currentLevelOfSubcomponents: {
      description: 'The current level of subcomponents',
      control: {
        type: 'number',
        min: 0,
      },
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    hideSubcomponents: {
      description: 'Determines whether subcomponents should generally be shown or not. If true, no nested sub-components are rendered.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    emphasizeComponent: {
      description: 'Determines whether components should be emphasized towards their surrounding by border and shadow-sm',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showTopLevelCopy: {
      description: 'Determines whether on the top level the copy button is shown',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    defaultTTL: {
      description: 'Default time-to-live for cached responses in milliseconds (default: 86400000 = 24 hours)',
      control: { type: 'number', min: 0 },
      table: {
        defaultValue: { summary: '86400000' },
        type: { summary: 'number' },
      },
    },
    width: {
      description: 'Initial width of the component (e.g. "500px", "50%"). If not set, defaults to 500px on large screens, 400px on medium, 300px on small.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    height: {
      description: 'Initial height of the component (e.g. "300px", "50vh"). If not set, defaults to 300px.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    darkMode: {
      description: 'The dark mode setting for the component',
      control: 'select',
      options: ['light', 'dark', 'system'],
      table: {
        type: { summary: '"light" | "dark" | "system"' },
        defaultValue: { summary: 'light' },
      },
    },
    renderers: {
      description:
        'An ordered list of renderer keys to try first (JSON string array, non-binding preselection). These are tried in order; if none match, the full registry is used (unless fallbackToAll is false).',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    fallbackToAll: {
      description:
        'When renderers is set and no listed renderer matches, fall back to the full default renderer registry. Set to false to strictly restrict to listed renderers only.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    value: HANDLE_examples.FDO_BARE,
    settings: '[]',
    openByDefault: false,
    itemsPerPage: 10,
    levelOfSubcomponents: 1,
    currentLevelOfSubcomponents: 0,
    hideSubcomponents: false,
    emphasizeComponent: true,
    showTopLevelCopy: true,
    darkMode: 'light',
  },
};

const textDecorator = (story: () => unknown) =>
  html`<p class="items-center align-middle">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ${story()} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
    aute ${story()} irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
    officia deserunt mollit anim id est laborum.
  </p>`;

export default meta;
type Story = StoryObj;

/**
 * Default story showing a Handle PID in its collapsed initial state.
 * Click the component to expand and see the resolved record.
 */
export const Default: Story = {
  id: 'pid-component-default',
  args: {
    value: HANDLE_examples.FDO_BARE,
  },
  parameters: {
    docs: {
      source: {
        code: `
<pid-component value='${HANDLE_examples.FDO_BARE}'></pid-component>
        `,
      },
    },
  },
};



/**
 * A real-world example: a PID embedded in a descriptive paragraph about
 * the Typed PID Maker. The component starts collapsed so it reads naturally
 * as part of the sentence.
 */
export const TypedPIDMakerExampleText: Story = {
  id: 'pid-component-typed-pid-maker-text',
  args: {
    value: HANDLE_examples.FDO_TYPED,
    openByDefault: false,
  },
  decorators: [
    (story: () => unknown) => html`
      <p class="w-2/3 items-center align-middle">
        The Typed PID Maker is an entry point to integrate digital resources into the FAIR Digital Object (FAIR DO) ecosystem. It allows creating PIDs for resources and to provide
        them with the necessary metadata to ensure that the resources can be found and understood. <br />
        As a result, a machine-readable representation of all kinds of research artifacts allows act on such FAIR Digital Objects which present themselves as PID, e.g., ${story()},
        but carry much more than just a pointer to a landing page.
      </p>
    `,
  ],
};

/**
 * Demonstrates the component in dark mode. The component and all its
 * sub-components adapt their colors for dark backgrounds.
 */
export const DarkMode: Story = {
  id: 'pid-component-dark-mode',
  args: {
    value: HANDLE_examples.FDO_BARE,
    darkMode: 'dark',
    openByDefault: true,
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
  parameters: {
    docs: {
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_BARE}" dark-mode="dark" open-by-default="true"></pid-component>
        `,
      },
    },
  },
};

/**
 * Demonstrates the component in light mode (the default).
 */
export const LightMode: Story = {
  id: 'pid-component-light-mode',
  args: {
    value: HANDLE_examples.FDO_BARE,
    darkMode: 'light',
    openByDefault: true,
  },
  globals: {
    backgrounds: { value: 'light' },
  },
  parameters: {
    docs: {
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_BARE}" dark-mode="light" open-by-default="true"></pid-component>
        `,
      },
    },
  },
};

/**
 * Uses the operating system's color scheme preference. The component
 * automatically switches between light and dark based on the user's
 * system setting.
 */
export const SystemMode: Story = {
  id: 'pid-component-system-mode',
  args: {
    value: HANDLE_examples.FDO_BARE,
    darkMode: 'system',
    openByDefault: true,
  },
  parameters: {
    docs: {
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_BARE}" dark-mode="system" open-by-default="true"></pid-component>
        `,
      },
    },
  },
};


/**
 * Restricts detection to only the DataCiteDOIType renderer.
 * Since the value is a DataCite DOI, it matches and renders normally.
 */
export const RenderersMatchingDOI: Story = {
  id: 'pid-component-renderers-matching-doi',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    renderers: '["DataCiteDOIType"]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uses the `renderers` prop to restrict detection to only DataCiteDOIType. The DOI value matches, so it renders as expected.',
      },
      source: {
        code: `
<pid-component value='${DOI_examples.DATACITE_JOURNAL_PAPER}' renderers='["DataCiteDOIType"]'></pid-component>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Wait for auto-detection and check output
    await waitFor(() => {
      const pidComponent = canvasElement.querySelector('pid-component');
      expect(pidComponent).toBeTruthy();
      expect((pidComponent as HTMLPidComponentElement).renderers).toEqual('["DataCiteDOIType"]');
    }, { timeout: 5000 });
  },
};

/**
 * Preselects ORCIDType, but the value is a DOI. Since renderers is a
 * non-binding preselection, the component falls back to the full registry
 * and correctly renders it as a DOI.
 */
export const RenderersPreselectionFallback: Story = {
  id: 'pid-component-renderers-preselection-fallback',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    renderers: '["ORCIDType"]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uses the `renderers` prop with only ORCIDType, but the value is a DOI. Since renderers is a non-binding preselection (fallbackToAll defaults to true), the component falls back to the full registry and renders as a DOI.',
      },
      source: {
        code: `
<pid-component value='${DOI_examples.DATACITE_JOURNAL_PAPER}' renderers='["ORCIDType"]'></pid-component>
        `,
      },
    },
  },
};

/**
 * Strictly restricts detection to only ORCIDType with fallbackToAll=false.
 * Since ORCIDType doesn't match the DOI value and fallback is disabled,
 * the component renders nothing (unmatched state).
 */
export const RenderersStrictRestriction: Story = {
  id: 'pid-component-renderers-strict-restriction',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    renderers: '["ORCIDType"]',
    fallbackToAll: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Strictly restricts detection to ORCIDType only with `fallback-to-all="false"`. Since ORCIDType does not match the DOI, and fallback is disabled, the component is invisible (unmatched state).',
      },
      source: {
        code: `
<pid-component value='${DOI_examples.DATACITE_JOURNAL_PAPER}' renderers='["ORCIDType"]' fallback-to-all='false'></pid-component>
        `,
      },
    },
  },
  play: async ({ canvasElement }) => {
    await new Promise(r => setTimeout(r, 3000));
    const pidComponent = canvasElement.querySelector('pid-component');
    expect(pidComponent).toBeTruthy();
    // Component should exist but be invisible (unmatched state)
    expect((pidComponent as HTMLPidComponentElement).fallbackToAll).toBe(false);
  },
};

/**
 * Demonstrates ordering priority: HandleType is listed before DataCiteDOIType.
 * Since DOIs also match HandleType's regex, the Handle renderer is used
 * instead of the DataCite DOI renderer because it appears first in the ordered list.
 */
export const RenderersOrderPriority: Story = {
  id: 'pid-component-renderers-order-priority',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    renderers: '["HandleType", "DataCiteDOIType"]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The ordered list puts HandleType before DataCiteDOIType. Since a DOI like `10.5445/IR/1000185135` also matches the Handle PID regex, the Handle renderer is used first because it appears earlier in the list.',
      },
      source: {
        code: `
<pid-component value='${DOI_examples.DATACITE_JOURNAL_PAPER}' renderers='["HandleType", "DataCiteDOIType"]'></pid-component>
        `,
      },
    },
  },
};

/**
 * Multiple renderers in the preferred order: DataCiteDOIType first, then HandleType.
 * The DOI value matches DataCiteDOIType first, so the DataCite DOI renderer is used.
 */
export const RenderersCorrectOrder: Story = {
  id: 'pid-component-renderers-correct-order',
  args: {
    value: DOI_examples.DATACITE_JOURNAL_PAPER,
    renderers: '["DataCiteDOIType", "HandleType"]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The ordered list puts DataCiteDOIType before HandleType. The DOI matches DataCiteDOIType first, so the DOI renderer is used as expected.',
      },
      source: {
        code: `
<pid-component value='${DOI_examples.DATACITE_JOURNAL_PAPER}' renderers='["DataCiteDOIType", "HandleType"]'></pid-component>
        `,
      },
    },
  },
};

/**
 * Collapsed by default (openByDefault=false). The component shows
 * only the identifier, suitable for inline use in text.
 */
export const OpenByDefaultCollapsed: Story = {
  id: 'pid-component-open-by-default-collapsed',
  args: {
    value: HANDLE_examples.FDO_TYPED,
    openByDefault: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'The component starts in its collapsed state, showing only the identifier. Click to expand and view the resolved record.',
      },
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_TYPED}" open-by-default="false"></pid-component>
        `,
      },
    },
  },
};

/**
 * Expanded by default (openByDefault=true). The resolved record
 * is immediately visible without clicking.
 */
export const OpenByDefaultExpanded: Story = {
  id: 'pid-component-open-by-default-expanded',
  args: {
    value: HANDLE_examples.FDO_TYPED,
    openByDefault: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'The component starts expanded, showing the full resolved record with all its entries.',
      },
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_TYPED}" open-by-default="true"></pid-component>
        `,
      },
    },
  },
};

/**
 * With emphasis (default). The component has a subtle border
 * and shadow to make it stand out from surrounding content.
 */
export const Emphasized: Story = {
  id: 'pid-component-emphasized',
  args: {
    value: HANDLE_examples.FDO_BARE,
    emphasizeComponent: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'The component is emphasized with a border and subtle shadow to distinguish it from surrounding content.',
      },
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_BARE}" emphasize-component="true"></pid-component>
        `,
      },
    },
  },
};

/**
 * Without emphasis. The component blends into surrounding
 * content, suitable for inline use in flowing text.
 */
export const Unemphasized: Story = {
  id: 'pid-component-unemphasized',
  args: {
    value: HANDLE_examples.FDO_BARE,
    emphasizeComponent: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'The component has no border or shadow, allowing it to blend into inline text contexts.',
      },
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_BARE}" emphasize-component="false"></pid-component>
        `,
      },
    },
  },
};

/**
 * Default page size (10 items per page). For records with many
 * entries, pagination controls appear to navigate through pages.
 */
export const DefaultPageSize: Story = {
  id: 'pid-component-default-page-size',
  args: {
    value: HANDLE_examples.FDO_TYPED,
    openByDefault: true,
    itemsPerPage: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'With the default itemsPerPage of 10, records with more than 10 entries are paginated.',
      },
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_TYPED}" items-per-page="10" open-by-default="true"></pid-component>
        `,
      },
    },
  },
};

/**
 * Unlimited page size (itemsPerPage=100). Shows all entries
 * on a single page without pagination controls.
 */
export const UnlimitedPageSize: Story = {
  id: 'pid-component-unlimited-page-size',
  args: {
    value: HANDLE_examples.FDO_TYPED,
    openByDefault: true,
    itemsPerPage: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Setting itemsPerPage to a high value (e.g., 100) displays all entries on one page without pagination.',
      },
      source: {
        code: `
<pid-component value="${HANDLE_examples.FDO_TYPED}" items-per-page="100" open-by-default="true"></pid-component>
        `,
      },
    },
  },
};

