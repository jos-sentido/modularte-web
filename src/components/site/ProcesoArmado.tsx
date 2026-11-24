"use client";

/*
 * Proceso de armado, paso a paso e interactivo.
 * La imagen de cada paso entra armándose por franjas (como los paneles que cierran
 * un muro), el número grande marca la etapa y el riel rojo avanza solo; se puede
 * pausar, saltar a un paso con clic o moverse con las flechas del teclado.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Paso = { img: string; titulo: string; texto: string };

const DURACION = 5200;
const FRANJAS = 6;

export default function ProcesoArmado({ pasos, nota }: { pasos: Paso[]; nota?: string }) {
  const [i, setI] = useState(0);
  const [corre, setCorre] = useState(false);
  const [avance, setAvance] = useState(0);
  const raiz = useRef<HTMLDivElement>(null);
  const inicio = useRef(0);

  // arranca solo cuando la sección entra en pantalla y si no se pidió menos movimiento
  useEffect(() => {
    const el = raiz.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setCorre(e.isIntersecting), { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!corre) return;
    inicio.current = performance.now() - avance * DURACION;
    let cuadro = 0;
    const tic = (t: number) => {
      const p = (t - inicio.current) / DURACION;
      if (p >= 1) {
        setAvance(0);
        setI((n) => (n + 1) % pasos.length);
        return;
      }
      setAvance(p);
      cuadro = requestAnimationFrame(tic);
    };
    cuadro = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(cuadro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corre, i, pasos.length]);

  const ir = (n: number) => {
    setAvance(0);
    setI((n + pasos.length) % pasos.length);
  };
  const teclas = (e: React.KeyboardEvent) => {
    const paso = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!paso) return;
    e.preventDefault();
    ir(i + paso);
  };
  const paso = pasos[i];
  const esFoto = paso.img.startsWith("/fotos/");

  return (
    <div
      ref={raiz}
      className="grid gap-px border border-linea bg-linea lg:grid-cols-[1.45fr_1fr]"
      onMouseEnter={() => setCorre(false)}
      onMouseLeave={() => setCorre(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)}
    >
      {/* escenario */}
      <div className={`relative aspect-[3/2] overflow-hidden lg:aspect-auto lg:min-h-[30rem] ${esFoto ? "bg-tinta" : "bg-white"}`}>
        <div key={paso.img} className="absolute inset-0">
          {Array.from({ length: FRANJAS }, (_, n) => (
            <div
              key={n}
              className="franja absolute inset-y-0 overflow-hidden"
              style={{ left: `${(n * 100) / FRANJAS}%`, width: `${100 / FRANJAS + 0.2}%`, animationDelay: `${n * 70}ms` }}
            >
              <div className="absolute inset-y-0" style={{ left: `${-n * 100}%`, width: `${FRANJAS * 100}%` }}>
                <Image
                  src={paso.img}
                  alt={n === 0 ? `Paso ${i + 1}: ${paso.titulo}` : ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={esFoto ? "object-cover" : "object-contain p-8 sm:p-14"}
                />
              </div>
            </div>
          ))}
        </div>
        {esFoto && <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta/75 via-transparent to-transparent" />}
        <p
          aria-hidden
          className={`absolute bottom-2 left-5 font-display text-[7rem] font-bold leading-none sm:text-[10rem] ${
            esFoto ? "text-white" : "text-tinta/10"
          }`}
        >
          {String(i + 1).padStart(2, "0")}
        </p>
      </div>

      {/* pasos */}
      <div className="flex flex-col bg-white" role="tablist" aria-label="Pasos del armado" onKeyDown={teclas}>
        {pasos.map((p, n) => {
          const activo = n === i;
          return (
            <button
              key={p.titulo}
              type="button"
              role="tab"
              aria-selected={activo}
              tabIndex={activo ? 0 : -1}
              onClick={() => ir(n)}
              className={`group relative flex flex-1 gap-4 border-b border-linea px-5 py-5 text-left transition-colors last:border-b-0 sm:px-7 ${
                activo ? "bg-hueso" : "hover:bg-hueso/60"
              }`}
            >
              {/* riel que avanza */}
              <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-linea">
                <span
                  className="absolute inset-x-0 top-0 bg-rojo"
                  style={{ height: activo ? `${Math.max(avance, corre ? 0 : 1) * 100}%` : n < i ? "100%" : "0%" }}
                />
              </span>
              <span className={`font-eyebrow text-[11px] tracking-[0.16em] ${activo ? "text-rojo" : "text-pizarra"}`}>
                {String(n + 1).padStart(2, "0")}
              </span>
              <span>
                <span className={`block font-display text-xl font-bold uppercase leading-tight ${activo ? "text-tinta" : "text-pizarra"}`}>
                  {p.titulo}
                </span>
                <span
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    activo ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <span className="overflow-hidden text-pizarra">{p.texto}</span>
                </span>
              </span>
            </button>
          );
        })}
        {nota && (
          <p className="border-t border-linea px-5 py-3 font-eyebrow text-[10px] uppercase tracking-[0.14em] text-pizarra sm:px-7">
            {nota}
          </p>
        )}
      </div>
    </div>
  );
}
