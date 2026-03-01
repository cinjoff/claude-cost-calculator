export function WeedIcon({ size = 64 }: { size?: number }) {
  return (
    <span
      style={{ fontSize: size * 0.8, lineHeight: 1, display: 'block', textAlign: 'center', userSelect: 'none' }}
      role="img"
      aria-label="Weed"
    >
      🌿
    </span>
  );
}
