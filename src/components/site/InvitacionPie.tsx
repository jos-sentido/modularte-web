"use client";

import { usePathname } from "next/navigation";

// La invitación del pie no se repite en el inicio, que ya cierra con su propia frase.
export default function InvitacionPie({ children }: { children: React.ReactNode }) {
  return usePathname() === "/" ? null : <>{children}</>;
}
