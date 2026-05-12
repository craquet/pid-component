'use client';

import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroCard } from './components/HeroCard';
import { DoiCard } from './components/DoiCard';
import { DatasetTable } from './components/DatasetTable';
import { AuthorGrid } from './components/AuthorGrid';
import { ArticleSection } from './components/ArticleSection';
import { LicenseDialog } from './components/LicenseDialog';
import { Footer } from './components/Footer';

const datasets = [
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
  {
    id: '4',
    title: 'An example Handle FDO with some nice contents',
    doi: '21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6',
    license: 'CC-BY4.0',
  },
  {
    id: '5',
    title: 'An example of a very large record',
    doi: '21.T11981/5760c10e-6e64-41ea-824e-8dd4d3d2145d',
    license: 'CC-BY4.0',
  },
];

const authors = [
  { orcid: '0009-0005-2800-4833', name: 'Maximilian Inckmann', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0000-0001-6575-1022', name: 'Andreas Pfeil', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0009-0003-2196-9187', name: 'Christopher Raquet', institution: 'Karlsruhe Institute of Technology' },
];

/**
 * Main demo page showcasing the pid-component integration with Next.js.
 * Demonstrates various PID types: DOIs, ORCIDs, RORs, SPDX licenses.
 */
export default function ResearchDemoPage() {
  const [activePage, setActivePage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Navigation activePage={activePage} onNavigate={setActivePage} darkMode={darkMode}
                  onDarkModeChange={setDarkMode} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {activePage === 'home' && (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <HeroCard
                className="col-span-2"
                title="This is an example webpage"
                description="This is an example of how the pid-component can be used within a Next.js app. Demo showcases DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g. 0009-0005-2800-4833), RORs (e.g. https://ror.org/04t3en479), SPDX licenses (e.g. Apache-2.0), and more."
                darkMode={darkMode}
              />
              <DoiCard
                value="https://doi.org/10.5281/zenodo.13629109"
                license="https://spdx.org/licenses/Apache-2.0"
                darkMode={darkMode}
              />
            </div>

            <DatasetTable datasets={datasets} className="mb-8" darkMode={darkMode} />

            <AuthorGrid authors={authors} darkMode={darkMode} />

            <ArticleSection darkMode={darkMode} />
          </>
        )}

        {activePage === 'datasets' && (
          <DatasetTable datasets={datasets} darkMode={darkMode} />
        )}

        {activePage === 'about' && (
          <div className="space-y-8">
            <div className="prose">
              <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Lorem ipsum dolor
                sit amet</h1>
              <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Demo showcases pid-component
                integrated with Next.js, featuring DOIs, ORCIDs, RORs, Handles, SPDX licenses, and more.
              </p>
            </div>
            <AuthorGrid authors={authors} darkMode={darkMode} />
          </div>
        )}

        <LicenseDialog darkMode={darkMode} />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}
