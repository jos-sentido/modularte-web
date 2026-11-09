import type { Metadata } from "next";
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

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <Eyebrow>Sistema</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
        {s.nombre}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-pizarra">{s.tagline}</p>

      {s.pendiente ? (
        <div className="mt-8 rounded-xl border border-dashed border-linea bg-white p-6">
          <p className="text-sm text-pizarra">
            🚧 Contenido en construcción: estamos definiendo la información de este
            sistema. Mientras tanto, puedes cotizarlo y te damos los detalles.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-6 max-w-2xl text-pizarra">{s.descripcion}</p>

          {s.aplicaciones.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-bold uppercase text-pizarra">
                Aplicaciones
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.aplicaciones.map((a) => (
                  <span
                    key={a}
                    className="rounded-lg border border-linea bg-white px-3 py-1.5 text-sm text-tinta"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-12 flex flex-wrap gap-3">
        <CotizarButton href={`/contacto?sistema=${s.slug}`}>
          Cotizar este sistema
        </CotizarButton>
        <CotizarButton href="/sistemas" variant="outline">
          Ver todos los sistemas
        </CotizarButton>
      </div>
    </article>
  );
}
