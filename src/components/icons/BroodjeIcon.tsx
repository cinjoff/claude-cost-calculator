interface IconProps { size?: number }
export function BroodjeIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,18 68,32 40,46 12,32" fill="#F5DEB3" />
      <polygon points="12,32 40,46 40,65 12,51" fill="#DEB887" />
      <polygon points="68,32 40,46 40,65 68,51" fill="#C4A265" />
      <polygon points="18,38 62,38 62,46 18,46" fill="#8B4513" opacity="0.4" />
    </svg>
  );
}
