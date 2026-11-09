"use client";

import { useState } from "react";
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";

type Estado = "idle" | "enviando" | "ok" | "error";

export default function CotizaForm({
  sistemaInicial = "",
  sectorInicial = "",
}: {
  sistemaInicial?: string;
  sectorInicial?: string;
}) {
  const [estado, setEstado] = useState<Estado>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Error al enviar.");
      setEstado("ok");
      form.reset();
    } catch (err) {
      setEstado("error");
      setError(err instanceof Error ? err.message : "Error al enviar.");
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-xl border border-linea bg-white p-6">
        <p className="font-display text-xl uppercase text-pizarra">¡Gracias!</p>
        <p className="mt-2 text-sm text-pizarra">
          Recibimos tu solicitud. Te contactamos a la brevedad para armar tu cotización.
        </p>
      </div>
    );
  }

  const campo =
    "w-full rounded-lg border border-linea bg-white px-3 py-2.5 text-sm text-tinta outline-none focus:border-rojo";

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      {/* honeypot anti-spam (oculto) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input name="nombre" required placeholder="Nombre *" className={campo} />
        <input name="telefono" placeholder="Teléfono / WhatsApp" className={campo} />
      </div>
      <input name="email" type="email" placeholder="Correo" className={campo} />

      <div className="grid gap-3 sm:grid-cols-2">
        <select name="sistema" defaultValue={sistemaInicial} className={campo}>
          <option value="">¿Qué sistema te interesa?</option>
          {sistemas.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.nombre}
            </option>
          ))}
        </select>
        <select name="sector" defaultValue={sectorInicial} className={campo}>
          <option value="">¿Para qué sector?</option>
          {sectores.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="mensaje"
        rows={4}
        placeholder="Cuéntanos de tu proyecto"
        className={campo}
      />

      {estado === "error" && <p className="text-sm text-rojo">{error}</p>}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-1 inline-flex items-center justify-center rounded-lg bg-rojo px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-rojo-600 disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Solicitar cotización"}
      </button>
    </form>
  );
}
