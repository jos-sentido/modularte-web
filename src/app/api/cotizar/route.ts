import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

type Payload = {
  nombre?: string;
  email?: string;
  telefono?: string;
  sistema?: string;
  sector?: string;
  mensaje?: string;
  website?: string; // honeypot anti-spam (debe venir vacío)
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  // honeypot: si el bot llena este campo, lo ignoramos silenciosamente
  if (body.website) return NextResponse.json({ ok: true });

  const nombre = (body.nombre ?? "").trim();
  const email = (body.email ?? "").trim();
  const telefono = (body.telefono ?? "").trim();

  if (!nombre || (!email && !telefono)) {
    return NextResponse.json(
      { ok: false, error: "Falta nombre y un medio de contacto (correo o teléfono)." },
      { status: 400 },
    );
  }

  const lead = {
    nombre,
    email,
    telefono,
    sistema: (body.sistema ?? "").trim(),
    sector: (body.sector ?? "").trim(),
    mensaje: (body.mensaje ?? "").trim(),
    estado: "nuevo",
    origen: "sitio-web",
    creado: new Date().toISOString(),
  };

  const db = getAdminDb();
  if (!db) {
    // Firebase aún no configurado (dev local sin llave): no perdemos el lead, avisamos.
    console.warn("[cotizar] Firebase admin no configurado — lead no persistido:", lead);
    return NextResponse.json({
      ok: true,
      persisted: false,
      note: "Recibido (almacenamiento aún no configurado).",
    });
  }

  try {
    const ref = await db.collection("cotizaciones").add(lead);
    return NextResponse.json({ ok: true, persisted: true, id: ref.id });
  } catch (err) {
    console.error("[cotizar] error al guardar:", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar la solicitud." },
      { status: 500 },
    );
  }
}
