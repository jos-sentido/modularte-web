import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
    .filter((x) => x && !x.pendiente);

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      <Eyebrow>Soluciones por sector</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
        {s.nombre}
      </h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-linea bg-white p-6">
          <h2 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
            El reto
          </h2>
          <p className="mt-2 text-pizarra">{s.problema}</p>
        </div>
        <div className="rounded-xl border border-linea bg-white p-6">
          <h2 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
            Cómo lo resolvemos
          </h2>
          <p className="mt-2 text-pizarra">{s.solucion}</p>
        </div>
      </div>

      {recomendados.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold uppercase text-pizarra">
            Sistemas recomendados
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {recomendados.map((x) => (
              <Link
                key={x!.slug}
                href={`/sistemas/${x!.slug}`}
                className="rounded-lg border border-linea bg-white px-3 py-1.5 text-sm text-tinta hover:border-rojo hover:text-rojo"
              >
                {x!.nombre}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <CotizarButton href={`/contacto?sector=${s.slug}`}>
          Cotizar para {s.nombre}
        </CotizarButton>
      </div>
    </article>
  );
}
