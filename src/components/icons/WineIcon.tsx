interface IconProps { size?: number }
export function WineIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,8 58,20 40,32 22,20" fill="#C0392B" />
      <polygon points="22,20 40,32 40,85 22,73" fill="#922B21" />
      <polygon points="58,20 40,32 40,85 58,73" fill="#7B241C" />
      <polygon points="34,82 46,82 50,95 30,95" fill="#922B21" />
    </svg>
  );
}
