"use client";

/*
 * Respaldo de Modularte en tres cifras, una por renglón: un número grande y una
 * sola línea que lo explica. Las certificaciones van en una línea discreta al pie.
 * Las cifras cuentan al entrar en pantalla (CountUp, React Bits).
 */

import CountUp from "@/components/bits/CountUp";

const cifra = "font-display text-6xl font-bold uppercase leading-none text-tinta sm:text-7xl";

export default function Respaldo() {
  const renglon = "flex items-baseline justify-between gap-6 border-t border-pizarra/30 py-6";
  const nota = "max-w-[14rem] text-right text-pizarra";
  return (
    <div>
      <div className={renglon}>
        <p className={cifra}>
          <CountUp to={30} prefix="+" duration={1.6} />
        </p>
        <p className={nota}>años construyendo espacios modulares</p>
      </div>
      <div className={renglon}>
        <p className={cifra}>
          <CountUp to={5} duration={1.2} />
        </p>
        <p className={nota}>sistemas para cada tipo de proyecto</p>
      </div>
      <div className={`${renglon} border-b`}>
        <p className={cifra}>MX</p>
        <p className={nota}>entrega y montaje en todo el país</p>
      </div>
      <p className="mt-5 font-eyebrow text-[11px] uppercase tracking-[0.16em] text-pizarra">
        Fabricación certificada · CE · ISO 9001:2015 · SGS · Intertek · CWB
      </p>
    </div>
  );
}
