export type Categoria = "Edificios" | "Armado en sitio" | "Aulas" | "Interiores";

export type Proyecto = {
  img: string;
  titulo: string;
  categoria: Categoria;
};

// Fotografía original de proyectos, entregada por el cliente (carpeta Fotos de Drive).
// Los pies describen lo que se ve; sin datos de obra no confirmados.
export const proyectos: Proyecto[] = [
  { img: "/fotos/tradicional/terminado-1.jpg", titulo: "Edificio de dos niveles", categoria: "Edificios" },
  { img: "/fotos/tradicional/armado-2.jpg", titulo: "Colocación de paneles", categoria: "Armado en sitio" },
  { img: "/fotos/tradicional/aulas-1.jpg", titulo: "Aulas de una planta en un plantel", categoria: "Aulas" },
  { img: "/fotos/tradicional/terminado-4.jpg", titulo: "Escalera y pasillo exterior", categoria: "Edificios" },
  { img: "/fotos/tradicional/interior-1.jpg", titulo: "Planta libre, lista para distribuir", categoria: "Interiores" },
  { img: "/fotos/tradicional/armado-1.jpg", titulo: "Estructura de acero levantada", categoria: "Armado en sitio" },
  { img: "/fotos/tradicional/terminado-3.jpg", titulo: "Fachada con acceso al segundo nivel", categoria: "Edificios" },
  { img: "/fotos/tradicional/aulas-2.jpg", titulo: "Aula por dentro", categoria: "Aulas" },
  { img: "/fotos/tradicional/terminado-5.jpg", titulo: "Fachada con pasillo en planta alta", categoria: "Edificios" },
  { img: "/fotos/tradicional/armado-3.jpg", titulo: "Muros cerrándose bajo la cubierta", categoria: "Armado en sitio" },
  { img: "/fotos/tradicional/aulas-3.jpg", titulo: "Escuela de una planta", categoria: "Aulas" },
  { img: "/fotos/tradicional/oficinas-1.jpg", titulo: "Oficina con ventana y aire acondicionado", categoria: "Interiores" },
  { img: "/fotos/tradicional/terminado-2.jpg", titulo: "Edificio de dos niveles, vista lateral", categoria: "Edificios" },
  { img: "/fotos/tradicional/armado-4.jpg", titulo: "Muros y ventanas terminados", categoria: "Armado en sitio" },
  { img: "/fotos/tradicional/aulas-4.jpg", titulo: "Aulas entre áreas verdes", categoria: "Aulas" },
  { img: "/fotos/tradicional/interior-2.jpg", titulo: "Pasillo interior", categoria: "Interiores" },
  { img: "/fotos/tradicional/terminado-6.jpg", titulo: "Fachada lateral", categoria: "Edificios" },
  { img: "/fotos/tradicional/oficinas-2.jpg", titulo: "Oficina de trabajo", categoria: "Interiores" },
];
