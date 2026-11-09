export type Sistema = {
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  aplicaciones: string[];
  pendiente?: boolean; // falta info del cliente (ZAR / Flotante)
};

// Los 5 sistemas de Modularte. ZAR y Flotante quedan pendientes de info (🚧).
export const sistemas: Sistema[] = [
  {
    slug: "unidades-moviles",
    nombre: "Unidades Móviles",
    tagline: "Espacios reubicables, listos para moverse contigo.",
    descripcion:
      "Módulos y remolques que se trasladan de un sitio a otro sin obra. Ideales cuando la operación cambia de lugar.",
    aplicaciones: ["Oficinas de obra", "Casetas de vigilancia", "Comedores", "Sanitarios"],
  },
  {
    slug: "armabox",
    nombre: "Armabox®",
    tagline: "El módulo de acero que se arma donde lo necesitas.",
    descripcion:
      "Módulo de acero estructural de 6055 × 2435 × 2896 mm, en lámina SGH340. Se transporta plegado y se arma en sitio en poco tiempo.",
    aplicaciones: ["Dormitorios", "Baños", "Oficinas", "Aulas", "Clínicas", "Almacenes"],
  },
  {
    slug: "tradicional",
    nombre: "Tradicional",
    tagline: "Construcción prefabricada a la medida del proyecto.",
    descripcion:
      "Soluciones prefabricadas tradicionales para proyectos que requieren un espacio fijo y personalizado.",
    aplicaciones: ["Edificios de oficinas", "Naves", "Espacios a la medida"],
  },
  {
    slug: "zar",
    nombre: "ZAR",
    tagline: "Pendiente de definir con el cliente.",
    descripcion:
      "Contenido en construcción: falta información del sistema (tecnología, materiales, diferenciador y casos).",
    aplicaciones: [],
    pendiente: true,
  },
  {
    slug: "flotante",
    nombre: "Flotante",
    tagline: "Pendiente de definir con el cliente.",
    descripcion:
      "Contenido en construcción: falta información del sistema (tecnología, materiales, diferenciador y casos).",
    aplicaciones: [],
    pendiente: true,
  },
];

export const getSistema = (slug: string) =>
  sistemas.find((s) => s.slug === slug);
