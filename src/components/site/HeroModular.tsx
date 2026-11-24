"use client";

/*
 * Hero de Modularte: la fotografía de obra se arma por módulos.
 * La imagen está cubierta por la retícula del manual (6 columnas); cada celda se
 * retira en secuencia y deja ver la obra, igual que un conjunto que se completa
 * módulo a módulo. Al cambiar de foto la retícula se cierra y vuelve a abrir.
 * El titular se despliega (FoldText, React Bits): Armabox llega plegado y se arma.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import CornerFrame from "@/components/CornerFrame";
import CotizarButton from "@/components/CotizarButton";
import Eyebrow from "@/components/Eyebrow";
import FoldText from "@/components/bits/FoldText";

const OBRAS = [
  { src: "/fotos/tradicional/terminado-3.jpg", pie: "Edificio de dos niveles" },
  { src: "/fotos/tradicional/terminado-5.jpg", pie: "Fachada con pasillo en planta alta" },
  { src: "/fotos/tradicional/terminado-4.jpg", pie: "Escalera y pasillo exterior" },
];

// Orden de montaje de las 18 celdas (por columnas alternas, de abajo hacia arriba)
const ORDEN = [12, 6, 0, 13, 7, 1, 14, 8, 2, 15, 9, 3, 16, 10, 4, 17, 11, 5];

export default function HeroModular() {
  const [i, setI] = useState(0);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAbierto(true), 150);
    return () => clearTimeout(t);
  }, [i]);

  const cambiar = (n: number) => {
    if (!abierto) return;
    setAbierto(false);
    setTimeout(() => setI((n + OBRAS.length) % OBRAS.length), 520);
  };

  return (
    <section className="relative isolate -mt-[61px] flex min-h-[92svh] items-center overflow-hidden bg-tinta">
      <Image
        key={OBRAS[i].src}
        src={OBRAS[i].src}
        alt={OBRAS[i].pie}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/55 to-tinta/10" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-tinta/90 via-tinta/35 to-transparent" />

      {/* retícula que se retira módulo a módulo */}
      <div aria-hidden className="absolute inset-0 grid grid-cols-3 grid-rows-6 sm:grid-cols-6 sm:grid-rows-3">
        {ORDEN.map((_, celda) => (
          <span
            key={celda}
            className={`tapa bg-tinta ${abierto ? "tapa-abre" : "tapa-cierra"}`}
            style={{ transitionDelay: abierto ? `${ORDEN.indexOf(celda) * 45}ms` : "0ms" }}
          />
        ))}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-tinta/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
        <CornerFrame variant="all" size={56} stroke={3} inset={24} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-32 sm:pb-20">
        <Eyebrow tone="dark">Construcciones prefabricadas</Eyebrow>
        <h1 className="mt-6 max-w-5xl font-display uppercase text-white">
          <FoldText
            text={"Espacios modulares\nlistos para operar"}
            splitBy="word"
            hinge="top"
            duration={0.8}
            stagger={0.12}
            fontSize="clamp(2.5rem, 10.5vw, 6rem)"
            fontWeight={700}
            className="!tracking-tight !leading-[0.92]"
          />
        </h1>
        <p className="mt-7 max-w-xl text-lg text-white/85">
          Diseñamos, fabricamos y montamos módulos para industria, oficina,
          educación y más.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <CotizarButton>Cotizar mi proyecto</CotizarButton>
          <CotizarButton
            href="/sistemas"
            variant="outline"
            className="!border-white/60 !text-white hover:!border-rojo hover:!bg-rojo hover:!text-white"
          >
            Ver los sistemas
          </CotizarButton>
        </div>
      </div>

      {/* cambio de obra */}
      <div className="absolute bottom-7 left-4 right-4 z-10 flex items-center gap-3 text-white sm:bottom-9 sm:left-auto sm:right-10">
        <p className="mr-auto font-eyebrow text-[10px] uppercase tracking-[0.16em] text-white/75 sm:mr-0" aria-live="polite">
          {String(i + 1).padStart(2, "0")} / {String(OBRAS.length).padStart(2, "0")} — {OBRAS[i].pie}
        </p>
        <button
          type="button"
          onClick={() => cambiar(i - 1)}
          aria-label="Obra anterior"
          className="grid h-11 w-11 place-items-center border border-white/50 transition-colors hover:border-white hover:bg-white hover:text-tinta"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => cambiar(i + 1)}
          aria-label="Obra siguiente"
          className="grid h-11 w-11 place-items-center border border-white/50 transition-colors hover:border-white hover:bg-white hover:text-tinta"
        >
          →
        </button>
      </div>
    </section>
  );
}
