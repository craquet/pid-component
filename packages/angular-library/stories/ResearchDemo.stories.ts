import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { ResearchDemoComponent } from '../src/app';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

const meta: Meta = {
  title: 'ResearchDemo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**ResearchDemo** - A demonstration of @kit-data-manager/pid-component
integrated with Angular Material.

This story showcases:
- A multi-page Angular application structure with proper routing
- Multiple UI contexts using Angular Material components with Tailwind CSS
- Explicit PID component usage alongside design system components
- Autodetection scanning (initPidDetection) on article content
- Varied configurations: emphasized, non-emphasized, hidden subcomponents, and active subcomponents
- A research data portal with navigation, hero card, dataset table,
  author profiles, article content with autodetection, and license dialog

**Tech stack:** Angular 21 + Angular Material + @kit-data-manager/angular-pid-component

**Folder structure:**
\`\`\`
src/app/
├── research-demo.component.ts   # Main application component
├── index.ts                      # Exports
└── components/
    ├── navigation.component.ts   # Sticky nav
    ├── hero-card.component.ts    # Hero card
    ├── doi-card.component.ts     # DOI card component (extracted)
    ├── dataset-table.component.ts # Table with DOI and license pid-components
    ├── author-card.component.ts  # Author card component with ORCID
    ├── author-grid.component.ts  # Grid layout for author cards
    ├── article-section.component.ts # Autodetection (initPidDetection) zone
    ├── license-dialog.component.ts # Dialog with SPDX pid-component
    ├── about-page.component.ts   # Tabbed PID type showcase
    └── footer.component.ts         # Footer with ROR pid-component
\`\`\`

**Preserved identifiers (DOIs, ORCIDs, RORs, SPDX, Handles, ISBN, ISSN, email) embedded in demo:**
- DOIs: doi:10.5445/IR/1000178054, 10.52825/ocp.v5i.1411, https://doi.org/10.5281/zenodo.13629109
- ORCIDs: 0009-0005-2800-4833, 0000-0001-6575-1022, 0009-0003-2196-9187
- RORs: https://ror.org/04t3en479
- SPDX: https://spdx.org/licenses/MIT, CC-BY4.0, Apache-2.0, https://spdx.org/licenses/Apache-2.0
- Handles: 21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6, 20.1000/100
- ISBN: 978-3-642-54441-6
- ISSN: 2041-1723
- Email: someone@example.com
        `,
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideNoopAnimations()],
    }),
    moduleMetadata({
      imports: [ResearchDemoComponent],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const ResearchDemo: Story = {
  name: 'Research Data Portal',
  render: () => ({
    template: '<app-research-demo />',
  }),
};
