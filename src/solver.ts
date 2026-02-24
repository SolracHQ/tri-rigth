import type {
  TriangleValues,
  GivenValues,
  SolverResult,
  SolveStep,
} from "./types";
import { prettyNumber, eps } from "./mathUtils";
import { translations } from "./i18n";
import type { Language } from "./i18n";

export class TriangleSolver {
  private t: (typeof translations)["en"];

  constructor(lang: Language) {
    this.t = translations[lang];
  }

  private createStep(text: string, formulaPart?: string): SolveStep {
    if (formulaPart) {
      const parts_array = text.split(formulaPart);
      if (parts_array.length === 2) {
        return {
          parts: [
            { text: parts_array[0] },
            { text: formulaPart, isFormula: true },
            { text: parts_array[1] },
          ],
        };
      }
    }
    return {
      parts: [{ text }],
    };
  }

  solve(inputs: TriangleValues): SolverResult {
    let { a, b, c, α, β } = { ...inputs };
    const steps: SolveStep[] = [];
    const given: GivenValues = {
      a: inputs.a !== null,
      b: inputs.b !== null,
      c: inputs.c !== null,
      α: inputs.α !== null,
      β: inputs.β !== null,
    };

    // Count knowns
    const knowns = [a, b, c, α, β].filter((v) => v !== null).length;
    if (knowns < 2) {
      throw new Error(this.t.errors.minValues);
    }

    // Validate positives
    for (const [k, v] of Object.entries({ a, b, c })) {
      if (v !== null && v <= 0) {
        throw new Error(this.t.errors.negativeSide.replace("{side}", k));
      }
    }

    for (const [k, v] of Object.entries({ α, β })) {
      if (v !== null && (v <= 0 || v >= 90)) {
        throw new Error(this.t.errors.invalidAngle.replace("{angle}", k));
      }
    }

    // Convert angles to radians internally
    let αrad = α !== null ? (α * Math.PI) / 180 : null;

    // Derive β from α and vice versa
    if (α !== null && β === null) {
      β = 90 - α;
      const formula = prettyNumber(β, true);
      steps.push(
        this.createStep(
          this.t.formulas.complementary
            .replace("{angle}", prettyNumber(α, true))
            .replace("{result}", formula),
          formula,
        ),
      );
    } else if (β !== null && α === null) {
      α = 90 - β;
      αrad = (α * Math.PI) / 180;
      const formula = prettyNumber(α, true);
      steps.push(
        this.createStep(
          this.t.formulas.complementary2
            .replace("{angle}", prettyNumber(β, true))
            .replace("{result}", formula),
          formula,
        ),
      );
    }

    // Resolve sides using Pythagorean theorem
    if (a !== null && c !== null && b === null) {
      b = Math.sqrt(c * c - a * a);
      const formula = prettyNumber(b);
      steps.push(
        this.createStep(
          this.t.formulas.pythagoras
            .replace("{formula}", "b = √(c² − a²)")
            .replace("{result}", formula),
          formula,
        ),
      );
    } else if (b !== null && c !== null && a === null) {
      a = Math.sqrt(c * c - b * b);
      const formula = prettyNumber(a);
      steps.push(
        this.createStep(
          this.t.formulas.pythagoras2.replace("{result}", formula),
          formula,
        ),
      );
    } else if (a !== null && b !== null && c === null) {
      c = Math.sqrt(a * a + b * b);
      const formula = prettyNumber(c);
      steps.push(
        this.createStep(
          this.t.formulas.pythagoras2.replace("{result}", formula),
          formula,
        ),
      );
    }

    // Use trig to find angles if not known, or sides if angles known
    if (αrad !== null) {
      if (c !== null && a === null) {
        a = c * Math.sin(αrad);
        const formula = prettyNumber(a);
        steps.push(
          this.createStep(
            this.t.formulas.sinAlpha
              .replace("{angle}", prettyNumber(α!, true))
              .replace("{result}", formula),
            formula,
          ),
        );
      }
      if (c !== null && b === null) {
        b = c * Math.cos(αrad);
        const formula = prettyNumber(b);
        steps.push(
          this.createStep(
            this.t.formulas.cosAlpha
              .replace("{angle}", prettyNumber(α!, true))
              .replace("{result}", formula),
            formula,
          ),
        );
      }
      if (a !== null && b === null) {
        b = a / Math.tan(αrad);
        const formula = prettyNumber(b);
        steps.push(
          this.createStep(
            this.t.formulas.tanAlpha2
              .replace("{angle}", prettyNumber(α!, true))
              .replace("{result}", formula),
            formula,
          ),
        );
      }
      if (b !== null && a === null) {
        a = b * Math.tan(αrad);
        const formula = prettyNumber(a);
        steps.push(
          this.createStep(
            this.t.formulas.tanAlpha
              .replace("{angle}", prettyNumber(α!, true))
              .replace("{result}", formula),
            formula,
          ),
        );
      }
      if (a !== null && c === null) {
        c = a / Math.sin(αrad);
        const formula = prettyNumber(c);
        steps.push(
          this.createStep(
            this.t.formulas.sinAlpha2
              .replace("{angle}", prettyNumber(α!, true))
              .replace("{result}", formula),
            formula,
          ),
        );
      }
      if (b !== null && c === null) {
        c = b / Math.cos(αrad);
        const formula = prettyNumber(c);
        steps.push(
          this.createStep(
            this.t.formulas.cosAlpha2
              .replace("{angle}", prettyNumber(α!, true))
              .replace("{result}", formula),
            formula,
          ),
        );
      }
    }

    // Fill angles from sides if still unknown
    if (α === null && a !== null && c !== null) {
      αrad = Math.asin(a / c);
      α = (αrad * 180) / Math.PI;
      β = 90 - α;
      const formula = prettyNumber(α, true);
      steps.push(
        this.createStep(
          this.t.formulas.arcsin
            .replace("{a}", prettyNumber(a))
            .replace("{c}", prettyNumber(c))
            .replace("{result}", formula),
          formula,
        ),
      );
      const formula2 = prettyNumber(β, true);
      steps.push(
        this.createStep(
          this.t.formulas.complementary
            .replace("{angle}", prettyNumber(α, true))
            .replace("{result}", formula2),
          formula2,
        ),
      );
    } else if (α === null && b !== null && c !== null) {
      αrad = Math.acos(b / c);
      α = (αrad * 180) / Math.PI;
      β = 90 - α;
      const formula = prettyNumber(α, true);
      steps.push(
        this.createStep(
          this.t.formulas.arccos
            .replace("{b}", prettyNumber(b))
            .replace("{c}", prettyNumber(c))
            .replace("{result}", formula),
          formula,
        ),
      );
    } else if (α === null && a !== null && b !== null) {
      αrad = Math.atan2(a, b);
      α = (αrad * 180) / Math.PI;
      β = 90 - α;
      const formula = prettyNumber(α, true);
      steps.push(
        this.createStep(
          this.t.formulas.arctan
            .replace("{a}", prettyNumber(a))
            .replace("{b}", prettyNumber(b))
            .replace("{result}", formula),
          formula,
        ),
      );
    }

    // Fill remaining missing side using pythagorean if still null
    if (c !== null && a !== null && b === null) {
      b = Math.sqrt(c * c - a * a);
      const formula = prettyNumber(b);
      steps.push(
        this.createStep(
          this.t.formulas.pythagoras2.replace("{result}", formula),
          formula,
        ),
      );
    } else if (c !== null && b !== null && a === null) {
      a = Math.sqrt(c * c - b * b);
      const formula = prettyNumber(a);
      steps.push(
        this.createStep(
          this.t.formulas.pythagoras2.replace("{result}", formula),
          formula,
        ),
      );
    } else if (a !== null && b !== null && c === null) {
      c = Math.sqrt(a * a + b * b);
      const formula = prettyNumber(c);
      steps.push(
        this.createStep(
          this.t.formulas.pythagoras2.replace("{result}", formula),
          formula,
        ),
      );
    }

    // Final β from α if still null
    if (β === null && α !== null) {
      β = 90 - α;
    }

    // Validation checks
    const checks: string[] = [];
    if (a !== null && b !== null && c !== null) {
      const pyth = Math.abs(a * a + b * b - c * c);
      if (pyth < 1e-6) {
        checks.push(this.t.checks.pythagorean);
      } else {
        checks.push(this.t.checks.pythagoreanFail);
      }
    }
    if (α !== null && β !== null) {
      if (eps(α + β, 90, 1e-6)) {
        checks.push(this.t.checks.complementary);
      }
    }

    return {
      values: { a, b, c, α, β },
      given,
      steps,
      checks,
    };
  }
}
