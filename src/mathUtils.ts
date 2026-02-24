export function eps(a: number, b: number, e: number = 1e-9): boolean {
  return Math.abs(a - b) < e;
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function round4(v: number): string {
  return parseFloat(v.toFixed(4)).toString();
}

// Known square root values for pretty printing
const SQRT_KNOWN: Array<[number, string]> = [
  [Math.sqrt(2), '√2'],
  [Math.sqrt(3), '√3'],
  [Math.sqrt(5), '√5'],
  [Math.sqrt(6), '√6'],
  [Math.sqrt(7), '√7'],
  [Math.sqrt(10), '√10'],
  [Math.sqrt(2) / 2, '√2/2'],
  [Math.sqrt(3) / 2, '√3/2'],
  [Math.sqrt(3) / 3, '√3/3'],
  [1 / Math.sqrt(2), '√2/2'],
  [1 / Math.sqrt(3), '√3/3'],
  [2 / Math.sqrt(3), '2√3/3'],
  [Math.sqrt(3) / 4, '√3/4'],
];

// Known angle values in degrees
const ANGLE_NICE: Record<number, string> = {
  0: '0°',
  15: '15°',
  22.5: '22.5°',
  30: '30°',
  36: '36°',
  45: '45°',
  54: '54°',
  60: '60°',
  67.5: '67.5°',
  72: '72°',
  75: '75°',
  90: '90°',
};

export function prettyNumber(val: number | null, isAngle: boolean = false): string {
  if (val === null || val === undefined || isNaN(val)) return '?';
  if (val < 0) return '-' + prettyNumber(-val, isAngle);

  if (isAngle) {
    // val is in degrees
    for (const [deg, name] of Object.entries(ANGLE_NICE)) {
      if (eps(val, parseFloat(deg))) return name;
    }
    return round4(val) + '°';
  }

  // Integer?
  if (eps(val, Math.round(val)) && Math.abs(val) < 10000) {
    return String(Math.round(val));
  }

  // Try multiples of known surds
  for (const [surdVal, surdStr] of SQRT_KNOWN) {
    const ratio = val / surdVal;
    const rRound = Math.round(ratio);
    if (rRound !== 0 && eps(ratio, rRound) && Math.abs(rRound) <= 200) {
      if (rRound === 1) return surdStr;
      if (rRound === -1) return '-' + surdStr;
      return rRound + surdStr.replace('√', '·√');
    }
  }

  // Simple fraction with integer numerator/denominator?
  for (let d = 2; d <= 12; d++) {
    const n = val * d;
    const nR = Math.round(n);
    if (eps(n, nR) && Math.abs(nR) < 1000) {
      const g = gcd(Math.abs(nR), d);
      const num = nR / g;
      const den = d / g;
      if (den === 1) return String(num);
      return `${num}/${den}`;
    }
  }

  // Try n * surd / d
  for (const [surdVal, surdStr] of SQRT_KNOWN) {
    for (let d = 2; d <= 12; d++) {
      const ratio = (val * d) / surdVal;
      const rR = Math.round(ratio);
      if (rR !== 0 && eps(ratio, rR)) {
        const g = gcd(Math.abs(rR), d);
        const num = rR / g;
        const den = d / g;
        const surdPart = num === 1 ? surdStr : `${num}${surdStr.replace('√', '·√')}`;
        return den === 1 ? surdPart : `${surdPart}/${den}`;
      }
    }
  }

  return round4(val);
}
