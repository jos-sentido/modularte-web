import type { Metadata } from "next";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";
import { proyectos } from "@/data/proyectos";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Obra entregada por Modularte: proyectos modulares por sistema y sector.",
};

export default function ProyectosPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Eyebrow>Proyectos</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase text-tinta">
        Obra entregada, no promesas
      </h1>
      <p className="mt-4 max-w-xl text-pizarra">
        Casos reales por sistema y sector. Espacios modulares de acero entregados y
        montados en sitio.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proyectos.map((p) => (
          <figure
            key={p.img}
            className="group relative overflow-hidden rounded-xl border border-linea"
          >
            <Image
              src={p.img}
              alt={p.titulo}
              width={1000}
              height={1250}
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      </div>

      <div className="mt-12">
        <CotizarButton>Empieza tu proyecto</CotizarButton>
      </div>
    </section>
  );
}
