import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthorCard from '../components/AuthorCard';
import { PidComponent } from '@kit-data-manager/react-pid-component';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8 rounded-xl bg-white p-12 shadow-sm">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">About ResearchDemo</h1>
          <p className="mb-4 text-base text-gray-500 leading-relaxed">
            This is a demonstration application that showcases the integration of
            Persistent Identifier (PID) systems in FAIR Digital Objects. Our platform showcases how
            modern web components can seamlessly integrate with existing frameworks to provide
            interactive and informative displays of research metadata.
          </p>
          <p className="mb-4 text-base text-gray-500 leading-relaxed">
            The portal uses the <strong>pid-component</strong> library to render DOIs, ORCIDs, ROR IDs,
            Handle PIDs, SPDX license references, and more - all with automatic detection and
            resolution from their respective registries.
          </p>
          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <h2 className="mb-3 text-lg font-bold text-gray-900">Institution</h2>
            <div className="flex items-center gap-3">
              <span className="text-base text-gray-700">Hosted by</span>
              <PidComponent value="https://ror.org/04t3en479" />
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="mb-3 text-lg font-bold text-gray-900">License</h2>
            <PidComponent value="https://spdx.org/licenses/Apache-2.0" openByDefault={true} />
          </div>
        </div>

        <h2 className="mb-5 text-2xl font-bold text-gray-900">Developers of the pid-component</h2>
        <div className="mb-8 grid grid-cols-3 gap-5">
          <AuthorCard
            orcid="0009-0005-2800-4833"
            name="Maximilian Inckmann"
            role="Researcher"
            institution="Karlsruhe Institute of Technology"
          />
          <AuthorCard
            orcid="0009-0003-2196-9187"
            name="Christopher Raquet"
            role="Researcher"
            institution="Karlsruhe Institute of Technology"
          />
          <AuthorCard
            orcid="0000-0001-6575-1022"
            name="Andreas Pfeil"
            role="Researcher"
            institution="Karlsruhe Institute of Technology"
          />
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Contact</h2>
          <p className="mb-4 text-sm text-gray-500">
            For questions or inquiries, please contact the corresponding author:
          </p>
          <p className="text-sm">
            <strong className="font-semibold">Email:</strong>{' '}
            <PidComponent value="someone@example.com" />
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}