"use client";

/*
 * Catálogo de Unidades Móviles: se elige el modelo y se ve por fuera, en planta y
 * por dentro, con su medida, ejes, distribución y equipamiento.
 */

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  modelosMoviles,
  equipamientoOficina,
  equipamientoBano,
  equipamientoSanitarios,
} from "@/data/moviles";

// el modelo 3D se carga solo cuando se pide
const Explorador3D = dynamic(() => import("./Explorador3D"), { ssr: false });

type Vista = "exterior" | "planta" | "interior" | "recorrer";
const VISTAS: [Vista, string][] = [
  ["exterior", "Exterior"],
  ["planta", "Planta"],
  ["interior", "Interior"],
  ["recorrer", "Recorrer en 3D"],
];

export default function ModelosMoviles() {
  const [id, setId] = useState("oficina-8x24");
  const [vista, setVista] = useState<Vista>("exterior");
  const m = modelosMoviles.find((x) => x.id === id)!;
  const sanitario = m.grupo === "Sanitarios";
  const conBano = !sanitario && !m.id.endsWith("abierta");
  const equipo = sanitario ? equipamientoSanitarios : [...equipamientoOficina, ...(m.extras ?? [])];
  const grupos = ["Oficinas de obra", "Sanitarios"] as const;

  return (
    <div className="grid gap-px border border-linea bg-linea lg:grid-cols-[17rem_1fr]">
      <div className="bg-white p-5 sm:p-6">
        {grupos.map((g) => (
          <fieldset key={g} className="mb-6 last:mb-0">
            <legend className="font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">{g}</legend>
            <div className="mt-2 grid grid-cols-2 gap-x-2 lg:grid-cols-1">
              {modelosMoviles
                .filter((x) => x.grupo === g)
                .map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    aria-pressed={x.id === id}
                    onClick={() => setId(x.id)}
                    className={`flex min-h-11 items-center border-l-[3px] py-2 pl-3 pr-1 text-left text-[15px] font-semibold transition-colors ${
                      x.id === id ? "border-rojo text-tinta" : "border-transparent text-pizarra hover:text-tinta"
                    }`}
                  >
                    {x.nombre}
                  </button>
                ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="bg-white">
        <div className="relative">
          {vista === "recorrer" ? (
            <Explorador3D conjunto="moviles" fijo={m.id} />
          ) : (
          <div className="flex h-[16rem] items-center justify-center p-5 pt-16 sm:h-[26rem] sm:p-10 sm:pt-20">
              <Image
                key={`${m.id}-${vista}`}
                src={`/moviles/${m.id}-${vista}.jpg`}
                alt={`${m.nombre}: ${vista}`}
                width={670}
                height={400}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="foto-entra h-full w-full object-contain"
              />
            </div>
          )}
          <div className="absolute left-3 top-3 flex gap-px bg-linea shadow-sm sm:left-4 sm:top-4" role="group" aria-label="Vista">
            {VISTAS.map(([v, rotulo]) => (
              <button
                key={v}
                type="button"
                aria-pressed={vista === v}
                onClick={() => setVista(v)}
                className={`min-h-11 px-3 font-eyebrow text-[11px] uppercase tracking-[0.16em] transition-colors sm:px-4 ${
                  vista === v ? "bg-tinta text-white" : "bg-white text-pizarra hover:text-tinta"
                }`}
              >
                {rotulo}
              </button>
            ))}
          </div>
          {vista === "interior" && (
            <p className="absolute bottom-3 right-4 font-eyebrow text-[10px] uppercase tracking-[0.14em] text-pizarra">
              Imagen de referencia
            </p>
          )}
        </div>

        <div className="grid gap-px border-t border-linea bg-linea sm:grid-cols-3">
          <div className="bg-hueso p-5 sm:p-6">
            <p className="font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">Medida</p>
            <p className="mt-2 font-display text-2xl font-bold uppercase leading-tight text-tinta">{m.metros}</p>
            <p className="mt-1 text-sm text-pizarra">{m.pies}</p>
          </div>
          <div className="bg-hueso p-5 sm:p-6">
            <p className="font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">Remolque</p>
            <p className="mt-2 font-display text-xl font-bold uppercase leading-tight text-tinta">{m.eje}</p>
          </div>
          <div className="bg-hueso p-5 sm:p-6">
            <p className="font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">Distribución</p>
            <p className="mt-2 font-semibold text-tinta">{m.distribucion}</p>
          </div>
        </div>

        <div className="border-t border-linea p-5 sm:p-6">
          <p className="font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">Equipamiento</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {equipo.map((e) => (
              <li key={e} className="bg-hueso px-3 py-2 text-sm text-tinta">
                {e}
              </li>
            ))}
          </ul>
          {conBano && (
            <p className="mt-4 text-sm text-pizarra">
              <span className="font-semibold text-tinta">En baño:</span> {equipamientoBano.join(" · ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
