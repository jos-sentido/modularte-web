"use client";

/*
 * La M del isotipo se arma con el scroll, en los tres pasos de Modularte:
 *   1 · Diseño: el contorno se traza como un plano sobre la retícula isométrica.
 *   2 · Fabricación: el cuerpo se rellena de rojo.
 *   3 · Montaje: las tres caras blancas bajan a su lugar como módulos.
 * Al subir, se desarma. Con movimiento reducido se muestra armada.
 * Geometría trazada del imagotipo oficial (public/brand/logo/imagotipo-rojo.png, 512×512).
 */

import { useEffect, useRef } from "react";

const CUERPO =
  "M36 142 L38 397 L114 439 L188 396 L189 318 L255 356 L322 319 L323 395 L398 439 L475 396 L472 139 L399 98 L255 180 L112 98 Z";
const CARAS = [
  { d: "M44 153 L318 310 L255 346 L108 261 L107 425 L44 389 Z", desde: [-34, -20] },
  { d: "M461 144 L328 222 L266 186 L399 108 Z", desde: [34, -20] },
  { d: "M394 277 L393 426 L332 390 L332 313 Z", desde: [0, -40] },
];
const PASOS = ["Diseño", "Fabricación", "Montaje"];

const tramo = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const salida = (t: number) => 1 - Math.pow(1 - t, 3);

export default function MArmado() {
  const marco = useRef<HTMLDivElement>(null);
  const trazo = useRef<SVGPathElement>(null);
  const relleno = useRef<SVGPathElement>(null);
  const caras = useRef<(SVGPathElement | null)[]>([]);
  const lineas = useRef<(SVGPathElement | null)[]>([]);
  const pasos = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cuadro = 0;

    const pintar = () => {
      cuadro = 0;
      const el = marco.current;
      if (!el) return;
      const vh = window.innerHeight;
      const p = reducido ? 1 : tramo(vh - el.getBoundingClientRect().top, 0, vh * 0.85);

      // 1 · Diseño: contorno y aristas se dibujan.
      const dib = salida(tramo(p, 0.05, 0.42));
      trazo.current?.style.setProperty("stroke-dashoffset", String(1 - dib));
      lineas.current.forEach((l) => l?.style.setProperty("stroke-dashoffset", String(1 - dib)));

      // 2 · Fabricación: el cuerpo se llena de rojo; el trazo se retira.
      const fab = salida(tramo(p, 0.38, 0.62));
      relleno.current?.style.setProperty("opacity", String(fab));
      const lin = String(1 - fab * 0.85);
      trazo.current?.style.setProperty("opacity", lin);
      lineas.current.forEach((l) => l?.style.setProperty("opacity", lin));

      // 3 · Montaje: cada cara llega a su sitio, una tras otra.
      CARAS.forEach((c, i) => {
        const t = salida(tramo(p, 0.6 + i * 0.1, 0.78 + i * 0.1));
        const el = caras.current[i];
        if (!el) return;
        el.style.opacity = String(t);
        el.style.transform = `translate(${c.desde[0] * (1 - t)}px, ${c.desde[1] * (1 - t)}px)`;
      });

      const activo = p >= 0.68 ? 2 : p >= 0.38 ? 1 : p > 0.02 ? 0 : -1;
      pasos.current.forEach((li, i) => li?.toggleAttribute("data-activo", i <= activo));
    };

    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(pintar);
    };
    pintar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <div ref={marco} className="relative aspect-square w-full overflow-hidden bg-tinta">
      <svg aria-hidden className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="reticula-iso" width="52" height="30" patternUnits="userSpaceOnUse">
            <path d="M0 0 L52 30 M52 0 L0 30" stroke="#fff" strokeOpacity="0.07" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#reticula-iso)" />
      </svg>

      <svg
        role="img"
        aria-label="Isotipo de Modularte armándose: diseño, fabricación y montaje"
        viewBox="20 80 472 376"
        className="absolute inset-[14%] h-[72%] w-[72%] overflow-visible"
      >
        <path ref={relleno} d={CUERPO} fill="#BE3E3E" style={{ opacity: 0 }} />
        <path
          ref={trazo}
          d={CUERPO}
          pathLength={1}
          fill="none"
          stroke="#F3F3F3"
          strokeWidth="2"
          strokeDasharray="1"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDashoffset: 1 }}
        />
        {CARAS.map((c, i) => (
          <path
            key={`l${i}`}
            ref={(n) => {
              lineas.current[i] = n;
            }}
            d={c.d}
            pathLength={1}
            fill="none"
            stroke="#F3F3F3"
            strokeWidth="1"
            strokeDasharray="1"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeDashoffset: 1 }}
          />
        ))}
        {CARAS.map((c, i) => (
          <path
            key={i}
            ref={(n) => {
              caras.current[i] = n;
            }}
            d={c.d}
            fill="#F3F3F3"
            style={{ opacity: 0 }}
          />
        ))}
      </svg>

      <ol className="absolute bottom-5 left-5 flex gap-3 font-eyebrow text-[10px] uppercase tracking-[0.12em] sm:gap-5 sm:text-[11px] sm:tracking-[0.16em] sm:bottom-7 sm:left-7">
        {PASOS.map((p, i) => (
          <li
            key={p}
            ref={(n) => {
              pasos.current[i] = n;
            }}
            className="flex items-center gap-2 text-white/35 transition-colors duration-300 data-[activo]:text-white"
          >
            <span className="h-1.5 w-1.5 bg-current" aria-hidden />
            {p}
          </li>
        ))}
      </ol>
    </div>
  );
}
