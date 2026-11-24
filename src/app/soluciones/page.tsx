import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectoresPila from "@/components/site/SectoresPila";

export const metadata: Metadata = {
  title: "Soluciones por sector",
  description:
    "Soluciones modulares de Modularte por sector: minería, educación, salud, industria y oficinas.",
};

export default function SolucionesPage() {
  return (
    <>
      <PageHero
        eyebrow="Soluciones por sector"
        title="Resolvemos por industria"
        subtitle="Cada sector tiene su reto. Elige el tuyo y mira cómo lo resolvemos con nuestros sistemas modulares."
        img="/fotos/tradicional/terminado-2.jpg"
        imgAlt="Edificio de dos niveles"
      />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectoresPila />
      </section>
    </>
  );
}
