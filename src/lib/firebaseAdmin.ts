// Firebase ADMIN (servidor). Para escrituras seguras (ej. guardar cotizaciones).
// La llave de servicio vive SOLO en env vars (Vercel), NUNCA en git.
// FIREBASE_SERVICE_ACCOUNT_KEY = JSON de la service account (string).
import {
  getApps,
  initializeApp,
  cert,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let app: App | null = null;

function getAdminApp(): App | null {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0];
    return app;
  }
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null; // aún sin configurar → el endpoint responde con gracia

  try {
    const svc = JSON.parse(raw);
    // Las private keys suelen traer \n escapados al pasarlas por env var.
    if (typeof svc.private_key === "string") {
      svc.private_key = svc.private_key.replace(/\\n/g, "\n");
    }
    app = initializeApp({ credential: cert(svc) });
    return app;
  } catch {
    return null;
  }
}

export function getAdminDb(): Firestore | null {
  const a = getAdminApp();
  return a ? getFirestore(a) : null;
}
