export type Proyecto = {
  img: string;
  titulo: string;
  sector: string;
};

// Proyectos con el banco de fotos tratadas (tratamiento dorado del branding).
export const proyectos: Proyecto[] = [
  { img: "/fotos/modulos-exterior.jpg", titulo: "Campamento modular de dos niveles", sector: "Minería" },
  { img: "/fotos/oficinas-obra.jpg", titulo: "Oficinas de obra", sector: "Industria" },
  { img: "/fotos/escuela.jpg", titulo: "Aulas prefabricadas", sector: "Educación" },
  { img: "/fotos/oficina-interior.jpg", titulo: "Oficinas modulares", sector: "Oficinas" },
  { img: "/fotos/campamento.jpg", titulo: "Campamento de trabajadores", sector: "Minería" },
  { img: "/fotos/patio.jpg", titulo: "Áreas comunes y circulaciones", sector: "Industria" },
];
