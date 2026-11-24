import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SistemaCelda from "@/components/site/SistemaCelda";
import { sistemas } from "@/data/sistemas";

export const metadata: Metadata = {
  title: "Sistemas",
  description:
    "Los sistemas modulares de Modularte: Unidades Móviles, Armabox®, Tradicional y más.",
};

export default function SistemasPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo de sistemas"
        title="Nuestros sistemas"
        subtitle="Cada sistema resuelve un tipo de proyecto. Elige el que se acerca a tu necesidad o cotiza y te orientamos."
        img="/fotos/modulos-arboles.jpg"
        imgAlt="Sistemas modulares de Modularte"
      />

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-px border border-linea bg-linea sm:grid-cols-6">
          {sistemas.map((s, n) => (
            <div key={s.slug} className={n < 3 ? "sm:col-span-2" : "sm:col-span-3"}>
              <SistemaCelda s={s} grande />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
