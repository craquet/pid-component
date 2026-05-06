import { PidComponent } from '@kit-data-manager/react-pid-component';

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-900 px-8 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-indigo-500 p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white">ResearchDemo</span>
        </div>
        <p className="text-sm text-gray-400">
          Research Data Portal powered by KIT Data Manager
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">License:</span>
          <PidComponent value="https://spdx.org/licenses/Apache-2.0" />
        </div>
      </div>
    </footer>
  );
}