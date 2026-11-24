export type FotoSector = { img: string; titulo: string; categoria: string };

export type Espacio = {
  nombre: string;
  texto: string;
  img?: string; // foto real o recorte de ficha; sin imagen se muestran las medidas
  medidas?: string[];
  sistema: string; // slug del sistema con el que se resuelve
};

export type Sector = {
  slug: string;
  nombre: string;
  problema: string;
  solucion: string;
  mensaje: string; // idea principal del sector (estrategia de comunicación §5)
  accion: string; // texto del botón de cotización
  sistemas: string[]; // slugs de sistemas recomendados
  img: string; // foto del encabezado (vacía si no hay foto real del sector)
  tarjeta: string; // imagen de la tarjeta del sector en inicio y en Soluciones
  imgAlt: string;
  espacios: Espacio[];
  galeria: FotoSector[]; // fotografía real de obra; vacía si no hay material del sector
};

// Medidas de la línea de unidades móviles (fichas del fabricante, ver data/moviles.ts).
const M = {
  dormitorios: ["8' × 24'", "8' × 32'", "10' × 48'", "12' × 60'"],
  comedores: ["8' × 32'", "10' × 48'", "12' × 60'"],
  oficinas: ["8' × 20'", "8' × 24'", "8' × 32'", "8' × 44'", "10' × 48'", "12' × 60'"],
  ventas: ["8' × 32'", "12' × 60'"],
  aulas: ["8' × 32'", "10' × 48'", "12' × 60'"],
  sanitarios: ["Letrina 6' × 16'", "Mixtos 8' × 24'", "Mixtos 8' × 32'", "Regadera 8' × 32'"],
  consultorios: ["8' × 24'", "8' × 32'"],
  bodegas: ["8' × 32'"],
  casetas: ["4' × 8'", "5' × 5'", "8' × 8'"],
};

const F = (img: string, titulo: string, categoria: string): FotoSector => ({ img: `/fotos/sectores/${img}.jpg`, titulo, categoria });
const T = (img: string, titulo: string, categoria: string): FotoSector => ({ img: `/fotos/tradicional/${img}.jpg`, titulo, categoria });

// Soluciones por sector (vertical). Cada uno ataca sus keywords de SEO.
export const sectores: Sector[] = [
  {
    slug: "mineria",
    nombre: "Minería",
    problema: "Un campamento resistente y funcionando ya, en un lugar alejado y sin infraestructura.",
    solucion: "Módulos para dormitorios, comedores, oficinas y sanitarios, armados en sitio o sobre remolque.",
    mensaje: "Campamentos y espacios de operación listos para condiciones exigentes y a gran escala.",
    accion: "Cotiza tu campamento",
    sistemas: ["tradicional", "unidades-moviles", "armabox"],
    img: "/fotos/sectores/mineria-campamento-mina.jpg",
    tarjeta: "/fotos/sectores/mineria-campamento-1.jpg",
    imgAlt: "Campamento de Modularte junto a una mina a cielo abierto",
    espacios: [
      {
        nombre: "Edificios de dormitorios",
        texto: "Habitaciones de una o dos camas, o con literas y lockers, en edificios de uno o dos niveles.",
        img: "/fotos/sectores/dormitorio-literas-1.jpg",
        sistema: "tradicional",
      },
      {
        nombre: "Sanitarios y regaderas",
        texto: "Núcleos de baño con lavabos, sanitarios, regaderas y calentadores de agua.",
        img: "/fotos/sectores/sanitario-regadera.jpg",
        sistema: "tradicional",
      },
      {
        nombre: "Oficinas de campo",
        texto: "Oficinas sobre remolque que llegan listas al frente de trabajo.",
        img: "/moviles/oficina-8x32-exterior.jpg",
        sistema: "unidades-moviles",
      },
      { nombre: "Dormitorios móviles", texto: "Unidades sobre remolque para alojar al personal.", medidas: M.dormitorios, sistema: "unidades-moviles" },
      { nombre: "Comedores", texto: "Unidades sobre remolque para el servicio de alimentos.", medidas: M.comedores, sistema: "unidades-moviles" },
    ],
    galeria: [
      F("mineria-campamento-1", "Campamento al pie de la mina", "Campamento"),
      F("mineria-edificio-1", "Edificio de dos niveles", "Campamento"),
      F("mineria-calle", "Calle entre edificios", "Campamento"),
      F("mineria-castella", "Edificios de dos niveles y comedor", "Campamento"),
      F("dormitorio-1", "Habitación con dos camas", "Dormitorios"),
      F("mineria-campamento-2", "Vista general del campamento", "Campamento"),
      F("mineria-escaleras", "Escaleras y pasillos exteriores", "Campamento"),
      F("dormitorio-literas-2", "Habitación con literas y lockers", "Dormitorios"),
      F("mineria-edificio-2", "Edificio terminado", "Campamento"),
      F("sanitario-lavabo", "Lavabo", "Sanitarios"),
      F("mineria-conjunto", "Conjunto de edificios", "Campamento"),
      F("mineria-instalaciones", "Instalaciones junto a los edificios", "Campamento"),
      F("dormitorio-2", "Habitación con dos camas", "Dormitorios"),
      F("sanitario-calentadores", "Calentadores de agua", "Sanitarios"),
      F("mineria-explanada", "Edificios en explanada", "Campamento"),
    ],
  },
  {
    slug: "educacion",
    nombre: "Educación",
    problema: "Faltan aulas dignas y seguras, y no se puede esperar una obra larga.",
    solucion: "Aulas y escuelas completas armadas en sitio, ampliables conforme crece el plantel.",
    mensaje: "Aulas modulares seguras, listas para el próximo ciclo escolar.",
    accion: "Pide una propuesta para tu institución",
    sistemas: ["tradicional", "unidades-moviles"],
    img: "/fotos/tradicional/aulas-3.jpg",
    tarjeta: "/fotos/sectores/educacion-preescolar.jpg",
    imgAlt: "Escuela de una planta construida por Modularte",
    espacios: [
      { nombre: "Aulas", texto: "Salones con buena iluminación y ventilación, listos para amueblar.", img: "/fotos/tradicional/aulas-2.jpg", sistema: "tradicional" },
      { nombre: "Preescolar", texto: "Salones que se adaptan al mobiliario y material de los más pequeños.", img: "/fotos/sectores/educacion-preescolar.jpg", sistema: "tradicional" },
      { nombre: "Escuelas completas", texto: "Edificios de una planta con patio y plaza cívica.", img: "/fotos/sectores/educacion-plaza.jpg", sistema: "tradicional" },
      { nombre: "Ampliaciones", texto: "Nuevos edificios junto a los que ya existen en el plantel.", img: "/fotos/tradicional/aulas-1.jpg", sistema: "tradicional" },
      { nombre: "Aulas móviles", texto: "Unidades sobre remolque para necesidades temporales.", medidas: M.aulas, sistema: "unidades-moviles" },
    ],
    galeria: [
      T("aulas-3", "Escuela de una planta", "Escuelas"),
      F("educacion-preescolar", "Salón de preescolar", "Aulas"),
      F("educacion-plaza", "Edificio y plaza cívica", "Escuelas"),
      T("aulas-2", "Aula por dentro", "Aulas"),
      F("educacion-patio", "Edificio frente al patio", "Escuelas"),
      T("aulas-1", "Aulas junto a un edificio existente", "Escuelas"),
      T("aulas-4", "Aulas entre áreas verdes", "Escuelas"),
    ],
  },
  {
    slug: "salud",
    nombre: "Salud",
    problema: "Se necesita espacio clínico de forma urgente, sin esperar una construcción.",
    solucion: "Consultorios móviles y módulos que se acondicionan para atención y espera.",
    mensaje: "Unidades de salud modulares, higiénicas e instaladas rápido.",
    accion: "Habla con un especialista",
    sistemas: ["unidades-moviles", "armabox"],
    img: "",
    tarjeta: "/renders/unidades-moviles.jpg",
    imgAlt: "",
    espacios: [
      { nombre: "Consultorios médicos", texto: "Unidades sobre remolque para consulta.", medidas: M.consultorios, sistema: "unidades-moviles" },
      { nombre: "Sanitarios", texto: "Núcleos de baño sobre remolque con sanitarios, mingitorios y lavabos.", img: "/moviles/sanitarios-8x32-interior.jpg", sistema: "unidades-moviles" },
      { nombre: "Módulos Armabox®", texto: "Módulos de acero que se distribuyen como oficina o sala de reuniones.", img: "/renders/armabox-modulo.jpg", sistema: "armabox" },
    ],
    galeria: [],
  },
  {
    slug: "industria",
    nombre: "Industria",
    problema: "Oficinas de obra y espacios de apoyo que no frenen la operación.",
    solucion: "Oficinas, comedores, bodegas y casetas modulares, instalados por etapas.",
    mensaje: "Espacios industriales funcionales que mantienen tu operación en marcha.",
    accion: "Cotiza tu proyecto",
    sistemas: ["unidades-moviles", "tradicional", "armabox"],
    img: "",
    tarjeta: "/fotos/tradicional/armado-4.jpg",
    imgAlt: "",
    espacios: [
      { nombre: "Oficinas de obra", texto: "Desde un área abierta hasta privados, baño y área de trabajo.", img: "/moviles/oficina-12x60-interior.jpg", medidas: M.oficinas, sistema: "unidades-moviles" },
      { nombre: "Edificios armados en sitio", texto: "Oficinas y naves de uno o dos niveles con estructura de acero.", img: "/fotos/tradicional/armado-4.jpg", sistema: "tradicional" },
      { nombre: "Sanitarios", texto: "Núcleos de baño sobre remolque para el personal.", img: "/moviles/sanitarios-8x32-exterior.jpg", sistema: "unidades-moviles" },
      { nombre: "Comedores", texto: "Unidades sobre remolque para el servicio de alimentos.", medidas: M.comedores, sistema: "unidades-moviles" },
      { nombre: "Bodegas", texto: "Unidades sobre remolque para guardar material y herramienta.", medidas: M.bodegas, sistema: "unidades-moviles" },
      { nombre: "Casetas de vigilancia", texto: "Casetas para accesos y control.", medidas: M.casetas, sistema: "unidades-moviles" },
    ],
    galeria: [],
  },
  {
    slug: "oficinas",
    nombre: "Oficinas",
    problema: "Oficinas que deben crecer o moverse al ritmo del equipo.",
    solucion: "Oficinas modulares ampliables, del número de personas al espacio exacto.",
    mensaje: "Oficinas modulares que crecen con tu equipo.",
    accion: "Cotiza tus oficinas",
    sistemas: ["tradicional", "armabox", "unidades-moviles"],
    img: "/fotos/sectores/oficinas-trabajo-1.jpg",
    tarjeta: "/fotos/sectores/oficinas-cubiculos-1.jpg",
    imgAlt: "Oficinas por dentro de un edificio de Modularte",
    espacios: [
      { nombre: "Áreas de trabajo", texto: "Plantas con cubículos, privados y salas.", img: "/fotos/sectores/oficinas-cubiculos-1.jpg", sistema: "tradicional" },
      { nombre: "Recepción y atención", texto: "Mostradores y áreas de espera a la entrada.", img: "/fotos/sectores/oficinas-recepcion.jpg", sistema: "tradicional" },
      { nombre: "Edificios de oficinas", texto: "Edificios completos de una planta.", img: "/fotos/sectores/oficinas-edificio-1.jpg", sistema: "tradicional" },
      { nombre: "Oficinas Armabox®", texto: "Módulos para oficina individual, cuatro escritorios o sala de reuniones.", img: "/renders/armabox-modulo.jpg", sistema: "armabox" },
      { nombre: "Oficinas móviles y de ventas", texto: "Unidades sobre remolque listas para usarse.", img: "/moviles/oficina-10x48-interior.jpg", medidas: M.ventas, sistema: "unidades-moviles" },
    ],
    galeria: [
      F("oficinas-trabajo-1", "Área de trabajo", "Interiores"),
      F("oficinas-edificio-1", "Edificio de oficinas de una planta", "Edificios"),
      F("oficinas-cubiculos-1", "Cubículos", "Interiores"),
      F("oficinas-recepcion", "Recepción", "Interiores"),
      F("oficinas-edificio-2", "Edificio de oficinas", "Edificios"),
      F("oficinas-direccion", "Oficina privada", "Interiores"),
      F("oficinas-trabajo-2", "Área de trabajo con privados", "Interiores"),
      F("oficinas-edificio-3", "Edificio entre áreas verdes", "Edificios"),
      F("oficinas-cubiculos-2", "Cubículos y privados", "Interiores"),
      T("oficinas-1", "Oficina con ventana y aire acondicionado", "Interiores"),
      T("interior-1", "Planta libre, lista para distribuir", "Interiores"),
    ],
  },
];

export const getSector = (slug: string) => sectores.find((s) => s.slug === slug);
