import type { ComboItem } from '@/lib/combo';
import { CLAUDE_DOPAMINE_MINS } from '@/data/items';

interface DopamineBarProps {
  combo: ComboItem[];
}

function formatMins(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function DopamineBar({ combo }: DopamineBarProps) {
  const rows = combo.map((c) => ({
    label: c.item.label,
    quantity: c.quantity,
    totalMins: c.item.dopamineMins * c.quantity,
  }));

  const maxItemMins = Math.max(...rows.map((r) => r.totalMins), 1);
  // Item bars scale among themselves but are capped at 25% of the container,
  // so Claude's 100% bar visually dwarfs even the longest item.
  const ITEM_BAR_CAP = 25;

  return (
    <div className="w-full max-w-xl mx-auto mt-6 px-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        Dopamine timeline
      </p>

      <div className="space-y-2">
        {rows.map((row) => {
          const widthPct = (row.totalMins / maxItemMins) * ITEM_BAR_CAP;
          return (
            <div key={row.label} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-36 shrink-0 truncate">
                {row.label}
                {row.quantity > 1 && (
                  <span className="text-gray-400 ml-1">×{row.quantity}</span>
                )}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent/60"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-gray-400 w-12 text-right shrink-0">
                {formatMins(row.totalMins)}
              </span>
            </div>
          );
        })}

        {/* Divider */}
        <div className="border-t border-gray-100 my-1" />

        {/* Claude row — always full width */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-text-primary w-36 shrink-0">
            Claude ✦
          </span>
          <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: '100%' }}
            />
          </div>
          <span className="text-xs tabular-nums text-accent font-semibold w-12 text-right shrink-0">
            all month
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-300 mt-3 text-right">
        {formatMins(rows.reduce((s, r) => s + r.totalMins, 0))} of dopamine
        {' '}vs {Math.round(CLAUDE_DOPAMINE_MINS / 60 / 24)} days of AI access
      </p>
    </div>
  );
}
