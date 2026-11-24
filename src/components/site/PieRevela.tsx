"use client";

/*
 * Reveal del pie cuando no cabe completo en la pantalla (celular y pantallas bajas).
 * En escritorio el pie se queda fijo al fondo con CSS (.pie-descubre); aquí, como el
 * pie es más alto que la pantalla, el contenido se desplaza hacia arriba por debajo
 * de la página y va bajando a su lugar conforme haces scroll. Al subir, se contrae.
 */

import { useEffect, useRef } from "react";

const FIJO = "(min-width: 1024px) and (min-height: 760px)";
const FACTOR = 0.7;

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
      if (r.top > vh) return;
      const oculto = Math.max(0, r.bottom - vh);
      el.style.transform = `translate3d(0, ${-oculto * FACTOR}px, 0)`;
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
