'use client';

import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PidComponent } from '@kit-data-manager/react-pid-component';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface Dataset {
  id: string;
  title: string;
  doi: string;
  license: string;
}

interface DatasetTableProps {
  datasets: Dataset[];
  className?: string;
  darkMode?: boolean;
}

const columns = [
  { key: 'title', label: 'Title', initialWidth: 40 },
  { key: 'doi', label: 'DOI', initialWidth: 30 },
  { key: 'license', label: 'License', initialWidth: 20 },
  { key: 'actions', label: 'Actions', initialWidth: 10 },
];

export function DatasetTable({ datasets, className, darkMode = false }: DatasetTableProps) {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() =>
    Object.fromEntries(columns.map((c) => [c.key, c.initialWidth])),
  );
  const resizingRef = useRef<{ key: string; startX: number; startWidth: number } | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const resizing = resizingRef.current;
    if (!resizing || !tableRef.current) return;
    const tableWidth = tableRef.current.offsetWidth;
    const deltaPercent = ((e.clientX - resizing.startX) / tableWidth) * 100;
    const newWidth = Math.max(5, resizing.startWidth + deltaPercent);
    setColumnWidths((prev) => ({ ...prev, [resizing.key]: newWidth }));
  }, []);

  const onMouseUp = useCallback(() => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onResizeStart = useCallback(
    (e: React.MouseEvent, key: string) => {
      e.preventDefault();
      resizingRef.current = { key, startX: e.clientX, startWidth: columnWidths[key] };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [columnWidths, onMouseMove, onMouseUp],
  );

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div className={cn('rounded-xl border bg-card shadow overflow-hidden', className)}>
      <div className="flex items-center gap-3 p-6 border-b">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">Lorem ipsum dolor</h2>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table ref={tableRef} className="w-full" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left text-xs font-semibold uppercase tracking-wider px-6 py-3 relative select-none text-muted-foreground bg-card"
                style={{ width: `${columnWidths[col.key]}%` }}
              >
                {col.label}
                <span
                  onMouseDown={(e) => onResizeStart(e, col.key)}
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/20"
                />
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {datasets.map((dataset) => (
            <tr key={dataset.id} className="border-b transition-colors hover:bg-muted/50">
              <td
                className="px-6 py-4 text-sm overflow-hidden text-ellipsis whitespace-nowrap text-foreground">{dataset.title}</td>
              <td className="px-6 py-4">
                <div className="overflow-hidden">
                  <PidComponent value={dataset.doi} emphasizeComponent={false} darkMode={darkMode ? 'dark' : 'light'}
                                width="100%" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="overflow-hidden">
                  <PidComponent value={dataset.license} emphasizeComponent={false}
                                darkMode={darkMode ? 'dark' : 'light'} width="100%" />
                </div>
              </td>
              <td className="px-6 py-4 overflow-hidden">
                <Button variant="secondary" size="sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
