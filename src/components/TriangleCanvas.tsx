import { useEffect, useRef } from "react";
import type { TriangleValues, GivenValues } from "../types";
import { prettyNumber } from "../mathUtils";

interface TriangleCanvasProps {
  values: TriangleValues;
  given: GivenValues | null;
  isPlaceholder?: boolean;
  language: "en" | "es";
}

export function TriangleCanvas({
  values,
  given,
  isPlaceholder = false,
  language,
}: TriangleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isPlaceholder) {
      drawPlaceholderTriangle(ctx, canvas, language);
    } else {
      drawTriangle(ctx, canvas, values, given);
    }
  }, [values, given, isPlaceholder, language]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={260}
      style={{
        filter: "drop-shadow(0 0 24px rgba(245,197,24,0.18))",
        borderRadius: "8px",
      }}
    />
  );
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  vals: TriangleValues,
  given: GivenValues | null,
) {
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const { a, b, c, α, β } = vals;

  const COL_A = "#ff6b35";
  const COL_B = "#a78bfa";
  const COL_C = "#4ade80";
  const COL_90 = "#f5c518";
  const COL_GIVEN = "#ff6b35";
  const COL_SOLVED = "#4ade80";
  const COL_TRI = "rgba(245,197,24,0.06)";

  function labelColor(key: keyof TriangleValues): string {
    if (!given) return COL_SOLVED;
    return given[key] ? COL_GIVEN : COL_SOLVED;
  }

  const pad = 54;
  const drawW = W - pad * 2;
  const drawH = H - pad * 2;

  let ratio = a && b ? a / b : 0.75;
  ratio = Math.max(0.25, Math.min(3.5, ratio));

  let pw: number, ph: number;
  if (ratio >= 1) {
    ph = drawH;
    pw = drawH / ratio;
    if (pw > drawW) {
      pw = drawW;
      ph = drawW * ratio;
    }
  } else {
    pw = drawW;
    ph = drawW * ratio;
    if (ph > drawH) {
      ph = drawH;
      pw = drawH / ratio;
    }
  }

  const cx = pad + (drawW - pw) / 2;
  const cy = pad + (drawH - ph) / 2;
  const Px = cx;
  const Py = cy + ph;
  const Qx = cx + pw;
  const Qy = cy + ph;
  const Rx = cx;
  const Ry = cy;

  // Fill triangle
  ctx.beginPath();
  ctx.moveTo(Px, Py);
  ctx.lineTo(Qx, Qy);
  ctx.lineTo(Rx, Ry);
  ctx.closePath();
  ctx.fillStyle = COL_TRI;
  ctx.fill();

  // Draw sides
  function drawSide(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
  ) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  drawSide(Px, Py, Rx, Ry, COL_A);
  drawSide(Px, Py, Qx, Qy, COL_B);
  drawSide(Rx, Ry, Qx, Qy, COL_C);

  // Right-angle square
  const sq = 13;
  ctx.beginPath();
  ctx.moveTo(Px + sq, Py);
  ctx.lineTo(Px + sq, Py - sq);
  ctx.lineTo(Px, Py - sq);
  ctx.strokeStyle = COL_90;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Angle arcs
  function drawArc(
    ax: number,
    ay: number,
    startA: number,
    endA: number,
    color: string,
    r: number = 22,
  ) {
    ctx.beginPath();
    ctx.arc(ax, ay, r, startA, endA);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  const hypAngleFromA = Math.atan2(Qy - Ry, Qx - Rx);
  drawArc(Rx, Ry, Math.PI / 2, hypAngleFromA, COL_A, 20);

  const hypAngleFromB = Math.atan2(Ry - Qy, Rx - Qx);
  drawArc(Qx, Qy, hypAngleFromB, Math.PI, COL_B, 20);

  // Label helper
  function label(
    text: string,
    x: number,
    y: number,
    color: string,
    size: number = 13,
  ) {
    ctx.font = `bold ${size}px 'Nunito', sans-serif`;
    const tw = ctx.measureText(text).width;
    ctx.fillStyle = "rgba(13,13,15,0.82)";
    ctx.beginPath();
    const pad2 = 5;
    const rr = 4;
    ctx.roundRect(
      x - tw / 2 - pad2,
      y - size / 2 - 3,
      tw + pad2 * 2,
      size + 6,
      rr,
    );
    ctx.fill();
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  const pA = a ? prettyNumber(a, false) : "a";
  const pB = b ? prettyNumber(b, false) : "b";
  const pC = c ? prettyNumber(c, false) : "c";
  const pAA = α ? prettyNumber(α, true) : "α";
  const pBB = β ? prettyNumber(β, true) : "β";

  label(pA, Px - 22, (Py + Ry) / 2, labelColor("a"));
  label(pB, (Px + Qx) / 2, Py + 22, labelColor("b"));
  label(pC, (Rx + Qx) / 2 + 18, (Ry + Qy) / 2 - 8, labelColor("c"));
  label(pAA, Rx + 34, Ry + 18, labelColor("α"), 11);
  label(pBB, Qx - 34, Qy - 18, labelColor("β"), 11);

  // 90° text
  ctx.font = "bold 9px Nunito, sans-serif";
  ctx.fillStyle = COL_90;
  ctx.textAlign = "left";
  ctx.fillText("90°", Px + 17, Py - 5);
}

function drawPlaceholderTriangle(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  language: "en" | "es",
) {
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const pw = 180;
  const ph = 135;
  const ox = (W - pw) / 2;
  const oy = (H - ph) / 2;
  const Px = ox;
  const Py = oy + ph;
  const Qx = ox + pw;
  const Qy = oy + ph;
  const Rx = ox;
  const Ry = oy;

  // Draw triangle outline
  ctx.beginPath();
  ctx.moveTo(Px, Py);
  ctx.lineTo(Qx, Qy);
  ctx.lineTo(Rx, Ry);
  ctx.closePath();
  ctx.strokeStyle = "#2a2a35";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Right angle mark
  const sq = 13;
  ctx.beginPath();
  ctx.moveTo(Px + sq, Py);
  ctx.lineTo(Px + sq, Py - sq);
  ctx.lineTo(Px, Py - sq);
  ctx.strokeStyle = "#3a3a45";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Labels
  ctx.font = "12px Nunito, sans-serif";
  ctx.fillStyle = "#3a3a45";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("a", Px - 14, (Py + Ry) / 2);
  ctx.fillText("b", (Px + Qx) / 2, Py + 18);
  ctx.fillText("c", (Rx + Qx) / 2 + 14, (Ry + Qy) / 2 - 8);
  ctx.fillText("α", Rx + 22, Ry + 16);
  ctx.fillText("β", Qx - 22, Qy - 16);
  ctx.fillText("90°", Px + 16, Py - 6);

  // Placeholder text
  ctx.font = "11px Nunito, sans-serif";
  ctx.fillStyle = "#4a4a5a";
  const placeholderText =
    language === "es"
      ? "Ingresa valores y presiona CALCULAR"
      : "Enter values and press CALCULATE";
  ctx.fillText(placeholderText, W / 2, H - 16);
}
