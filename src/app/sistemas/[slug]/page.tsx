import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
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

  if (s.pendiente) {
    return (
      <article className="mx-auto max-w-4xl px-4 py-16">
        <Eyebrow>Sistema</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
          {s.nombre}
        </h1>
        <div className="mt-8 rounded-xl border border-dashed border-linea bg-white p-6">
          <p className="text-sm text-pizarra">
            🚧 Contenido en construcción: estamos definiendo la información de este
            sistema. Mientras tanto, puedes cotizarlo y te damos los detalles.
          </p>
        </div>
        <div className="mt-10">
          <CotizarButton href={`/contacto?sistema=${s.slug}`}>
            Cotizar este sistema
          </CotizarButton>
        </div>
      </article>
    );
  }

  return (
    <article>
      {/* HERO */}
      <section className="border-b border-linea">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Sistema</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta sm:text-5xl">
              {s.nombre}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-pizarra">{s.tagline}</p>
            <p className="mt-4 max-w-xl text-pizarra">{s.descripcion}</p>
            <div className="mt-8">
              <CotizarButton href={`/contacto?sistema=${s.slug}`}>
                Cotizar este sistema
              </CotizarButton>
            </div>
          </div>
          {s.img && (
            <div className="relative">
              <Image
                src={s.img}
                alt={`Sistema ${s.nombre} de Modularte`}
                width={1000}
                height={1250}
                priority
                className="h-auto w-full rounded-2xl object-cover shadow-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <span className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rounded-bl-2xl border-b-4 border-l-4 border-rojo" />
            </div>
          )}
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      {s.caracteristicas && s.caracteristicas.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <Eyebrow>Características</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta">
            Lo que define al sistema
          </h2>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-linea bg-linea sm:grid-cols-2 lg:grid-cols-3">
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

      {/* APLICACIONES */}
      {s.aplicaciones.length > 0 && (
        <section className="border-y border-linea bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <Eyebrow>Aplicaciones</Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta">
              Para qué se usa
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.aplicaciones.map((a) => (
                <span
                  key={a}
                  className="rounded-lg border border-linea bg-hueso px-4 py-2 text-sm text-tinta"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CASOS */}
      {s.casos && s.casos.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <Eyebrow>Proyectos</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta">
            Obra con este sistema
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.casos.map((img) => (
              <div key={img} className="overflow-hidden rounded-xl border border-linea">
                <Image
                  src={img}
                  alt={`Proyecto con ${s.nombre}`}
                  width={1000}
                  height={1250}
                  className="h-72 w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CIERRE */}
      <section className="border-t border-linea bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-tinta">
              ¿Te sirve {s.nombre}?
            </h2>
            <p className="mt-2 text-pizarra">Te armamos una propuesta a la medida de tu proyecto.</p>
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
