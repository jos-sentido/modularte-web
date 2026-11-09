import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Eyebrow from "@/components/Eyebrow";
import SistemaIcon from "@/components/SistemaIcon";
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
      <PageHero
        eyebrow="Soluciones por sector"
        title={s.nombre}
        subtitle={s.solucion}
        img={s.img}
        imgAlt={`Soluciones modulares para ${s.nombre}`}
      >
        <CotizarButton href={`/contacto?sector=${s.slug}`}>
          Cotizar para {s.nombre}
        </CotizarButton>
      </PageHero>

      {/* RETO → SOLUCIÓN */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-px overflow-hidden border border-linea bg-linea sm:grid-cols-2">
          <div className="bg-white p-8">
            <h2 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
              El reto
            </h2>
            <p className="mt-3 text-lg text-pizarra">{s.problema}</p>
          </div>
          <div className="bg-white p-8">
            <h2 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-rojo">
              Cómo lo resolvemos
            </h2>
            <p className="mt-3 text-lg text-tinta">{s.solucion}</p>
          </div>
        </div>
      </section>

      {/* SISTEMAS RECOMENDADOS */}
      {recomendados.length > 0 && (
        <section className="border-y border-linea bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <Eyebrow>Sistemas recomendados</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
              Lo que usamos en {s.nombre}
            </h2>
            <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {recomendados.map((x) => (
                <Link key={x.slug} href={`/sistemas/${x.slug}`} className="group flex items-start gap-4">
                  <span className="flex h-16 w-16 flex-none items-center justify-center rounded-xl border border-linea text-rojo transition-all group-hover:-translate-y-0.5 group-hover:border-rojo">
                    <SistemaIcon slug={x.slug} className="h-9 w-9" />
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-lg font-bold uppercase text-pizarra transition-colors group-hover:text-rojo">
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
        <div className="flex flex-wrap items-center justify-between gap-6 border border-linea bg-white p-8">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
              Tu proyecto en {s.nombre}
            </h2>
            <p className="mt-2 text-pizarra">
              Cuéntanos el alcance y te armamos la propuesta.
            </p>
          </div>
          <CotizarButton href={`/contacto?sector=${s.slug}`}>
            Cotizar para {s.nombre}
          </CotizarButton>
        </div>
      </section>
    </article>
  );
}
