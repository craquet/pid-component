import { Database } from 'lucide-react';
import { PidComponent } from '@kit-data-manager/react-pid-component';

interface FooterProps {
  darkMode?: boolean;
}

/**
 * Footer component displaying the portal branding and ROR identifier.
 */
export function Footer({ darkMode = false }: FooterProps) {
  return (
    <footer className={`border-t mt-12 ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
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
              backgroundColor: '#4f46e5',
            }}>
              <Database className="h-4 w-4 text-white" />
            </div>
            <span
              style={{ fontSize: '14px', fontWeight: 600, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Lorem ipsum</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '14px',
              color: darkMode ? '#94a3b8' : '#64748b',
              whiteSpace: 'nowrap',
            }}>Powered by</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <PidComponent value="https://ror.org/04t3en479" emphasizeComponent={false} hideSubcomponents={true}
                            darkMode={darkMode ? 'dark' : 'light'} width="100%" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
