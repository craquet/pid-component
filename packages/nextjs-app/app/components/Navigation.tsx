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

export function Navigation({ activePage = 'home', onNavigate, darkMode = false, onDarkModeChange }: NavigationProps) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/datasets', label: 'Datasets' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="default" size="icon" className="h-9 w-9">
              <Database className="h-5 w-5" />
            </Button>
            <span className="text-lg font-semibold text-foreground">Lorem ipsum</span>
            <Badge variant="secondary">
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
                  className="text-sm relative z-10"
                >
                  {link.label}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDarkModeChange?.(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
