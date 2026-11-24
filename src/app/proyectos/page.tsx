import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CotizarButton from "@/components/CotizarButton";
import Galeria from "@/components/site/Galeria";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Galería de proyectos construidos por Modularte: edificios, armado en sitio, aulas e interiores.",
};

export default function ProyectosPage() {
  return (
    <>
      <PageHero
        eyebrow="Proyectos"
        title="Proyectos construidos"
        subtitle="Edificios terminados, el armado en sitio, aulas e interiores. Toca cualquier foto para verla en grande."
        img="/fotos/tradicional/terminado-3.jpg"
        imgAlt="Edificio de dos niveles con escalera exterior"
      >
        <CotizarButton>Empieza tu proyecto</CotizarButton>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Galeria />
      </section>
    </>
  );
}
