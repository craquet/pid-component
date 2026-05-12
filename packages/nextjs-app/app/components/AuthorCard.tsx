'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PidComponent } from '@kit-data-manager/react-pid-component';

export interface Author {
  orcid: string;
  name: string;
  institution?: string;
}

interface AuthorCardProps {
  author: Author;
  className?: string;
}

export function AuthorCard({ author, className }: AuthorCardProps) {
  const initials = author.name.split(' ').map(n => n[0]).join('');

  return (
    <Card className={className}>
      <CardContent className="flex items-start gap-4 p-5">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${author.name}`} alt={author.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold truncate text-foreground">{author.name}</h3>
          {author.institution && (
            <p className="text-xs mt-1 text-muted-foreground">{author.institution}</p>
          )}
          <div className="mt-3 relative overflow-hidden">
            <PidComponent value={author.orcid} emphasizeComponent={false} darkMode="light" width="100%" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}