"use client";

/*
 * Solicitud de cotización de Modularte.
 * Una sola vista: al elegir sistema y sector se va armando la frase del pedido,
 * como un espacio que se completa con sus módulos. Envía a /api/cotizar (Firestore).
 */

import { useState } from "react";
import SistemaIcon from "@/components/SistemaIcon";
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";

type Estado = "idle" | "enviando" | "ok" | "error";

export default function Solicitud({
  sistemaInicial = "",
  sectorInicial = "",
}: {
  sistemaInicial?: string;
  sectorInicial?: string;
}) {
  const [sistema, setSistema] = useState(sistemaInicial);
  const [sector, setSector] = useState(sectorInicial);
  const [estado, setEstado] = useState<Estado>("idle");
  const [error, setError] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setError("");
    const datos = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, sistema, sector }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "No se pudo enviar la solicitud.");
      setEstado("ok");
    } catch (err) {
      setEstado("error");
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar la solicitud. Intenta de nuevo o escríbenos por WhatsApp.",
      );
    }
  }

  if (estado === "ok") {
    return (
      <div className="border border-pizarra/40 bg-white p-8">
        <p className="font-display text-2xl font-bold uppercase text-tinta">Solicitud recibida</p>
        <p className="mt-3 text-pizarra">
          Te contactamos a la brevedad para armar tu cotización.
        </p>
      </div>
    );
  }

  const campo =
    "min-h-11 w-full border-0 border-b-2 border-pizarra/40 bg-transparent px-0 py-2 text-[15px] text-tinta outline-none focus-visible:border-rojo";
  const etiqueta = "font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra";
  const hueco = (texto: string | undefined, vacio: string) =>
    texto ? (
      <span className="text-rojo">{texto}</span>
    ) : (
      <span className="text-pizarra/45">{vacio}</span>
    );
  const nombreSistema = sistemas.find((s) => s.slug === sistema)?.nombre;
  const nombreSector = sectores.find((s) => s.slug === sector)?.nombre;

  return (
    <form onSubmit={enviar} className="bg-hueso p-6 sm:p-9">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <p className="font-display text-2xl font-bold uppercase leading-tight text-tinta sm:text-4xl" aria-live="polite">
        Quiero cotizar {hueco(nombreSistema, "un sistema")} para {hueco(nombreSector, "mi sector")}.
      </p>

      <fieldset className="mt-8">
        <legend className={etiqueta}>Sistema</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sistemas.map((s) => {
            const activo = sistema === s.slug;
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={activo}
                onClick={() => setSistema(activo ? "" : s.slug)}
                className={`inline-flex min-h-12 items-center gap-2 border-2 bg-white pl-2 pr-4 text-sm font-semibold transition-colors ${
                  activo ? "border-rojo text-tinta" : "border-transparent text-pizarra hover:border-pizarra/40"
                }`}
              >
                <SistemaIcon slug={s.slug} className="h-8 w-10" />
                {s.nombre}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={etiqueta}>Sector</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sectores.map((s) => {
            const activo = sector === s.slug;
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={activo}
                onClick={() => setSector(activo ? "" : s.slug)}
                className={`min-h-12 border-2 bg-white px-4 text-sm font-semibold transition-colors ${
                  activo ? "border-rojo text-tinta" : "border-transparent text-pizarra hover:border-pizarra/40"
                }`}
              >
                {s.nombre}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <label className="block">
          <span className={etiqueta}>Nombre *</span>
          <input name="nombre" required autoComplete="name" className={campo} />
        </label>
        <label className="block">
          <span className={etiqueta}>Teléfono o WhatsApp</span>
          <input name="telefono" type="tel" autoComplete="tel" className={campo} />
        </label>
        <label className="block">
          <span className={etiqueta}>Correo</span>
          <input name="email" type="email" autoComplete="email" className={campo} />
        </label>
      </div>
      <label className="mt-5 block">
        <span className={etiqueta}>Cuéntanos de tu proyecto</span>
        <textarea name="mensaje" rows={3} className={campo} />
      </label>

      {estado === "error" && (
        <p role="alert" className="mt-4 text-sm font-semibold text-rojo-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center bg-rojo px-8 text-sm font-semibold text-white transition-colors hover:bg-rojo-600 disabled:opacity-60 sm:w-auto"
      >
        {estado === "enviando" ? "Enviando…" : "Solicitar cotización"}
      </button>
    </form>
  );
}
