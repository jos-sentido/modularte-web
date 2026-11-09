import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import { sectores } from "@/data/sectores";

export const metadata: Metadata = {
  title: "Soluciones por sector",
  description:
    "Soluciones modulares de Modularte por sector: minería, educación, salud, industria y oficinas.",
};

export default function SolucionesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Eyebrow>Soluciones por sector</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
        Resolvemos por industria
      </h1>
      <p className="mt-4 max-w-xl text-pizarra">
        Cada sector tiene su reto. Elige el tuyo y mira cómo lo resolvemos con nuestros
        sistemas modulares.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sectores.map((s) => (
          <Link
            key={s.slug}
            href={`/soluciones/${s.slug}`}
            className="group relative overflow-hidden rounded-xl border border-linea"
          >
            <Image
              src={s.img}
              alt={s.nombre}
              width={1000}
              height={1250}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/90 to-transparent p-5">
              <h2 className="font-display text-xl font-bold uppercase text-white">
                {s.nombre}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-white/85">{s.problema}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
