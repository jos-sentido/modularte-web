import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sistemas.map((s) => (
          <Link
            key={s.slug}
            href={`/sistemas/${s.slug}`}
            className="group overflow-hidden rounded-xl border border-linea bg-white transition-colors hover:border-rojo"
          >
            {s.img ? (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.nombre}
                  width={1000}
                  height={1250}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="flex h-48 w-full items-center justify-center bg-hueso">
                <span className="rounded border border-linea px-2 py-0.5 text-[10px] uppercase tracking-wide text-pizarra">
                  Próximamente
                </span>
              </div>
            )}
            <div className="p-6">
              <h2 className="font-display text-xl font-bold uppercase text-pizarra">
                {s.nombre}
              </h2>
              <p className="mt-2 text-sm text-pizarra">{s.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
