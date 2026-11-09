export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-eyebrow inline-block text-xs uppercase tracking-[0.18em] text-pizarra ${className}`}
    >
      {children}
      <span className="mt-2 block h-[3px] w-9 bg-rojo" />
    </span>
  );
}
