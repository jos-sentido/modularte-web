import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";
import { sectores, getSector } from "@/data/sectores";
import { getSistema } from "@/data/sistemas";

export function generateStaticParams() {
  return sectores.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}): Promise<Metadata> {
  const { sector } = await params;
  const s = getSector(sector);
  if (!s) return {};
  return { title: `Soluciones para ${s.nombre}`, description: s.solucion };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const s = getSector(sector);
  if (!s) notFound();

  const recomendados = s.sistemas
    .map((slug) => getSistema(slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x) && !x!.pendiente);

  return (
    <article>
      {/* HERO */}
      <section className="border-b border-linea">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Soluciones por sector</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta sm:text-5xl">
              {s.nombre}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-pizarra">{s.solucion}</p>
            <div className="mt-8">
              <CotizarButton href={`/contacto?sector=${s.slug}`}>
                Cotizar para {s.nombre}
              </CotizarButton>
            </div>
          </div>
          <div className="relative">
            <Image
              src={s.img}
              alt={`Soluciones modulares para ${s.nombre}`}
              width={1000}
              height={1250}
              priority
              className="h-auto w-full rounded-2xl object-cover shadow-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rounded-bl-2xl border-b-4 border-l-4 border-rojo" />
          </div>
        </div>
      </section>

      {/* RETO → SOLUCIÓN */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-linea bg-white p-6">
            <h2 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
              El reto
            </h2>
            <p className="mt-2 text-pizarra">{s.problema}</p>
          </div>
          <div className="rounded-xl border-l-4 border-rojo bg-white p-6 shadow-sm">
            <h2 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
              Cómo lo resolvemos
            </h2>
            <p className="mt-2 text-tinta">{s.solucion}</p>
          </div>
        </div>
      </section>

      {/* SISTEMAS RECOMENDADOS */}
      {recomendados.length > 0 && (
        <section className="border-y border-linea bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <Eyebrow>Sistemas recomendados</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta">
              Lo que usamos en {s.nombre}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recomendados.map((x) => (
                <Link
                  key={x.slug}
                  href={`/sistemas/${x.slug}`}
                  className="group overflow-hidden rounded-xl border border-linea bg-hueso transition-colors hover:border-rojo"
                >
                  {x.img && (
                    <div className="h-44 w-full overflow-hidden">
                      <Image
                        src={x.img}
                        alt={x.nombre}
                        width={1000}
                        height={1250}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold uppercase text-pizarra">
                      {x.nombre}
                    </h3>
                    <p className="mt-1 text-sm text-pizarra">{x.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CIERRE */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-linea bg-white p-8">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-tinta">
              Tu proyecto en {s.nombre}
            </h2>
            <p className="mt-2 text-pizarra">Cuéntanos el alcance y te armamos la propuesta.</p>
          </div>
          <CotizarButton href={`/contacto?sector=${s.slug}`}>
            Cotizar para {s.nombre}
          </CotizarButton>
        </div>
      </section>
    </article>
  );
}
