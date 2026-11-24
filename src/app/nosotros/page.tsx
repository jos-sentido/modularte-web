import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";
import Respaldo from "@/components/site/Respaldo";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Modularte: más de 30 años en construcción modular, con respaldo fabril y cobertura nacional.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Treinta años construyendo"
        subtitle="En Modularte diseñamos, fabricamos y montamos espacios modulares. Entregamos operación lista donde otros apenas empiezan la obra."
        img="/fotos/tradicional/terminado-5.jpg"
        imgAlt="Edificio de dos niveles con pasillo en planta alta"
      >
        <CotizarButton>Habla con el equipo</CotizarButton>
      </PageHero>

      {/* RESPALDO — retícula del manual */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>Por qué Modularte</Eyebrow>
        <h2 className="mb-10 mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
          Respaldo que sostiene la promesa
        </h2>
        <Respaldo />
      </section>

      {/* CERTIFICACIONES — son del fabricante y así se dicen */}
      <section className="border-y border-linea bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Eyebrow>Certificaciones</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
            Fabricación certificada
          </h2>
          <p className="mt-3 max-w-2xl text-pizarra">
            Los módulos se producen en planta. Estas son las certificaciones con las
            que cuenta el fabricante:
          </p>
          <ul className="mt-8 grid gap-px bg-linea sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["CE", "Conformidad europea"],
              ["ISO 9001:2015", "Gestión de calidad"],
              ["SGS", "Inspección y verificación"],
              ["Intertek", "Resistencia al fuego"],
              ["CWB", "Soldadura (Canadá)"],
              ["Huella de carbono", "Medición de emisiones"],
            ].map(([n, d]) => (
              <li key={n} className="bg-white p-5">
                <p className="font-display text-xl font-bold uppercase text-tinta">{n}</p>
                <p className="mt-1 text-sm text-pizarra">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CIERRE */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-pizarra/40 bg-white p-8">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
              Construyamos tu proyecto
            </h2>
            <p className="mt-2 text-pizarra">
              Cuéntanos qué necesitas y te acompañamos de principio a fin.
            </p>
          </div>
          <CotizarButton>Habla con el equipo</CotizarButton>
        </div>
      </section>
    </>
  );
}
