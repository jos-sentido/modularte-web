/*
 * Distribuciones recomendadas del sistema Armabox®.
 * Fuente: folleto «Sistema Modular Arma BOX 2026» del cliente, sección
 * «Distribuciones recomendadas» (Alojamiento y Oficina). Las medidas del módulo
 * son las del folleto (6055 × 2435 × 2896 mm). El mobiliario es ilustrativo.
 */

export const MOD = { L: 6.055, W: 2.435, H: 2.896 };

export type Tipo =
  | "cama"
  | "cama-matrimonial"
  | "locker"
  | "buro"
  | "escritorio"
  | "puesto"
  | "silla"
  | "silla-sala"
  | "sofa"
  | "mesa-centro"
  | "tv"
  | "archivero"
  | "bano"
  | "mesa-juntas"
  | "divisor"
  | "muro"
  | "muro-largo"
  | "muro-ciego"
  | "wc"
  | "lavabo";

// [tipo, x, z, giro en grados] · x a lo largo del módulo, z a lo ancho (metros, centro del mueble)
export type Mueble = [Tipo, number, number, number];

export type Distribucion = {
  id: string;
  grupo: string;
  nombre: string;
  resumen: string;
  modulos: 1 | 3;
  muebles: Mueble[];
  dim?: { L: number; W: number; H: number }; // si no es el módulo Armabox
  casco?: "movil"; // unidad sobre remolque
  ejes?: 1 | 2 | 3;
  medida?: string;
};

const sala = (): Mueble[] => {
  const m: Mueble[] = [["mesa-juntas", 3.03, 3.65, 0]];
  for (let i = 0; i < 9; i++) {
    const x = 1.22 + i * 0.45;
    m.push(["silla-sala", x, 2.4, 0], ["silla-sala", x, 4.9, 180]);
  }
  m.push(["silla-sala", 0.45, 3.3, 90], ["silla-sala", 0.45, 4.0, 90]);
  m.push(["silla-sala", 5.6, 3.3, 270], ["silla-sala", 5.6, 4.0, 270]);
  return m;
};

const compartido = (): Mueble[] => {
  const m: Mueble[] = [];
  for (const x of [1.25, 3.0, 4.75])
    for (const z of [1.5, 3.75, 6.0]) m.push(["puesto", x, z, 180], ["silla", x, z - 0.72, 0], ["divisor", x + 0.78, z - 0.3, 0]);
  return m;
};

export const distribuciones: Distribucion[] = [
  {
    id: "dormitorio-doble",
    grupo: "Alojamiento",
    nombre: "Dormitorio doble",
    resumen: "Dos camas individuales, guardado y escritorio.",
    modulos: 1,
    muebles: [
      ["cama", 1.2, 0.62, 0],
      ["locker", 2.75, 0.4, 0],
      ["cama", 4.7, 0.62, 0],
      ["escritorio", 1.0, 1.98, 180],
      ["silla", 1.0, 1.42, 0],
    ],
  },
  {
    id: "dormitorio-con-bano",
    grupo: "Alojamiento",
    nombre: "Dormitorio con baño",
    resumen: "Una cama, escritorio y baño completo dentro del módulo.",
    modulos: 1,
    muebles: [
      ["bano", 0, 0, 0],
      ["locker", 2.08, 0.4, 0],
      ["escritorio", 3.15, 0.45, 0],
      ["silla", 3.15, 1.02, 180],
      ["cama", 4.85, 0.62, 0],
    ],
  },
  {
    id: "dormitorio-doble-con-bano",
    grupo: "Alojamiento",
    nombre: "Dormitorio doble con baño",
    resumen: "Dos camas individuales y baño completo.",
    modulos: 1,
    muebles: [
      ["bano", 0, 0, 0],
      ["cama", 2.75, 0.62, 0],
      ["cama", 4.9, 0.62, 0],
    ],
  },
  {
    id: "suite",
    grupo: "Alojamiento",
    nombre: "Habitación con sala",
    resumen: "Cama matrimonial, guardado y sala con sofá.",
    modulos: 1,
    muebles: [
      ["cama-matrimonial", 1.2, 0.97, 0],
      ["buro", 2.45, 0.38, 0],
      ["locker", 3.2, 0.4, 0],
      ["sofa", 4.8, 0.56, 0],
      ["mesa-centro", 4.8, 1.45, 0],
      ["tv", 4.8, 2.27, 180],
    ],
  },
  {
    id: "oficina-individual",
    grupo: "Oficina",
    nombre: "Oficina individual",
    resumen: "Un escritorio de dirección y sala de espera.",
    modulos: 1,
    muebles: [
      ["puesto", 1.55, 1.2, 270],
      ["silla", 0.85, 1.2, 90],
      ["silla-sala", 2.3, 1.2, 270],
      ["sofa", 4.5, 0.56, 0],
      ["mesa-centro", 4.5, 1.45, 0],
    ],
  },
  {
    id: "oficina-4",
    grupo: "Oficina",
    nombre: "Oficina de 4 escritorios",
    resumen: "Cuatro puestos de trabajo en un solo módulo.",
    modulos: 1,
    muebles: [
      ...[0.95, 2.25, 3.75, 5.05].flatMap((x): Mueble[] => [
        ["puesto", x, 0.48, 0],
        ["silla", x, 1.12, 180],
      ]),
      ["archivero", 5.5, 2.1, 180],
    ],
  },
  {
    id: "coworking",
    grupo: "Oficina",
    nombre: "Espacio de trabajo compartido",
    resumen: "Tres módulos unidos, sin muros intermedios, con nueve puestos.",
    modulos: 3,
    muebles: compartido(),
  },
  {
    id: "sala-juntas",
    grupo: "Oficina",
    nombre: "Sala de reuniones",
    resumen: "Tres módulos unidos para una mesa de 22 personas.",
    modulos: 3,
    muebles: sala(),
  },
];

/*
 * Unidades Móviles: distribución de cada modelo de línea, tomada de la planta de su
 * ficha. Largo y ancho son los de la ficha; la altura no viene en las fichas y se
 * dibuja con una altura de referencia. El mobiliario es ilustrativo.
 */
const ALTO_MOVIL = 2.75;
// puestos contra el muro del fondo; la circulación y las puertas van del lado del acceso
const oficina = (W: number, xs: number[]): Mueble[] =>
  xs.flatMap((x): Mueble[] => [
    ["puesto", x, W - 0.47, 180],
    ["silla", x, W - 1.15, 0],
  ]);
const bano = (W: number, x0: number): Mueble[] => [
  ["muro-largo", x0 + 1.25, W - 1.3, 0],
  ["wc", x0 + 1.9, W - 0.45, 180],
  ["lavabo", x0 + 0.65, W - 0.4, 180],
];
const movil = (
  id: string,
  nombre: string,
  L: number,
  W: number,
  ejes: 1 | 2 | 3,
  resumen: string,
  muebles: Mueble[],
): Distribucion => ({
  id,
  grupo: "Unidades Móviles",
  nombre,
  resumen,
  modulos: 1,
  muebles,
  dim: { L, W, H: ALTO_MOVIL },
  casco: "movil",
  ejes,
  medida: `${W.toFixed(2)} × ${L.toFixed(2)} m`,
});

export const distribucionesMoviles: Distribucion[] = [
  movil("oficina-8x20-abierta", "8' × 20' área abierta", 6.1, 2.44, 1, "Un solo espacio de trabajo.", [...oficina(2.44, [1.3, 2.7, 4.1]), ["archivero", 5.5, 2.2, 180]]),
  movil("oficina-8x20", "8' × 20'", 6.1, 2.44, 1, "Área de trabajo y baño.", [["muro", 1.4, 0, 0], ["wc", 0.6, 1.99, 180], ["lavabo", 0.45, 1.25, 90], ...oficina(2.44, [2.4, 3.7, 5.0])]),
  movil("oficina-8x24-abierta", "8' × 24' área abierta", 7.31, 2.44, 1, "Un solo espacio de trabajo.", oficina(2.44, [1.3, 2.8, 4.3, 5.8])),
  movil("oficina-8x24", "8' × 24'", 7.31, 2.44, 1, "Área de trabajo y baño.", [["muro", 1.4, 0, 0], ["wc", 0.6, 1.99, 180], ["lavabo", 0.45, 1.25, 90], ...oficina(2.44, [2.5, 3.9, 5.3]), ["archivero", 6.7, 2.2, 180]]),
  movil("oficina-8x32", "8' × 32'", 9.75, 2.44, 1, "Privado, baño y área de trabajo.", [
    ...oficina(2.44, [1.3]),
    ["muro", 2.6, 0, 0],
    ...bano(2.44, 2.6),
    ["muro", 5.1, 0, 0],
    ...oficina(2.44, [6.2, 7.5, 8.8]),
  ]),
  movil("oficina-8x44", "8' × 44'", 13.41, 2.44, 2, "Dos privados, baño y área de trabajo central.", [
    ...oficina(2.44, [1.3]),
    ["muro", 2.6, 0, 0],
    ...bano(2.44, 2.6),
    ["muro", 5.1, 0, 0],
    ...oficina(2.44, [6.3, 7.6, 8.9, 10.2]),
    ["muro", 11.0, 0, 0],
    ...oficina(2.44, [12.2]),
  ]),
  movil("oficina-10x48", "10' × 48'", 14.63, 3.05, 2, "Dos privados, baño y área de trabajo central.", [
    ...oficina(3.05, [1.4]),
    ["muro", 2.8, 0, 0],
    ...bano(3.05, 2.8),
    ["muro", 5.3, 0, 0],
    ...oficina(3.05, [6.5, 7.9, 9.3, 10.7]),
    ["muro", 11.9, 0, 0],
    ...oficina(3.05, [13.2]),
  ]),
  movil("oficina-12x60", "12' × 60'", 18.28, 3.66, 3, "Dos privados, baño y área de trabajo central.", [
    ...oficina(3.66, [1.6]),
    ["muro", 3.2, 0, 0],
    ...bano(3.66, 3.2),
    ["muro", 5.7, 0, 0],
    ...oficina(3.66, [7.0, 8.5, 10.0, 11.5, 13.0]),
    ["muro", 14.6, 0, 0],
    ...oficina(3.66, [15.9, 17.2]),
  ]),
  movil("sanitarios-8x32", "Sanitarios mixtos 8' × 32'", 9.75, 2.44, 2, "Dos núcleos separados.", [
    ...[1.0, 2.0, 3.0, 5.9, 6.9, 7.9].map((x): Mueble => ["wc", x, 1.99, 180]),
    ...[1.5, 2.5, 6.4, 7.4].map((x): Mueble => ["divisor", x, 1.7, 0]),
    ["lavabo", 4.2, 2.04, 180],
    ["lavabo", 9.1, 2.04, 180],
    ["muro-ciego", 4.88, 0, 0],
  ]),
];
