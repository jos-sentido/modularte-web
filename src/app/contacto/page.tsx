import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import CotizaForm from "@/components/CotizaForm";

export const metadata: Metadata = {
  title: "Contacto y cotización",
  description:
    "Cotiza tu proyecto modular con Modularte. Te armamos una propuesta a la medida.",
};

// Depende de searchParams (sistema/sector para prellenar) → render en request.
export const instant = false;

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ sistema?: string; sector?: string }>;
}) {
  const { sistema = "", sector = "" } = await searchParams;

  const direccion = "Mexicaltzingo 1545, Col. Moderna, Guadalajara, Jalisco 44100";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    direccion,
  )}`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Contacto · Cotización</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
            Cotiza tu proyecto
          </h1>
          <p className="mt-4 max-w-md text-pizarra">
            Déjanos tus datos y el alcance de tu proyecto. Te contactamos para armar la
            cotización.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-tinta">
            <li>
              <span className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
                Teléfono / WhatsApp
              </span>
              <br />
              <a href="tel:+523326160168" className="hover:text-rojo">
                +52 33 2616 0168
              </a>
            </li>
            <li>
              <span className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
                Correo
              </span>
              <br />
              <a href="mailto:info@modularte.com.mx" className="hover:text-rojo">
                info@modularte.com.mx
              </a>
            </li>
            <li>
              <span className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
                Ubicación
              </span>
              <br />
              Mexicaltzingo #1545 int 167, Col. Moderna, Guadalajara, Jal. C.P. 44100
            </li>
          </ul>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-linea bg-white p-5 transition-colors hover:border-rojo"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-rojo/10 text-rojo">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-tinta">Nuestra ubicación</p>
                <p className="text-xs text-pizarra">Guadalajara, Jalisco</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-rojo">Ver en Google Maps →</span>
          </a>
        </div>

        <div className="rounded-2xl border border-linea bg-white p-6 sm:p-8">
          <CotizaForm sistemaInicial={sistema} sectorInicial={sector} />
        </div>
      </div>
    </section>
  );
}
