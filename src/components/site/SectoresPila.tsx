"use client";

/*
 * Sectores apilados: cada sector es un módulo que, al bajar la página, sube y se
 * acomoda encima del anterior (ScrollStack, React Bits). Es la operación que
 * define al producto: módulos que se apilan hasta completar el conjunto.
 */

import Link from "next/link";
import Image from "next/image";
import ScrollStack from "@/components/bits/ScrollStack";
import { sectores } from "@/data/sectores";

export default function SectoresPila() {
  return (
    <ScrollStack
      useWindowScroll
      smoothScroll={false}
      stackPosition={84}
      itemStackDistance={16}
      itemDistance={56}
      itemScale={0.025}
      baseScale={0.9}
      dimAmount={0.12}
      holdDistance={80}
    >
      {sectores.map((s, n) => (
        <article
          key={s.slug}
          className="relative grid origin-top overflow-hidden border-t-[3px] border-rojo bg-tinta text-white shadow-[0_-14px_40px_-18px_rgb(0_0_0/0.45)] will-change-transform md:h-[25rem] md:grid-cols-[1.1fr_1fr]"
        >
          <div className="flex flex-col justify-between gap-6 p-6 sm:p-9">
            <p className="font-eyebrow text-[11px] uppercase tracking-[0.18em] text-white/60">
              Módulo {n + 1} de {sectores.length}
            </p>
            <div>
              <h3 className="font-display text-4xl font-bold uppercase leading-none sm:text-6xl">
                {s.nombre}
              </h3>
              <p className="mt-4 max-w-md text-white/75">{s.problema}</p>
              <p className="mt-2 max-w-md font-semibold">{s.solucion}</p>
            </div>
            <Link
              href={`/soluciones/${s.slug}`}
              className="inline-flex min-h-11 w-fit items-center border border-white/60 px-5 text-sm font-semibold transition-colors hover:bg-white hover:text-tinta"
            >
              Ver la solución
            </Link>
          </div>
          <div className="relative min-h-52">
            <Image
              src={s.img}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
            <span className="absolute bottom-3 right-3 bg-tinta/70 px-2 py-1 font-eyebrow text-[9px] uppercase tracking-[0.16em] text-white/80">
              Imagen de referencia
            </span>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-black opacity-[var(--scroll-stack-dim,0)]"
          />
        </article>
      ))}
    </ScrollStack>
  );
}
