import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HeroCardProps {
  title: string;
  description: string;
  doi?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function HeroCard({ title, description, actions, className }: HeroCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex gap-2">
          <Badge variant="default">DOI</Badge>
          <Badge variant="secondary">Research Data</Badge>
        </div>
        <CardTitle className="mt-4 text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          {actions || (
            <>
              <Button>
                <Download className="h-4 w-4" />
                Download Dataset
              </Button>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4" />
                View Source
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}