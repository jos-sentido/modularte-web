"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import { sistemas } from "@/data/sistemas";

export default function ConfiguradorPage() {
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
    "w-full rounded-lg border border-linea bg-white px-3 py-2.5 text-sm text-tinta outline-none focus:border-rojo";

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Eyebrow>Configurador</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
        ¿Qué necesitas construir?
      </h1>
      <p className="mt-4 max-w-xl text-pizarra">
        Elige un sistema, una aplicación, o ambos. Te mostramos qué resuelve tu
        proyecto.
      </p>

      <div className="mt-8 grid gap-3 rounded-2xl border border-linea bg-white p-4 sm:grid-cols-2 sm:p-6">
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

      <p className="mt-6 text-sm text-pizarra">
        {resultados.length} {resultados.length === 1 ? "sistema" : "sistemas"} para tu
        selección
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resultados.map((s) => (
          <Link
            key={s.slug}
            href={`/sistemas/${s.slug}`}
            className="group overflow-hidden rounded-xl border border-linea bg-white transition-colors hover:border-rojo"
          >
            {s.img && (
              <div className="h-44 w-full overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.nombre}
                  width={1000}
                  height={1250}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-5">
              <h2 className="font-display text-lg font-bold uppercase text-pizarra">
                {s.nombre}
              </h2>
              <p className="mt-1 text-sm text-pizarra">{s.tagline}</p>
              {aplicacion && (
                <span className="mt-3 inline-block rounded border border-linea px-2 py-0.5 text-[11px] text-pizarra">
                  {aplicacion}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {resultados.length === 0 && (
        <div className="mt-4 rounded-xl border border-dashed border-linea bg-white p-8 text-center">
          <p className="text-pizarra">
            No hay un sistema con esa combinación todavía.{" "}
            <Link href="/contacto" className="font-semibold text-rojo underline">
              Cotiza y te orientamos
            </Link>
            .
          </p>
        </div>
      )}
    </section>
  );
}
