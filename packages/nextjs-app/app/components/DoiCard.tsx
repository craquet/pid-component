import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PidComponent } from '@kit-data-manager/react-pid-component';

interface DoiCardProps {
  value: string;
  license?: string;
  className?: string;
  darkMode?: boolean;
}

export function DoiCard({ value, license, className, darkMode = false }: DoiCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Digital Object Identifier
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[120px] max-h-[300px] overflow-hidden">
          <PidComponent value={value} darkMode={darkMode ? 'dark' : 'light'} width="100%" />
        </div>
        {license && (
          <div className="mt-4 pt-4 border-t">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
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