export type Sector = {
  slug: string;
  nombre: string;
  problema: string;
  solucion: string;
  sistemas: string[]; // slugs de sistemas recomendados
  img: string; // foto del banco tratado
};

// Soluciones por sector (vertical). Cada uno ataca sus keywords de SEO.
export const sectores: Sector[] = [
  {
    slug: "mineria",
    nombre: "Minería",
    problema: "Campamentos y oficinas donde no hay infraestructura, en plazos cortos.",
    solucion: "Módulos de acero para dormitorios, comedores y oficinas, resistentes y reubicables.",
    sistemas: ["armabox", "unidades-moviles"],
    img: "/fotos/campamento.jpg",
  },
  {
    slug: "educacion",
    nombre: "Educación",
    problema: "Aulas y espacios escolares que se necesitan para el próximo ciclo, no en años.",
    solucion: "Aulas prefabricadas listas para operar, ampliables conforme crece la escuela.",
    sistemas: ["armabox", "tradicional"],
    img: "/fotos/escuela.jpg",
  },
  {
    slug: "salud",
    nombre: "Salud",
    problema: "Clínicas y módulos de salud que deben cumplir y entregarse rápido.",
    solucion: "Unidades de salud modulares, con el flujo clínico resuelto desde el diseño.",
    sistemas: ["armabox", "unidades-moviles"],
    img: "/fotos/oficina-interior.jpg",
  },
  {
    slug: "industria",
    nombre: "Industria",
    problema: "Espacios para la operación sin frenar la obra ni la producción.",
    solucion: "Oficinas, comedores y almacenes modulares instalados por etapas, sin paros.",
    sistemas: ["armabox", "tradicional", "unidades-moviles"],
    img: "/fotos/oficinas-obra.jpg",
  },
  {
    slug: "oficinas",
    nombre: "Oficinas",
    problema: "Oficinas que deben crecer o moverse al ritmo del equipo.",
    solucion: "Oficinas modulares ampliables, del número de personas al espacio exacto.",
    sistemas: ["armabox", "tradicional"],
    img: "/fotos/modulos-arboles.jpg",
  },
];

export const getSector = (slug: string) => sectores.find((s) => s.slug === slug);
