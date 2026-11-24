"use client";

/*
 * Usos de un sistema con fotografía real: se elige el uso y se recorren sus fotos.
 */

import Image from "next/image";
import { useState } from "react";

export type Uso = { nombre: string; fotos: { img: string; titulo: string }[] };

export default function Usos({ usos }: { usos: Uso[] }) {
  const [u, setU] = useState(0);
  const [f, setF] = useState(0);
  const uso = usos[u];
  const foto = uso.fotos[f];

  return (
    <div className="grid grid-cols-1 gap-px border border-linea bg-linea lg:grid-cols-[15rem_1fr] [&>*]:min-w-0">
      <div className="flex flex-col gap-px bg-linea sm:flex-row lg:flex-col" role="tablist" aria-label="Usos">
        {usos.map((x, n) => (
          <button
            key={x.nombre}
            type="button"
            role="tab"
            aria-selected={n === u}
            onClick={() => (setU(n), setF(0))}
            className={`flex min-h-14 flex-1 items-center border-l-[3px] px-5 text-left font-display text-lg font-bold uppercase leading-tight transition-colors lg:flex-none ${
              n === u ? "border-rojo bg-hueso text-tinta" : "border-transparent bg-white text-pizarra hover:text-tinta"
            }`}
          >
            {x.nombre}
          </button>
        ))}
        <span className="hidden flex-1 bg-white lg:block" />
      </div>
      <div className="bg-white">
        <div className="relative aspect-[3/2] overflow-hidden bg-tinta">
          <Image
            key={foto.img}
            src={foto.img}
            alt={foto.titulo}
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="foto-entra object-cover"
          />
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta to-transparent p-5 pt-12 font-semibold text-white">
            {foto.titulo}
          </p>
        </div>
        <div className="flex gap-px bg-linea">
          {uso.fotos.map((x, n) => (
            <button
              key={x.img}
              type="button"
              aria-label={x.titulo}
              aria-pressed={n === f}
              onClick={() => setF(n)}
              className={`relative h-20 flex-1 overflow-hidden sm:h-24 ${n === f ? "" : "opacity-55 hover:opacity-100"}`}
            >
              <Image src={x.img} alt="" fill sizes="200px" className="object-cover" />
              {n === f && <span className="absolute inset-x-0 bottom-0 h-[3px] bg-rojo" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
