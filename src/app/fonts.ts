import localFont from "next/font/local";

// Tipografías reales de marca (auto-hospedadas). Roles:
// Downey = titulares/logo · Pastiche Grotesque = texto/cuerpo · Asket Extended = antetítulos.
export const downey = localFont({
  src: [
    { path: "../../public/brand/fonts/Downey-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/brand/fonts/Downey-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-downey",
  display: "swap",
});

export const pastiche = localFont({
  src: [
    { path: "../../public/brand/fonts/Pastiche-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/brand/fonts/Pastiche-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/brand/fonts/Pastiche-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pastiche",
  display: "swap",
});

export const asket = localFont({
  src: [{ path: "../../public/brand/fonts/Asket-Extended-Light.woff2", weight: "300", style: "normal" }],
  variable: "--font-asket",
  display: "swap",
});
