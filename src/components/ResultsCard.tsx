import type { TriangleValues, GivenValues, SolveStep } from "../types";
import { prettyNumber, round4 } from "../mathUtils";
import { translations } from "../i18n";

interface ResultsCardProps {
  values: TriangleValues;
  given: GivenValues;
  steps: SolveStep[];
  checks: string[];
  language: "en" | "es";
  show: boolean;
}

export function ResultsCard({
  values,
  given,
  steps,
  checks,
  language,
  show,
}: ResultsCardProps) {
  const t = translations[language];

  if (!show) return null;

  const items = [
    {
      key: "a" as const,
      label: t.results.sideA,
      value: values.a,
      isAngle: false,
    },
    {
      key: "b" as const,
      label: t.results.sideB,
      value: values.b,
      isAngle: false,
    },
    {
      key: "c" as const,
      label: t.results.hypotenuseC,
      value: values.c,
      isAngle: false,
    },
    {
      key: "α" as const,
      label: t.results.angleAlpha,
      value: values.α,
      isAngle: true,
    },
    {
      key: "β" as const,
      label: t.results.angleBeta,
      value: values.β,
      isAngle: true,
    },
  ];

  return (
    <div className="card results-card">
      <h2>{t.sections.result}</h2>
      <div className="result-grid">
        {items.map((item) => {
          const isGiven = given[item.key];
          const pretty =
            item.value !== null ? prettyNumber(item.value, item.isAngle) : "—";
          const decimal =
            item.value !== null
              ? item.isAngle
                ? round4(item.value) + "°"
                : round4(item.value)
              : "";
          const cls = isGiven ? "given-val" : "new-val";
          const valCls = isGiven ? "given" : "new";
          const badge = isGiven
            ? `<span class="badge given">${t.results.given}</span>`
            : item.value !== null
              ? `<span class="badge solved">${t.results.solved}</span>`
              : "";

          return (
            <div key={item.key} className={`result-item ${cls}`}>
              {badge && <div dangerouslySetInnerHTML={{ __html: badge }} />}
              <div className="result-label">{item.label}</div>
              <div className={`result-value ${valCls}`}>{pretty}</div>
              {pretty !== decimal && item.value !== null && (
                <div className="result-decimal">≈ {decimal}</div>
              )}
            </div>
          );
        })}
      </div>

      {steps.length > 0 && (
        <>
          <hr className="separator" />
          <div
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              color: "var(--muted)",
              marginBottom: "8px",
            }}
          >
            {t.sections.steps}
          </div>
          <div className="step-list">
            {steps.map((step, i) => (
              <div key={i} className="step">
                <span style={{ color: "var(--accent)", marginRight: "8px" }}>
                  {i + 1}.
                </span>
                {step.parts.map((part, j) => (
                  <span
                    key={j}
                    className={part.isFormula ? "formula" : ""}
                    style={
                      part.isFormula
                        ? { color: "var(--accent)", fontWeight: "bold" }
                        : {}
                    }
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {checks.map((check, i) => (
        <div key={i} className="check-result check-ok">
          {check}
        </div>
      ))}
    </div>
  );
}

interface ErrorDisplayProps {
  error: string | null;
  show: boolean;
}

export function ErrorDisplay({ error, show }: ErrorDisplayProps) {
  if (!show || !error) return null;

  return (
    <div className="card results-card">
      <div className="error-msg">⚠ {error}</div>
    </div>
  );
}
