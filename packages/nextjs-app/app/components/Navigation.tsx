'use client';

import { Database, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
  darkMode?: boolean;
  onDarkModeChange?: (darkMode: boolean) => void;
}

/**
 * Navigation component with active page state.
 * Uses shadcn/ui components for button and badge.
 */
export function Navigation({ activePage = 'home', onNavigate, darkMode = false, onDarkModeChange }: NavigationProps) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/datasets', label: 'Datasets' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 ${
        darkMode ? 'border-slate-700 bg-slate-900/95' : 'border-slate-200 bg-white/95'
      }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="default" size="icon" className="h-9 w-9">
              <Database className="h-5 w-5" />
            </Button>
            <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Lorem ipsum</span>
            <Badge variant={darkMode ? 'warning' : 'secondary'}>
              Demo
            </Badge>
          </div>
          <div className="flex items-center gap-6 relative z-10">
            {links.map((link) => {
              const pageName = link.href === '/' ? 'home' : link.href.slice(1);
              const isActive = activePage === pageName;
              return (
                <Button
                  key={link.href}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => onNavigate?.(pageName)}
                  className={`text-sm relative z-10 ${
                    isActive ? '' : darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDarkModeChange?.(!darkMode)}
              className={darkMode ? 'text-yellow-400' : 'text-slate-600'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}