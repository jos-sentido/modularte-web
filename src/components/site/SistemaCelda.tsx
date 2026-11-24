import Link from "next/link";
import Image from "next/image";
import SistemaIcon from "@/components/SistemaIcon";
import type { Sistema } from "@/data/sistemas";

/*
 * Celda de sistema: el producto se ve (render ilustrativo) y el icono oficial lo firma.
 * Los sistemas sin información aún muestran solo su icono.
 */
export default function SistemaCelda({ s, grande = false }: { s: Sistema; grande?: boolean }) {
  // Sistemas sin información todavía: renglón compacto, sin escenario vacío
  const imagen = s.tarjeta ?? s.render;
  if (!imagen) {
    return (
      <Link
        href={`/sistemas/${s.slug}`}
        className="flex h-full min-h-16 items-center gap-4 bg-hueso px-5 py-3 transition-colors hover:bg-white sm:px-6"
      >
        <SistemaIcon slug={s.slug} className="h-9 w-11 flex-none opacity-70" />
        <div>
          <h3 className="font-display text-lg font-bold uppercase leading-tight text-tinta">{s.nombre}</h3>
          {!s.pendiente && <p className="mt-0.5 text-sm text-pizarra">{s.tagline}</p>}
        </div>
        {s.pendiente && (
          <span className="ml-auto font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">
            Próximamente
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/sistemas/${s.slug}`}
      className="group flex h-full flex-col bg-hueso transition-colors hover:bg-white"
    >
      <div className="relative grid aspect-[3/2] place-items-center overflow-hidden">
        <Image
          src={imagen}
          alt={`Sistema ${s.nombre}`}
          fill
          sizes={grande ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 items-start gap-4 border-t border-linea p-5 sm:p-6">
        <SistemaIcon slug={s.slug} className="h-10 w-12 flex-none" />
        <div>
          <h3 className={`font-display font-bold uppercase leading-tight text-tinta ${grande ? "text-2xl" : "text-xl"}`}>
            {s.nombre}
          </h3>
          <p className="mt-1 text-sm text-pizarra">{s.tagline}</p>
        </div>
      </div>
    </Link>
  );
}
