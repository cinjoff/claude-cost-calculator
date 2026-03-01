interface IconProps { size?: number }
export function WeedIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,14 65,26 40,38 15,26" fill="#7CB342" />
      <polygon points="15,26 40,38 40,80 15,68" fill="#558B2F" />
      <polygon points="65,26 40,38 40,80 65,68" fill="#33691E" />
      <polygon points="36,10 44,10 46,18 34,18" fill="#558B2F" />
    </svg>
  );
}
