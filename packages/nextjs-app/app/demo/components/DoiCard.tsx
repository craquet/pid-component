import { PidComponent } from '@kit-data-manager/react-pid-component';
import { cn } from '../lib/utils';

interface DoiCardProps {
  value: string;
  license?: string;
  className?: string;
}

/**
 * Displays a DOI with optional license information.
 * Used as a secondary card alongside the HeroCard.
 */
export function DoiCard({ value, license, className }: DoiCardProps) {
  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white p-6 shadow-sm', !license && 'flex-1', className)}>
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Digital Object Identifier
      </h3>
      <div className="min-h-[120px] max-h-[300px] overflow-hidden">
        <PidComponent value={value} width="100%" />
      </div>
      {license && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            License
          </h3>
          <div className="min-h-[24px] max-h-[60px] overflow-hidden">
            <PidComponent value={license} width="100%" />
          </div>
        </div>
      )}
    </div>
  );
}