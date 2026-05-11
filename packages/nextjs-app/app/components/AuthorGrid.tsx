import { AuthorCard } from './AuthorCard';
import type { Author } from './AuthorCard';
import { cn } from '../lib/utils';

interface AuthorGridProps {
  authors: Author[];
  className?: string;
}

/**
 * Displays a grid of author cards.
 */
export function AuthorGrid({ authors, className }: AuthorGridProps) {
  return (
    <div className={cn('mb-8', className)}>
      <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2 mb-4">
        Lorem ipsum dolor sit amet
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {authors.map((author) => (
          <AuthorCard key={author.orcid} author={author} />
        ))}
      </div>
    </div>
  );
}