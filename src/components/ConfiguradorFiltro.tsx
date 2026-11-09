"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SistemaIcon from "./SistemaIcon";
import { sistemas } from "@/data/sistemas";

export default function ConfiguradorFiltro() {
  const disponibles = useMemo(() => sistemas.filter((s) => !s.pendiente), []);

  const aplicaciones = useMemo(() => {
    const set = new Set<string>();
    disponibles.forEach((s) => s.aplicaciones.forEach((a) => set.add(a)));
    return Array.from(set).sort();
  }, [disponibles]);

  const [sistema, setSistema] = useState("");
  const [aplicacion, setAplicacion] = useState("");

  const resultados = disponibles.filter((s) => {
    if (sistema && s.slug !== sistema) return false;
    if (aplicacion && !s.aplicaciones.includes(aplicacion)) return false;
    return true;
  });

  const campo =
    "w-full border border-linea bg-white px-3 py-2.5 text-sm text-tinta outline-none focus:border-rojo";

  return (
    <>
      <div className="grid gap-4 border border-linea bg-white p-5 sm:grid-cols-2 sm:p-6">
        <label className="block">
          <span className="font-eyebrow text-[11px] uppercase tracking-[0.14em] text-pizarra">
            Sistema
          </span>
          <select
            value={sistema}
            onChange={(e) => setSistema(e.target.value)}
            className={`mt-1 ${campo}`}
          >
            <option value="">Todos los sistemas</option>
            {disponibles.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-eyebrow text-[11px] uppercase tracking-[0.14em] text-pizarra">
            Aplicación
          </span>
          <select
            value={aplicacion}
            onChange={(e) => setAplicacion(e.target.value)}
            className={`mt-1 ${campo}`}
          >
            <option value="">Todas las aplicaciones</option>
            {aplicaciones.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 font-eyebrow text-[11px] uppercase tracking-[0.14em] text-pizarra">
        {resultados.length} {resultados.length === 1 ? "sistema" : "sistemas"} —
      </p>

      <div className="mt-4 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {resultados.map((s) => (
          <Link key={s.slug} href={`/sistemas/${s.slug}`} className="group flex items-start gap-4">
            <span className="flex h-16 w-16 flex-none items-center justify-center rounded-xl border border-linea text-rojo transition-all group-hover:-translate-y-0.5 group-hover:border-rojo">
              <SistemaIcon slug={s.slug} className="h-9 w-9" />
            </span>
            <div className="pt-1">
              <h2 className="font-display text-lg font-bold uppercase text-pizarra transition-colors group-hover:text-rojo">
                {s.nombre}
              </h2>
              <p className="mt-1 text-sm text-pizarra">{s.tagline}</p>
              {aplicacion && (
                <span className="mt-2 inline-block border border-linea px-2 py-0.5 text-[11px] text-pizarra">
                  {aplicacion}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {resultados.length === 0 && (
        <div className="mt-4 border border-dashed border-linea bg-white p-8 text-center">
          <p className="text-pizarra">
            No hay un sistema con esa combinación todavía.{" "}
            <Link href="/contacto" className="font-semibold text-rojo underline">
              Cotiza y te orientamos
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
}
