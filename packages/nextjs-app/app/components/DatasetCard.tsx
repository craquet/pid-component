import { PidComponent } from '@kit-data-manager/react-pid-component';

interface DatasetCardProps {
  id: string;
  title: string;
  doi: string;
  license: string;
  authorOrcid: string;
  description: string;
}

/**
 * Card component displaying dataset information with DOI, author ORCID, and license.
 */
export default function DatasetCard({ id, title, doi, license, authorOrcid, description }: DatasetCardProps) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <span style={{
          backgroundColor: '#dbeafe',
          color: '#1d4ed8',
          padding: '4px 12px',
          borderRadius: 16,
          fontSize: 12,
          fontWeight: 600,
          display: 'inline-block',
        }}>
          Dataset
        </span>
      </div>
      <h3 style={{
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 8,
        color: '#111827',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>{title}</h3>
      <p style={{
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
        lineHeight: 1.6,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}>{description}</p>
      <div style={{ marginBottom: 16 }}>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#6b7280',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 4,
        }}>DOI</span>
        <div style={{
          position: 'relative',
          minHeight: 24,
          maxHeight: 24,
          overflow: 'hidden',
        }}>
          <PidComponent value={doi} width="100%" />
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#6b7280',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 4,
        }}>Author</span>
        <div style={{
          position: 'relative',
          minHeight: 24,
          maxHeight: 24,
          overflow: 'hidden',
        }}>
          <PidComponent value={authorOrcid} width="100%" />
        </div>
      </div>
      <div style={{ paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#6b7280',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 4,
        }}>License</span>
        <div style={{
          position: 'relative',
          minHeight: 24,
          maxHeight: 24,
          overflow: 'hidden',
        }}>
          <PidComponent value={license} width="100%" />
        </div>
      </div>
    </div>
  );
}