import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { PidComponent } from '@kit-data-manager/react-pid-component';

/**
 * About page showcasing the pid-component integration.
 * Displays portal information and ROR identifier.
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Lorem ipsum dolor sit amet</h1>
          <p className="text-slate-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Click the "View License" button below to see how a
            license can be rendered. Demo showcases pid-component integration with Next.js App Router, demonstrating
            seamless display of persistent identifiers including DOIs (e.g. 10.5281/zenodo.13629109), ORCIDs (e.g.
            0009-0005-2800-4833), ROR IDs (e.g. https://ror.org/04t3en479), Handle PIDs (e.g.
            21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6), and SPDX license references.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Portal uses
            <strong> pid-component</strong> to render various PID types with automatic detection
            and resolution from respective registries.
          </p>
          <div className="rounded-lg bg-slate-50 p-6 border border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Lorem ipsum dolor</h2>
            <div className="flex items-center gap-3">
              <span className="text-slate-700">Lorem ipsum</span>
              <div className="w-44">
                <PidComponent value="https://ror.org/04t3en479" width="100%" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Lorem ipsum dolor sit amet</h2>
          <p className="text-slate-700 mb-2">
            Lorem ipsum dolor sit amet consectetur adipiscing elit:
          </p>
          <p className="text-slate-700">
            <strong>Email:</strong>
            <div className="inline-block w-56"><PidComponent value="mailto:someone@example.com" width="100%" /></div>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
