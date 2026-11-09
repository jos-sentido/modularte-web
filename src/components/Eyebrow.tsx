export default function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark"; // dark = sobre fondo oscuro (texto claro)
  className?: string;
}) {
  return (
    <span
      className={`font-eyebrow inline-block text-xs uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-white/80" : "text-pizarra"
      } ${className}`}
    >
      {children}
      <span className="mt-2 block h-[3px] w-9 bg-rojo" />
    </span>
  );
}
