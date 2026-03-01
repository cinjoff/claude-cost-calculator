import type { ComboItem } from '@/lib/combo';

interface ComboCardProps {
  combo: ComboItem[];
  remainder: number;
}

export function ComboCard({ combo, remainder }: ComboCardProps) {
  const total = combo.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-xs">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        That&apos;s basically…
      </p>
      <ul className="space-y-2 mb-4">
        {combo.map((c) => (
          <li key={c.item.id} className="flex justify-between items-center">
            <span className="font-medium text-text-primary">
              {c.item.label}
              <span className="text-gray-400 font-normal ml-1">× {c.quantity}</span>
            </span>
            <span className="tabular-nums text-sm text-gray-500">
              €{(c.item.price * c.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
        <span className="font-bold text-text-primary">Total</span>
        <span className="font-bold tabular-nums">€{total.toFixed(2)}</span>
      </div>
      {remainder > 0.01 && (
        <p className="text-xs text-gray-400 mt-2 text-right">
          and €{remainder.toFixed(2)} left
        </p>
      )}
    </div>
  );
}
