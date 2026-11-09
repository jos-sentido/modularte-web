import Image from "next/image";
import CornerFrame from "./CornerFrame";

/**
 * Header cinematográfico para páginas internas (lenguaje del hero del Inicio):
 * banda oscura grafito o foto a sangre + scrim + marco rojo de esquinas + Downey.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  img,
  imgAlt = "",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  img?: string;
  imgAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate -mt-[61px] flex min-h-[46vh] items-end overflow-hidden bg-tinta">
      {img ? (
        <>
          <Image
            src={img}
            alt={imgAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/60 to-tinta/25" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-tinta/90 via-tinta/40 to-transparent" />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-tinta),#2b2b29)]"
        />
      )}
      {/* refuerzo arriba para legibilidad del nav */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-tinta/70 to-transparent" />
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light" />
      <CornerFrame variant="all" size={46} stroke={3} inset={20} />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-32">
        <span className="font-eyebrow inline-block text-xs uppercase tracking-[0.2em] text-white/85">
          {eyebrow}
          <span className="mt-2 block h-[3px] w-10 bg-rojo" />
        </span>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-xl text-lg text-white/85">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
