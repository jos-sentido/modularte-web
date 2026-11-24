"use client";

/*
 * Galería de proyectos con fotografía real.
 * - modo "tira": carrusel horizontal que se arrastra o se mueve con flechas (inicio).
 * - modo "completa": mosaico con filtros por tipo (página de proyectos).
 * En ambos, al tocar una foto se abre en grande y se recorre con flechas o teclado.
 */

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { proyectos, type Categoria } from "@/data/proyectos";
import Selector from "./Selector";

const CATEGORIAS: ("Todas" | Categoria)[] = ["Todas", "Edificios", "Armado en sitio", "Aulas", "Interiores"];

export default function Galeria({ modo = "completa" }: { modo?: "tira" | "completa" }) {
  const [filtro, setFiltro] = useState<(typeof CATEGORIAS)[number]>("Todas");
  const [abierta, setAbierta] = useState<number | null>(null);
  const tira = useRef<HTMLDivElement>(null);
  const lista = modo === "tira" ? proyectos.slice(0, 9) : proyectos.filter((p) => filtro === "Todas" || p.categoria === filtro);

  const mover = useCallback(
    (d: number) => setAbierta((n) => (n === null ? n : (n + d + lista.length) % lista.length)),
    [lista.length],
  );

  // teclado y bloqueo de scroll mientras la foto está abierta
  useEffect(() => {
    if (abierta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", tecla);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = previo;
    };
  }, [abierta, mover]);

  const flecha =
    "grid h-12 w-12 place-items-center border border-white/50 text-lg text-white transition-colors hover:bg-white hover:text-tinta";

  const visor =
    abierta !== null &&
    createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label={lista[abierta].titulo}
        className="fixed inset-0 z-[80] flex flex-col bg-tinta/95 p-4 sm:p-8"
        onClick={() => setAbierta(null)}
      >
        <div className="flex items-center justify-between gap-4 text-white">
          <p className="font-eyebrow text-[11px] uppercase tracking-[0.18em] text-white/70">
            {String(abierta + 1).padStart(2, "0")} / {String(lista.length).padStart(2, "0")} — {lista[abierta].categoria}
          </p>
          <button type="button" autoFocus onClick={() => setAbierta(null)} aria-label="Cerrar" className={flecha}>
            ✕
          </button>
        </div>
        <div className="relative my-4 min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
          <Image key={lista[abierta].img} src={lista[abierta].img} alt={lista[abierta].titulo} fill sizes="100vw" className="foto-entra object-contain" />
        </div>
        <div className="flex items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
          <p className="font-display text-xl font-bold uppercase leading-tight text-white sm:text-2xl">{lista[abierta].titulo}</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => mover(-1)} aria-label="Foto anterior" className={flecha}>
              ←
            </button>
            <button type="button" onClick={() => mover(1)} aria-label="Foto siguiente" className={flecha}>
              →
            </button>
          </div>
        </div>
      </div>,
      document.body,
    );

  const tarjeta = (i: number, clase: string, sizes: string) => {
    const p = lista[i];
    return (
      <button
        key={p.img}
        type="button"
        onClick={() => setAbierta(i)}
        aria-label={`Ver en grande: ${p.titulo}`}
        className={`group relative block overflow-hidden bg-tinta text-left ${clase}`}
      >
        <Image src={p.img} alt="" fill sizes={sizes} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" draggable={false} />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/90 to-transparent p-4 pt-12">
          <span className="block font-eyebrow text-[10px] uppercase tracking-[0.16em] text-white/70">{p.categoria}</span>
          <span className="mt-1 block text-sm font-semibold text-white sm:text-base">{p.titulo}</span>
        </span>
        <span aria-hidden className="absolute left-3 top-3 h-6 w-6 border-l-[3px] border-t-[3px] border-rojo opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
    );
  };

  if (modo === "tira")
    return (
      <div>
        <div
          ref={tira}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {lista.map((_, i) => tarjeta(i, "h-[19rem] w-[82vw] flex-none snap-start sm:h-[26rem] sm:w-[38rem]", "(max-width: 640px) 82vw, 608px"))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="font-eyebrow text-[11px] uppercase tracking-[0.16em] text-white/60">Desliza o usa las flechas · toca una foto para ampliarla</p>
          <div className="hidden gap-2 sm:flex">
            <button type="button" aria-label="Fotos anteriores" onClick={() => tira.current?.scrollBy({ left: -640, behavior: "smooth" })} className={flecha}>
              ←
            </button>
            <button type="button" aria-label="Fotos siguientes" onClick={() => tira.current?.scrollBy({ left: 640, behavior: "smooth" })} className={flecha}>
              →
            </button>
          </div>
        </div>
        {visor}
      </div>
    );

  return (
    <div>
      <Selector
        etiqueta="Filtrar por tipo"
        valor={filtro}
        onCambio={(id) => (setFiltro(id as (typeof CATEGORIAS)[number]), setAbierta(null))}
        opciones={CATEGORIAS.map((c) => ({
          id: c,
          rotulo: c,
          cuenta: c === "Todas" ? proyectos.length : proyectos.filter((p) => p.categoria === c).length,
        }))}
      />
      <div key={filtro} className="foto-entra mt-8 grid auto-rows-[13rem] grid-flow-dense gap-3 sm:grid-cols-2 sm:auto-rows-[15rem] lg:grid-cols-3">
        {lista.map((_, i) => tarjeta(i, i % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : "", i % 5 === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"))}
      </div>
      {visor}
    </div>
  );
}
