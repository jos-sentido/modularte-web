"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { sistemas } from "@/data/sistemas";

export default function ConfiguradorPage() {
  const disponibles = sistemas.filter((s) => !s.pendiente);

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

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <select value={sistema} onChange={(e) => setSistema(e.target.value)} className={campo}>
          <option value="">Todos los sistemas</option>
          {disponibles.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.nombre}
            </option>
          ))}
        </select>
        <select
          value={aplicacion}
          onChange={(e) => setAplicacion(e.target.value)}
          className={campo}
        >
          <option value="">Todas las aplicaciones</option>
          {aplicaciones.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resultados.map((s) => (
          <Link
            key={s.slug}
            href={`/sistemas/${s.slug}`}
            className="rounded-xl border border-linea bg-white p-6 transition-colors hover:border-rojo"
          >
            <h2 className="font-display text-xl font-bold uppercase text-pizarra">
              {s.nombre}
            </h2>
            <p className="mt-2 text-sm text-pizarra">{s.tagline}</p>
            {aplicacion && (
              <span className="mt-3 inline-block rounded border border-linea px-2 py-0.5 text-[11px] text-pizarra">
                {aplicacion}
              </span>
            )}
          </Link>
        ))}
        {resultados.length === 0 && (
          <p className="text-pizarra">
            No hay un sistema con esa combinación todavía.{" "}
            <Link href="/contacto" className="text-rojo underline">
              Cotiza y te orientamos
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
