'use client';

import { Database } from 'lucide-react';

interface NavigationProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

export function Navigation({ activePage = 'home', onNavigate }: NavigationProps) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/datasets', label: 'Datasets' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-slate-900">ResearchDemo</span>
            <span
              className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Demo</span>
          </div>
          <div className="flex items-center gap-6 relative z-10">
            {links.map((link) => {
              const pageName = link.href === '/' ? 'home' : link.href.slice(1);
              const isActive = activePage === pageName;
              return (
                <button
                  key={link.href}
                  onClick={() => onNavigate?.(pageName)}
                  className={`text-sm transition-colors relative z-10 ${
                    isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
