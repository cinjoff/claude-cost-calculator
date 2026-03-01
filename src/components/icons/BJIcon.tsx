interface IconProps { size?: number }
export function BJIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,10 70,24 40,38 10,24" fill="#CC2200" />
      <polygon points="10,24 40,38 40,90 10,76" fill="#991A00" />
      <polygon points="70,24 40,38 40,90 70,76" fill="#771300" />
      <circle cx="52" cy="62" r="3" fill="#FFD700" />
    </svg>
  );
}
