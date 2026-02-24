export type Language = "en" | "es";

export interface TriangleValues {
  a: number | null;
  b: number | null;
  c: number | null;
  α: number | null;
  β: number | null;
}

export interface GivenValues {
  a: boolean;
  b: boolean;
  c: boolean;
  α: boolean;
  β: boolean;
}

export interface SolveStep {
  parts: Array<{
    text: string;
    isFormula?: boolean;
  }>;
}

export interface SolverResult {
  values: TriangleValues;
  given: GivenValues;
  steps: SolveStep[];
  checks: string[];
}

export interface ResultItem {
  key: keyof TriangleValues;
  label: string;
  value: number | null;
  isAngle: boolean;
}
