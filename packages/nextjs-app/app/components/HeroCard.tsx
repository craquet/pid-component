import { PidComponent } from '@kit-data-manager/react-pid-component';
import { cn } from '../lib/utils';

interface HeroCardProps {
  title: string;
  description: string;
  doi?: string;
  className?: string;
}

/**
 * Primary hero card component for the demo portal.
 * Displays a featured dataset or article with call-to-action buttons.
 */
export function HeroCard({ title, description, className }: HeroCardProps) {
  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white p-6 shadow-sm', className)}>
      <div className="flex gap-2 mb-4">
        <span
          className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
          DOI
        </span>
        <span
          className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          Research Data
        </span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-600 text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 disabled:pointer-events-none disabled:opacity-50">
          Download Dataset
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 disabled:pointer-events-none disabled:opacity-50">
          View Source
        </button>
      </div>
    </div>
  );
}
