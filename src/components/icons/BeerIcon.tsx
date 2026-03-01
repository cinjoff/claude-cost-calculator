interface IconProps {
  size?: number;
}

export function BeerIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,10 70,28 40,46 10,28" fill="#F5C842" />
      <polygon points="10,28 40,46 40,80 10,62" fill="#D4A017" />
      <polygon points="70,28 40,46 40,80 70,62" fill="#B8860B" />
      <ellipse cx="40" cy="10" rx="15" ry="6" fill="#FFF8DC" opacity="0.8" />
    </svg>
  );
}
