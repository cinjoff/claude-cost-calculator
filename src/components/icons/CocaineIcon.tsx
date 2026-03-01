interface IconProps { size?: number }
export function CocaineIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,18 68,30 40,42 12,30" fill="#F5F5F5" />
      <polygon points="12,30 40,42 40,72 12,60" fill="#E0E0E0" />
      <polygon points="68,30 40,42 40,72 68,60" fill="#BDBDBD" />
      <line x1="12" y1="30" x2="68" y2="30" stroke="#9E9E9E" strokeWidth="1" />
      <line x1="40" y1="18" x2="40" y2="42" stroke="#9E9E9E" strokeWidth="1" />
    </svg>
  );
}
