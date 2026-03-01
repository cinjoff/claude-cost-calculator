interface IconProps {
  size?: number;
}

export function MargaritasIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Margarita glass body (triangle) */}
      <polygon points="12,15 68,15 40,55" fill="#A8D8A8" stroke="#6BAF6B" strokeWidth="2" />
      {/* Stem */}
      <line x1="40" y1="55" x2="40" y2="75" stroke="#6BAF6B" strokeWidth="3" strokeLinecap="round" />
      {/* Base */}
      <line x1="26" y1="75" x2="54" y2="75" stroke="#6BAF6B" strokeWidth="3.5" strokeLinecap="round" />
      {/* Salt rim */}
      <line x1="12" y1="15" x2="68" y2="15" stroke="#F5F0E8" strokeWidth="5" strokeLinecap="round" />
      {/* Lime wedge circle */}
      <circle cx="62" cy="12" r="7" fill="#7DC97D" stroke="#5AAD5A" strokeWidth="1.5" />
      {/* Lime wedge slice line */}
      <line x1="62" y1="5" x2="62" y2="19" stroke="#5AAD5A" strokeWidth="1.2" />
    </svg>
  );
}
