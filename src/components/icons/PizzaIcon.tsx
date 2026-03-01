interface IconProps { size?: number }
export function PizzaIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,15 72,30 40,45 8,30" fill="#F4A460" />
      <polygon points="8,30 40,45 40,60 8,45" fill="#CD853F" />
      <polygon points="72,30 40,45 40,60 72,45" fill="#A0522D" />
      <circle cx="35" cy="28" r="3" fill="#CC3333" />
      <circle cx="48" cy="24" r="3" fill="#CC3333" />
      <circle cx="42" cy="34" r="3" fill="#CC3333" />
    </svg>
  );
}
