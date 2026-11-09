"use client";

import { useEffect, useRef, useState } from "react";

/**
 * MARCOS Y ESQUINAS — recurso oficial de Modularte (inspirado en los módulos).
 * Dibuja ganchos en las esquinas con un trazo que se "arma" al entrar en viewport.
 * variant:
 *  - "all"    → las 4 esquinas
 *  - "frame"  → esquinas enfrentadas (sup-izq + inf-der), como "foto enmarcada"
 *  - "accent" → un solo acento en la esquina sup-izq
 */
export default function CornerFrame({
  variant = "frame",
  size = 30,
  stroke = 3,
  inset = 10,
  color = "var(--color-rojo)",
  className = "",
}: {
  variant?: "all" | "frame" | "accent";
  size?: number;
  stroke?: number;
  inset?: number;
  color?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (setOn(true), io.disconnect())),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const corners =
    variant === "all"
      ? (["tl", "tr", "br", "bl"] as const)
      : variant === "frame"
        ? (["tl", "br"] as const)
        : (["tl"] as const);

  // path en L dentro de un viewBox size×size, con padding para el grosor
  const p = stroke / 2 + 0.5;
  const d = `M ${p} ${size - p} L ${p} ${p} L ${size - p} ${p}`;
  const len = 2 * (size - 2 * p);

  const rot: Record<string, number> = { tl: 0, tr: 90, br: 180, bl: 270 };
  const pos: Record<string, React.CSSProperties> = {
    tl: { top: inset, left: inset },
    tr: { top: inset, right: inset },
    br: { bottom: inset, right: inset },
    bl: { bottom: inset, left: inset },
  };

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {corners.map((c, i) => (
        <svg
          key={c}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          className="absolute"
          style={{ ...pos[c], transform: `rotate(${rot[c]}deg)` }}
        >
          <path
            d={d}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="square"
            style={{
              strokeDasharray: len,
              strokeDashoffset: on ? 0 : len,
              transition: `stroke-dashoffset 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 110 + 80}ms`,
            }}
          />
        </svg>
      ))}
    </div>
  );
}
