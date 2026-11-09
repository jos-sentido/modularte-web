import Link from "next/link";

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
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5";
  const styles =
    variant === "solid"
      ? "bg-rojo text-white hover:bg-rojo-600 hover:shadow-md hover:shadow-rojo/20"
      : "border-[1.5px] border-pizarra text-pizarra hover:border-rojo hover:text-rojo";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
