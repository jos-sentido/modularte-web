import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Foto from "@/components/Foto";
import CornerFrame from "@/components/CornerFrame";
import { sectores } from "@/data/sectores";

export const metadata: Metadata = {
  title: "Soluciones por sector",
  description:
    "Soluciones modulares de Modularte por sector: minería, educación, salud, industria y oficinas.",
};

export default function SolucionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Soluciones por sector"
        title="Resolvemos por industria"
        subtitle="Cada sector tiene su reto. Elige el tuyo y mira cómo lo resolvemos con nuestros sistemas modulares."
        img="/fotos/oficinas-obra.jpg"
        imgAlt="Soluciones modulares por sector"
      />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectores.map((s) => (
            <Link
              key={s.slug}
              href={`/soluciones/${s.slug}`}
              className="group relative block overflow-hidden"
            >
              <Foto
                src={s.img}
                alt={s.nombre}
                width={1000}
                height={1250}
                className="aspect-[5/6] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/20 to-transparent" />
              <CornerFrame variant="accent" size={34} inset={14} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h2 className="font-display text-xl font-bold uppercase text-white">
                  {s.nombre}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-white/80">{s.problema}</p>
                <span className="mt-3 inline-block font-eyebrow text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-rojo">
                  Ver solución —
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
