/**
 * Demo data for the ResearchDemo portal.
 * Contains sample datasets, authors, and article content with various PID types.
 */

export interface Dataset {
  id: string;
  title: string;
  doi: string;
  license: string;
}

export interface Author {
  orcid: string;
  name: string;
  institution: string;
}

/**
 * Sample datasets showcasing various PID types (DOIs, SPDX licenses)
 */
export const datasets: Dataset[] = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    doi: 'doi:10.5445/IR/1000178054',
    license: 'https://spdx.org/licenses/MIT',
  },
  {
    id: '2',
    title: 'Sed do eiusmod tempor incididunt ut labore et dolore',
    doi: '10.52825/ocp.v5i.1411',
    license: 'CC-BY4.0',
  },
  {
    id: '3',
    title: 'Ut enim ad minim veniam quis nostrud exercitation',
    doi: 'https://doi.org/10.5281/zenodo.13629109',
    license: 'Apache-2.0',
  },
];

/**
 * Sample authors showcasing ORCID integration
 */
export const authors: Author[] = [
  { orcid: '0009-0005-2800-4833', name: 'Maximilian Inckmann', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0000-0001-6575-1022', name: 'Andreas Pfeil', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0009-0003-2196-9187', name: 'Christopher Raquet', institution: 'Karlsruhe Institute of Technology' },
];

/**
 * Sample article content with autodetectable PIDs:
 * - Handle: 21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6
 * - ROR: https://ror.org/04t3en479
 * - DOI: 10.1109/eScience.2024.1042
 * - Handle: 20.1000/100
 * - DOI: 10.1016/j.future.2025.01.004
 * - ISBN: 978-3-642-54441-6
 * - ISSN: 2041-1723
 * - SPDX: https://spdx.org/licenses/Apache-2.0
 * - DOI: https://doi.org/10.5281/zenodo.1234567
 */
export const articleContent = `
<p class="text-sm leading-relaxed text-slate-700 mb-4">
  Lorem ipsum dolor sit amet consectetur adipiscing elit. Dataset created as part of project
  <strong>21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6</strong> and hosted at
  <strong>https://ror.org/04t3en479</strong>. Previous findings published in DOI
  <strong>10.1109/eScience.2024.1042</strong> extend methodology to Handle System resolutions.
</p>
<p class="text-sm leading-relaxed text-slate-700 mb-4">
  Contact corresponding author at <strong>someone@example.com</strong>. Analysis framework available under
  <strong>https://spdx.org/licenses/Apache-2.0</strong> for reuse. Research conducted at institution
  associated with ROR <strong>https://ror.org/04t3en479</strong>.
</p>
<p class="text-sm leading-relaxed text-slate-700 mb-4">
  Published in multiple venues including Handle System <strong>20.1000/100</strong> and DOI
  <strong>10.1016/j.future.2025.01.004</strong>. Related works include ISBN <strong>978-3-642-54441-6</strong>
  and ISSN <strong>2041-1723</strong>.
</p>
<p class="text-sm leading-relaxed text-slate-700">
  Handle identifier <strong>20.1000/100</strong> resolves to Handle system documentation.
  Research data archived at <strong>https://doi.org/10.5281/zenodo.1234567</strong>.
</p>
`;