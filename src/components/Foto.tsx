"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// next/image con fundido al cargar (evita el "parpadeo" de la foto).
export default function Foto({ className = "", alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`foto-fade ${loaded ? "foto-loaded" : ""} ${className}`}
    />
  );
}
