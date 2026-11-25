import { WorkflowHeader } from "./WorkflowHeader.tsx";
import { templates } from "../templates/index.js";
import "./Toolbar.css";

const THEMES = [
  { value: "", label: "Default theme" },
  { value: "theme-brand1", label: "Brand 1 theme" },
  { value: "theme-brand2", label: "Brand 2 theme" },
];

export default function Toolbar({
  title,
  subtitle,
  theme,
  onThemeChange,
  onLoadTemplate,
  onExportPng,
  onExportSvg,
  onExportMarkdown,
}) {
  return (
    <header className="toolbar">
      <WorkflowHeader title={title} subtitle={subtitle} />

      <div className="toolbar__actions">
        <select
          className="toolbar__control"
          aria-label="Load template"
          value=""
          onChange={(e) => onLoadTemplate(e.target.value)}
        >
          <option value="" disabled>Load template…</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <select
          className="toolbar__control"
          aria-label="Theme"
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          {THEMES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        <div className="toolbar__group" role="group" aria-label="Export">
          <span className="toolbar__label">Export</span>
          <button className="toolbar__control" onClick={onExportPng}>PNG</button>
          <button className="toolbar__control" onClick={onExportSvg}>SVG</button>
          <button className="toolbar__control" onClick={onExportMarkdown}>Markdown</button>
        </div>
      </div>
    </header>
  );
}
