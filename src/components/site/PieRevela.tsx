"use client";

/*
 * Reveal del pie cuando no cabe completo en la pantalla (celular y pantallas bajas).
 * En escritorio el pie se queda fijo al fondo con CSS (.pie-descubre); aquí, como el
 * pie es más alto que la pantalla, su contenido arranca escondido bajo la página y baja
 * a su lugar mientras el borde superior del pie sube hasta el tope; luego se recorre
 * completo. Al subir, se contrae.
 */

import { useEffect, useRef } from "react";

const FIJO = "(min-width: 1024px) and (min-height: 760px)";
const RECORRIDO = 0.45; // cuánto se esconde el contenido bajo la página al asomar

export default function PieRevela({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const pie = el?.parentElement;
    if (!el || !pie) return;
    const fijo = window.matchMedia(FIJO);
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cuadro = 0;

    const pintar = () => {
      cuadro = 0;
      if (fijo.matches || reducido.matches) {
        el.style.transform = "";
        return;
      }
      const r = pie.getBoundingClientRect();
      const vh = window.innerHeight;
      // avance según la parte de ARRIBA del pie: 0 cuando asoma por abajo,
      // 1 cuando su borde superior llega al tope de la pantalla. Así el pie se
      // destapa de arriba hacia abajo y después se recorre completo con el scroll.
      const avance = Math.min(1, Math.max(0, (vh - r.top) / vh));
      const recorrido = Math.min(vh * RECORRIDO, 360);
      el.style.transform = `translate3d(0, ${-(1 - avance) * recorrido}px, 0)`;
    };
    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(pintar);
    };
    pintar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    fijo.addEventListener("change", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      fijo.removeEventListener("change", pedir);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
}
