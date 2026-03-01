interface IconProps { size?: number }
export function TramIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,12 72,28 40,44 8,28" fill="#0066CC" />
      <polygon points="8,28 40,44 40,78 8,62" fill="#004C99" />
      <polygon points="72,28 40,44 40,78 72,62" fill="#003366" />
      <polygon points="18,30 30,36 30,44 18,38" fill="#99CCFF" opacity="0.6" />
      <polygon points="50,36 62,30 62,38 50,44" fill="#99CCFF" opacity="0.6" />
    </svg>
  );
}
