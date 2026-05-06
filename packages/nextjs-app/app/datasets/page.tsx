import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DatasetCard from '../components/DatasetCard';

const datasets = [
  {
    id: '1',
    title: 'KIT Data Metadata Analysis',
    doi: '10.5445/IR/1000185135',
    license: 'https://spdx.org/licenses/MIT',
    authorOrcid: '0009-0005-2800-4833',
    description: 'Comprehensive metadata analysis for KIT\'s research data repository.',
  },
  {
    id: '2',
    title: 'Research Output Repository Schema',
    doi: '10.5445/IR/1000178054',
    license: 'https://spdx.org/licenses/Apache-2.0',
    authorOrcid: '0009-0003-2196-9187',
    description: 'Schema definitions for research output management.',
  },
  {
    id: '3',
    title: 'FDO Implementation Guidelines',
    doi: '10.5445/IR/1000151234',
    license: 'https://spdx.org/licenses/CC-BY-4.0',
    authorOrcid: '0000-0001-6575-1022',
    description: 'Implementation guidelines for FAIR Digital Objects.',
  },
  {
    id: '4',
    title: 'Handle System Integration Study',
    doi: '10.5445/IR/1000123456',
    license: 'https://spdx.org/licenses/Apache-2.0',
    authorOrcid: '0009-0005-2800-4833',
    description: 'Integration patterns for Handle System in research workflows.',
  },
  {
    id: '5',
    title: 'PID Resolution Performance Benchmarks',
    doi: '10.5445/IR/1000111111',
    license: 'https://spdx.org/licenses/MIT',
    authorOrcid: '0009-0003-2196-9187',
    description: 'Performance benchmarks for various PID resolution strategies.',
  },
  {
    id: '6',
    title: 'FAIR Digital Object Registry',
    doi: '10.5445/IR/1000999999',
    license: 'https://spdx.org/licenses/CC-BY-4.0',
    authorOrcid: '0000-0001-6575-1022',
    description: 'Registry implementation for FAIR Digital Objects.',
  },
];

export default function DatasetsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Research Datasets</h1>
          <p className="text-base text-gray-500">
            Browse and explore the research datasets available in the ResearchDemo portal.
          </p>
        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500">Search</label>
              <input
                type="text"
                placeholder="Search datasets..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500">License</label>
              <select
                className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>All Licenses</option>
                <option>Apache-2.0</option>
                <option>MIT</option>
                <option>CC-BY-4.0</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500">Sort By</label>
              <select
                className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Title A-Z</option>
                <option>Title Z-A</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                className="w-full rounded-lg bg-indigo-500 px-5 py-2.5 font-semibold text-white hover:bg-indigo-600 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing {datasets.length} datasets</p>
          <div className="flex gap-2">
            <button
              className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors">
              Grid View
            </button>
            <button
              className="rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200 transition-colors">
              List View
            </button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-5">
          {datasets.map((dataset) => (
            <DatasetCard key={dataset.id} {...dataset} />
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <button
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
            1
          </button>
          <button
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            2
          </button>
          <button
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            3
          </button>
          <button
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
