import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Eyebrow from "@/components/Eyebrow";
import Foto from "@/components/Foto";
import CornerFrame from "@/components/CornerFrame";
import CotizarButton from "@/components/CotizarButton";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Modularte: más de 30 años en construcción modular, con respaldo fabril y cobertura nacional.",
};

const pilares = [
  { t: "+30 años de experiencia", d: "Trayectoria construyendo soluciones a la medida de cada proyecto." },
  { t: "Respaldo fabril", d: "Manufactura con capacidad industrial y control de calidad en cada módulo." },
  { t: "Cobertura nacional", d: "Entregamos y montamos donde esté la operación, en toda la República." },
  { t: "Cumplimiento", d: "Certificaciones y estándares donde el proyecto lo exige." },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Treinta años construyendo"
        subtitle="En Modularte diseñamos, fabricamos y montamos espacios modulares. Entregamos operación lista donde otros apenas empiezan la obra."
        img="/fotos/oficinas-obra.jpg"
        imgAlt="Proyecto modular de Modularte"
      >
        <CotizarButton>Habla con el equipo</CotizarButton>
      </PageHero>

      {/* BANDA ROJA — cifras */}
      <section className="bg-rojo text-white">
        <dl className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3">
          {[
            ["+30", "años de experiencia"],
            ["5", "sistemas modulares"],
            ["Nacional", "cobertura y montaje"],
          ].map(([n, t]) => (
            <div key={t}>
              <dt className="font-display text-4xl font-bold uppercase sm:text-5xl">{n}</dt>
              <dd className="mt-1 text-sm text-white/80">{t}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PILARES + foto enmarcada */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Por qué Modularte</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
              Respaldo que sostiene la promesa
            </h2>
            <ul className="mt-8 space-y-6">
              {pilares.map((x) => (
                <li key={x.t} className="flex gap-4">
                  <span aria-hidden className="mt-1.5 h-3 w-3 flex-none bg-rojo" />
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase text-pizarra">{x.t}</h3>
                    <p className="mt-1 text-sm text-pizarra">{x.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="relative">
            <Foto
              src="/fotos/patio.jpg"
              alt="Proyecto modular entregado por Modularte"
              width={1000}
              height={1250}
              className="aspect-[4/5] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <CornerFrame variant="frame" size={44} inset={-1} />
          </Reveal>
        </div>
      </section>

      {/* CERTIFICACIONES */}
      <section className="border-y border-linea bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Eyebrow>Certificaciones y cumplimiento</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
            Estándares donde importan
          </h2>
          <p className="mt-3 max-w-2xl text-pizarra">
            Nuestros sistemas se fabrican bajo estándares de calidad y cumplimiento
            aplicables a cada proyecto y sector.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Calidad de manufactura", "Control estructural", "Seguridad y resistencia", "Cumplimiento por sector"].map(
              (c) => (
                <span key={c} className="border border-linea bg-hueso px-4 py-2 text-sm text-tinta">
                  {c}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-linea bg-white p-8">
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
