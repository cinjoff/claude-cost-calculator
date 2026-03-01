import type { Item } from '@/data/items';

export interface ComboItem {
  item: Item;
  quantity: number;
}

export interface ComboResult {
  combo: ComboItem[];
  remainder: number;
}

/** Weighted Fisher-Yates shuffle — items with higher weight appear earlier more often */
function weightedShuffle(items: Item[]): Item[] {
  const weighted = items.flatMap(item =>
    Array.from({ length: item.weight }, () => item)
  );
  for (let i = weighted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
  }
  // Deduplicate while preserving weighted order
  const seen = new Set<string>();
  return weighted.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function generateCombo(budget: number, items: Item[]): ComboResult {
  const MAX_DISTINCT = 5;
  const MAX_OVERAGE = 2;

  let remaining = budget;
  const result: ComboItem[] = [];

  const pool = weightedShuffle(items);

  for (const item of pool) {
    if (result.length >= MAX_DISTINCT) break;

    const itemMin = item.qtyMin ?? 1;
    const itemMax = item.qtyMax ?? 4;

    // Skip if we can't afford the minimum quantity
    if (item.price * itemMin > remaining + MAX_OVERAGE) continue;

    const maxAffordable = Math.floor((remaining + MAX_OVERAGE) / item.price);
    const maxQty = Math.min(maxAffordable, itemMax);

    if (maxQty < itemMin) continue;

    // Pick quantity in [itemMin, maxQty]
    const qty = itemMin + Math.floor(Math.random() * (maxQty - itemMin + 1));
    result.push({ item, quantity: qty });
    remaining = Math.round((remaining - item.price * qty) * 100) / 100;

    if (remaining <= 0) break;
  }

  return {
    combo: result,
    remainder: Math.round(remaining * 100) / 100,
  };
}
