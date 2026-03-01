'use client';

import { PLANS, type PlanKey } from '@/data/items';

interface PlanToggleProps {
  selected: PlanKey;
  onChange: (plan: PlanKey) => void;
}

export function PlanToggle({ selected, onChange }: PlanToggleProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100">
        {(Object.keys(PLANS) as PlanKey[]).map((key) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              selected === key
                ? 'bg-accent text-white shadow-sm'
                : 'text-text-primary hover:text-accent'
            }`}
          >
            {PLANS[key].label}
          </button>
        ))}
      </div>
      <p className="text-3xl font-bold tabular-nums text-text-primary">
        €{PLANS[selected].price}/month
      </p>
    </div>
  );
}
