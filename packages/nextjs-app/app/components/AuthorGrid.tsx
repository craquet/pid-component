import { AuthorCard } from './AuthorCard';
import type { Author } from './AuthorCard';

interface AuthorGridProps {
  authors: Author[];
  className?: string;
  darkMode?: boolean;
}

export function AuthorGrid({ authors, className, darkMode = false }: AuthorGridProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-foreground">
        Lorem ipsum dolor sit amet
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {authors.map((author) => (
          <AuthorCard key={author.orcid} author={author} darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}