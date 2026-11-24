"use client";

/*
 * Cierre del inicio: una sola frase que se completa y un botón.
 * Los huecos abren una lista propia (no el menú del sistema operativo) con la
 * tipografía del sitio. Los datos de contacto se piden en la página de cotización,
 * a donde llegan ya elegidos el sistema y el sector.
 */

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";

type Opcion = { valor: string; texto: string };

function Hueco({
  etiqueta,
  vacio,
  opciones,
  valor,
  onCambio,
  retraso = "0s",
}: {
  retraso?: string;
  etiqueta: string;
  vacio: string;
  opciones: Opcion[];
  valor: string;
  onCambio: (v: string) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const [foco, setFoco] = useState(0);
  const caja = useRef<HTMLSpanElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const elegida = valor ? opciones.find((o) => o.valor === valor) : undefined;

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("pointerdown", fuera);
    return () => document.removeEventListener("pointerdown", fuera);
  }, [abierto]);

  const abrir = () => {
    setFoco(Math.max(0, opciones.findIndex((o) => o.valor === valor)));
    setAbierto(true);
  };
  const elegir = (v: string) => {
    onCambio(v);
    setAbierto(false);
    boton.current?.focus();
  };
  const teclas = (e: React.KeyboardEvent) => {
    if (!abierto) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        abrir();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setAbierto(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFoco((f) => (f + 1) % opciones.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFoco((f) => (f - 1 + opciones.length) % opciones.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      elegir(opciones[foco].valor);
    } else if (e.key === "Tab") {
      setAbierto(false);
    }
  };

  return (
    <span ref={caja} className="relative inline-block">
      <button
        ref={boton}
        type="button"
        aria-label={etiqueta}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => (abierto ? setAbierto(false) : abrir())}
        onKeyDown={teclas}
        data-vacio={elegida ? undefined : ""}
        data-abierto={abierto ? "" : undefined}
        style={{ "--retraso": retraso } as React.CSSProperties}
        className="hueco group relative mx-[0.22em] my-[0.2em] inline-flex cursor-pointer items-center gap-[0.28em] bg-white/[0.12] py-[0.04em] pl-[0.24em] pr-[0.14em] uppercase text-white outline-none transition-colors duration-200 hover:bg-white/[0.22] focus-visible:bg-white/[0.22] data-[abierto]:bg-white/[0.22]"
      >
        {(["tl", "tr", "bl", "br"] as const).map((e) => (
          <span key={e} aria-hidden className={`hueco-esquina hueco-${e}`} />
        ))}
        <span className={elegida ? "" : "text-white/85"}>{elegida?.texto ?? vacio}</span>
        <span
          aria-hidden
          className="hueco-flecha flex h-[0.62em] w-[0.62em] shrink-0 items-center justify-center bg-white text-rojo"
        >
          <svg
            viewBox="0 0 16 10"
            className={`h-[0.18em] w-[0.3em] transition-transform duration-200 ${abierto ? "rotate-180" : ""}`}
          >
            <path d="M1 1 L8 8 L15 1" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </span>
      </button>

      <ul
        id={id}
        role="listbox"
        aria-label={etiqueta}
        className={`absolute left-1 top-full z-30 mt-3 w-[min(24rem,calc(100vw-2.5rem))] origin-top bg-white py-2 font-sans font-normal normal-case shadow-[0_24px_50px_-20px_rgb(0_0_0/0.55)] transition duration-200 ${
          abierto ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <li aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tinta" />
        {opciones.map((o, i) => {
          const activa = !!valor && o.valor === valor;
          return (
            <li
              key={o.valor || "vacio"}
              role="option"
              aria-selected={activa}
              onPointerEnter={() => setFoco(i)}
              onClick={() => elegir(o.valor)}
              className={`flex min-h-12 cursor-pointer items-center gap-3 px-5 text-left text-lg leading-tight tracking-normal ${
                i === foco ? "bg-hueso" : ""
              } ${activa ? "font-semibold text-rojo" : o.valor ? "text-tinta" : "text-pizarra"}`}
            >
              <span aria-hidden className={`h-2 w-2 shrink-0 ${activa ? "bg-rojo" : "border border-pizarra/40"}`} />
              {o.texto}
            </li>
          );
        })}
      </ul>
    </span>
  );
}

export default function FraseCotizar() {
  const [sistema, setSistema] = useState("");
  const [sector, setSector] = useState("");
  const destino = `/contacto?${new URLSearchParams({ ...(sistema && { sistema }), ...(sector && { sector }) })}`;

  const opcionesSistema: Opcion[] = [
    ...sistemas.filter((s) => !s.pendiente).map((s) => ({ valor: s.slug, texto: s.nombre })),
    { valor: "", texto: "Aún no lo sé" },
  ];
  const opcionesSector: Opcion[] = [
    ...sectores.map((s) => ({ valor: s.slug, texto: s.nombre })),
    { valor: "", texto: "Otro / aún no lo sé" },
  ];

  return (
    <div>
      <div className="font-display text-[clamp(2rem,5.4vw,4.5rem)] font-bold uppercase leading-[1.45] text-white">
        Quiero cotizar{" "}
        <Hueco etiqueta="Sistema" vacio="un sistema" opciones={opcionesSistema} valor={sistema} onCambio={setSistema} />{" "}
        para{" "}
        <Hueco retraso="1.3s" etiqueta="Sector" vacio="mi sector" opciones={opcionesSector} valor={sector} onCambio={setSector} />.
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link
          href={destino}
          className="corte group inline-flex min-h-14 items-center gap-3 bg-white px-8 pr-9 font-semibold text-tinta transition-colors hover:bg-tinta hover:text-white"
        >
          Continuar con mi cotización
          <span aria-hidden className="flecha-avanza inline-block">
            →
          </span>
        </Link>
        <Link
          href="/configurador"
          className="inline-flex min-h-11 items-center font-semibold text-white underline decoration-white/60 underline-offset-4 hover:decoration-white"
        >
          Prefiero que me guíen paso a paso
        </Link>
      </div>
    </div>
  );
}
