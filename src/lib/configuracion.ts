/*
 * Puente entre lo que el visitante configura (configurador, modelos de Unidades Móviles,
 * distribuciones de Armabox) y el formulario de cotización: la última configuración se
 * guarda en la sesión del navegador y el formulario la muestra ya cargada.
 */

export type Configuracion = {
  origen: string; // dónde se armó: "Configurador", "Unidades Móviles", "Armabox®"
  sistema?: string; // slug del sistema
  detalle: string[]; // renglones legibles
};

const CLAVE = "modularte:configuracion";

export function guardarConfiguracion(c: Configuracion) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify(c));
  } catch {
    /* sin almacenamiento (modo privado): el formulario funciona igual */
  }
}

export function leerConfiguracion(): Configuracion | null {
  try {
    const t = sessionStorage.getItem(CLAVE);
    return t ? (JSON.parse(t) as Configuracion) : null;
  } catch {
    return null;
  }
}

export function borrarConfiguracion() {
  try {
    sessionStorage.removeItem(CLAVE);
  } catch {
    /* nada */
  }
}

export const textoConfiguracion = (c: Configuracion) => `[${c.origen}] ${c.detalle.join(" · ")}`;
