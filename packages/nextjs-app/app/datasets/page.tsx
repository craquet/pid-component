import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { AuthorGrid } from '../components/AuthorGrid';

const authors = [
  { orcid: '0009-0005-2800-4833', name: 'Maximilian Inckmann', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0000-0001-6575-1022', name: 'Andreas Pfeil', institution: 'Karlsruhe Institute of Technology' },
  { orcid: '0009-0003-2196-9187', name: 'Christopher Raquet', institution: 'Karlsruhe Institute of Technology' },
];

/**
 * Datasets page showcasing dataset listings with various PID types.
 */
export default function DatasetsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Lorem ipsum dolor sit amet</h1>
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Click the "View License" button below to see how a
            license can be rendered.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm mb-8">
          <p className="text-slate-700 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dataset created as part of project
            <strong>21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6</strong> and hosted at
            the <strong>https://ror.org/04t3en479</strong> research institution. Previous findings
            published in DOI <strong>10.1109/eScience.2024.1042</strong> and extends methodology to
            handle Handle System resolutions.
          </p>
        </div>

        <AuthorGrid authors={authors} />
      </main>

      <Footer />
    </div>
  );
}
