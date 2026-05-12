'use client';

import { Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PidComponent } from '@kit-data-manager/react-pid-component';

interface LicenseDialogProps {
  darkMode?: boolean;
}

/**
 * Dialog component for displaying license information.
 * Uses shadcn/ui dialog and card components.
 * Uses SPDX license identifier for the Apache 2.0 license.
 */
export function LicenseDialog({ darkMode = false }: LicenseDialogProps) {
  return (
    <Card className={darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'}>
      <CardHeader>
        <CardTitle className={darkMode ? 'text-white' : ''}>
          <Scale className={`inline h-5 w-5 mr-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`} />
          License Information
        </CardTitle>
        <CardDescription className={darkMode ? 'text-slate-400' : ''}>
          This dataset is published under the Apache 2.0 license.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">
              <Scale className="h-4 w-4" />
              View License
            </Button>
          </DialogTrigger>
          <DialogContent className={darkMode ? 'bg-slate-800 border-slate-700' : ''}>
            <DialogHeader>
              <DialogTitle className={darkMode ? 'text-white' : ''}>Apache 2.0 License</DialogTitle>
              <DialogDescription className={darkMode ? 'text-slate-400' : ''}>
                Dataset published under Apache 2.0 license, allowing free reuse with appropriate attribution.
              </DialogDescription>
            </DialogHeader>
            <div className="mb-4">
              <PidComponent value="https://spdx.org/licenses/Apache-2.0" darkMode={darkMode ? 'dark' : 'light'}
                            width="100%" />
            </div>
            <div className="flex justify-end">
              <Dialog.Close asChild>
                <Button variant="outline" className={darkMode ? 'border-slate-600 bg-slate-700 text-slate-200' : ''}>
                  Close
                </Button>
              </Dialog.Close>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
