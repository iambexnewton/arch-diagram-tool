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
      left: '16%',
      zIndex: 4, 
      pointerEvents: 'auto',
background: 'var(--header-background)',
      padding: '16px 22px',
      borderRadius: 'var(--border-radius-m)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      // border: '1px solid #e2e8f0',
      fontFamily: 'sans-serif'
    }}>
 {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Workflow Logo" 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--border-radius-s)', 
            objectFit: 'cover',
            border: '1px solid #edf2f7'
          }} 
        />
      )}
      <h2 
      style={{ 
        margin: 0, 
        fontSize: '18px', 
        color: 'var(--header-text)' }}>{title}</h2>
      {subtitle && <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--header-text)'}}>{subtitle}</p>}
    </div>
  );
}