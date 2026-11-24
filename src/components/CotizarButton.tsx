import Link from "next/link";

/*
 * Botón de Modularte. El principal lleva el corte en diagonal del manual en una
 * esquina y una flecha que avanza al pasar el cursor; el secundario comparte la
 * flecha y la forma recta, sin esquinas redondeadas.
 */
export default function CotizarButton({
  href = "/contacto",
  children = "Cotizar",
  variant = "solid",
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-semibold transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "corte bg-rojo pr-7 text-white hover:bg-rojo-600"
      : "border-[1.5px] border-pizarra text-pizarra hover:border-tinta hover:bg-tinta hover:text-white";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span aria-hidden className="flecha-avanza inline-block">
        →
      </span>
    </Link>
  );
}
