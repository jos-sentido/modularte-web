import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CornerFrame from "@/components/CornerFrame";
import Explorador3D from "@/components/site/Explorador3D";
import ProcesoArmado from "@/components/site/ProcesoArmado";
import ModelosMoviles from "@/components/site/ModelosMoviles";
import Usos from "@/components/site/Usos";
import { lineaMoviles, especificacionesMoviles } from "@/data/moviles";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";
import { sistemas, getSistema } from "@/data/sistemas";

// Lee params de la URL: se permite render bloqueante para rutas no pregeneradas.
export const instant = false;

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
    <article>
      <PageHero
        eyebrow="Sistema"
        title={s.nombre}
        subtitle={s.tagline}
        img={s.img}
        imgAlt={`Sistema ${s.nombre} de Modularte`}
      >
        <CotizarButton href={`/contacto?sistema=${s.slug}`}>
          Cotizar este sistema
        </CotizarButton>
      </PageHero>

      {s.pendiente ? (
        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="border border-pizarra/40 bg-white p-6">
            <p className="font-display text-xl font-bold uppercase text-tinta">Próximamente</p>
            <p className="mt-2 text-pizarra">
              {s.descripcion} Mientras tanto, cuéntanos tu proyecto y te orientamos.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* EL PRODUCTO EN ESCENA: render a un lado, datos al otro */}
          <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
              {s.render && (
                <figure className="relative">
                  <Image
                    src={s.render}
                    alt={`Sistema ${s.nombre}: ${s.renderPie ?? ""}`}
                    width={1800}
                    height={1195}
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className={s.render.startsWith("/moviles/") ? "aspect-[3/2] w-full bg-white object-contain p-6" : "aspect-[3/2] w-full object-cover"}
                  />
                  <CornerFrame variant="frame" size={40} inset={0} />
                  {s.renderPie && (
                    <figcaption className="mt-2 font-eyebrow text-[10px] uppercase tracking-[0.16em] text-pizarra">
                      {s.renderPie}
                    </figcaption>
                  )}
                </figure>
              )}
              <div>
                <Eyebrow>El sistema</Eyebrow>
                <p className="mt-5 text-lg text-pizarra">{s.descripcion}</p>
                {s.caracteristicas && s.caracteristicas.length > 0 && (
                  <dl className="mt-8 border-t border-linea">
                    {s.caracteristicas.map((c) => (
                      <div key={c.k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-linea py-3.5">
                        <dt className="pt-1 font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">
                          {c.k}
                        </dt>
                        <dd className="font-display text-lg font-bold uppercase leading-tight text-tinta">
                          {c.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
            {s.diagrama && (
              <figure className="mt-12 grid items-center gap-6 border border-linea bg-white p-6 sm:grid-cols-[1fr_1.4fr] sm:p-8">
                <figcaption>
                  <p className="font-display text-2xl font-bold uppercase leading-tight text-tinta">
                    Qué hay dentro del módulo
                  </p>
                  <p className="mt-3 text-pizarra">
                    Techo y piso de acero, columnas en las esquinas, paneles con aislamiento,
                    puerta y ventanas.
                  </p>
                  <p className="mt-4 font-eyebrow text-[10px] uppercase tracking-[0.16em] text-pizarra">
                    {s.diagrama.pie}
                  </p>
                </figcaption>
                <Image
                  src={s.diagrama.src}
                  alt={s.diagrama.pie}
                  width={868}
                  height={685}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </figure>
            )}
          </section>

          {/* CUALIDADES ILUSTRADAS */}
          {s.cualidades && (
            <section className="bg-white">
              <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                <Eyebrow>Instalación</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
                  Se arma en sitio, paso a paso
                </h2>
                <div className="mt-10">
                  <ProcesoArmado pasos={s.cualidades} nota={s.cualidadesNota} />
                </div>
              </div>
            </section>
          )}

          {/* USOS CON FOTOGRAFÍA REAL */}
          {s.usos && (
            <section className="border-t border-linea">
              <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                <Eyebrow>Usos</Eyebrow>
                <h2 className="mb-10 mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
                  Para qué se ha construido
                </h2>
                <Usos usos={s.usos} />
              </div>
            </section>
          )}

          {/* FOTOGRAFÍA REAL DE PROYECTOS CON EL SISTEMA */}
          {s.galeria && (
            <section className="bg-tinta text-white">
              <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                <Eyebrow tone="dark">Proyectos</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase sm:text-4xl">
                  Así se ve construido
                </h2>
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {s.galeria.map((f) => (
                    <figure key={f.img} className="relative overflow-hidden">
                      <Image
                        src={f.img}
                        alt={f.titulo}
                        width={2000}
                        height={1331}
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <CornerFrame variant="frame" size={32} stroke={2.5} inset={8} />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta to-transparent p-4 pt-10 text-sm font-semibold">
                        {f.titulo}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* MODELOS DE LÍNEA (Unidades Móviles) */}
          {s.slug === "unidades-moviles" && (
            <>
              <section className="border-t border-linea">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                  <Eyebrow>Modelos de línea</Eyebrow>
                  <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
                    Elige tu unidad
                  </h2>
                  <p className="mb-10 mt-4 max-w-2xl text-pizarra">
                    Mira cada modelo por fuera, en planta y por dentro, con su medida y lo que incluye.
                  </p>
                  <ModelosMoviles />
                </div>
              </section>

              <section className="bg-tinta text-white">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                  <Eyebrow tone="dark">Línea completa</Eyebrow>
                  <h2 className="mt-4 font-display text-3xl font-bold uppercase sm:text-4xl">
                    Una unidad para cada uso
                  </h2>
                  <div className="mt-10 grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-3">
                    {lineaMoviles.map((l) => (
                      <div key={l.uso} className="bg-tinta p-6">
                        <h3 className="font-display text-xl font-bold uppercase leading-tight">{l.uso}</h3>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {l.medidas.map((x) => (
                            <li key={x} className="border border-white/30 px-2.5 py-1 text-sm text-white/85">
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 font-eyebrow text-[10px] uppercase tracking-[0.16em] text-white/60">
                    Medidas en pies (ancho × largo)
                  </p>
                </div>
              </section>

              <section className="border-b border-linea">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                  <Eyebrow>Especificaciones</Eyebrow>
                  <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
                    Cómo están hechas
                  </h2>
                  <div className="mt-10 grid gap-px border border-linea bg-linea sm:grid-cols-2 lg:grid-cols-4">
                    {especificacionesMoviles.map(([titulo, puntos]) => (
                      <div key={titulo} className="bg-hueso p-6">
                        <h3 className="font-display text-xl font-bold uppercase text-tinta">{titulo}</h3>
                        <ul className="mt-3 space-y-2 text-pizarra">
                          {puntos.map((x) => (
                            <li key={x} className="border-t border-linea pt-2 first:border-t-0 first:pt-0">
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* DISTRIBUCIONES EN 3D (folleto del sistema) */}
          {s.slug === "armabox" && (
            <section className="border-t border-linea">
              <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
                <Eyebrow>Distribuciones recomendadas</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase text-tinta sm:text-4xl">
                  Recorre el módulo por dentro
                </h2>
                <p className="mb-10 mt-4 max-w-2xl text-pizarra">
                  Elige una distribución, gírala, mírala en planta o entra al módulo. Los
                  módulos se combinan para crear espacios más amplios.
                </p>
                <Explorador3D />
              </div>
            </section>
          )}

          {s.aplicaciones.length > 0 && (
            <section className="border-t border-linea">
              <div className="mx-auto max-w-6xl px-4 py-16">
                <Eyebrow>Aplicaciones</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
                  Para qué se usa
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.aplicaciones.map((a) => (
                    <span
                      key={a}
                      className="bg-white px-5 py-3 font-display text-lg font-bold uppercase text-tinta"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CIERRE */}
      <section className="border-t border-linea bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-14">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-tinta sm:text-3xl">
              ¿Te sirve {s.nombre}?
            </h2>
            <p className="mt-2 text-pizarra">
              Te armamos una propuesta a la medida de tu proyecto.
            </p>
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
