export type Language = "en" | "es";

export const translations = {
  en: {
    title: "Tri",
    titleHighlight1: "Rigth",
    titleHighlight2: ".",
    sections: {
      sides: "Sides",
      angles: "Angles",
      result: "Result",
      steps: "Steps",
    },
    labels: {
      sideA: "a - opposite side to α",
      sideB: "b - opposite side to β",
      sideC: "c - hypotenuse",
      angleAlpha: "Angle α",
      angleBeta: "Angle β",
      angleNote: "In degrees (e.g: 30, 45, 60)",
    },
    legend: {
      sideA: "a = opposite side to α (vertical)",
      sideB: "b = opposite side to β (horizontal)",
      sideC: "c = hypotenuse",
      rightAngle: "The 90° angle is always at the bottom left",
      orangeLabel: "orange label = input data",
      greenLabel: "green label = calculated value",
    },
    buttons: {
      solve: "CALCULATE ▶",
      reset: "↺ Clear all",
    },
    results: {
      sideA: "Side a",
      sideB: "Side b",
      hypotenuseC: "Hypotenuse c",
      angleAlpha: "Angle α",
      angleBeta: "Angle β",
      given: "Given",
      solved: "Calculated",
    },
    errors: {
      minValues: "Please enter at least 2 known values.",
      negativeSide: "Side {side} must be positive.",
      invalidAngle: "Angle {angle} must be between 0° and 90° (exclusive).",
    },
    checks: {
      pythagorean: "a² + b² = c² - Pythagorean theorem satisfied",
      pythagoreanFail:
        "Pythagorean theorem is NOT satisfied. Check your input data.",
      complementary: "α + β = 90° - Angles are complementary",
    },
    formulas: {
      pythagoras: "Pythagorean theorem: {formula} = {result}",
      pythagoras2: "Pythagorean theorem: {result}",
      sinAlpha: "sin(α) = a/c then a = c·sin({angle}) = {result}",
      cosAlpha: "cos(α) = b/c then b = c·cos({angle}) = {result}",
      tanAlpha: "tan(α) = a/b then a = b·tan({angle}) = {result}",
      tanAlpha2: "tan(α) = a/b then b = a/tan({angle}) = {result}",
      sinAlpha2: "sin(α) = a/c then c = a/sin({angle}) = {result}",
      cosAlpha2: "cos(α) = b/c then c = b/cos({angle}) = {result}",
      arcsin: "sin(α) = a/c then α = arcsin({a}/{c}) = {result}",
      arccos: "cos(α) = b/c then α = arccos({b}/{c}) = {result}",
      arctan: "tan(α) = a/b then α = arctan({a}/{b}) = {result}",
      complementary: "Since α + β = 90°: β = 90° - {angle} = {result}",
      complementary2: "Since α + β = 90°: α = 90° - {angle} = {result}",
    },
    placeholderText: "Enter values and press CALCULATE",
  },
  es: {
    title: "Tri",
    titleHighlight1: "Rect",
    titleHighlight2: ".",
    sections: {
      sides: "Lados",
      angles: "Ángulos",
      result: "Resultado",
      steps: "Pasos",
    },
    labels: {
      sideA: "a - cateto opuesto a α",
      sideB: "b - cateto opuesto a β",
      sideC: "c - hipotenusa",
      angleAlpha: "Ángulo α",
      angleBeta: "Ángulo β",
      angleNote: "En grados (ej: 30, 45, 60)",
    },
    legend: {
      sideA: "a = cateto opuesto a α (vertical)",
      sideB: "b = cateto opuesto a β (horizontal)",
      sideC: "c = hipotenusa",
      rightAngle: "El ángulo de 90° siempre está abajo a la izquierda",
      orangeLabel: "Etiqueta naranja = dato ingresado",
      greenLabel: "Etiqueta verde = valor calculado",
    },
    buttons: {
      solve: "CALCULAR ▶",
      reset: "↺ Limpiar todo",
    },
    results: {
      sideA: "Lado a",
      sideB: "Lado b",
      hypotenuseC: "Hipotenusa c",
      angleAlpha: "Ángulo α",
      angleBeta: "Ángulo β",
      given: "Dato",
      solved: "Calculado",
    },
    errors: {
      minValues: "Por favor ingresa al menos 2 valores conocidos.",
      negativeSide: "El lado {side} debe ser positivo.",
      invalidAngle: "El ángulo {angle} debe estar entre 0° y 90° (exclusivo).",
    },
    checks: {
      pythagorean: "a² + b² = c² - Teorema de Pitágoras satisfecho",
      pythagoreanFail:
        "El Teorema de Pitágoras NO se cumple. Revisa los datos ingresados.",
      complementary: "α + β = 90° - Los ángulos son complementarios",
    },
    formulas: {
      pythagoras: "Teorema de Pitágoras: {formula} = {result}",
      pythagoras2: "Teorema de Pitágoras: {result}",
      sinAlpha: "sin(α) = a/c entonces a = c·sin({angle}) = {result}",
      cosAlpha: "cos(α) = b/c entonces b = c·cos({angle}) = {result}",
      tanAlpha: "tan(α) = a/b entonces a = b·tan({angle}) = {result}",
      tanAlpha2: "tan(α) = a/b entonces b = a/tan({angle}) = {result}",
      sinAlpha2: "sin(α) = a/c entonces c = a/sin({angle}) = {result}",
      cosAlpha2: "cos(α) = b/c entonces c = b/cos({angle}) = {result}",
      arcsin: "sin(α) = a/c entonces α = arcsin({a}/{c}) = {result}",
      arccos: "cos(α) = b/c entonces α = arccos({b}/{c}) = {result}",
      arctan: "tan(α) = a/b entonces α = arctan({a}/{b}) = {result}",
      complementary: "Como α + β = 90°: β = 90° - {angle} = {result}",
      complementary2: "Como α + β = 90°: α = 90° - {angle} = {result}",
    },
    placeholderText: "Ingresa valores y presiona CALCULAR",
  },
};

export function useTranslation(lang: Language) {
  return translations[lang];
}
