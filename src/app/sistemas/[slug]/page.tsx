import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Eyebrow from "@/components/Eyebrow";
import Foto from "@/components/Foto";
import CornerFrame from "@/components/CornerFrame";
import CotizarButton from "@/components/CotizarButton";
import { sistemas, getSistema } from "@/data/sistemas";

export function generateStaticParams() {
  return sistemas.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSistema(slug);
  if (!s) return {};
  return { title: s.nombre, description: s.tagline };
}

export default async function SistemaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSistema(slug);
  if (!s) notFound();

  return (
    <article>
      <PageHero
        eyebrow="Sistema"
        title={s.nombre}
        subtitle={s.tagline}
        img={s.img}
        imgAlt={`Sistema ${s.nombre} de Modularte`}
      >
        <CotizarButton href={`/contacto?sistema=${s.slug}`}>
          Cotizar este sistema
        </CotizarButton>
      </PageHero>

      {s.pendiente ? (
        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-xl border border-dashed border-linea bg-white p-6">
            <p className="text-sm text-pizarra">
              🚧 Contenido en construcción: estamos definiendo la información de este
              sistema. Mientras tanto, puedes cotizarlo y te damos los detalles.
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="mx-auto max-w-4xl px-4 pt-16">
            <p className="max-w-2xl text-lg text-pizarra">{s.descripcion}</p>
          </section>

          {s.caracteristicas && s.caracteristicas.length > 0 && (
            <section className="mx-auto max-w-6xl px-4 py-16">
              <Eyebrow>Características</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
                Lo que define al sistema
              </h2>
              <dl className="mt-8 grid gap-px overflow-hidden border border-linea bg-linea sm:grid-cols-2 lg:grid-cols-3">
                {s.caracteristicas.map((c) => (
                  <div key={c.k} className="bg-white p-5">
                    <dt className="font-eyebrow text-[11px] uppercase tracking-[0.14em] text-pizarra">
                      {c.k}
                    </dt>
                    <dd className="mt-1 font-semibold text-tinta">{c.v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {s.aplicaciones.length > 0 && (
            <section className="border-y border-linea bg-white">
              <div className="mx-auto max-w-6xl px-4 py-16">
                <Eyebrow>Aplicaciones</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
                  Para qué se usa
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.aplicaciones.map((a) => (
                    <span
                      key={a}
                      className="border border-linea bg-hueso px-4 py-2 text-sm text-tinta"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {s.casos && s.casos.length > 0 && (
            <section className="mx-auto max-w-6xl px-4 py-16">
              <Eyebrow>Proyectos</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
                Obra con este sistema
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {s.casos.map((img) => (
                  <div key={img} className="group relative overflow-hidden">
                    <Foto
                      src={img}
                      alt={`Proyecto con ${s.nombre}`}
                      width={1000}
                      height={1250}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <CornerFrame variant="frame" size={32} stroke={2.5} inset={8} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* CIERRE */}
      <section className="border-t border-linea bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
              ¿Te sirve {s.nombre}?
            </h2>
            <p className="mt-2 text-pizarra">
              Te armamos una propuesta a la medida de tu proyecto.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CotizarButton href={`/contacto?sistema=${s.slug}`}>
              Cotizar este sistema
            </CotizarButton>
            <CotizarButton href="/sistemas" variant="outline">
              Ver todos los sistemas
            </CotizarButton>
          </div>
        </div>
      </section>
    </article>
  );
}
