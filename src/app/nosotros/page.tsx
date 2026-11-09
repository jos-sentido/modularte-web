import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Modularte: más de 30 años construyendo soluciones modulares, con respaldo fabril y cobertura nacional.",
};

export default function NosotrosPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <Eyebrow>Nosotros</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
        Treinta años construyendo
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-pizarra">
        En Modularte diseñamos, fabricamos y montamos espacios modulares de acero.
        Entregamos operación lista donde otros apenas empiezan la obra.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {[
          { t: "+30 años de experiencia", d: "Trayectoria construyendo soluciones a la medida de cada proyecto." },
          { t: "Respaldo fabril", d: "Manufactura con capacidad industrial y control de calidad." },
          { t: "Cobertura nacional", d: "Llegamos y montamos donde esté la operación." },
          { t: "Certificaciones", d: "Cumplimiento y estándares donde el proyecto lo requiere." },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border border-linea bg-white p-6">
            <h2 className="font-display text-lg font-bold uppercase text-pizarra">
              {x.t}
            </h2>
            <p className="mt-2 text-sm text-pizarra">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <CotizarButton>Habla con el equipo</CotizarButton>
      </div>
    </section>
  );
}
