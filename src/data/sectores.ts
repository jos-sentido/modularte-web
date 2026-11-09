export type Sector = {
  slug: string;
  nombre: string;
  problema: string;
  solucion: string;
  sistemas: string[]; // slugs de sistemas recomendados
};

// Soluciones por sector (vertical). Cada uno ataca sus keywords de SEO.
export const sectores: Sector[] = [
  {
    slug: "mineria",
    nombre: "Minería",
    problema: "Campamentos y oficinas donde no hay infraestructura, en plazos cortos.",
    solucion: "Módulos de acero para dormitorios, comedores y oficinas, resistentes y reubicables.",
    sistemas: ["armabox", "unidades-moviles"],
  },
  {
    slug: "educacion",
    nombre: "Educación",
    problema: "Aulas y espacios escolares que se necesitan para el próximo ciclo, no en años.",
    solucion: "Aulas prefabricadas listas para operar, ampliables conforme crece la escuela.",
    sistemas: ["armabox", "tradicional"],
  },
  {
    slug: "salud",
    nombre: "Salud",
    problema: "Clínicas y módulos de salud que deben cumplir y entregarse rápido.",
    solucion: "Unidades de salud modulares, con el flujo clínico resuelto desde el diseño.",
    sistemas: ["armabox", "unidades-moviles"],
  },
  {
    slug: "industria",
    nombre: "Industria",
    problema: "Espacios para la operación sin frenar la obra ni la producción.",
    solucion: "Oficinas, comedores y almacenes modulares instalados por etapas, sin paros.",
    sistemas: ["armabox", "tradicional", "unidades-moviles"],
  },
  {
    slug: "oficinas",
    nombre: "Oficinas",
    problema: "Oficinas que deben crecer o moverse al ritmo del equipo.",
    solucion: "Oficinas modulares ampliables, del número de personas al espacio exacto.",
    sistemas: ["armabox", "tradicional"],
  },
];

export const getSector = (slug: string) => sectores.find((s) => s.slug === slug);
