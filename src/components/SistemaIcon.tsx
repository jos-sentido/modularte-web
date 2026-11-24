// Iconos OFICIALES de los sistemas (manual de marca, "iconografía de 5 sistemas").
// Vectores extraídos de `iconos sistemas.pdf`. ZAR aún no tiene icono en el manual.
const CON_ICONO = ["armabox", "unidades-moviles", "tradicional", "flotante"];

export default function SistemaIcon({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  if (!CON_ICONO.includes(slug)) {
    // Sin icono oficial todavía: marco vacío con ganchos de esquina.
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path d="M8 16 V8 H16 M32 8 H40 V16 M40 32 V40 H32 M16 40 H8 V32" />
      </svg>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/iconos/${slug}.svg`}
      alt=""
      aria-hidden
      className={`object-contain ${className}`}
    />
  );
}
