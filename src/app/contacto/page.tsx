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

          <ul className="mt-8 space-y-3 text-sm text-tinta">
            <li>
              <span className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
                Teléfono
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
        </div>

        <div className="rounded-2xl border border-linea bg-white p-6 sm:p-8">
          <CotizaForm sistemaInicial={sistema} sectorInicial={sector} />
        </div>
      </div>
    </section>
  );
}
