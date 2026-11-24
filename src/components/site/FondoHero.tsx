"use client";

/*
 * Fondo vivo para los encabezados sin fotografía: la retícula del manual se
 * enciende en rojo donde pasa el cursor (CursorGrid, React Bits). En pantallas
 * táctiles respira sola.
 */

import CursorGrid from "@/components/bits/CursorGrid";

export default function FondoHero() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <CursorGrid
        cellSize={64}
        color="#BE3E3E"
        gridColor="#ffffff"
        gridOpacity={0.07}
        fillOpacity={0.16}
        maxOpacity={0.9}
        radius={170}
        ambient={0.12}
        edgeFade={0.25}
      />
    </div>
  );
}
