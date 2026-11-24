import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Asistente from "@/components/site/Asistente";

export const metadata: Metadata = {
  title: "Configurador",
  description:
    "Configura tu proyecto modular: responde unas preguntas y te sugerimos el sistema de Modularte que te conviene.",
};

export default function ConfiguradorPage() {
  return (
    <>
      <PageHero
        eyebrow="Configurador"
        title="¿Qué necesitas construir?"
        subtitle="Responde cuatro preguntas y te sugerimos el sistema, con un modelo de referencia para cotizar."
      />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Asistente />
      </section>
    </>
  );
}
