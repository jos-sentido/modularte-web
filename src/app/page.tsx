import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";
import CotizaForm from "@/components/CotizaForm";
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-linea">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <Eyebrow>Construcciones prefabricadas</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-tinta sm:text-6xl">
            Espacios de acero listos para operar
          </h1>
          <p className="mt-5 max-w-xl text-lg text-pizarra">
            Diseño, fabricación y montaje de módulos para industria, oficina, educación
            y más. Entrega en semanas, no en meses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CotizarButton>Cotizar mi proyecto</CotizarButton>
            <CotizarButton href="/sistemas" variant="outline">
              Ver los sistemas
            </CotizarButton>
          </div>
        </div>
      </section>

      {/* SISTEMAS */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>Los sistemas</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
          Un sistema para cada necesidad
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sistemas.map((s) => (
            <Link
              key={s.slug}
              href={`/sistemas/${s.slug}`}
              className="group rounded-xl border border-linea bg-white p-6 transition-colors hover:border-rojo"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold uppercase text-pizarra">
                  {s.nombre}
                </h3>
                {s.pendiente && (
                  <span className="rounded border border-linea px-2 py-0.5 text-[10px] uppercase tracking-wide text-pizarra">
                    Próximamente
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-pizarra">{s.tagline}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-rojo">
                Ver sistema →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SOLUCIONES POR SECTOR */}
      <section id="soluciones" className="border-y border-linea bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Eyebrow>Soluciones por sector</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
            Resolvemos por industria
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectores.map((s) => (
              <Link
                key={s.slug}
                href={`/soluciones/${s.slug}`}
                className="group rounded-xl border border-linea bg-hueso p-6 transition-colors hover:border-rojo"
              >
                <h3 className="font-display text-lg font-bold uppercase text-pizarra">
                  {s.nombre}
                </h3>
                <p className="mt-2 text-sm text-pizarra">{s.problema}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-rojo">
                  Ver solución →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ MODULARTE */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>Por qué Modularte</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
          Respaldo que sostiene la promesa
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "+30 años", d: "Construyendo soluciones a la medida de cada proyecto." },
            { t: "Respaldo de fábrica", d: "Manufactura con capacidad industrial y control de calidad." },
            { t: "Certificaciones", d: "Cumplimiento y estándares donde el proyecto lo exige." },
            { t: "Cobertura nacional", d: "Entregamos y montamos donde esté la operación." },
          ].map((x) => (
            <div key={x.t} className="border-t-2 border-rojo pt-4">
              <p className="font-display text-xl font-bold uppercase text-tinta">{x.t}</p>
              <p className="mt-2 text-sm text-pizarra">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CIERRE + COTIZACIÓN */}
      <section className="border-t border-linea bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <Eyebrow>Cotiza tu proyecto</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
              Cuéntanos qué necesitas
            </h2>
            <p className="mt-4 max-w-md text-pizarra">
              Dinos el sistema, el sector y el alcance. Te armamos una propuesta a la
              medida.
            </p>
          </div>
          <CotizaForm />
        </div>
      </section>
    </>
  );
}
