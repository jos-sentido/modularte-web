import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";
import CotizaForm from "@/components/CotizaForm";
import Reveal from "@/components/Reveal";
import Foto from "@/components/Foto";
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";
import { proyectos } from "@/data/proyectos";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-linea">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 hidden h-full w-56 -skew-x-12 bg-rojo/5 lg:block"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Construcciones prefabricadas</Eyebrow>
            <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-tinta sm:text-6xl">
              Espacios de acero listos para operar
            </h1>
            <p className="mt-5 max-w-xl text-lg text-pizarra">
              Diseño, fabricación y montaje de módulos para industria, oficina,
              educación y más. Entrega en semanas, no en meses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CotizarButton>Cotizar mi proyecto</CotizarButton>
              <CotizarButton href="/sistemas" variant="outline">
                Ver los sistemas
              </CotizarButton>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["+30", "años de experiencia"],
                ["Nacional", "cobertura y montaje"],
                ["Semanas", "no meses de entrega"],
              ].map(([n, t]) => (
                <div key={t} className="border-t-2 border-rojo pt-2">
                  <dt className="font-display text-2xl font-bold uppercase text-tinta">{n}</dt>
                  <dd className="text-xs text-pizarra">{t}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="relative">
            <Foto
              src="/fotos/modulos-exterior.jpg"
              alt="Campamento modular de dos niveles construido por Modularte"
              width={1000}
              height={1250}
              priority
              className="h-auto w-full rounded-2xl object-cover shadow-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rounded-bl-2xl border-b-4 border-l-4 border-rojo" />
          </Reveal>
        </div>
      </section>

      {/* SISTEMAS */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <Eyebrow>Los sistemas</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
            Un sistema para cada necesidad
          </h2>
        </Reveal>
        <Reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sistemas.map((s) => (
            <Link
              key={s.slug}
              href={`/sistemas/${s.slug}`}
              className="group rounded-xl border border-linea bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-rojo hover:shadow-md"
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
        </Reveal>
      </section>

      {/* SOLUCIONES POR SECTOR */}
      <section id="soluciones" className="border-y border-linea bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Reveal>
            <Eyebrow>Soluciones por sector</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
              Resolvemos por industria
            </h2>
          </Reveal>
          <Reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectores.map((s) => (
              <Link
                key={s.slug}
                href={`/soluciones/${s.slug}`}
                className="group rounded-xl border border-linea bg-hueso p-6 transition-all hover:-translate-y-0.5 hover:border-rojo hover:shadow-md"
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
          </Reveal>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Proyectos</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
              Obra entregada, no promesas
            </h2>
          </div>
          <Link href="/proyectos" className="text-sm font-semibold text-rojo">
            Ver todos →
          </Link>
        </Reveal>
        <Reveal className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.slice(0, 6).map((p) => (
            <figure
              key={p.img}
              className="group relative overflow-hidden rounded-xl border border-linea"
            >
              <Foto
                src={p.img}
                alt={p.titulo}
                width={1000}
                height={1250}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/85 to-transparent p-4">
                <span className="font-eyebrow text-[10px] uppercase tracking-[0.14em] text-white/80">
                  {p.sector}
                </span>
                <p className="text-sm font-semibold text-white">{p.titulo}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      {/* POR QUÉ MODULARTE */}
      <section className="border-t border-linea bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Reveal>
            <Eyebrow>Por qué Modularte</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
              Respaldo que sostiene la promesa
            </h2>
          </Reveal>
          <Reveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          </Reveal>
        </div>
      </section>

      {/* CIERRE + COTIZACIÓN */}
      <section className="border-t border-linea">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Cotiza tu proyecto</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta">
              Cuéntanos qué necesitas
            </h2>
            <p className="mt-4 max-w-md text-pizarra">
              Dinos el sistema, el sector y el alcance. Te armamos una propuesta a la
              medida.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <CotizaForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
