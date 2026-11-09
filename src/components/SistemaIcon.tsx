// Iconos de los 5 sistemas — línea (recurso del manual). Color por currentColor.
export default function SistemaIcon({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const s = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const inner: Record<string, React.ReactNode> = {
    // Armabox® — módulo de acero izándose (eslingas + gancho)
    armabox: (
      <g {...s}>
        <path d="M24 6 v3" />
        <path d="M24 9 L13 19 M24 9 L35 19" />
        <rect x="10" y="19" width="28" height="19" rx="1" />
        <path d="M10 25 H38 M18 19 V38 M30 19 V38" />
        <rect x="20.5" y="22.5" width="7" height="5" />
      </g>
    ),
    // Unidades Móviles — remolque (módulo con ruedas + puerta)
    "unidades-moviles": (
      <g {...s}>
        <rect x="8" y="15" width="31" height="19" rx="1" />
        <path d="M8 21 H39" />
        <rect x="13" y="24" width="6" height="10" />
        <rect x="25" y="18" width="9" height="6" />
        <circle cx="16" cy="37" r="2.2" />
        <circle cx="31" cy="37" r="2.2" />
        <path d="M8 37 H13.5 M18.5 37 H28.5 M33.5 37 H41" />
      </g>
    ),
    // Tradicional — edificio
    tradicional: (
      <g {...s}>
        <rect x="11" y="10" width="26" height="30" rx="1" />
        <path d="M16 16 h5 M27 16 h5 M16 23 h5 M27 23 h5 M16 30 h5 M27 30 h5" />
        <rect x="21" y="33" width="6" height="7" />
      </g>
    ),
    // Flotante — módulo sobre agua
    flotante: (
      <g {...s}>
        <rect x="11" y="13" width="26" height="16" rx="1" />
        <path d="M11 19 H37 M24 13 V29" />
        <rect x="15" y="16" width="5" height="4" />
        <rect x="28" y="16" width="5" height="4" />
        <path d="M7 33 q3 -3 6 0 t6 0 t6 0 t6 0 t6 0" />
        <path d="M7 38 q3 -3 6 0 t6 0 t6 0 t6 0 t6 0" />
      </g>
    ),
    // ZAR — pendiente de definir
    zar: (
      <g {...s} strokeDasharray="3 3">
        <rect x="11" y="13" width="26" height="22" rx="1" />
        <path d="M20 23 a4 4 0 1 1 5 4 v2" strokeDasharray="0" />
        <circle cx="24" cy="32" r="0.6" strokeDasharray="0" strokeWidth="2.4" />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {inner[slug] ?? inner.armabox}
    </svg>
  );
}
