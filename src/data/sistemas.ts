export type Caracteristica = { k: string; v: string };

export type Sistema = {
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  aplicaciones: string[];
  img?: string; // foto principal (banco tratado)
  caracteristicas?: Caracteristica[];
  casos?: string[]; // rutas de fotos de proyectos con ese sistema
  pendiente?: boolean; // falta info del cliente (ZAR / Flotante)
};

// Los 5 sistemas de Modularte. ZAR y Flotante quedan pendientes de info (🚧).
export const sistemas: Sistema[] = [
  {
    slug: "unidades-moviles",
    nombre: "Unidades Móviles",
    tagline: "Espacios reubicables, listos para moverse contigo.",
    descripcion:
      "Módulos y remolques que se trasladan de un sitio a otro sin obra. Ideales cuando la operación cambia de lugar: llegan, se conectan y operan.",
    img: "/fotos/oficinas-obra.jpg",
    caracteristicas: [
      { k: "Instalación", v: "Sin obra: se traslada y se conecta" },
      { k: "Movilidad", v: "Reubicable de un sitio a otro" },
      { k: "Usos", v: "Oficinas, casetas, comedores, sanitarios" },
      { k: "Entrega", v: "En semanas, no en meses" },
    ],
    aplicaciones: ["Oficinas de obra", "Casetas de vigilancia", "Comedores", "Sanitarios"],
    casos: ["/fotos/oficinas-obra.jpg", "/fotos/campamento.jpg"],
  },
  {
    slug: "armabox",
    nombre: "Armabox®",
    tagline: "El módulo de acero que se arma donde lo necesitas.",
    descripcion:
      "Módulo de acero estructural que se transporta plegado y se arma en sitio en poco tiempo. Apilable y combinable para crear desde una caseta hasta un campamento completo.",
    img: "/fotos/modulos-exterior.jpg",
    caracteristicas: [
      { k: "Medidas", v: "6055 × 2435 × 2896 mm" },
      { k: "Estructura", v: "Acero SGH340" },
      { k: "Transporte", v: "Se envía plegado, se arma en sitio" },
      { k: "Crecimiento", v: "Apilable y combinable por módulos" },
      { k: "Confort", v: "Aislamiento térmico y acústico" },
    ],
    aplicaciones: ["Dormitorios", "Baños", "Oficinas", "Aulas", "Clínicas", "Almacenes"],
    casos: ["/fotos/modulos-exterior.jpg", "/fotos/modulos-arboles.jpg", "/fotos/campamento.jpg"],
  },
  {
    slug: "tradicional",
    nombre: "Tradicional",
    tagline: "Construcción prefabricada a la medida del proyecto.",
    descripcion:
      "Soluciones prefabricadas para proyectos que requieren un espacio fijo y personalizado, con la velocidad de la prefabricación y acabados a la medida.",
    img: "/fotos/patio.jpg",
    caracteristicas: [
      { k: "Tipo", v: "Prefabricado a la medida" },
      { k: "Uso", v: "Espacios fijos y personalizados" },
      { k: "Escala", v: "Desde módulos hasta edificios" },
    ],
    aplicaciones: ["Edificios de oficinas", "Naves", "Espacios a la medida"],
    casos: ["/fotos/patio.jpg", "/fotos/escuela.jpg"],
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
