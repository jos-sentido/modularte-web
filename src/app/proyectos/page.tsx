import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";

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
        Casos reales por sistema y sector. (Galería pendiente: se integra el banco de
        fotos del cliente.)
      </p>

      {/* Placeholder de galería — se llena con el banco de fotos de Drive */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-linea bg-white text-sm text-pizarra"
          >
            Foto de proyecto
          </div>
        ))}
      </div>

      <div className="mt-12">
        <CotizarButton>Empieza tu proyecto</CotizarButton>
      </div>
    </section>
  );
}
