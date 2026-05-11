'use client';

import Link from 'next/link';
import { PidComponent } from '@kit-data-manager/react-pid-component';

/**
 * Navigation bar with portal branding and ROR identifier.
 */
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#1a1a2e] px-8 py-4">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-[#6366f1] p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <Link href="/" className="text-xl font-bold text-white no-underline">
            Lorem ipsum
          </Link>
          <span className="rounded-full bg-[#fbbf24] px-2 py-0.5 text-xs font-semibold text-[#78350f]">
            Demo
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/datasets"
            className="text-sm text-gray-400 no-underline transition-colors hover:text-white"
          >
            Lorem ipsum
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-400 no-underline transition-colors hover:text-white"
          >
            About
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Powered by</span>
            <div className="w-32">
              <PidComponent value="https://ror.org/04t3en479" hideSubcomponents={true} width="100%" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}