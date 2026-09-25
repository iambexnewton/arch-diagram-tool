interface WorkflowHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export function WorkflowHeader({ title, subtitle, imageUrl }: WorkflowHeaderProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20%',
      zIndex: 4, 
      pointerEvents: 'auto',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
      fontFamily: 'sans-serif'
    }}>
 {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Workflow Logo" 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '6px', 
            objectFit: 'cover',
            border: '1px solid #edf2f7'
          }} 
        />
      )}
      <h2 style={{ margin: 0, fontSize: '18px', color: '#1a202c' }}>{title}</h2>
      {subtitle && <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#718096' }}>{subtitle}</p>}
    </div>
  );
}