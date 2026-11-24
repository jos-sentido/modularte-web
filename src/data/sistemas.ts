export type Caracteristica = { k: string; v: string };

export type Sistema = {
  slug: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  aplicaciones: string[];
  img?: string; // foto principal (banco tratado)
  caracteristicas?: Caracteristica[];
  render?: string; // imagen del sistema tomada del material del cliente
  renderPie?: string;
  video?: { src: string; poster: string }; // animación ilustrativa del armado, hecha a partir de fotos reales
  tarjeta?: string; // render de estudio para las tarjetas de sistema (mismo estilo en todos)
  diagrama?: { src: string; pie: string };
  cualidadesNota?: string;
  usos?: { nombre: string; fotos: { img: string; titulo: string }[] }[]; // usos con fotografía real
  galeria?: { img: string; titulo: string }[]; // fotografía real de proyectos con el sistema
  cualidades?: { img: string; titulo: string; texto: string }[];
  pendiente?: boolean; // falta info del cliente (ZAR / Flotante)
};

// Los 5 sistemas de Modularte. ZAR y Flotante quedan pendientes de información del cliente.
export const sistemas: Sistema[] = [
  {
    slug: "unidades-moviles",
    nombre: "Unidades Móviles",
    tagline: "Espacios sobre remolque, listos para moverse contigo.",
    descripcion:
      "Unidades montadas sobre chasis de acero con ejes y tirón: se remolcan al sitio, se nivelan y quedan listas para operar. Hay modelos de línea para oficina, sanitarios, dormitorios, aulas, comedores y más.",
    render: "/renders/unidades-moviles.jpg",
    renderPie: "Render ilustrativo, basado en la ficha de la oficina de obra 8' × 24'",
    tarjeta: "/renders/unidades-moviles.jpg",
    caracteristicas: [
      { k: "Chasis", v: "Acero, con ejes y tirón" },
      { k: "Aislamiento", v: "Térmico y acústico R8" },
      { k: "Medidas", v: "De 2.44 × 6.10 m a 3.66 × 18.28 m" },
      { k: "Equipamiento", v: "Aire acondicionado, escritorio, contactos, voz y datos" },
    ],
    aplicaciones: ["Oficinas de obra", "Oficinas de ventas", "Dormitorios", "Aulas", "Comedores", "Sanitarios y regaderas", "Consultorios médicos", "Bodegas", "Casetas de vigilancia"],
  },
  {
    slug: "armabox",
    nombre: "Armabox®",
    tagline: "El módulo de acero que se arma donde lo necesitas.",
    descripcion:
      "Módulo de acero estructural que se transporta plegado y se arma en sitio en poco tiempo. Apilable y combinable para crear desde una caseta hasta un campamento completo.",
    cualidadesNota:
      "Paso 1: render ilustrativo basado en la fotografía del folleto · pasos 2 a 4: ilustraciones del folleto",
    render: "/renders/armabox-modulo.jpg",
    tarjeta: "/renders/armabox-modulo.jpg",
    renderPie: "Render ilustrativo, basado en las fotografías del folleto del sistema",
    diagrama: { src: "/folleto/composicion.jpg", pie: "Composición del módulo estándar · folleto del sistema" },
    cualidades: [
      { img: "/renders/armabox-empaque.jpg", titulo: "Llega empacado plano", texto: "Piso, techo, columnas y paneles se empacan planos y se cargan en contenedores." },
      { img: "/folleto/paso-1.jpg", titulo: "Suelo y columnas", texto: "Se coloca el bastidor de piso y se montan las columnas." },
      { img: "/folleto/paso-2.jpg", titulo: "Montar el techo", texto: "El bastidor de techo se iza y se fija sobre las columnas." },
      { img: "/folleto/paso-3.jpg", titulo: "Insertar los paneles de pared", texto: "Los paneles cierran el módulo. Todos los componentes se conectan con pernos, sin soldar ni pintar en sitio." },
    ],
    caracteristicas: [
      { k: "Medidas", v: "6055 × 2435 × 2896 mm" },
      { k: "Estructura", v: "Acero SGH340" },
      { k: "Transporte", v: "Se envía plegado, se arma en sitio" },
      { k: "Crecimiento", v: "Apilable y combinable por módulos" },
      { k: "Confort", v: "Aislamiento térmico y acústico" },
    ],
    aplicaciones: ["Dormitorios", "Baños", "Oficinas", "Aulas", "Clínicas", "Almacenes"],
  },
  {
    slug: "tradicional",
    nombre: "Tradicional",
    tagline: "El sistema que se arma en sitio, a la medida del proyecto.",
    descripcion:
      "Edificios prefabricados que se arman en sitio: estructura de acero, muros de panel y cubierta a dos aguas, de uno o dos niveles. Para proyectos que requieren un espacio fijo y a la medida.",
    img: "/fotos/tradicional/terminado-2.jpg",
    render: "/fotos/tradicional/terminado-3.jpg",
    video: { src: "/video/tradicional-armado.mp4", poster: "/video/tradicional-armado.jpg" },
    renderPie: "Fotografía de proyecto",
    tarjeta: "/renders/tradicional.jpg",
    caracteristicas: [
      { k: "Estructura", v: "Acero, se arma en sitio" },
      { k: "Muros", v: "Paneles prefabricados" },
      { k: "Cubierta", v: "Techo a dos aguas" },
      { k: "Niveles", v: "Uno o dos, con escalera exterior" },
    ],
    cualidades: [
      { img: "/fotos/tradicional/armado-1.jpg", titulo: "Se levanta la estructura", texto: "Marcos y armaduras de acero se montan sobre la base." },
      { img: "/fotos/tradicional/armado-2.jpg", titulo: "Se colocan los paneles", texto: "Los paneles de muro se insertan entre los perfiles de la estructura." },
      { img: "/fotos/tradicional/armado-3.jpg", titulo: "Se cierran los muros", texto: "El edificio se cierra bajo la armadura de la cubierta." },
      { img: "/fotos/tradicional/armado-4.jpg", titulo: "Muros y ventanas listos", texto: "Fachada terminada, con sus ventanas colocadas." },
    ],
    cualidadesNota: "Fotografías de obra",
    usos: [
      {
        nombre: "Aulas",
        fotos: [
          { img: "/fotos/tradicional/aulas-1.jpg", titulo: "Aulas de una planta en un plantel" },
          { img: "/fotos/tradicional/aulas-2.jpg", titulo: "Aula por dentro" },
          { img: "/fotos/tradicional/aulas-3.jpg", titulo: "Escuela de una planta" },
          { img: "/fotos/tradicional/aulas-4.jpg", titulo: "Aulas entre áreas verdes" },
        ],
      },
      {
        nombre: "Oficinas",
        fotos: [
          { img: "/fotos/tradicional/oficinas-1.jpg", titulo: "Oficina con ventana y aire acondicionado" },
          { img: "/fotos/tradicional/oficinas-2.jpg", titulo: "Oficina de trabajo" },
        ],
      },
      {
        nombre: "Planta libre y pasillos",
        fotos: [
          { img: "/fotos/tradicional/interior-1.jpg", titulo: "Planta libre, lista para distribuir" },
          { img: "/fotos/tradicional/interior-2.jpg", titulo: "Pasillo interior con accesos a cada espacio" },
        ],
      },
    ],
    galeria: [
      { img: "/fotos/tradicional/terminado-3.jpg", titulo: "Edificio de dos niveles" },
      { img: "/fotos/tradicional/terminado-4.jpg", titulo: "Escalera y pasillo exterior" },
      { img: "/fotos/tradicional/terminado-5.jpg", titulo: "Fachada con pasillo en planta alta" },
      { img: "/fotos/tradicional/terminado-6.jpg", titulo: "Fachada lateral" },
      { img: "/fotos/tradicional/terminado-2.jpg", titulo: "Vista lateral" },
    ],
    aplicaciones: ["Edificios de oficinas", "Naves", "Espacios a la medida"],
  },
  {
    slug: "zar",
    nombre: "ZAR",
    tagline: "Próximamente.",
    descripcion:
      "Estamos preparando la información de este sistema.",
    aplicaciones: [],
    pendiente: true,
  },
  {
    slug: "flotante",
    nombre: "Flotante",
    tagline: "Próximamente.",
    descripcion:
      "Estamos preparando la información de este sistema.",
    aplicaciones: [],
    pendiente: true,
  },
];

export const getSistema = (slug: string) =>
  sistemas.find((s) => s.slug === slug);
