import type { Metadata } from "next";
import "./globals.css";
import { downey, pastiche, asket } from "./fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  metadataBase: new URL("https://modularte.com.mx"),
  title: {
    default: "Modularte · Construcciones prefabricadas",
    template: "%s · Modularte",
  },
  description:
    "Diseño, fabricación y montaje de espacios modulares de acero para industria, oficina, educación y más. Entrega en semanas, no en meses.",
  openGraph: {
    title: "Modularte · Construcciones prefabricadas",
    description:
      "Espacios modulares de acero listos para operar. Cotiza tu proyecto por sistema y aplicación.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${downey.variable} ${pastiche.variable} ${asket.variable}`}
    >
      <body className="min-h-screen bg-hueso text-tinta antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
