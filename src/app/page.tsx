import Link from "next/link";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";
import CotizaForm from "@/components/CotizaForm";
import Reveal from "@/components/Reveal";
import Foto from "@/components/Foto";
import CornerFrame from "@/components/CornerFrame";
import SistemaIcon from "@/components/SistemaIcon";
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";
import { proyectos } from "@/data/proyectos";

export default function Home() {
  return (
    <>
      {/* HERO — full-bleed cinematográfico */}
      <section className="relative isolate -mt-[61px] flex min-h-[90vh] items-end overflow-hidden bg-tinta">
        <Image
          src="/fotos/modulos-exterior.jpg"
          alt="Campamento modular de dos niveles construido por Modularte"
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/55 to-tinta/10" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-tinta/90 via-tinta/35 to-transparent" />
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light" />
        <CornerFrame variant="all" size={56} stroke={3} inset={24} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-32">
          <span className="font-eyebrow inline-block text-xs uppercase tracking-[0.2em] text-white/85">
            Construcciones prefabricadas
            <span className="mt-2 block h-[3px] w-10 bg-rojo" />
          </span>
          <h1 className="mt-6 max-w-5xl font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight text-white sm:text-8xl">
            Espacios modulares
            <br />
            listos para operar
          </h1>
          <p className="mt-7 max-w-xl text-lg text-white/85">
            Diseñamos, fabricamos y montamos módulos para industria, oficina,
            educación y más. Entrega en semanas, no en meses.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CotizarButton>Cotizar mi proyecto</CotizarButton>
            <CotizarButton
              href="/sistemas"
              variant="outline"
              className="!border-white/60 !text-white hover:!border-rojo hover:!bg-rojo hover:!text-white"
            >
              Ver los sistemas
            </CotizarButton>
          </div>
          <p className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 font-eyebrow text-[11px] uppercase tracking-[0.18em] text-white/70">
            <span className="text-rojo">—</span> +30 años
            <span className="text-rojo">—</span> cobertura nacional
            <span className="text-rojo">—</span> entrega en semanas
            <span className="text-rojo">—</span>
          </p>
        </div>
      </section>

      {/* SISTEMAS — índice con iconos de marca (línea en marco) */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-linea pb-6">
          <div>
            <Eyebrow>Los sistemas</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
              Un sistema para cada necesidad
            </h2>
          </div>
          <Link href="/sistemas" className="text-sm font-semibold text-rojo hover:underline">
            Ver catálogo →
          </Link>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {sistemas.map((s) => (
            <Link
              key={s.slug}
              href={`/sistemas/${s.slug}`}
              className="group flex items-start gap-4"
            >
              <span className="flex h-16 w-16 flex-none items-center justify-center rounded-xl border border-linea text-rojo transition-all group-hover:-translate-y-0.5 group-hover:border-rojo group-hover:shadow-md group-hover:shadow-rojo/10">
                <SistemaIcon slug={s.slug} className="h-9 w-9" />
              </span>
              <div className="pt-1">
                <h3 className="font-display text-lg font-bold uppercase text-pizarra transition-colors group-hover:text-rojo">
                  {s.nombre}
                  {s.pendiente && (
                    <span className="ml-2 align-middle text-[10px] font-normal tracking-wide text-pizarra/70">
                      · pronto
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm text-pizarra">{s.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BANDA ROJA DE IMPACTO — campo de color + tipografía gigante de textura */}
      <section className="relative overflow-hidden bg-rojo text-white">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span className="select-none font-display text-[30vw] font-bold uppercase leading-none text-white/10">
            Modular
          </span>
        </span>
        <div className="relative mx-auto max-w-6xl px-4 py-24">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
              Entrega en semanas,
              <br />
              no en meses.
            </h2>
            <p className="text-lg text-white/90">
              Diseño, fabricación y montaje con respaldo de fábrica. Tú defines el
              alcance; nosotros entregamos operación lista.
            </p>
          </div>
          <dl className="mt-14 grid gap-8 border-t border-white/25 pt-8 sm:grid-cols-3">
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
        </div>
      </section>

      {/* SOLUCIONES POR SECTOR — tarjetas foto con esquinas */}
      <section id="soluciones" className="mx-auto max-w-6xl px-4 py-24">
        <Eyebrow>Soluciones por sector</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
          Resolvemos por industria
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectores.map((s) => (
            <Link
              key={s.slug}
              href={`/soluciones/${s.slug}`}
              className="group relative block overflow-hidden"
            >
              <Foto
                src={s.img}
                alt={s.nombre}
                width={1000}
                height={1250}
                className="aspect-[5/6] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/20 to-transparent" />
              <CornerFrame variant="accent" size={34} inset={14} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  {s.nombre}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/80">{s.problema}</p>
                <span className="mt-3 inline-block font-eyebrow text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors group-hover:text-rojo">
                  Ver solución —
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROYECTOS — banda oscura grafito (como el manual presenta la foto) */}
      <section className="relative overflow-hidden bg-tinta text-white">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-6xl px-4 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow tone="dark">Proyectos</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase text-white sm:text-4xl">
                Obra entregada, no promesas
              </h2>
            </div>
            <Link href="/proyectos" className="text-sm font-semibold text-rojo hover:underline">
              Ver todos —
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.slice(0, 6).map((p) => (
              <figure key={p.img} className="group relative overflow-hidden">
                <Foto
                  src={p.img}
                  alt={p.titulo}
                  width={1000}
                  height={1250}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <CornerFrame variant="frame" size={32} stroke={2.5} inset={8} />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta to-transparent p-4">
                  <span className="font-eyebrow text-[10px] uppercase tracking-[0.16em] text-rojo">
                    {p.sector}
                  </span>
                  <p className="text-sm font-semibold text-white">{p.titulo}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ — foto enmarcada + pilares con marcador rojo */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <Foto
              src="/fotos/oficinas-obra.jpg"
              alt="Proyecto modular de Modularte"
              width={1000}
              height={1250}
              className="aspect-[4/5] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <CornerFrame variant="frame" size={44} inset={-1} />
          </Reveal>
          <div>
            <Eyebrow>Por qué Modularte</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
              Respaldo que sostiene la promesa
            </h2>
            <ul className="mt-8 space-y-6">
              {[
                { t: "+30 años de experiencia", d: "Construyendo soluciones a la medida de cada proyecto." },
                { t: "Respaldo de fábrica", d: "Manufactura con capacidad industrial y control de calidad." },
                { t: "Certificaciones", d: "Cumplimiento y estándares donde el proyecto lo exige." },
                { t: "Cobertura nacional", d: "Entregamos y montamos donde esté la operación." },
              ].map((x) => (
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
        </div>
      </section>

      {/* CIERRE + COTIZACIÓN */}
      <section className="border-t border-linea bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 lg:grid-cols-2">
          <div>
            <Eyebrow>Cotiza tu proyecto</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
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
