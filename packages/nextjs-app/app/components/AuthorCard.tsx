'use client';

import * as Avatar from '@radix-ui/react-avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PidComponent } from '@kit-data-manager/react-pid-component';
import { cn } from '../lib/utils';

export interface Author {
  orcid: string;
  name: string;
  institution?: string;
}

interface AuthorCardProps {
  author: Author;
  className?: string;
  darkMode?: boolean;
}

/**
 * Displays a single author with avatar, name, institution, and ORCID.
 * Uses shadcn/ui avatar and card components.
 */
export function AuthorCard({ author, className, darkMode = false }: AuthorCardProps) {
  const initials = author.name.split(' ').map(n => n[0]).join('');

  return (
    <Card className={cn(darkMode ? 'bg-slate-800 border-slate-700' : '', className)}>
      <CardContent className="flex items-start gap-4 p-5">
        <Avatar.Root
          className={cn('inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border', darkMode ? 'border-slate-600' : 'border-slate-200')}>
          <Avatar.Image src={`https://api.dicebear.com/7.x/initials/svg?seed=${author.name}`} alt={author.name} />
          <Avatar.Fallback
            className={cn('flex h-full w-full items-center justify-center text-sm font-medium', darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600')}>
            {initials}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="flex-1 min-w-0">
          <h3
            className={cn('text-sm font-semibold truncate', darkMode ? 'text-white' : 'text-slate-900')}>{author.name}</h3>
          {author.institution && (
            <p className={cn('text-xs mt-1', darkMode ? 'text-slate-400' : 'text-slate-400')}>{author.institution}</p>
          )}
          <div className="mt-3 relative overflow-hidden">
            <PidComponent value={author.orcid} emphasizeComponent={false} darkMode={darkMode ? 'dark' : 'light'}
                          width="100%" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
