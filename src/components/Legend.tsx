import { translations } from "../i18n";

interface LegendProps {
  language: "en" | "es";
}

export function Legend({ language }: LegendProps) {
  const t = translations[language];

  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-dot" style={{ background: "#ff6b35" }} />
        <span>{t.legend.sideA}</span>
      </div>
      <div className="legend-item">
        <div className="legend-dot" style={{ background: "#a78bfa" }} />
        <span>{t.legend.sideB}</span>
      </div>
      <div className="legend-item">
        <div className="legend-dot" style={{ background: "#4ade80" }} />
        <span>{t.legend.sideC}</span>
      </div>
      <div className="legend-item">
        <div className="legend-dot" style={{ background: "#f5c518" }} />
        <span>{t.legend.rightAngle}</span>
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "#6b6b80",
          marginTop: "6px",
          maxWidth: "220px",
          lineHeight: "1.6",
        }}
      >
        <div>
          <b style={{ color: "#ff6b35" }}>{t.legend.orangeLabel}</b>
        </div>
        <div>
          <b style={{ color: "#4ade80" }}>{t.legend.greenLabel}</b>{" "}
        </div>
      </div>
    </div>
  );
}
