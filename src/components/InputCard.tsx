import type { TriangleValues } from "../types";
import { translations } from "../i18n";

interface InputCardProps {
  title: string;
  children: React.ReactNode;
}

export function InputCard({ title, children }: InputCardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: number | null;
  onChange: (value: number | null) => void;
  note?: string;
  min?: number;
  max?: number;
  step?: string;
}

export function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  note,
  min,
  max,
  step = "any",
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v === "" ? null : parseFloat(v));
  };

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={handleChange}
        step={step}
        min={min}
        max={max}
        className={value !== null ? "filled" : ""}
      />
      {note && <div className="angle-note">{note}</div>}
    </div>
  );
}

interface SidesCardProps {
  values: TriangleValues;
  onChangeA: (value: number | null) => void;
  onChangeB: (value: number | null) => void;
  onChangeC: (value: number | null) => void;
  language: "en" | "es";
}

export function SidesCard({
  values,
  onChangeA,
  onChangeB,
  onChangeC,
  language,
}: SidesCardProps) {
  const t = translations[language];

  return (
    <InputCard title={t.sections.sides}>
      <InputField
        id="inp-a"
        label={t.labels.sideA}
        placeholder="ej. 3"
        value={values.a}
        onChange={onChangeA}
      />
      <InputField
        id="inp-b"
        label={t.labels.sideB}
        placeholder="ej. 4"
        value={values.b}
        onChange={onChangeB}
      />
      <InputField
        id="inp-c"
        label={t.labels.sideC}
        placeholder="ej. 5"
        value={values.c}
        onChange={onChangeC}
      />
    </InputCard>
  );
}

interface AnglesCardProps {
  values: TriangleValues;
  onChangeAlpha: (value: number | null) => void;
  onChangeBeta: (value: number | null) => void;
  onSolve: () => void;
  onReset: () => void;
  language: "en" | "es";
}

export function AnglesCard({
  values,
  onChangeAlpha,
  onChangeBeta,
  onSolve,
  onReset,
  language,
}: AnglesCardProps) {
  const t = translations[language];

  return (
    <InputCard title={t.sections.angles}>
      <InputField
        id="inp-alpha"
        label={t.labels.angleAlpha}
        placeholder="ej. 30"
        value={values.α}
        onChange={onChangeAlpha}
        min={0}
        max={90}
        note={t.labels.angleNote}
      />
      <InputField
        id="inp-beta"
        label={t.labels.angleBeta}
        placeholder="ej. 60"
        value={values.β}
        onChange={onChangeBeta}
        min={0}
        max={90}
        note={t.labels.angleNote}
      />
      <button id="solve" onClick={onSolve} className="btn-solve">
        {t.buttons.solve}
      </button>
      <button id="reset" onClick={onReset} className="btn-reset">
        {t.buttons.reset}
      </button>
    </InputCard>
  );
}
