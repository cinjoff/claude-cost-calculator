'use client';

interface ShuffleButtonProps {
  onClick: () => void;
}

export function ShuffleButton({ onClick }: ShuffleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-5 py-2.5 rounded-full border-2 border-accent text-accent text-sm font-semibold hover:bg-accent hover:text-white transition-all duration-200 active:scale-95"
    >
      Show me another combo
    </button>
  );
}
