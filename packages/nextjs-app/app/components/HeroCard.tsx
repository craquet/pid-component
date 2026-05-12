import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PidComponent } from '@kit-data-manager/react-pid-component';
import { cn } from '../lib/utils';

interface HeroCardProps {
  title: string;
  description: string;
  doi?: string;
  actions?: React.ReactNode;
  className?: string;
  darkMode?: boolean;
}

/**
 * Primary hero card component for the demo portal.
 * Uses shadcn/ui card, button, and badge components.
 */
export function HeroCard({ title, description, actions, className, darkMode = false }: HeroCardProps) {
  return (
    <Card className={cn(darkMode ? 'bg-slate-800 border-slate-700' : '', className)}>
      <CardHeader>
        <div className="flex gap-2">
          <Badge variant="default" className={darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'}>
            DOI
          </Badge>
          <Badge variant="secondary"
                 className={darkMode ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-700'}>
            Research Data
          </Badge>
        </div>
        <CardTitle className={cn('mt-4 text-2xl font-bold', darkMode ? 'text-white' : 'text-slate-900')}>
          {title}
        </CardTitle>
        <CardDescription className={cn(darkMode ? 'text-slate-400' : 'text-slate-600')}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          {actions || (
            <>
              <Button>
                <Download className="h-4 w-4" />
                Download Dataset
              </Button>
              <Button variant="outline" className={darkMode ? 'border-slate-600 bg-slate-700 text-slate-200' : ''}>
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
