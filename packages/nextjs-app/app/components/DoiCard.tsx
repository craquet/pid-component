import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PidComponent } from '@kit-data-manager/react-pid-component';
import { cn } from '../lib/utils';

interface DoiCardProps {
  value: string;
  license?: string;
  className?: string;
  darkMode?: boolean;
}

/**
 * Displays a DOI with optional license information.
 * Uses shadcn/ui card component.
 */
export function DoiCard({ value, license, className, darkMode = false }: DoiCardProps) {
  return (
    <Card className={cn(
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white',
      className,
    )}>
      <CardHeader>
        <CardTitle className={cn(
          'text-xs font-semibold uppercase tracking-wider',
          darkMode ? 'text-slate-400' : 'text-slate-500',
        )}>
          Digital Object Identifier
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[120px] max-h-[300px] overflow-hidden">
          <PidComponent value={value} darkMode={darkMode ? 'dark' : 'light'} width="100%" />
        </div>
        {license && (
          <div className={cn('mt-4 pt-4 border-t', darkMode ? 'border-slate-700' : 'border-slate-200')}>
            <CardTitle className={cn(
              'text-xs font-semibold uppercase tracking-wider mb-3',
              darkMode ? 'text-slate-400' : 'text-slate-500',
            )}>
              License
            </CardTitle>
            <div className="min-h-[24px] max-h-[60px] overflow-hidden">
              <PidComponent value={license} darkMode={darkMode ? 'dark' : 'light'} width="100%" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
