'use client';

import { useEffect, useRef } from 'react';
import { initPidDetection, type PidDetectionConfig } from '@kit-data-manager/pid-component';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '../lib/utils';

interface ArticleSectionProps {
  className?: string;
  config?: PidDetectionConfig;
  darkMode?: boolean;
}

/**
 * Article section with automatic PID detection enabled.
 * Uses shadcn/ui badge and card components.
 */
export function ArticleSection({ className, config, darkMode = false }: ArticleSectionProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!articleRef.current) return;
    const ctrl = initPidDetection({
      root: articleRef.current,
      darkMode: darkMode ? 'dark' : 'light',
      emphasizeComponent: false,
      ...config,
    });
    return () => ctrl.destroy();
  }, [config, darkMode]);

  return (
    <div className={cn('mb-8', className)}>
      <h2
        className={cn('text-lg font-semibold flex items-center gap-2 mb-4', darkMode ? 'text-white' : 'text-slate-900')}>
        <span>Lorem ipsum dolor sit amet</span>
        <Badge variant={darkMode ? 'success' : 'default'} className={darkMode ? 'bg-emerald-900 text-emerald-200' : ''}>
          Autodetection Active
        </Badge>
      </h2>
      <Card className={darkMode ? 'bg-slate-800 border-slate-700' : ''}>
        <CardContent className="p-8">
          <p className={cn('text-sm leading-relaxed mb-4', darkMode ? 'text-slate-300' : 'text-slate-700')}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dataset created as part of project
            <strong> 21.T11981/be908bd1-e049-4d35-975e-8e27d40117e6</strong> and hosted at
            the <strong>https://ror.org/04t3en479</strong> research institution. Previous findings published
            in DOI <strong>10.1109/eScience.2024.1042</strong> extend methodology to Handle System resolutions.
          </p>
          <p className={cn('text-sm leading-relaxed mb-4', darkMode ? 'text-slate-300' : 'text-slate-700')}>
            Contact corresponding author at <strong>someone@example.com</strong>. Analysis framework available under
            <strong> https://spdx.org/licenses/Apache-2.0</strong> for reuse. Research conducted at institution
            associated with ROR <strong>https://ror.org/04t3en479</strong>.
          </p>
          <p className={cn('text-sm leading-relaxed mb-4', darkMode ? 'text-slate-300' : 'text-slate-700')}>
            Published in multiple venues including Handle System <strong>20.1000/100</strong> and DOI
            <strong>10.1016/j.future.2025.01.004</strong>. Related works include ISBN
            <strong>978-3-642-54441-6</strong> and ISSN <strong>2041-1723</strong> for the journal.
          </p>
          <p className={cn('text-sm leading-relaxed', darkMode ? 'text-slate-300' : 'text-slate-700')}>
            Handle identifier <strong>20.1000/100</strong> resolves to Handle system documentation.
            Research data archived at <strong>https://doi.org/10.5281/zenodo.1234567</strong>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
