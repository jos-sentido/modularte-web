import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";
import Galeria from "@/components/site/Galeria";
import { sectores, getSector } from "@/data/sectores";
import { getSistema } from "@/data/sistemas";

// Lee params de la URL: se permite render bloqueante para rutas no pregeneradas.
export const instant = false;

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
  return { title: `Construcción modular para ${s.nombre}`, description: `${s.mensaje} ${s.solucion}` };
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
  const cotizar = `/contacto?sector=${s.slug}`;
  const otros = sectores.filter((x) => x.slug !== s.slug);

  return (
    <article>
      <PageHero
        eyebrow={`Soluciones para ${s.nombre}`}
        title={s.nombre}
        subtitle={s.mensaje}
        img={s.img || undefined}
        imgAlt={s.imgAlt}
      >
        <CotizarButton href={cotizar}>{s.accion}</CotizarButton>
      </PageHero>

      {/* RETO → SOLUCIÓN */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>El reto</Eyebrow>
            <p className="mt-4 text-lg text-pizarra">{s.problema}</p>
          </div>
          <p className="border-l-[3px] border-rojo pl-6 font-display text-2xl font-bold uppercase leading-tight text-tinta sm:text-4xl">
            {s.solucion}
          </p>
        </div>
      </section>

      {/* ESPACIOS QUE RESOLVEMOS */}
      <section className="border-y border-linea bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Eyebrow>Qué construimos</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
            Espacios para {s.nombre}
          </h2>
          <div className="mt-10 grid gap-px border border-linea bg-linea sm:grid-cols-2 lg:grid-cols-3">
            {s.espacios.map((e) => {
              const sis = getSistema(e.sistema);
              return (
                <div key={e.nombre} className="flex flex-col bg-white">
                  {e.img ? (
                    <div className="relative aspect-[4/3] overflow-hidden bg-hueso">
                      <Image
                        src={e.img}
                        alt={e.nombre}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={e.img.startsWith("/fotos/") ? "object-cover" : "object-contain p-4"}
                      />
                      {!e.img.startsWith("/fotos/") && (
                        <span className="absolute bottom-2 right-2 bg-white/85 px-2 py-0.5 font-eyebrow text-[9px] uppercase tracking-[0.14em] text-pizarra">
                          {e.img.startsWith("/renders/") ? "Render ilustrativo" : "Imagen de ficha"}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] flex-col justify-end bg-tinta p-6 text-white">
                      <p className="font-eyebrow text-[10px] uppercase tracking-[0.18em] text-white/55">Medidas disponibles</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {e.medidas?.map((m) => (
                          <li key={m} className="border border-white/30 px-2.5 py-1 font-display text-sm font-bold uppercase">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold uppercase text-tinta">{e.nombre}</h3>
                    <p className="mt-2 text-pizarra">{e.texto}</p>
                    {e.img && e.medidas && (
                      <p className="mt-3 font-eyebrow text-[10px] uppercase tracking-[0.14em] text-pizarra">
                        {e.medidas.join(" · ")}
                      </p>
                    )}
                    {sis && (
                      <Link
                        href={`/sistemas/${sis.slug}`}
                        className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-semibold text-rojo"
                      >
                        {sis.nombre}
                        <span aria-hidden className="flecha-avanza inline-block">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALERÍA DE OBRA */}
      {s.galeria.length > 0 && (
        <section className="bg-tinta">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <Eyebrow tone="dark">Obra real</Eyebrow>
            <h2 className="mb-10 mt-4 font-display text-3xl font-bold uppercase text-white sm:text-4xl">
              Proyectos de {s.nombre}
            </h2>
            <Galeria fotos={s.galeria} tono="oscuro" />
          </div>
        </section>
      )}

      {/* SISTEMAS RECOMENDADOS */}
      {recomendados.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Eyebrow>Con qué lo resolvemos</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">Sistemas recomendados</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recomendados.map((x) => {
              const img = x.tarjeta ?? x.render;
              return (
                <Link key={x.slug} href={`/sistemas/${x.slug}`} className="group block border border-linea bg-white">
                  {img && (
                    <div className="relative aspect-[3/2] overflow-hidden bg-hueso">
                      <Image
                        src={img}
                        alt={x.nombre}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold uppercase text-tinta transition-colors group-hover:text-rojo">
                      {x.nombre}
                    </h3>
                    <p className="mt-1 text-sm text-pizarra">{x.tagline}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* CIERRE */}
      <section className="bg-rojo">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8 px-4 py-16 sm:py-20">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-5xl">
              Tu proyecto de {s.nombre}
            </h2>
            <p className="mt-3 text-white/85">Cuéntanos el alcance y te armamos la propuesta.</p>
          </div>
          <CotizarButton href={cotizar} className="!bg-white !text-tinta hover:!bg-tinta hover:!text-white">
            {s.accion}
          </CotizarButton>
        </div>
      </section>

      {/* OTROS SECTORES */}
      <nav aria-label="Otros sectores" className="mx-auto max-w-6xl px-4 py-12">
        <p className="font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">Otros sectores</p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {otros.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/soluciones/${o.slug}`}
                className="group inline-flex min-h-11 items-center gap-2 font-display text-xl font-bold uppercase text-pizarra hover:text-rojo"
              >
                {o.nombre}
                <span aria-hidden className="flecha-avanza inline-block text-base">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
