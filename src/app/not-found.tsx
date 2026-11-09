import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import CotizarButton from "@/components/CotizarButton";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-20">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-5 font-display text-5xl font-bold uppercase text-tinta sm:text-6xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-pizarra">
        La página que buscas se movió o no existe. Vuelve al inicio o cotiza tu
        proyecto.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <CotizarButton href="/">Volver al inicio</CotizarButton>
        <CotizarButton href="/sistemas" variant="outline">
          Ver los sistemas
        </CotizarButton>
      </div>
      <p className="mt-10 text-sm text-pizarra">
        ¿Buscabas algo específico?{" "}
        <Link href="/contacto" className="font-semibold text-rojo underline">
          Escríbenos
        </Link>
        .
      </p>
    </section>
  );
}
