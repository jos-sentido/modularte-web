import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ConfiguradorFiltro from "@/components/ConfiguradorFiltro";

export const metadata: Metadata = {
  title: "Configurador",
  description:
    "Configura tu proyecto modular: filtra por sistema y aplicación y encuentra la solución de Modularte.",
};

export default function ConfiguradorPage() {
  return (
    <>
      <PageHero
        eyebrow="Configurador"
        title="¿Qué necesitas construir?"
        subtitle="Elige un sistema, una aplicación, o ambos. Te mostramos qué resuelve tu proyecto."
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <ConfiguradorFiltro />
      </section>
    </>
  );
}
