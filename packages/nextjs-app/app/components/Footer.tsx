import { Database } from 'lucide-react';
import { PidComponent } from '@kit-data-manager/react-pid-component';

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              height: '32px',
              width: '32px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: 'hsl(var(--primary))',
            }}>
              <Database className="h-4 w-4 text-primary-foreground" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'hsl(var(--foreground))' }}>Lorem ipsum</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '14px',
              color: 'hsl(var(--muted-foreground))',
              whiteSpace: 'nowrap',
            }}>Powered by</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <PidComponent value="https://ror.org/04t3en479" emphasizeComponent={false} hideSubcomponents={true}
                            darkMode="light" width="100%" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}