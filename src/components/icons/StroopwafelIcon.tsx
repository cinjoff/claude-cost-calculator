interface IconProps { size?: number }
export function StroopwafelIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,30 68,42 40,54 12,42" fill="#D4A017" />
      <polygon points="12,42 40,54 40,62 12,50" fill="#B8860B" />
      <polygon points="68,42 40,54 40,62 68,50" fill="#8B6508" />
      <line x1="30" y1="36" x2="50" y2="48" stroke="#B8860B" strokeWidth="1" />
      <line x1="40" y1="32" x2="40" y2="54" stroke="#B8860B" strokeWidth="1" />
    </svg>
  );
}
