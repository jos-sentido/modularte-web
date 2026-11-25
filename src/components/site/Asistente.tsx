"use client";

/*
 * Configurador guiado de Modularte.
 * Una pregunta a la vez: qué espacio, si se mueve o se queda, para cuánta gente y
 * cuándo. Con cada respuesta se arma a la derecha la configuración recomendada
 * (sistema, por qué, modelo o distribución de referencia) y al final se envía como
 * solicitud de cotización. Las recomendaciones salen de los datos reales de cada
 * sistema; no calcula precios ni cantidades.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { borrarConfiguracion, guardarConfiguracion } from "@/lib/configuracion";
import SistemaIcon from "@/components/SistemaIcon";
import Cubes from "@/components/bits/Cubes";

type Uso = "oficina" | "dormitorios" | "aulas" | "sanitarios" | "comedor" | "clinica" | "bodega" | "caseta" | "otro";
type Movilidad = "movil" | "desmontable" | "fijo";
type Gente = "1-4" | "5-10" | "11-25" | "25+";
type Plazo = "ya" | "1-3" | "despues";

const USOS: [Uso, string][] = [
  ["oficina", "Oficinas"],
  ["dormitorios", "Dormitorios"],
  ["aulas", "Aulas"],
  ["sanitarios", "Sanitarios y regaderas"],
  ["comedor", "Comedor"],
  ["clinica", "Consultorio o clínica"],
  ["bodega", "Bodega o almacén"],
  ["caseta", "Caseta de vigilancia"],
  ["otro", "Otro espacio"],
];
const MOVILIDAD: [Movilidad, string, string][] = [
  ["movil", "Se va a mover de sitio", "Llega remolcado, se nivela y se va cuando termina el trabajo."],
  ["desmontable", "Se instala, pero quiero poder desmontarlo o hacerlo crecer", "Módulos que se atornillan, se apilan y se pueden llevar a otro lugar."],
  ["fijo", "Se queda fijo en un lugar", "Un edificio armado en sitio, a la medida del proyecto."],
];
const GENTE: [Gente, string][] = [
  ["1-4", "1 a 4 personas"],
  ["5-10", "5 a 10"],
  ["11-25", "11 a 25"],
  ["25+", "Más de 25"],
];
const PLAZO: [Plazo, string][] = [
  ["ya", "Lo antes posible"],
  ["1-3", "En 1 a 3 meses"],
  ["despues", "Más adelante"],
];

const SISTEMA: Record<Movilidad, { slug: string; nombre: string; img: string; contain?: boolean; porque: string[] }> = {
  movil: {
    slug: "unidades-moviles",
    nombre: "Unidades Móviles",
    img: "/renders/unidades-moviles.jpg",
    porque: ["Va montada sobre chasis de acero con ejes y tirón.", "Aislamiento térmico y acústico en paredes y techo.", "Sale equipada: aire acondicionado, contactos, voz y datos."],
  },
  desmontable: {
    slug: "armabox",
    nombre: "Armabox®",
    img: "/renders/armabox-modulo.jpg",
    porque: ["Módulo de 6055 × 2435 × 2896 mm que llega empacado plano.", "Se arma en sitio con pernos, sin soldar ni pintar.", "Se une con otros módulos y se apila."],
  },
  fijo: {
    slug: "tradicional",
    nombre: "Tradicional",
    img: "/renders/tradicional.jpg",
    porque: ["Estructura de acero que se arma en sitio.", "Muros de panel y cubierta a dos aguas.", "De uno o dos niveles, a la medida."],
  },
};

// modelo o distribución de referencia, tomados de las fichas y del folleto
function referencia(m: Movilidad, uso: Uso, gente: Gente): string {
  if (m === "movil") {
    if (uso === "sanitarios") return "Modelos de línea: sanitarios mixtos 8' × 24' y 8' × 32', regadera 8' × 32'.";
    if (uso === "caseta") return "Modelos de línea: casetas de 4' × 8', 5' × 5' y 8' × 8'.";
    if (uso === "clinica") return "Modelos de línea: consultorios de 8' × 24' y 8' × 32'.";
    if (uso === "bodega") return "Modelo de línea: bodega de 8' × 32'.";
    if (uso === "oficina")
      return {
        "1-4": "Para ese equipo: oficina de obra de 2.44 × 6.10 m o 2.44 × 7.31 m.",
        "5-10": "Para ese equipo: oficina de obra de 2.44 × 9.75 m o 2.44 × 13.41 m.",
        "11-25": "Para ese equipo: oficina de obra de 3.05 × 14.63 m o 3.66 × 18.28 m.",
        "25+": "Para ese equipo: varias unidades de 3.66 × 18.28 m.",
      }[gente];
    return "Modelos de línea de 8' × 32', 10' × 48' y 12' × 60'.";
  }
  if (m === "desmontable") {
    if (uso === "dormitorios") return "Distribuciones del sistema: dormitorio doble, con baño, o habitación con sala, en un módulo.";
    if (uso === "oficina")
      return gente === "1-4"
        ? "Distribuciones del sistema: oficina individual u oficina de 4 escritorios, en un módulo."
        : "Distribuciones del sistema: espacio compartido de 9 puestos o sala de reuniones de 22 personas, con tres módulos unidos.";
    return "Los módulos se combinan en largo, ancho y alto según el espacio que necesitas.";
  }
  return "Se diseña a la medida: te proponemos la distribución con base en tu programa.";
}

export default function Asistente() {
  const [uso, setUso] = useState<Uso | null>(null);
  const [mov, setMov] = useState<Movilidad | null>(null);
  const [gente, setGente] = useState<Gente | null>(null);
  const [plazo, setPlazo] = useState<Plazo | null>(null);
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const paso = !uso ? 1 : !mov ? 2 : !gente ? 3 : !plazo ? 4 : 5;
  const sis = mov ? SISTEMA[mov] : null;
  const rotulo = <T extends string>(lista: readonly (readonly [T, string, ...string[]])[], v: T | null) =>
    lista.find((x) => x[0] === v)?.[1] ?? "";
  const ref = mov && uso && gente ? referencia(mov, uso, gente) : "";

  const resumen = [
    uso && `Espacio: ${rotulo(USOS, uso)}`,
    mov && `Movilidad: ${rotulo(MOVILIDAD, mov)}`,
    gente && `Personas: ${rotulo(GENTE, gente)}`,
    plazo && `Plazo: ${rotulo(PLAZO, plazo)}`,
    sis && `Sistema sugerido: ${sis.nombre}`,
  ].filter(Boolean) as string[];

  const resumenTexto = resumen.join("|") + ref;
  useEffect(() => {
    if (!uso) return;
    guardarConfiguracion({ origen: "Configurador", sistema: sis?.slug, detalle: [...resumen, ...(ref ? [ref] : [])] });
    // resumenTexto resume las respuestas; evita guardar en cada render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumenTexto]);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setError("");
    const d = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...d,
          sistema: sis?.slug ?? "",
          mensaje: `[Configurador] ${resumen.join(" · ")}${d.mensaje ? ` — ${d.mensaje}` : ""}`,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "No se pudo enviar la solicitud.");
      borrarConfiguracion();
      setEstado("ok");
    } catch (err) {
      setEstado("error");
      setError(err instanceof Error ? err.message : "No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.");
    }
  }

  const opcion = "min-h-12 border-2 bg-white px-4 py-3 text-left font-semibold text-tinta transition-colors hover:border-tinta";
  const campo = "min-h-11 w-full border-0 border-b-2 border-pizarra/40 bg-transparent px-0 py-2 text-[15px] text-tinta outline-none focus-visible:border-rojo";
  const etiqueta = "font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra";

  // respuestas ya dadas: se pueden cambiar
  const dadas: [string, string, () => void][] = [];
  if (uso) dadas.push(["Espacio", rotulo(USOS, uso), () => (setUso(null), setMov(null), setGente(null), setPlazo(null))]);
  if (mov) dadas.push(["Movilidad", rotulo(MOVILIDAD, mov), () => (setMov(null), setGente(null), setPlazo(null))]);
  if (gente) dadas.push(["Personas", rotulo(GENTE, gente), () => (setGente(null), setPlazo(null))]);
  if (plazo) dadas.push(["Plazo", rotulo(PLAZO, plazo), () => setPlazo(null)]);

  return (
    <div className="grid gap-px border border-linea bg-linea lg:grid-cols-[1.25fr_1fr]">
      {/* conversación */}
      <div className="bg-hueso p-6 sm:p-10">
        <div className="flex items-center gap-3" aria-hidden>
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={`h-[3px] flex-1 transition-colors duration-300 ${n <= paso ? "bg-rojo" : "bg-linea"}`} />
          ))}
        </div>
        <p className={`mt-3 ${etiqueta}`}>Paso {paso} de 5</p>

        {dadas.length > 0 && (
          <ul className="mt-6 space-y-1">
            {dadas.map(([k, v, cambiar]) => (
              <li key={k} className="flex items-center justify-between gap-4 border-b border-linea py-2 text-sm">
                <span className="text-pizarra">
                  {k}: <span className="font-semibold text-tinta">{v}</span>
                </span>
                <button type="button" onClick={cambiar} className="min-h-11 px-2 text-sm font-semibold text-tinta underline underline-offset-4">
                  Cambiar
                </button>
              </li>
            ))}
          </ul>
        )}

        <div key={paso} className="foto-entra mt-8">
          {paso === 1 && (
            <>
              <h2 className="font-display text-3xl font-bold uppercase leading-tight text-tinta sm:text-4xl">¿Qué espacio necesitas?</h2>
              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {USOS.map(([v, t]) => (
                  <button key={v} type="button" onClick={() => setUso(v)} className={`${opcion} border-transparent`}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
          {paso === 2 && (
            <>
              <h2 className="font-display text-3xl font-bold uppercase leading-tight text-tinta sm:text-4xl">¿Se va a mover o se queda?</h2>
              <div className="mt-6 grid gap-2">
                {MOVILIDAD.map(([v, t, d]) => (
                  <button key={v} type="button" onClick={() => setMov(v)} className={`${opcion} border-transparent`}>
                    {t}
                    <span className="mt-1 block text-sm font-normal text-pizarra">{d}</span>
                  </button>
                ))}
              </div>
            </>
          )}
          {paso === 3 && (
            <>
              <h2 className="font-display text-3xl font-bold uppercase leading-tight text-tinta sm:text-4xl">¿Para cuántas personas?</h2>
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {GENTE.map(([v, t]) => (
                  <button key={v} type="button" onClick={() => setGente(v)} className={`${opcion} border-transparent`}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
          {paso === 4 && (
            <>
              <h2 className="font-display text-3xl font-bold uppercase leading-tight text-tinta sm:text-4xl">¿Para cuándo lo necesitas?</h2>
              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {PLAZO.map(([v, t]) => (
                  <button key={v} type="button" onClick={() => setPlazo(v)} className={`${opcion} border-transparent`}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
          {paso === 5 &&
            (estado === "ok" ? (
              <div>
                <h2 className="font-display text-3xl font-bold uppercase leading-tight text-tinta sm:text-4xl">Solicitud recibida</h2>
                <p className="mt-3 text-pizarra">Te contactamos a la brevedad con tu cotización.</p>
              </div>
            ) : (
              <form onSubmit={enviar}>
                <h2 className="font-display text-3xl font-bold uppercase leading-tight text-tinta sm:text-4xl">¿A quién le mandamos la cotización?</h2>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="mt-6 grid gap-5 sm:grid-cols-3">
                  <label className="flex flex-col">
                    <span className={etiqueta}>Nombre *</span>
                    <input name="nombre" required autoComplete="name" className={`${campo} mt-auto`} />
                  </label>
                  <label className="flex flex-col">
                    <span className={etiqueta}>Teléfono o WhatsApp</span>
                    <input name="telefono" type="tel" autoComplete="tel" className={`${campo} mt-auto`} />
                  </label>
                  <label className="flex flex-col">
                    <span className={etiqueta}>Correo</span>
                    <input name="email" type="email" autoComplete="email" className={`${campo} mt-auto`} />
                  </label>
                </div>
                <label className="mt-5 block">
                  <span className={etiqueta}>¿Algo más que debamos saber? (lugar, medidas, etc.)</span>
                  <textarea name="mensaje" rows={2} className={campo} />
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
            ))}
        </div>
      </div>

      {/* la configuración se arma */}
      <aside className="bg-white">
        <p className={`border-b border-linea px-6 py-4 ${etiqueta}`}>Tu configuración</p>
        {sis ? (
          <div key={sis.slug} className="foto-entra">
            <div className={`relative aspect-[3/2] ${sis.contain ? "bg-white" : "bg-tinta"}`}>
              <Image src={sis.img} alt={`Sistema ${sis.nombre}`} fill sizes="(max-width: 1024px) 100vw, 40vw" className={sis.contain ? "object-contain p-6" : "object-cover"} />
            </div>
            <div className="p-6">
              <p className={etiqueta}>Sistema sugerido</p>
              <p className="mt-2 flex items-center gap-3 font-display text-3xl font-bold uppercase leading-none text-tinta">
                <SistemaIcon slug={sis.slug} className="h-10 w-12 flex-none" />
                {sis.nombre}
              </p>
              <ul className="mt-5 space-y-2 text-pizarra">
                {sis.porque.map((x) => (
                  <li key={x} className="border-t border-linea pt-2">
                    {x}
                  </li>
                ))}
              </ul>
              {ref && (
                <p className="mt-5 border-l-[3px] border-rojo bg-hueso p-4 font-semibold text-tinta">{ref}</p>
              )}
              {paso < 5 && (
                <Link
                  href={`/contacto?sistema=${sis.slug}&config=1`}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center bg-rojo px-6 text-sm font-semibold text-white transition-colors hover:bg-rojo-600"
                >
                  Cotizar esta configuración
                </Link>
              )}
              <Link
                href={`/sistemas/${sis.slug}`}
                className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-tinta underline decoration-pizarra/50 underline-offset-4 hover:decoration-tinta"
              >
                Ver el sistema completo
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* mientras no hay sistema: módulos que giran hacia el cursor */}
            <div className="relative aspect-[3/2] bg-tinta">
              <Cubes
                gridSize={7}
                gap={0.24}
                faceColor="#222221"
                edgeColor="#8a929c"
                shading={0.5}
                maxAngle={40}
                rippleColor="#BE3E3E"
                aria-hidden
              />
              <p className="pointer-events-none absolute bottom-4 left-5 font-eyebrow text-[11px] uppercase tracking-[0.16em] text-white/80">
                {uso ? "Falta un dato para sugerirte el sistema" : "Aquí se arma tu recomendación"}
              </p>
            </div>
            <p className="p-6 text-pizarra">
              {uso
                ? `${rotulo(USOS, uso)}. Dinos si se mueve o se queda y te sugerimos el sistema.`
                : "Responde y te sugerimos el sistema, por qué te conviene y un modelo de referencia."}
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
