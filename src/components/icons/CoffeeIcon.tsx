interface IconProps { size?: number }
export function CoffeeIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,15 65,30 40,45 15,30" fill="#8B5E3C" />
      <polygon points="15,30 40,45 40,75 15,60" fill="#6B4226" />
      <polygon points="65,30 40,45 40,75 65,60" fill="#4A2E1A" />
      <circle cx="32" cy="12" r="3" fill="#FAF7F2" opacity="0.5" />
      <circle cx="40" cy="9" r="3" fill="#FAF7F2" opacity="0.5" />
      <circle cx="48" cy="12" r="3" fill="#FAF7F2" opacity="0.5" />
    </svg>
  );
}
