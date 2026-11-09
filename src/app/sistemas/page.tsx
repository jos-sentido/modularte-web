import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { sistemas } from "@/data/sistemas";

export const metadata: Metadata = {
  title: "Sistemas",
  description:
    "Los sistemas modulares de Modularte: Unidades Móviles, Armabox®, Tradicional y más.",
};

export default function SistemasPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Eyebrow>Catálogo de sistemas</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
        Nuestros sistemas
      </h1>
      <p className="mt-4 max-w-xl text-pizarra">
        Cada sistema resuelve un tipo de proyecto. Elige el que se acerca a tu
        necesidad o cotiza y te orientamos.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sistemas.map((s) => (
          <Link
            key={s.slug}
            href={`/sistemas/${s.slug}`}
            className="rounded-xl border border-linea bg-white p-6 transition-colors hover:border-rojo"
          >
            <h2 className="font-display text-xl font-bold uppercase text-pizarra">
              {s.nombre}
            </h2>
            <p className="mt-2 text-sm text-pizarra">{s.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
