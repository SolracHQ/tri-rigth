import { useState, useCallback } from "react";
import type { TriangleValues, GivenValues, SolveStep } from "./types";
import { TriangleSolver } from "./solver";
import { Header } from "./components/Header";
import { Legend } from "./components/Legend";
import { TriangleCanvas } from "./components/TriangleCanvas";
import { SidesCard, AnglesCard } from "./components/InputCard";
import { ResultsCard, ErrorDisplay } from "./components/ResultsCard";
import "./App.css";

function App() {
  const [language, setLanguage] = useState<"en" | "es">("es");
  const [values, setValues] = useState<TriangleValues>({
    a: null,
    b: null,
    c: null,
    α: null,
    β: null,
  });

  const [results, setResults] = useState<{
    values: TriangleValues;
    given: GivenValues;
    steps: SolveStep[];
    checks: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleValueChange = useCallback(
    (key: keyof TriangleValues, value: number | null) => {
      setValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const handleSolve = useCallback(() => {
    try {
      setError(null);
      const solver = new TriangleSolver(language);
      const result = solver.solve(values);

      // Update given status based on initial input
      const newGiven: GivenValues = {
        a: values.a !== null,
        b: values.b !== null,
        c: values.c !== null,
        α: values.α !== null,
        β: values.β !== null,
      };

      setResults({
        values: result.values,
        given: newGiven,
        steps: result.steps,
        checks: result.checks,
      });
      setShowResults(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setShowResults(true);
    }
  }, [values, language]);

  const handleReset = useCallback(() => {
    setValues({
      a: null,
      b: null,
      c: null,
      α: null,
      β: null,
    });
    setResults(null);
    setError(null);
    setShowResults(false);
  }, []);

  return (
    <div className="app">
      <Header language={language} onLanguageChange={setLanguage} />

      <div className="container">
        {/* Diagram */}
        <div className="card diagram-card">
          <TriangleCanvas
            values={results?.values || values}
            given={results?.given || null}
            isPlaceholder={!showResults}
            language={language}
          />
          <Legend language={language} />
        </div>

        {/* Sides Input */}
        <SidesCard
          values={values}
          onChangeA={(val) => handleValueChange("a", val)}
          onChangeB={(val) => handleValueChange("b", val)}
          onChangeC={(val) => handleValueChange("c", val)}
          language={language}
        />

        {/* Angles Input */}
        <AnglesCard
          values={values}
          onChangeAlpha={(val) => handleValueChange("α", val)}
          onChangeBeta={(val) => handleValueChange("β", val)}
          onSolve={handleSolve}
          onReset={handleReset}
          language={language}
        />

        {/* Results */}
        {results && (
          <ResultsCard
            values={results.values}
            given={results.given}
            steps={results.steps}
            checks={results.checks}
            language={language}
            show={showResults && !error}
          />
        )}

        {/* Errors */}
        <ErrorDisplay error={error} show={showResults && !!error} />
      </div>
    </div>
  );
}

export default App;
