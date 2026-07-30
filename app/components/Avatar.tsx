type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  loading?: "lazy" | "eager";
};

/** Sert la variante -144 (avif/webp) d'un portrait plutôt que le fichier source pleine résolution. */
export function Avatar({ src, alt, size = 48, className, loading = "lazy" }: AvatarProps) {
  const base = src.replace(/\.(webp|png)$/, "");
  return (
    <picture>
      <source srcSet={`${base}-144.avif`} type="image/avif" />
      <source srcSet={`${base}-144.webp`} type="image/webp" />
      <img src={`${base}-144.webp`} alt={alt} width={size} height={size} loading={loading} className={className} />
    </picture>
  );
}
