import Link from "next/link";
import Image from "next/image";
import SistemaIcon from "./SistemaIcon";
import InvitacionPie from "./site/InvitacionPie";
import { MENU, PIE_SISTEMAS, PIE_SECTORES, CONTACTO } from "./site/mapa";

/*
 * Pie de página de Modularte: banda oscura del manual con la retícula como
 * estructura. Arriba, la invitación a cotizar; en medio, contacto grande y la
 * navegación en celdas; abajo, el nombre de la marca como textura.
 */
export default function Footer() {
  const titulo = "font-eyebrow text-[11px] uppercase tracking-[0.18em] text-white/55";
  const enlace = "inline-flex min-h-9 items-center text-[15px] text-white/85 transition-colors hover:text-white";
  return (
    <footer className="pie-descubre relative overflow-hidden bg-tinta text-white">
      <InvitacionPie>
      {/* invitación */}
      <div className="border-b border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8 px-4 py-12 sm:py-14">
          <h2 className="max-w-3xl text-balance font-display text-4xl font-bold uppercase leading-[0.95] sm:text-5xl">
            ¿Qué necesitas construir?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/configurador"
              className="inline-flex min-h-12 items-center bg-rojo px-6 text-sm font-semibold text-white transition-colors hover:bg-rojo-600"
            >
              Configurar mi proyecto
            </Link>
            <a
              href={CONTACTO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center border border-white/50 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-tinta"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
      </InvitacionPie>

      {/* retícula: contacto + navegación */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.2fr_1fr_1fr]">
          <div className="bg-tinta py-9 pr-6">
            <Link href="/" className="flex items-center gap-3" aria-label="Modularte — inicio">
              <Image src="/brand/logo/imagotipo-rojo.png" alt="" width={44} height={44} className="h-11 w-11" />
              <span className="font-display text-2xl font-bold uppercase leading-none tracking-wide">Modularte</span>
            </Link>
            <p className={`mt-8 ${titulo}`}>Llámanos</p>
            <a href={CONTACTO.telefonoHref} className="mt-2 block font-display text-3xl font-bold leading-none hover:text-white/80 sm:text-4xl">
              {CONTACTO.telefono}
            </a>
            <a href={`mailto:${CONTACTO.correo}`} className={`mt-4 ${enlace}`}>
              {CONTACTO.correo}
            </a>
            <p className="mt-3 max-w-xs text-sm text-white/65">{CONTACTO.direccion}</p>
          </div>

          <nav aria-label="Sistemas" className="bg-tinta py-9 sm:px-6">
            <p className={titulo}>Sistemas</p>
            <ul className="mt-4">
              {PIE_SISTEMAS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={`${enlace} gap-3`}>
                    <SistemaIcon slug={s.href.split("/").pop() ?? ""} className="h-7 w-9 flex-none text-white/50" />
                    {s.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sectores" className="bg-tinta py-9 sm:px-6">
            <p className={titulo}>Sectores</p>
            <ul className="mt-4">
              {PIE_SECTORES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={enlace}>
                    {s.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sitio" className="bg-tinta py-9 sm:px-6">
            <p className={titulo}>Sitio</p>
            <ul className="mt-4">
              {MENU.map((m) => (
                <li key={m.href}>
                  <Link href={m.href} className={enlace}>
                    {m.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* la marca como textura (recurso del manual) */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden border-t border-white/15">
        <p className="-mb-[0.16em] whitespace-nowrap text-center font-display text-[12.6vw] font-bold uppercase leading-[0.8] tracking-tight text-white/[0.06]">
          Modularte
        </p>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-5 text-xs text-white/55">
          <span>© 2026 Modularte · Construcciones prefabricadas</span>
          <span>Guadalajara, Jalisco · Cobertura nacional</span>
        </div>
      </div>
    </footer>
  );
}
