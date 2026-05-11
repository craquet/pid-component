import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ResearchDemoApp from '../demo/ResearchDemoApp.vue';

const meta: Meta = {
  title: 'ResearchDemo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**ResearchDemo** - A demonstration of @kit-data-manager/pid-component
integrated with Vuetify 3.

This story showcases:
- A multi-page Vue application structure with proper routing
- Multiple UI contexts using Vuetify components
- Explicit PID component usage alongside design system components
- Autodetection scanning (initPidDetection) on article content
- Varied configurations: emphasized, non-emphasized, hidden subcomponents, and active subcomponents
- A research data portal with navigation, hero card, dataset table,
  author profiles, article content with autodetection, and license dialog

**Tech stack:** Vuetify 3 + Vue 3 + @kit-data-manager/vue-pid-component

**Folder structure:**
\`\`\`
demo/
├── ResearchDemoApp.vue       # Main application component
├── index.ts                  # Exports
└── components/
    ├── AppNavigation.vue      # Sticky nav
    ├── HeroCard.vue          # Hero card
    ├── DoiCard.vue           # DOI card component (extracted)
    ├── DatasetTable.vue      # Table with DOI and license pid-components
    ├── AuthorCard.vue         # Author card component with ORCID
    ├── AuthorGrid.vue        # Grid layout for author cards
    ├── ArticleSection.vue     # Autodetection (initPidDetection) zone
    ├── LicenseDialog.vue      # Dialog with SPDX pid-component
    ├── AboutPage.vue          # Tabbed PID type showcase
    └── AppFooter.vue          # Footer with ROR pid-component
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
};
export default meta;

type Story = StoryObj;

export const ResearchDemo: Story = {
  name: 'Research Data Portal',
  render: () => ({
    components: { ResearchDemoApp },
    template: '<ResearchDemoApp />',
  }),
};