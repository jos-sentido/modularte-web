/*
 * Navegación del sitio: una sola fuente para el menú y el pie de página.
 */
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";

export type Enlace = { titulo: string; href: string };

export const MENU: Enlace[] = [
  { titulo: "Sistemas", href: "/sistemas" },
  { titulo: "Configurador", href: "/configurador" },
  { titulo: "Soluciones", href: "/soluciones" },
  { titulo: "Proyectos", href: "/proyectos" },
  { titulo: "Nosotros", href: "/nosotros" },
  { titulo: "Contacto", href: "/contacto" },
];

export const PIE_SISTEMAS: Enlace[] = sistemas.map((s) => ({
  titulo: s.nombre,
  href: `/sistemas/${s.slug}`,
}));

export const PIE_SECTORES: Enlace[] = sectores.map((s) => ({
  titulo: s.nombre,
  href: `/soluciones/${s.slug}`,
}));

export const CONTACTO = {
  telefono: "+52 33 2616 0168",
  telefonoHref: "tel:+523326160168",
  whatsappHref: "https://wa.me/523326160168",
  correo: "info@modularte.com.mx",
  direccion:
    "Mexicaltzingo #1545 int 167, Col. Moderna, Guadalajara, Jal. C.P. 44100",
};
