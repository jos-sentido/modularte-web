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
    "Construcción modular de nivel industrial: diseño, fabricación y montaje de espacios modulares para industria, oficina, educación y más. Entrega en semanas, no en meses.",
  openGraph: {
    title: "Modularte · Construcciones prefabricadas",
    description:
      "Espacios modulares listos para operar. Cotiza tu proyecto por sistema y aplicación.",
    type: "website",
    locale: "es_MX",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "Modularte",
  description:
    "Construcción modular de nivel industrial: diseño, fabricación y montaje de espacios modulares para industria, oficina, educación y más.",
  url: "https://modularte.com.mx",
  logo: "https://modularte.com.mx/brand/logo/modularte-vertical.png",
  image: "https://modularte.com.mx/fotos/tradicional/terminado-1.jpg",
  telephone: "+523326160168",
  email: "info@modularte.com.mx",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mexicaltzingo #1545 int 167, Col. Moderna",
    addressLocality: "Guadalajara",
    addressRegion: "Jalisco",
    postalCode: "44100",
    addressCountry: "MX",
  },
  areaServed: "MX",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="relative z-10 bg-hueso shadow-[0_30px_60px_-25px_rgb(0_0_0/0.65)]">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
