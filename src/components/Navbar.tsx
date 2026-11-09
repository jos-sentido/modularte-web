"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CotizarButton from "./CotizarButton";

const links = [
  { href: "/sistemas", label: "Sistemas" },
  { href: "/configurador", label: "Configurador" },
  { href: "/soluciones", label: "Soluciones" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-linea bg-hueso/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Modularte — inicio">
          <Image
            src="/brand/logo/imagotipo-rojo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="font-display text-xl font-bold uppercase leading-none tracking-wide text-pizarra">
            Modularte
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-pizarra transition-colors hover:text-rojo"
            >
              {l.label}
            </Link>
          ))}
          <CotizarButton />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-linea text-pizarra md:hidden"
          aria-label="Menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-linea bg-hueso md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-2 py-2.5 text-pizarra hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <CotizarButton className="mt-2 w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
