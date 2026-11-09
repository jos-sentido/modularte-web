import type { Metadata } from "next";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Modularte: más de 30 años construyendo soluciones modulares, con respaldo fabril y cobertura nacional.",
};

const pilares = [
  { t: "+30 años de experiencia", d: "Trayectoria construyendo soluciones a la medida de cada proyecto." },
  { t: "Respaldo fabril", d: "Manufactura con capacidad industrial y control de calidad en cada módulo." },
  { t: "Cobertura nacional", d: "Entregamos y montamos donde esté la operación, en toda la República." },
  { t: "Cumplimiento", d: "Certificaciones y estándares donde el proyecto lo exige." },
];

export default function NosotrosPage() {
  return (
    <article>
      {/* HERO */}
      <section className="border-b border-linea">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Nosotros</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-tinta sm:text-5xl">
              Treinta años construyendo
            </h1>
            <p className="mt-5 max-w-xl text-lg text-pizarra">
              En Modularte diseñamos, fabricamos y montamos espacios modulares.
              Entregamos operación lista donde otros apenas empiezan la obra.
            </p>
            <div className="mt-8">
              <CotizarButton>Habla con el equipo</CotizarButton>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/fotos/oficinas-obra.jpg"
              alt="Proyecto modular de Modularte en construcción"
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

      {/* STATS */}
      <section className="border-b border-linea bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
          {[
            ["+30", "años de experiencia"],
            ["Nacional", "cobertura y montaje"],
            ["Semanas", "no meses de entrega"],
          ].map(([n, t]) => (
            <div key={t} className="border-t-2 border-rojo pt-3">
              <p className="font-display text-3xl font-bold uppercase text-tinta">{n}</p>
              <p className="mt-1 text-sm text-pizarra">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PILARES */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Eyebrow>Por qué Modularte</Eyebrow>
        <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta">
          Respaldo que sostiene la promesa
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {pilares.map((x) => (
            <div key={x.t} className="rounded-xl border border-linea bg-white p-6">
              <h3 className="font-display text-lg font-bold uppercase text-pizarra">{x.t}</h3>
              <p className="mt-2 text-sm text-pizarra">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICACIONES */}
      <section className="border-y border-linea bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Eyebrow>Certificaciones y cumplimiento</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta">
            Estándares donde importan
          </h2>
          <p className="mt-3 max-w-2xl text-pizarra">
            Nuestros sistemas se fabrican bajo estándares de calidad y cumplimiento
            aplicables a cada proyecto y sector.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Calidad de manufactura", "Control estructural", "Seguridad y resistencia", "Cumplimiento por sector"].map(
              (c) => (
                <span
                  key={c}
                  className="rounded-lg border border-linea bg-hueso px-4 py-2 text-sm text-tinta"
                >
                  {c}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-linea bg-white p-8">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-tinta">
              Construyamos tu proyecto
            </h2>
            <p className="mt-2 text-pizarra">Cuéntanos qué necesitas y te acompañamos de principio a fin.</p>
          </div>
          <CotizarButton>Habla con el equipo</CotizarButton>
        </div>
      </section>
    </article>
  );
}
