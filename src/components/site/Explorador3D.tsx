"use client";

/*
 * Explorador 3D del módulo Armabox®.
 * El módulo se construye con las medidas reales del folleto y cada distribución
 * recomendada se puede girar, ver en planta (sin techo) y recorrer por dentro.
 * Modelo ilustrativo: el mobiliario representa la distribución, no un acabado.
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GTAOPass } from "three/examples/jsm/postprocessing/GTAOPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { MOD, distribuciones, distribucionesMoviles, type Distribucion } from "@/data/distribuciones";
import { crearMueble, materiales } from "./mobiliario3d";

type Vista = "exterior" | "planta" | "interior" | "plano";

function textura(tipo: "piso" | "panel" | "lamina") {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  if (tipo === "piso") {
    // piso vinílico gris con grano, como en el folleto
    g.fillStyle = "#b9bcbf";
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 5200; i++) {
      const v = 150 + ((i * 53) % 90);
      g.fillStyle = `rgba(${v},${v},${v + 4},0.35)`;
      g.fillRect((i * 97) % 512, (i * 211) % 512, 1 + (i % 3), 1 + ((i >> 2) % 2));
    }
  } else if (tipo === "panel") {
    // panel liso con junta vertical
    g.fillStyle = "#f4f4f1";
    g.fillRect(0, 0, 512, 512);
    g.fillStyle = "rgba(0,0,0,0.16)";
    g.fillRect(0, 0, 3, 512);
    g.fillStyle = "rgba(255,255,255,0.7)";
    g.fillRect(3, 0, 2, 512);
  } else {
    g.fillStyle = "#eceeef";
    g.fillRect(0, 0, 512, 512);
    for (let x = 0; x < 512; x += 64) {
      const grad = g.createLinearGradient(x, 0, x + 64, 0);
      grad.addColorStop(0, "rgba(0,0,0,0.14)");
      grad.addColorStop(0.3, "rgba(255,255,255,0.12)");
      grad.addColorStop(0.7, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.1)");
      g.fillStyle = grad;
      g.fillRect(x, 0, 64, 512);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/*
 * Módulo según el folleto: techo plano de lámina, estructura clara con herrajes en
 * las esquinas, paneles lisos; puerta y ventana en un extremo corto, ventana en el
 * otro extremo y una ventana en el muro largo.
 */
function construir(d: Distribucion) {
  const { L, W, H } = d.dim ?? MOD;
  const movil = d.casco === "movil";
  const ancho = W * d.modulos;
  const raiz = new THREE.Group();
  const techo = new THREE.Group();
  const mat = (color: number, extra: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.05, ...extra });
  const caja = (g: THREE.Group, w: number, h: number, dz: number, x: number, y: number, z: number, m: THREE.Material) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, dz), m);
    mesh.position.set(x, y, z);
    mesh.castShadow = mesh.receiveShadow = true;
    g.add(mesh);
    return mesh;
  };

  const acero = mat(0xe9ebec, { roughness: 0.4, metalness: 0.3 });
  const herraje = mat(0xb4b9bf, { roughness: 0.35, metalness: 0.6 });
  const txLargo = textura("panel");
  txLargo.repeat.set(Math.max(4, Math.round(L / 1.2)), 1);
  const txCorto = textura("panel");
  txCorto.repeat.set(2 * d.modulos, 1);
  const panelLargo = mat(0xffffff, { side: THREE.DoubleSide, map: txLargo, roughness: 0.75 });
  const panelCorto = mat(0xffffff, { side: THREE.DoubleSide, map: txCorto, roughness: 0.75 });
  const vidrio = new THREE.MeshPhysicalMaterial({ color: 0xcfe3ee, transparent: true, opacity: 0.3, roughness: 0.04, envMapIntensity: 1.6 });
  const marco = mat(0xf2f3f4, { roughness: 0.45, metalness: 0.2 });
  const puerta = mat(0xf4f5f6, { roughness: 0.5 });

  // piso
  caja(raiz, L, 0.16, ancho, L / 2, -0.08, ancho / 2, acero);
  const txPiso = textura("piso");
  txPiso.repeat.set(4, 1.6 * d.modulos);
  caja(raiz, L - 0.2, 0.012, ancho - 0.2, L / 2, 0.006, ancho / 2, mat(0xffffff, { map: txPiso, roughness: 0.5 }));
  caja(raiz, L - 0.2, 0.08, 0.012, L / 2, 0.05, 0.1, mat(0xd9dbdd));
  caja(raiz, L - 0.2, 0.08, 0.012, L / 2, 0.05, ancho - 0.1, mat(0xd9dbdd));

  // estructura por módulo: columnas, largueros y herrajes de esquina
  for (let n = 0; n < d.modulos; n++) {
    const z0 = n * W;
    for (const x of [0.08, L - 0.08])
      for (const z of [z0 + 0.08, z0 + W - 0.08]) {
        caja(raiz, 0.16, H, 0.16, x, H / 2, z, acero);
        if (!movil) {
          caja(raiz, 0.17, 0.12, 0.17, x, 0.06, z, herraje);
          caja(techo, 0.17, 0.12, 0.17, x, H - 0.06, z, herraje);
        }
      }
    for (const z of [z0 + 0.08, z0 + W - 0.08]) {
      caja(raiz, L - 0.32, 0.16, 0.16, L / 2, 0.08, z, acero);
      caja(techo, L - 0.32, 0.18, 0.16, L / 2, H - 0.09, z, acero);
    }
    for (const x of [0.08, L - 0.08]) {
      caja(raiz, 0.16, 0.16, W - 0.32, x, 0.08, z0 + W / 2, acero);
      caja(techo, 0.16, 0.18, W - 0.32, x, H - 0.09, z0 + W / 2, acero);
    }
  }

  // muros
  const alto = H - 0.34;
  const yMuro = 0.16 + alto / 2;
  const ventana = (x: number, z: number, an: number, enX: boolean, y = 1.5, h = 1.1) => {
    const g = 0.11;
    if (enX) {
      caja(raiz, an, h, g, x, y, z, vidrio);
      caja(raiz, an + 0.1, 0.05, g + 0.02, x, y + h / 2, z, marco);
      caja(raiz, an + 0.1, 0.05, g + 0.02, x, y - h / 2, z, marco);
      for (const dx of [-an / 2, 0, an / 2]) caja(raiz, 0.045, h, g + 0.02, x + dx, y, z, marco);
    } else {
      caja(raiz, g, h, an, x, y, z, vidrio);
      caja(raiz, g + 0.02, 0.05, an + 0.1, x, y + h / 2, z, marco);
      caja(raiz, g + 0.02, 0.05, an + 0.1, x, y - h / 2, z, marco);
      for (const dz of [-an / 2, 0, an / 2]) caja(raiz, g + 0.02, h, 0.045, x, y, z + dz, marco);
    }
  };
  caja(raiz, L - 0.32, alto, 0.075, L / 2, yMuro, 0.05, panelLargo);
  caja(raiz, L - 0.32, alto, 0.075, L / 2, yMuro, ancho - 0.05, panelLargo);
  if (!movil) ventana(L / 2 + 0.9, 0.05, 1.1, true);
  for (let n = 0; n < d.modulos; n++) {
    const zc = n * W + W / 2;
    caja(raiz, 0.075, alto, W - 0.32, 0.05, yMuro, zc, panelCorto);
    caja(raiz, 0.075, alto, W - 0.32, L - 0.05, yMuro, zc, panelCorto);
    if (movil) {
      // unidad sobre remolque: puerta y ventanas en el costado de acceso
      const oscuro = mat(0x33363b, { roughness: 0.6, metalness: 0.4 });
      const xp = L * 0.6;
      caja(raiz, 0.9, 2.03, 0.1, xp, 1.03, 0.05, puerta);
      caja(raiz, 0.05, 0.14, 0.13, xp + 0.33, 1.05, 0.05, herraje);
      ventana(L * 0.3, 0.05, 1.2, true, 1.5, 0.85);
      if (L > 9) ventana(L * 0.85, 0.05, 1.2, true, 1.5, 0.85);
      if (L > 12) ventana(L * 0.1, 0.05, 1.0, true, 1.5, 0.85);
      // faldón, chasis, ejes, tirón y escalera
      caja(raiz, L + 0.04, 0.14, ancho + 0.04, L / 2, -0.07, ancho / 2, oscuro);
      for (const z of [ancho * 0.28, ancho * 0.72]) caja(raiz, L - 0.3, 0.2, 0.1, L / 2, -0.26, z, oscuro);
      const ejes = d.ejes ?? 1;
      for (let e = 0; e < ejes; e++)
        for (const z of [0.2, ancho - 0.2]) {
          const rueda = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.22, 28), mat(0x1c1d20, { roughness: 0.8 }));
          rueda.rotation.x = Math.PI / 2;
          rueda.position.set(L * 0.36 - e * 0.85, -0.3, z);
          rueda.castShadow = true;
          raiz.add(rueda);
          const rin = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.24, 20), herraje);
          rin.rotation.x = Math.PI / 2;
          rin.position.copy(rueda.position);
          raiz.add(rin);
        }
      caja(raiz, 1.3, 0.1, 0.1, L + 0.65, -0.26, ancho / 2, oscuro);
      caja(raiz, 0.08, 0.5, 0.08, L + 1.2, -0.42, ancho / 2, oscuro);
      for (let k = 0; k < 3; k++) caja(raiz, 1.0, 0.04, 0.28, xp, -0.1 - k * 0.19, -0.2 - k * 0.28, oscuro);
      caja(raiz, 0.28, 0.5, 0.75, L + 0.14, 2.05, zc, mat(0xd6d8db));
    } else {
      ventana(0.05, zc, 1.1, false);
      if (n === 0) {
        ventana(L - 0.05, zc - 0.62, 0.55, false, 1.55, 1.2);
        caja(raiz, 0.1, 2.06, 0.86, L - 0.05, 1.19, zc + 0.5, puerta);
        caja(raiz, 0.12, 0.03, 0.14, L - 0.05, 1.12, zc + 0.2, herraje);
      } else ventana(L - 0.05, zc, 1.1, false);
    }
    // luminaria
    const luz = caja(techo, 1.2, 0.025, 0.28, L / 2, H - 0.365, zc, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff4e0, emissiveIntensity: 0.9 }));
    luz.castShadow = false;
  }

  // cubierta de lámina y plafón
  const txTecho = textura("lamina");
  txTecho.repeat.set(Math.round(L * 1.6), 1);
  caja(techo, L - 0.3, 0.06, ancho - 0.3, L / 2, H - 0.03, ancho / 2, mat(0xffffff, { map: txTecho, roughness: 0.5, metalness: 0.3 }));
  const txPlafon = textura("lamina");
  txPlafon.repeat.set(1, 6 * d.modulos);
  txPlafon.rotation = Math.PI / 2;
  caja(techo, L - 0.3, 0.02, ancho - 0.3, L / 2, H - 0.34, ancho / 2, mat(0xffffff, { map: txPlafon, side: THREE.DoubleSide, roughness: 0.7 }));
  raiz.add(techo);

  // mobiliario modelado
  const M = materiales();
  for (const [tipo, x, z, giro] of d.muebles) {
    const mueble = crearMueble(tipo, M, W);
    mueble.position.set(x, 0.012, z);
    mueble.rotation.y = (giro * Math.PI) / 180;
    raiz.add(mueble);
  }

  return { raiz, techo, centro: new THREE.Vector3(L / 2, 1.2, ancho / 2), ancho };
}

export default function Explorador3D({
  conjunto = "armabox",
  fijo,
}: {
  conjunto?: "armabox" | "moviles";
  fijo?: string; // muestra solo ese modelo, sin lista (modo incrustado)
}) {
  const lista = conjunto === "moviles" ? distribucionesMoviles : distribuciones;
  const lienzo = useRef<HTMLDivElement>(null);
  const [elegido, setId] = useState(lista[0].id);
  const id = fijo ?? elegido;
  const [vista, setVista] = useState<Vista>("exterior");
  const [listo, setListo] = useState(false);
  const dist = lista.find((x) => x.id === id) ?? lista[0];

  useEffect(() => {
    const el = lienzo.current;
    if (!el || vista === "plano") return;
    const d = lista.find((x) => x.id === id) ?? lista[0];
    const dims = d.dim ?? MOD;
    const esMovil = d.casco === "movil";
    const escena = new THREE.Scene();
    const camara = new THREE.PerspectiveCamera(vista === "interior" ? 62 : 34, el.clientWidth / el.clientHeight, 0.05, 100);
    const render = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    render.setClearColor(0x000000, 0);
    render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    render.setSize(el.clientWidth, el.clientHeight);
    render.toneMapping = THREE.ACESFilmicToneMapping;
    render.toneMappingExposure = vista === "interior" ? 0.66 : 0.6;
    render.shadowMap.enabled = true;
    render.shadowMap.type = THREE.PCFSoftShadowMap;
    const pmrem = new THREE.PMREMGenerator(render);
    const entorno = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    escena.environment = entorno;
    escena.environmentIntensity = 0.45;
    el.appendChild(render.domElement);
    render.domElement.style.touchAction = "pan-y";

    escena.add(new THREE.HemisphereLight(0xffffff, 0xb9bdc3, 0.3));
    const sol = new THREE.DirectionalLight(0xfff3e2, 1.9);
    sol.position.set(9, 13, -7);
    sol.castShadow = true;
    sol.shadow.mapSize.set(2048, 2048);
    sol.shadow.camera.left = -16;
    sol.shadow.camera.right = 16;
    sol.shadow.camera.top = 16;
    sol.shadow.camera.bottom = -16;
    sol.shadow.bias = -0.0004;
    sol.shadow.radius = 5;
    escena.add(sol);
    // suelo que recibe la sombra del módulo
    const suelo = new THREE.Mesh(new THREE.CircleGeometry(30, 48), new THREE.ShadowMaterial({ opacity: 0.42 }));
    suelo.rotation.x = -Math.PI / 2;
    suelo.position.y = esMovil ? -0.67 : -0.14;
    suelo.receiveShadow = true;
    escena.add(suelo);

    const { raiz, techo, centro, ancho } = construir(d);
    escena.add(raiz);
    for (let n = 0; n < d.modulos; n++) {
      const luz = new THREE.PointLight(0xfff1dc, vista === "exterior" ? 0.8 : 2.4, 9, 1.8);
      luz.position.set(centro.x, 2.25, n * dims.W + dims.W / 2);
      luz.castShadow = vista === "interior" && d.modulos === 1;
      luz.shadow.mapSize.set(1024, 1024);
      luz.shadow.bias = -0.002;
      luz.shadow.radius = 6;
      escena.add(luz);
    }

    const control = new OrbitControls(camara, render.domElement);
    control.enableDamping = true;
    control.enablePan = false;
    const k = d.modulos > 1 ? 1.45 : Math.max(1, dims.L / 7);
    // las unidades largas llevan más luces interiores
    if (esMovil)
      for (let x = 2; x < dims.L; x += 3.2) {
        const extra = new THREE.PointLight(0xfff1dc, vista === "exterior" ? 0.5 : 1.6, 7, 1.8);
        extra.position.set(x, 2.2, dims.W / 2);
        escena.add(extra);
      }
    const estrecho = el.clientWidth < 520 ? 1.35 : 1;

    if (vista === "exterior") {
      techo.visible = true;
      camara.position.set(centro.x + 8.2 * k * estrecho, 4.2 * k * estrecho, centro.z - 8.6 * k * estrecho);
      control.target.copy(centro);
      control.minDistance = 5;
      control.maxDistance = 60;
      control.maxPolarAngle = Math.PI / 2 - 0.05;
    } else if (vista === "planta") {
      techo.visible = false;
      camara.position.set(centro.x, (d.modulos === 1 ? 10.5 * k : 15) * estrecho, centro.z + 0.01);
      control.target.set(centro.x, 0, centro.z);
      control.minDistance = 4;
      control.maxDistance = 60;
      control.maxPolarAngle = Math.PI / 2.4;
    } else {
      techo.visible = true;
      // en un módulo se entra por la puerta; en espacios unidos, desde una esquina
      const ojo = esMovil
        ? new THREE.Vector3(dims.L - 0.7, 1.58, 0.62)
        : d.modulos === 1
          ? new THREE.Vector3(MOD.L - 0.7, 1.6, centro.z + 0.45)
          : new THREE.Vector3(MOD.L - 0.5, 1.62, ancho - 0.55);
      const hacia = new THREE.Vector3(d.modulos === 1 ? 0 : centro.x - 1.2, 1.25, esMovil ? 0.9 : d.modulos === 1 ? ojo.z - 0.2 : centro.z - 0.6)
        .sub(ojo)
        .normalize()
        .multiplyScalar(0.12);
      camara.position.copy(ojo);
      control.target.copy(ojo).add(hacia);
      control.enableZoom = false;
      control.rotateSpeed = -0.45;
      control.minPolarAngle = Math.PI / 3;
      control.maxPolarAngle = (Math.PI * 2) / 3;
    }
    control.update();

    // oclusión ambiental: da volumen a las uniones entre piezas
    const compositor = new EffectComposer(render);
    compositor.addPass(new RenderPass(escena, camara));
    const ao = new GTAOPass(escena, camara, el.clientWidth, el.clientHeight);
    ao.blendIntensity = 0.9;
    ao.updateGtaoMaterial({ radius: 0.45, distanceExponent: 1.4, thickness: 1.2, scale: 1.1, samples: 12 });
    compositor.addPass(ao);
    compositor.addPass(new OutputPass());

    let cuadro = 0;
    const ciclo = () => {
      control.update();
      compositor.render();
      cuadro = requestAnimationFrame(ciclo);
    };
    ciclo();
    setListo(true);

    const obs = new ResizeObserver(() => {
      camara.aspect = el.clientWidth / el.clientHeight;
      camara.updateProjectionMatrix();
      render.setSize(el.clientWidth, el.clientHeight);
      compositor.setSize(el.clientWidth, el.clientHeight);
    });
    obs.observe(el);

    return () => {
      cancelAnimationFrame(cuadro);
      obs.disconnect();
      control.dispose();
      escena.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mm = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mm)) mm.forEach((x) => x.dispose());
        else mm?.dispose();
      });
      compositor.dispose();
      entorno.dispose();
      pmrem.dispose();
      render.dispose();
      render.domElement.remove();
    };
  }, [id, vista, lista]);

  const boton = (activo: boolean) =>
    `min-h-11 px-3 font-eyebrow sm:px-4 text-[11px] uppercase tracking-[0.16em] transition-colors ${
      activo ? "bg-tinta text-white" : "bg-white text-pizarra hover:text-tinta"
    }`;
  const grupos = [...new Set(lista.map((x) => x.grupo))];
  const planoSrc = conjunto === "moviles" ? `/moviles/${dist.id}-planta.jpg` : `/folleto/plano-${dist.id}.jpg`;

  return (
    <div className={fijo ? "" : "grid gap-px border border-linea bg-linea lg:grid-cols-[19rem_1fr]"}>
      {/* distribuciones */}
      <div className={fijo ? "hidden" : "bg-white p-5 sm:p-6"}>
        {grupos.map((g) => (
          <fieldset key={g} className="mb-6 last:mb-0">
            <legend className="font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">{g}</legend>
            <div className="mt-2 flex flex-col">
              {lista
                .filter((x) => x.grupo === g)
                .map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    aria-pressed={x.id === id}
                    onClick={() => setId(x.id)}
                    className={`flex min-h-11 items-center justify-between gap-3 border-l-[3px] py-2 pl-3 pr-1 text-left text-[15px] font-semibold transition-colors ${
                      x.id === id ? "border-rojo text-tinta" : "border-transparent text-pizarra hover:text-tinta"
                    }`}
                  >
                    {x.nombre}
                    <span className="font-eyebrow text-[10px] font-normal uppercase tracking-[0.12em] text-pizarra">
                      {x.modulos === 1 ? "1 módulo" : `${x.modulos} módulos`}
                    </span>
                  </button>
                ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/* escena */}
      <div className="relative bg-hueso">
        <div
          ref={lienzo}
          role="img"
          aria-label={`Modelo 3D ilustrativo: ${dist.nombre}, vista ${vista}`}
          className={`h-[22rem] w-full cursor-grab transition-opacity duration-300 active:cursor-grabbing sm:h-[30rem] ${
            listo ? "opacity-100" : "opacity-0"
          } ${vista === "plano" ? "hidden" : ""}`}
        />
        {vista === "plano" && (
          <div className="flex h-[22rem] items-center justify-center bg-white p-6 pt-16 sm:h-[30rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={planoSrc}
              alt={`Plano de la distribución ${dist.nombre}, tomado del folleto del sistema`}
              className="h-full w-auto max-w-full object-contain"
            />
          </div>
        )}
        <div
          className={`absolute left-3 flex gap-px bg-linea shadow-sm sm:left-4 ${fijo ? "top-[4.25rem] sm:top-[4.5rem]" : "top-3 sm:top-4"}`}
          role="group"
          aria-label="Vista 3D"
        >
          {((fijo ? ["exterior", "planta", "interior"] : ["exterior", "planta", "interior", "plano"]) as Vista[]).map((v) => (
            <button key={v} type="button" aria-pressed={vista === v} onClick={() => setVista(v)} className={boton(vista === v)}>
              {v === "exterior" ? "Girar" : v === "planta" ? "Planta" : v === "interior" ? "Entrar" : "Plano"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-linea bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="font-display text-xl font-bold uppercase leading-tight text-tinta">{dist.nombre}</p>
            <p className="mt-1 text-sm text-pizarra">{dist.resumen}</p>
          </div>
          <p className="font-eyebrow text-[10px] uppercase tracking-[0.14em] text-pizarra">
            {vista === "plano"
              ? "Plano del folleto del sistema"
              : vista === "interior"
                ? "Arrastra para mirar alrededor"
                : "Arrastra para girar · acerca con la rueda o dos dedos"}
            <br />
            {vista === "plano"
              ? "Distribución recomendada"
              : dist.medida
                ? `Modelo ilustrativo · ${dist.medida} · altura de referencia`
                : "Modelo ilustrativo · módulo de 6055 × 2435 × 2896 mm"}
          </p>
        </div>
      </div>
    </div>
  );
}
