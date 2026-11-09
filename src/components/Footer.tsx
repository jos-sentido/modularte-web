import Link from "next/link";
import Image from "next/image";
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-linea bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/brand/logo/modularte-vertical.png"
            alt="Modularte"
            width={180}
            height={92}
            className="h-auto w-40"
          />
          <p className="mt-4 max-w-xs text-sm text-pizarra">
            Construcciones prefabricadas. Diseño, fabricación y montaje de espacios
            modulares de acero.
          </p>
        </div>

        <div>
          <h3 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
            Sistemas
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {sistemas.map((s) => (
              <li key={s.slug}>
                <Link href={`/sistemas/${s.slug}`} className="text-tinta hover:text-rojo">
                  {s.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
            Sectores
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {sectores.map((s) => (
              <li key={s.slug}>
                <Link href={`/soluciones/${s.slug}`} className="text-tinta hover:text-rojo">
                  {s.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-eyebrow text-xs uppercase tracking-[0.14em] text-pizarra">
            Contacto
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-tinta">
            <li>
              <a href="tel:+523326160168" className="hover:text-rojo">
                +52 33 2616 0168
              </a>
            </li>
            <li>
              <a href="mailto:info@modularte.com.mx" className="hover:text-rojo">
                info@modularte.com.mx
              </a>
            </li>
            <li>Mexicaltzingo #1545 int 167, Col. Moderna, Guadalajara, Jal. C.P. 44100</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-linea">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-pizarra">
          © 2026 Modularte · Construcciones prefabricadas.
        </div>
      </div>
    </footer>
  );
}
