/*
 * Mobiliario modelado para el explorador 3D: cada pieza se arma con geometría
 * redondeada y materiales propios (madera, tela, metal, loza), mirando hacia +z.
 */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { Tipo } from "@/data/distribuciones";

function lienzo(pintar: (g: CanvasRenderingContext2D) => void, rx = 1, ry = 1) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  pintar(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rx, ry);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function materiales() {
  const veta = lienzo((g) => {
    g.fillStyle = "#c9a878";
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 70; i++) {
      g.strokeStyle = `rgba(${90 + (i % 5) * 8},${60 + (i % 7) * 4},30,${0.06 + (i % 4) * 0.03})`;
      g.lineWidth = 1 + (i % 3);
      g.beginPath();
      const y = (i * 37) % 256;
      g.moveTo(0, y);
      g.bezierCurveTo(80, y + ((i % 5) - 2) * 3, 170, y - ((i % 3) - 1) * 4, 256, y + ((i % 4) - 2) * 2);
      g.stroke();
    }
  }, 2, 1);
  const tejido = (base: string) =>
    lienzo((g) => {
      g.fillStyle = base;
      g.fillRect(0, 0, 256, 256);
      for (let y = 0; y < 256; y += 4)
        for (let x = 0; x < 256; x += 4) {
          g.fillStyle = (x + y) % 8 === 0 ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
          g.fillRect(x, y, 2, 2);
        }
    }, 6, 6);
  const m = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p);
  return {
    madera: m({ map: veta, roughness: 0.55 }),
    sabana: m({ map: tejido("#f4f3ef"), roughness: 0.95 }),
    colcha: m({ map: tejido("#b53c3c"), roughness: 0.9 }),
    tela: m({ map: tejido("#3a3d43"), roughness: 0.92 }),
    telaClara: m({ map: tejido("#c9ccd0"), roughness: 0.92 }),
    cuero: m({ color: 0x7c4f33, roughness: 0.5 }),
    metal: m({ color: 0xc8ccd1, roughness: 0.25, metalness: 0.9 }),
    negro: m({ color: 0x1d1e21, roughness: 0.45, metalness: 0.2 }),
    laca: m({ color: 0xeceeef, roughness: 0.4 }),
    loza: m({ color: 0xffffff, roughness: 0.12 }),
    pantalla: m({ color: 0x0c0e12, roughness: 0.15, metalness: 0.4 }),
    cristal: new THREE.MeshPhysicalMaterial({ color: 0xd6e9f2, transparent: true, opacity: 0.28, roughness: 0.03 }),
    muro: m({ color: 0xf1f1ee, roughness: 0.8, side: THREE.DoubleSide }),
  };
}
export type Mats = ReturnType<typeof materiales>;

export function crearMueble(tipo: Tipo, M: Mats, ancho = 2.435): THREE.Group {
  const g = new THREE.Group();
  const caja = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material, r = 0.02) => {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2.1, h / 2.1, d / 2.1)), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  };
  const cil = (r: number, h: number, x: number, y: number, z: number, mat: THREE.Material, r2 = r) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r2, r, h, 28), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  };
  const patas = (w: number, d: number, h: number, mat: THREE.Material, grosor = 0.035) => {
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) caja(grosor, h, grosor, sx * (w / 2 - 0.05), h / 2, sz * (d / 2 - 0.05), mat, 0.008);
  };

  const cama = (ancho: number) => {
    caja(2.04, 0.2, ancho + 0.06, 0, 0.22, 0, M.madera, 0.025);
    patas(1.96, ancho, 0.14, M.madera, 0.06);
    caja(0.06, 0.82, ancho + 0.06, -1.02, 0.5, 0, M.madera, 0.02);
    caja(1.96, 0.2, ancho, 0.01, 0.42, 0, M.sabana, 0.07);
    caja(1.32, 0.07, ancho + 0.04, 0.34, 0.54, 0, M.colcha, 0.03);
    caja(0.2, 0.075, ancho + 0.04, -0.4, 0.545, 0, M.sabana, 0.03);
    const n = ancho > 1.2 ? 2 : 1;
    for (let i = 0; i < n; i++) {
      const z = n === 1 ? 0 : (i - 0.5) * (ancho / 2);
      caja(0.38, 0.13, ancho / n - 0.16, -0.74, 0.585, z, M.sabana, 0.06);
    }
  };
  const escritorio = (w: number, d: number) => {
    caja(w, 0.03, d, 0, 0.735, 0, M.madera, 0.012);
    patas(w, d, 0.72, M.negro);
    caja(w - 0.14, 0.3, 0.018, 0, 0.5, -d / 2 + 0.05, M.negro, 0.005);
  };
  const silla = () => {
    caja(0.46, 0.07, 0.45, 0, 0.47, 0.02, M.tela, 0.03);
    const resp = caja(0.43, 0.5, 0.055, 0, 0.8, -0.2, M.tela, 0.025);
    resp.rotation.x = -0.1;
    cil(0.025, 0.34, 0, 0.27, 0, M.metal);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const brazo = caja(0.28, 0.03, 0.045, Math.cos(a) * 0.14, 0.09, Math.sin(a) * 0.14, M.negro, 0.01);
      brazo.rotation.y = -a;
      const rueda = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), M.negro);
      rueda.position.set(Math.cos(a) * 0.27, 0.03, Math.sin(a) * 0.27);
      g.add(rueda);
    }
  };

  // hoja de puerta de tambor, entreabierta, con chapa
  const hoja = (x: number, z: number, anchoHoja: number, eje: "x" | "z", giro: number) => {
    const pivote = new THREE.Group();
    pivote.position.set(x, 0, z);
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(eje === "x" ? anchoHoja : 0.04, 2.02, eje === "x" ? 0.04 : anchoHoja, 2, 0.01),
      M.madera,
    );
    mesh.position.set(eje === "x" ? -anchoHoja / 2 : 0, 1.02, eje === "z" ? -anchoHoja / 2 : 0);
    mesh.castShadow = mesh.receiveShadow = true;
    const chapa = new THREE.Mesh(new THREE.SphereGeometry(0.035, 14, 14), M.metal);
    chapa.position.set(eje === "x" ? -anchoHoja + 0.08 : 0.05, 1.0, eje === "z" ? -anchoHoja + 0.08 : -0.05);
    pivote.add(mesh, chapa);
    pivote.rotation.y = giro;
    g.add(pivote);
  };

  switch (tipo) {
    case "cama":
      cama(0.9);
      break;
    case "cama-matrimonial":
      cama(1.6);
      break;
    case "locker": {
      caja(0.9, 1.9, 0.5, 0, 0.95, 0, M.laca, 0.012);
      caja(0.006, 1.84, 0.006, 0, 0.95, 0.251, M.negro, 0.002);
      for (const x of [-0.06, 0.06]) caja(0.014, 0.16, 0.02, x, 1.0, 0.262, M.metal, 0.005);
      caja(0.86, 0.06, 0.46, 0, 0.03, 0, M.negro, 0.005);
      break;
    }
    case "buro":
      caja(0.46, 0.46, 0.4, 0, 0.27, 0, M.madera, 0.015);
      caja(0.4, 0.004, 0.006, 0, 0.3, 0.202, M.negro, 0.001);
      cil(0.07, 0.02, 0, 0.51, 0, M.metal);
      cil(0.09, 0.2, 0, 0.72, 0, M.sabana, 0.06);
      cil(0.008, 0.2, 0, 0.6, 0, M.metal);
      break;
    case "escritorio":
      escritorio(1.2, 0.6);
      break;
    case "puesto": {
      escritorio(1.25, 0.68);
      cil(0.09, 0.012, 0, 0.756, -0.2, M.negro);
      cil(0.014, 0.16, 0, 0.83, -0.2, M.negro);
      caja(0.54, 0.32, 0.022, 0, 1.03, -0.2, M.pantalla, 0.008);
      caja(0.38, 0.014, 0.13, 0, 0.757, 0.08, M.negro, 0.005);
      caja(0.06, 0.02, 0.1, 0.3, 0.76, 0.08, M.negro, 0.01);
      break;
    }
    case "silla":
      silla();
      break;
    case "silla-sala": {
      caja(0.42, 0.07, 0.42, 0, 0.46, 0, M.telaClara, 0.03);
      const r = caja(0.4, 0.4, 0.05, 0, 0.74, -0.19, M.telaClara, 0.025);
      r.rotation.x = -0.12;
      patas(0.42, 0.42, 0.43, M.metal, 0.022);
      break;
    }
    case "sofa": {
      const w = 1.7;
      caja(w, 0.2, 0.82, 0, 0.22, 0, M.cuero, 0.05);
      for (const s of [-1, 1]) {
        caja(w / 2 - 0.16, 0.15, 0.6, s * (w / 4 - 0.07), 0.39, 0.07, M.cuero, 0.06);
        caja(w / 2 - 0.16, 0.36, 0.16, s * (w / 4 - 0.07), 0.62, -0.2, M.cuero, 0.07);
        caja(0.16, 0.44, 0.82, s * (w / 2 - 0.08), 0.42, 0, M.cuero, 0.06);
      }
      caja(w, 0.5, 0.14, 0, 0.5, -0.34, M.cuero, 0.05);
      patas(w, 0.82, 0.12, M.negro, 0.04);
      break;
    }
    case "mesa-centro":
      caja(0.9, 0.035, 0.5, 0, 0.4, 0, M.madera, 0.012);
      patas(0.9, 0.5, 0.39, M.negro, 0.025);
      caja(0.8, 0.02, 0.4, 0, 0.14, 0, M.madera, 0.008);
      break;
    case "tv":
      caja(1.15, 0.66, 0.035, 0, 1.4, 0, M.pantalla, 0.012);
      caja(1.3, 0.04, 0.3, 0, 0.5, 0.15, M.madera, 0.01);
      caja(1.3, 0.46, 0.28, 0, 0.25, 0.15, M.laca, 0.012);
      break;
    case "archivero":
      caja(0.8, 1.2, 0.42, 0, 0.6, 0, M.laca, 0.012);
      for (const y of [0.3, 0.6, 0.9]) {
        caja(0.76, 0.005, 0.006, 0, y + 0.14, 0.212, M.negro, 0.001);
        caja(0.14, 0.014, 0.02, 0, y, 0.222, M.metal, 0.005);
      }
      break;
    case "divisor":
      caja(0.04, 1.15, 1.45, 0, 0.6, 0, M.telaClara, 0.012);
      break;
    case "mesa-juntas": {
      const tapa = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.045, 64), M.madera);
      tapa.scale.set(4.3, 1, 1.7);
      tapa.position.y = 0.735;
      tapa.castShadow = tapa.receiveShadow = true;
      g.add(tapa);
      for (const x of [-1.2, 1.2]) {
        caja(0.5, 0.68, 0.5, x, 0.36, 0, M.negro, 0.03);
        caja(0.9, 0.04, 0.8, x, 0.02, 0, M.negro, 0.01);
      }
      caja(2.6, 0.012, 0.3, 0, 0.765, 0, M.negro, 0.004);
      break;
    }
    case "muro": {
      // muro transversal con puerta del lado del acceso
      const vano = 1.05;
      const m1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, ancho - vano - 0.1), M.muro);
      m1.position.set(0, 1.2, vano + (ancho - vano - 0.1) / 2);
      const m2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.36, vano - 0.1), M.muro);
      m2.position.set(0, 2.22, 0.1 + (vano - 0.1) / 2);
      for (const m of [m1, m2]) {
        m.castShadow = m.receiveShadow = true;
        g.add(m);
      }
      hoja(0, vano, 0.88, "z", -1.2);
      break;
    }
    case "muro-ciego": {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, ancho - 0.2), M.muro);
      m.position.set(0, 1.2, ancho / 2);
      m.castShadow = m.receiveShadow = true;
      g.add(m);
      break;
    }
    case "muro-largo": {
      // muro a lo largo (baño) con su puerta hacia la circulación
      const tramos: [number, number][] = [
        [-1.25, -1.1],
        [-0.22, 1.25],
      ];
      for (const [a, b] of tramos) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(b - a, 2.4, 0.08), M.muro);
        m.position.set((a + b) / 2, 1.2, 0);
        m.castShadow = m.receiveShadow = true;
        g.add(m);
      }
      const dintel = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.36, 0.08), M.muro);
      dintel.position.set(-0.66, 2.22, 0);
      g.add(dintel);
      hoja(-0.22, 0, 0.86, "x", 1.15);
      break;
    }
    case "wc": {
      const taza = cil(0.2, 0.38, 0, 0.19, 0.1, M.loza, 0.15);
      taza.scale.x = 0.82;
      caja(0.36, 0.035, 0.36, 0, 0.4, 0.1, M.loza, 0.015);
      caja(0.38, 0.36, 0.18, 0, 0.55, -0.2, M.loza, 0.03);
      break;
    }
    case "lavabo":
      caja(0.5, 0.14, 0.45, 0, 0.82, 0, M.loza, 0.04);
      cil(0.07, 0.75, 0, 0.375, -0.05, M.loza, 0.09);
      cil(0.012, 0.14, 0, 0.96, -0.16, M.metal);
      break;
    case "bano": {
      // muro divisorio con vano de puerta
      const muro = new THREE.Mesh(new THREE.BoxGeometry(0.075, 2.5, 1.42), M.muro);
      muro.position.set(1.5, 1.25, 0.83);
      muro.castShadow = muro.receiveShadow = true;
      g.add(muro);
      const dintel = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.4, 0.8), M.muro);
      dintel.position.set(1.5, 2.3, 1.93);
      g.add(dintel);
      // regadera
      caja(0.9, 0.06, 0.9, 0.6, 0.03, 0.6, M.loza, 0.02);
      const vid = new THREE.Mesh(new THREE.BoxGeometry(0.012, 1.95, 0.9), M.cristal);
      vid.position.set(1.06, 1.0, 0.6);
      g.add(vid);
      cil(0.012, 1.1, 0.18, 1.5, 0.2, M.metal);
      cil(0.09, 0.02, 0.26, 2.05, 0.2, M.metal);
      // WC
      const taza = cil(0.2, 0.38, 0.52, 0.19, 1.42, M.loza, 0.15);
      taza.scale.z = 0.82;
      caja(0.36, 0.035, 0.36, 0.53, 0.4, 1.42, M.loza, 0.015);
      caja(0.18, 0.36, 0.38, 0.22, 0.55, 1.42, M.loza, 0.03);
      // lavabo con espejo
      caja(0.45, 0.14, 0.5, 0.36, 0.82, 2.05, M.loza, 0.04);
      cil(0.07, 0.75, 0.3, 0.375, 2.05, M.loza, 0.09);
      cil(0.012, 0.14, 0.2, 0.96, 2.05, M.metal);
      caja(0.012, 0.6, 0.45, 0.13, 1.45, 2.05, M.cristal, 0.004);
      break;
    }
  }
  return g;
}
