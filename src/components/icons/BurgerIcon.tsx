interface IconProps { size?: number }
export function BurgerIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,12 68,26 40,40 12,26" fill="#D2691E" />
      <polygon points="12,40 40,54 40,62 12,48" fill="#5C3317" />
      <polygon points="68,40 40,54 40,62 68,48" fill="#3D1F0A" />
      <polygon points="12,40 68,40 40,54" fill="#7A4520" />
      <polygon points="12,60 40,74 40,82 12,68" fill="#C4A265" />
      <polygon points="68,60 40,74 40,82 68,68" fill="#A08050" />
      <polygon points="12,60 68,60 40,74" fill="#DEB887" />
    </svg>
  );
}
