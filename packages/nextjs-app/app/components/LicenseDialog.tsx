'use client';

import { Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PidComponent } from '@kit-data-manager/react-pid-component';

export function LicenseDialog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-muted-foreground" />
          License Information
        </CardTitle>
        <CardDescription>
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apache 2.0 License</DialogTitle>
              <DialogDescription>
                Dataset published under Apache 2.0 license, allowing free reuse with appropriate attribution.
              </DialogDescription>
            </DialogHeader>
            <div className="mb-4">
              <PidComponent value="https://spdx.org/licenses/Apache-2.0" darkMode="light" width="100%" />
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}