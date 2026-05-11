'use client';

import * as Avatar from '@radix-ui/react-avatar';
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
}

/**
 * Displays a single author with avatar, name, institution, and ORCID.
 */
export function AuthorCard({ author, className }: AuthorCardProps) {
  const initials = author.name.split(' ').map(n => n[0]).join('');

  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white p-5 shadow-sm', className)}>
      <div className="flex items-start gap-4">
        <Avatar.Root
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200">
          <Avatar.Image src={`https://api.dicebear.com/7.x/initials/svg?seed=${author.name}`} alt={author.name} />
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-medium text-slate-600">
            {initials}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 truncate">{author.name}</h3>
          {author.institution && (
            <p className="text-xs text-slate-400 mt-1">{author.institution}</p>
          )}
          <div className="mt-3 relative overflow-hidden">
            <PidComponent value={author.orcid} emphasizeComponent={false} width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
