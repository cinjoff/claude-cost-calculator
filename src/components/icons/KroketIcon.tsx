interface IconProps { size?: number }
export function KroketIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,25 66,38 40,51 14,38" fill="#D2691E" />
      <polygon points="14,38 40,51 40,72 14,59" fill="#A0522D" />
      <polygon points="66,38 40,51 40,72 66,59" fill="#8B4513" />
    </svg>
  );
}
