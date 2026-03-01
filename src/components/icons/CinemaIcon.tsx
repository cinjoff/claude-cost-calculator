interface IconProps { size?: number }
export function CinemaIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,20 72,34 40,48 8,34" fill="#E8A820" />
      <polygon points="8,34 40,48 40,62 8,48" fill="#C68A10" />
      <polygon points="72,34 40,48 40,62 72,48" fill="#A06808" />
      <line x1="20" y1="27" x2="20" y2="55" stroke="#FAF7F2" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}
