import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SistemaIcon from "@/components/SistemaIcon";
import { sistemas } from "@/data/sistemas";

export const metadata: Metadata = {
  title: "Sistemas",
  description:
    "Los sistemas modulares de Modularte: Unidades Móviles, Armabox®, Tradicional y más.",
};

export default function SistemasPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo de sistemas"
        title="Nuestros sistemas"
        subtitle="Cada sistema resuelve un tipo de proyecto. Elige el que se acerca a tu necesidad o cotiza y te orientamos."
        img="/fotos/modulos-arboles.jpg"
        imgAlt="Sistemas modulares de Modularte"
      />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {sistemas.map((s) => (
            <Link
              key={s.slug}
              href={`/sistemas/${s.slug}`}
              className="group flex items-start gap-5 border-b border-linea pb-8"
            >
              <span className="flex h-20 w-20 flex-none items-center justify-center rounded-xl border border-linea text-rojo transition-all group-hover:-translate-y-0.5 group-hover:border-rojo group-hover:shadow-md group-hover:shadow-rojo/10">
                <SistemaIcon slug={s.slug} className="h-11 w-11" />
              </span>
              <div className="pt-1">
                <h2 className="font-display text-xl font-bold uppercase text-pizarra transition-colors group-hover:text-rojo">
                  {s.nombre}
                  {s.pendiente && (
                    <span className="ml-2 align-middle text-[10px] font-normal tracking-wide text-pizarra/70">
                      · pronto
                    </span>
                  )}
                </h2>
                <p className="mt-1 text-sm text-pizarra">{s.tagline}</p>
                <span className="mt-3 inline-block font-eyebrow text-[10px] uppercase tracking-[0.16em] text-rojo">
                  Ver sistema —
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
