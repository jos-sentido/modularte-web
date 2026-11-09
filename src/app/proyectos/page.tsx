import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Foto from "@/components/Foto";
import CornerFrame from "@/components/CornerFrame";
import CotizarButton from "@/components/CotizarButton";
import { proyectos } from "@/data/proyectos";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Obra entregada por Modularte: proyectos modulares por sistema y sector.",
};

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyectos"
        title="Obra entregada, no promesas"
        subtitle="Casos reales por sistema y sector. Espacios modulares entregados y montados en sitio."
        img="/fotos/modulos-arboles.jpg"
        imgAlt="Proyectos modulares de Modularte"
      >
        <CotizarButton>Empieza tu proyecto</CotizarButton>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((p) => (
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
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/90 to-transparent p-4">
                <span className="font-eyebrow text-[10px] uppercase tracking-[0.16em] text-rojo">
                  {p.sector}
                </span>
                <p className="text-sm font-semibold text-white">{p.titulo}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
