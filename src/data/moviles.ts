/*
 * Unidades Móviles: modelos de línea.
 * Fuente: fichas de producto entregadas por el cliente (fabricante que maquila para
 * Modularte; su marca no se muestra). Imágenes recortadas de esas fichas.
 */

export type ModeloMovil = {
  id: string;
  grupo: "Oficinas de obra" | "Sanitarios";
  nombre: string;
  pies: string;
  metros: string;
  eje: string;
  distribucion: string;
  extras?: string[]; // equipamiento adicional de ese modelo
};

export const modelosMoviles: ModeloMovil[] = [
  { id: "oficina-8x20-abierta", grupo: "Oficinas de obra", nombre: "8' × 20' área abierta", pies: "8' × 20'", metros: "2.44 × 6.10 m", eje: "Eje sencillo", distribucion: "Un solo espacio de trabajo, sin baño." },
  { id: "oficina-8x20", grupo: "Oficinas de obra", nombre: "8' × 20'", pies: "8' × 20'", metros: "2.44 × 6.10 m", eje: "Eje sencillo", distribucion: "Área de trabajo y baño." },
  { id: "oficina-8x24-abierta", grupo: "Oficinas de obra", nombre: "8' × 24' área abierta", pies: "8' × 24'", metros: "2.44 × 7.31 m", eje: "Eje sencillo", distribucion: "Un solo espacio de trabajo, sin baño." },
  { id: "oficina-8x24", grupo: "Oficinas de obra", nombre: "8' × 24'", pies: "8' × 24'", metros: "2.44 × 7.31 m", eje: "Eje sencillo", distribucion: "Área de trabajo y baño." },
  { id: "oficina-8x32", grupo: "Oficinas de obra", nombre: "8' × 32'", pies: "8' × 32'", metros: "2.44 × 9.75 m", eje: "Eje sencillo", distribucion: "Privado, baño y área de trabajo." },
  { id: "oficina-8x44", grupo: "Oficinas de obra", nombre: "8' × 44'", pies: "8' × 44'", metros: "2.44 × 13.41 m", eje: "Eje doble", distribucion: "Dos privados, baño y área de trabajo central." },
  { id: "oficina-10x48", grupo: "Oficinas de obra", nombre: "10' × 48'", pies: "10' × 48'", metros: "3.05 × 14.63 m", eje: "Eje doble · tirón desmontable", distribucion: "Dos privados, baño y área de trabajo central.", extras: ["Barra de café", "Site / clóset"] },
  { id: "oficina-12x60", grupo: "Oficinas de obra", nombre: "12' × 60'", pies: "12' × 60'", metros: "3.66 × 18.28 m", eje: "Eje triple · tirón desmontable", distribucion: "Dos privados, baño y área de trabajo central.", extras: ["Cocineta con tarja tipo bar", "Site / clóset"] },
  { id: "sanitarios-8x32", grupo: "Sanitarios", nombre: "Sanitarios mixtos 8' × 32'", pies: "8' × 32'", metros: "2.44 × 9.75 m", eje: "Eje doble", distribucion: "Dos núcleos separados con sanitarios, mingitorios y lavabos." },
];

// Especificaciones comunes a la línea, tal como vienen en las fichas
export const especificacionesMoviles: [string, string[]][] = [
  ["Chasis", ["Estructura de acero a base de viga IPR", "Tirón con sistema de nivelación", "Ejes con rin tipo artillería"]],
  ["Aislamiento", ["Térmico y acústico R8 en paredes y techo"]],
  ["Puertas y ventanas", ["Ventanas de aluminio natural, selladas", "Puerta exterior con marco de aluminio natural", "Puertas interiores de tambor con chapa"]],
  ["Acabados", ["Muro interior con panel de vinil", "Muro exterior con lámina pintro", "Piso en loseta vinílica", "Techo interior en panel de yeso", "Lámina de techo sellada, calibre 28"]],
];

export const equipamientoOficina = [
  "Aire acondicionado frío / calor tipo minisplit",
  "Escritorio de melamina",
  "Persianas",
  "Contactos 110 V",
  "Salida de voz y datos",
  "Escalera de acceso y soportes",
];
export const equipamientoBano = ["Sanitario", "Lavabo", "Extractor", "Espejo", "Jabonera", "Portarrollos", "Despachador de toallas"];
export const equipamientoSanitarios = [
  "Aires acondicionados tipo minisplit",
  "Contactos 110 V",
  "Mamparas de MDF con perfilería de aluminio",
  "Mingitorios, sanitarios y lavabos",
  "Extractor, espejos, jaboneras, portarrollos y despachador de toallas",
  "Escalera de acceso y soportes",
];

// Línea completa de modelos por uso (medidas en pies, como las maneja el fabricante)
export const lineaMoviles: { uso: string; medidas: string[] }[] = [
  { uso: "Oficinas móviles", medidas: ["8'×20'", "8'×24'", "8'×32'", "8'×44'", "10'×48'", "12'×60'"] },
  { uso: "Oficinas de ventas", medidas: ["8'×32'", "12'×60'"] },
  { uso: "Dormitorios", medidas: ["8'×24'", "8'×32'", "10'×48'", "12'×60'"] },
  { uso: "Aulas", medidas: ["8'×32'", "10'×48'", "12'×60'"] },
  { uso: "Comedores", medidas: ["8'×32'", "10'×48'", "12'×60'"] },
  { uso: "Sanitarios y regaderas", medidas: ["Letrina 6'×16'", "Sanitarios mixtos 8'×24'", "Sanitarios mixtos 8'×32'", "Regadera 8'×32'"] },
  { uso: "Consultorios médicos", medidas: ["8'×24'", "8'×32'"] },
  { uso: "Bodegas", medidas: ["8'×32'"] },
  { uso: "Casetas de vigilancia", medidas: ["4'×8'", "5'×5'", "8'×8'"] },
];
