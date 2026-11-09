import type { MetadataRoute } from "next";
import { sistemas } from "@/data/sistemas";
import { sectores } from "@/data/sectores";

const BASE = "https://modularte.com.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = [
    "",
    "/sistemas",
    "/configurador",
    "/soluciones",
    "/proyectos",
    "/nosotros",
    "/contacto",
  ];
  const sis = sistemas.filter((s) => !s.pendiente).map((s) => `/sistemas/${s.slug}`);
  const sec = sectores.map((s) => `/soluciones/${s.slug}`);

  const lastModified = "2026-11-09";

  return [...fijas, ...sis, ...sec].map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
