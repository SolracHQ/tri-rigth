interface HeaderProps {
  language: "en" | "es";
  onLanguageChange: (lang: "en" | "es") => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="header">
      <h1>
        {language === "en" ? (
          <>
            <span className="y">Tri</span>
            <span className="o">Solve</span>
          </>
        ) : (
          <>
            <span className="y">Tri</span>
            <span className="o">Rect</span>
          </>
        )}
      </h1>
      <div className="language-selector">
        <button
          onClick={() => onLanguageChange("es")}
          className={`lang-btn ${language === "es" ? "active" : ""}`}
        >
          ES
        </button>
        <button
          onClick={() => onLanguageChange("en")}
          className={`lang-btn ${language === "en" ? "active" : ""}`}
        >
          EN
        </button>
      </div>
    </header>
  );
}
