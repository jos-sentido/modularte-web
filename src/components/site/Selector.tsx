"use client";

/*
 * Selector de Modularte (filtros, pestañas, vistas).
 * Las opciones van en tipografía de titular sobre una línea de base; lo que marca
 * la elegida no es un relleno ni un subrayado: solo el marco de esquinas del
 * manual, que se desplaza y se ajusta de una opción a otra. Cada opción puede llevar su cuenta.
 */

import { useLayoutEffect, useRef, useState } from "react";

export type Opcion = { id: string; rotulo: string; cuenta?: number };

export default function Selector({
  opciones,
  valor,
  onCambio,
  tono = "claro",
  etiqueta,
}: {
  opciones: Opcion[];
  valor: string;
  onCambio: (id: string) => void;
  tono?: "claro" | "oscuro";
  etiqueta: string;
}) {
  const pista = useRef<HTMLDivElement>(null);
  const [marco, setMarco] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const medir = () => {
      const el = pista.current?.querySelector<HTMLElement>(`[data-id="${valor}"]`);
      if (el) setMarco({ x: el.offsetLeft, w: el.offsetWidth });
    };
    medir();
    window.addEventListener("resize", medir);
    document.fonts?.ready.then(medir);
    return () => window.removeEventListener("resize", medir);
  }, [valor, opciones.length]);

  const oscuro = tono === "oscuro";
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        ref={pista}
        role="group"
        aria-label={etiqueta}
        className={`relative inline-flex min-w-full items-stretch border-b ${oscuro ? "border-white/25" : "border-pizarra/30"}`}
      >
        {/* marco de esquinas que viaja a la opción elegida */}
        {marco && (
          <span
            aria-hidden
            className="marco-movil pointer-events-none absolute inset-y-0 left-0"
            style={{ transform: `translateX(${marco.x}px)`, width: marco.w }}
          >
            <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-rojo" />
            <span className="absolute bottom-2 right-0 h-3 w-3 border-b-2 border-r-2 border-rojo" />
          </span>
        )}
        {opciones.map((o) => {
          const activa = o.id === valor;
          return (
            <button
              key={o.id}
              type="button"
              data-id={o.id}
              aria-pressed={activa}
              onClick={() => onCambio(o.id)}
              className={`relative flex min-h-14 flex-none items-baseline gap-2 whitespace-nowrap px-6 pb-5 pt-3.5 font-display text-lg font-bold uppercase leading-none transition-colors sm:px-7 sm:text-xl ${
                activa
                  ? oscuro
                    ? "text-white"
                    : "text-tinta"
                  : oscuro
                    ? "text-white/50 hover:text-white"
                    : "text-pizarra/70 hover:text-tinta"
              }`}
            >
              {o.rotulo}
              {o.cuenta !== undefined && (
                <span className={`font-eyebrow text-[10px] font-normal tracking-[0.1em] ${activa ? "text-rojo" : ""}`}>
                  {String(o.cuenta).padStart(2, "0")}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
