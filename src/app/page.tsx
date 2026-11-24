import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import SistemaCelda from "@/components/site/SistemaCelda";
import HeroModular from "@/components/site/HeroModular";
import SectoresPila from "@/components/site/SectoresPila";
import Respaldo from "@/components/site/Respaldo";
import ScrollVelocity from "@/components/bits/ScrollVelocity";
import FraseCotizar from "@/components/site/FraseCotizar";
import MArmado from "@/components/site/MArmado";
import CotizarButton from "@/components/CotizarButton";
import Galeria from "@/components/site/Galeria";
import { sistemas } from "@/data/sistemas";

export default function Home() {
  return (
    <>
      <HeroModular />

      {/* SISTEMAS — índice con los iconos oficiales de la marca */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-linea pb-6">
          <div>
            <Eyebrow>Los sistemas</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
              Un sistema para cada necesidad
            </h2>
          </div>
          <Link
            href="/sistemas"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-tinta underline decoration-pizarra/50 underline-offset-4 hover:decoration-tinta"
          >
            Ver catálogo
          </Link>
        </div>

        <div className="mt-10 grid gap-px border border-linea bg-linea sm:grid-cols-6">
          {sistemas.map((s, n) => (
            <div key={s.slug} className={n < 3 ? "sm:col-span-2" : "sm:col-span-3"}>
              <SistemaCelda s={s} />
            </div>
          ))}
        </div>
      </section>

      {/* BANDA ROJA — campo de color + la palabra de marca en carrusel */}
      <section className="relative overflow-hidden bg-rojo text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center overflow-hidden"
        >
          <ScrollVelocity
            texts={["Modular"]}
            velocity={60}
            numCopies={6}
            gap={40}
            fontSize="34vw"
            fontWeight={700}
            className="font-display uppercase leading-none text-white/10"
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <h2 className="max-w-5xl text-balance font-display text-[clamp(2.5rem,7.2vw,6rem)] font-bold uppercase leading-[0.92] tracking-tight">
            Entrega en semanas, no en meses.
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-6 border-t border-white/40 pt-8 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1.6fr]">
            {["Diseño", "Fabricación", "Montaje"].map((paso, n) => (
              <p key={paso} className="font-display text-2xl font-bold uppercase leading-none sm:text-3xl">
                <span className="mb-3 block font-eyebrow text-[11px] font-normal tracking-[0.18em] text-white/80">
                  {String(n + 1).padStart(2, "0")}
                </span>
                {paso}
              </p>
            ))}
            <p className="text-lg text-white sm:col-span-3 lg:col-span-1">
              Con respaldo de fábrica. Tú defines el alcance; nosotros entregamos
              operación lista.
            </p>
          </div>
        </div>
      </section>

      {/* SECTORES — módulos que se apilan al bajar */}
      <section id="soluciones" className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <Eyebrow>Soluciones por sector</Eyebrow>
        <h2 className="mb-10 mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
          Resolvemos por industria
        </h2>
        <SectoresPila />
      </section>

      {/* PROYECTOS — galería de fotografía original del cliente */}
      <section className="relative overflow-hidden bg-tinta text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow tone="dark">Proyectos</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-white sm:text-4xl">
                Proyectos construidos
              </h2>
            </div>
            <Link
              href="/proyectos"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
            >
              Ver toda la galería
            </Link>
          </div>
          <Galeria modo="tira" />
        </div>
      </section>

      {/* POR QUÉ — una foto de obra y tres cifras */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <MArmado />
          <div>
            <Eyebrow>Por qué Modularte</Eyebrow>
            <h2 className="mb-8 mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
              Respaldo que se puede medir
            </h2>
            <Respaldo />
            <CotizarButton href="/nosotros" variant="outline" className="mt-8">
              Conoce a Modularte
            </CotizarButton>
          </div>
        </div>
      </section>

      {/* CIERRE — una frase que se completa */}
      <section className="bg-rojo">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <FraseCotizar />
        </div>
      </section>
    </>
  );
}
