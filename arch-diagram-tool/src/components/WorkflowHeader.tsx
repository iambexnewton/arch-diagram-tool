interface WorkflowHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

// Rendered inside the Toolbar, which supplies the background and text colour.
export function WorkflowHeader({ title, subtitle, imageUrl }: WorkflowHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--border-radius-s)",
            objectFit: "cover",
          }}
        />
      )}
      <div>
        <h1 style={{ margin: 0, fontSize: 18 }}>{title}</h1>
        {subtitle && (
          <p style={{ margin: "2px 0 0", fontSize: 13, opacity: 0.85 }}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
