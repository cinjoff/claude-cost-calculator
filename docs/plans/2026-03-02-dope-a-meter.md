# Dope-a-Meter Claude-Culator Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebrand the app as "dope-a-meter claude-culator", replace BJ with a margaritas+tacos bundle, add dopamine time units per item, add a dopamine bar below the isometric table, and add a Claude benefits section.

**Architecture:** Add `dopamineMins` to the `Item` interface and data; create a `DopamineBar` component that visualizes item dopamine totals vs Claude's "all month" bar; create a `ClaudeBenefits` component for the copy section. No backend changes — all static data.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4 (CSS-first via `@theme` in globals.css), Framer Motion 12, Jest + @testing-library/react

---

### Task 1: Update data model

**Files:**
- Modify: `src/data/items.ts`

Add `dopamineMins: number` to the `Item` interface. Replace the `bj` item with a `margaritas` bundle item. Add dopamine times to all items.

**Step 1: Update the file**

Replace `src/data/items.ts` entirely with:

```typescript
export interface Item {
  id: string;
  label: string;
  price: number;
  weight: number; // higher = more likely to appear
  dopamineMins: number; // how long the dopamine hit lasts
}

export const ITEMS: Item[] = [
  { id: 'beer',        label: 'Beer',                       price: 5.00,  weight: 10, dopamineMins: 45   },
  { id: 'coffee',      label: 'Coffee',                     price: 4.50,  weight: 10, dopamineMins: 120  },
  { id: 'wine',        label: 'Wine',                       price: 6.00,  weight: 8,  dopamineMins: 90   },
  { id: 'cinema',      label: 'Cinema',                     price: 14.00, weight: 5,  dopamineMins: 120  },
  { id: 'stroopwafel', label: 'Stroopwafel',                price: 0.50,  weight: 8,  dopamineMins: 3    },
  { id: 'kroket',      label: 'Kroket',                     price: 2.50,  weight: 7,  dopamineMins: 8    },
  { id: 'broodje',     label: 'Broodje',                    price: 5.50,  weight: 7,  dopamineMins: 15   },
  { id: 'tram',        label: 'Tram ride',                  price: 3.20,  weight: 6,  dopamineMins: 20   },
  { id: 'burger',      label: 'Burger',                     price: 17.00, weight: 4,  dopamineMins: 25   },
  { id: 'pizza',       label: 'Pizza',                      price: 20.00, weight: 3,  dopamineMins: 30   },
  { id: 'weed',        label: 'Weed',                       price: 12.00, weight: 3,  dopamineMins: 240  },
  { id: 'cocaine',     label: 'Cocaine',                    price: 60.00, weight: 1,  dopamineMins: 20   },
  { id: 'margaritas',  label: '3× Margaritas + 3× Tacos',  price: 45.00, weight: 2,  dopamineMins: 180  },
];

export const PLANS = {
  pro: { label: 'Pro', price: 19 },
  max: { label: 'Max', price: 95 },
} as const;

export type PlanKey = keyof typeof PLANS;

// Claude dopamine: full month of access = 43,200 minutes
export const CLAUDE_DOPAMINE_MINS = 43_200;
```

**Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors (dopamineMins is a new required field; existing code only reads `item.price`, `item.label`, `item.id`, `item.weight` — no breakage).

**Step 3: Commit**

```bash
git add src/data/items.ts
git commit -m "feat: add dopamineMins to Item, replace BJ with margaritas bundle"
```

---

### Task 2: Create MargaritasIcon

**Files:**
- Create: `src/components/icons/MargaritasIcon.tsx`

The icon should show a cocktail glass with a fun/cheeky vibe — SVG drawn inline, same pattern as other icons (accepts `size` prop, defaults to 48).

Look at `src/components/icons/BeerIcon.tsx` first to understand the pattern.

**Step 1: Read BeerIcon to understand the pattern**

Read `src/components/icons/BeerIcon.tsx`.

**Step 2: Create the icon**

Create `src/components/icons/MargaritasIcon.tsx`:

```tsx
export function MargaritasIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Margarita glass body (triangle) */}
      <polygon points="10,10 38,10 24,32" fill="#A8D8A8" stroke="#6BAF6B" strokeWidth="1.5" />
      {/* Stem */}
      <line x1="24" y1="32" x2="24" y2="40" stroke="#6BAF6B" strokeWidth="2" strokeLinecap="round" />
      {/* Base */}
      <line x1="18" y1="40" x2="30" y2="40" stroke="#6BAF6B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Salt rim */}
      <line x1="10" y1="10" x2="38" y2="10" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" />
      {/* Lime wedge */}
      <circle cx="34" cy="9" r="4" fill="#7DC97D" stroke="#5AAD5A" strokeWidth="1" />
      <line x1="34" y1="5" x2="34" y2="13" stroke="#5AAD5A" strokeWidth="0.8" />
      {/* Taco 1 */}
      <path d="M6 44 Q10 38 14 44" stroke="#D4963A" strokeWidth="2" fill="#F5C842" strokeLinecap="round" />
      <circle cx="10" cy="43" r="1.5" fill="#E05A2B" />
      {/* Taco 2 */}
      <path d="M20 44 Q24 38 28 44" stroke="#D4963A" strokeWidth="2" fill="#F5C842" strokeLinecap="round" />
      <circle cx="24" cy="43" r="1.5" fill="#5AAD5A" />
    </svg>
  );
}
```

**Step 3: No test needed** — icon is pure SVG, tested visually.

**Step 4: Commit**

```bash
git add src/components/icons/MargaritasIcon.tsx
git commit -m "feat: add MargaritasIcon"
```

---

### Task 3: Update icons index

**Files:**
- Modify: `src/components/icons/index.ts`

Remove BJIcon, add MargaritasIcon.

**Step 1: Update the file**

Replace `src/components/icons/index.ts` entirely:

```typescript
export { BeerIcon } from './BeerIcon';
export { CoffeeIcon } from './CoffeeIcon';
export { WineIcon } from './WineIcon';
export { CinemaIcon } from './CinemaIcon';
export { StroopwafelIcon } from './StroopwafelIcon';
export { KroketIcon } from './KroketIcon';
export { BroodjeIcon } from './BroodjeIcon';
export { TramIcon } from './TramIcon';
export { BurgerIcon } from './BurgerIcon';
export { PizzaIcon } from './PizzaIcon';
export { WeedIcon } from './WeedIcon';
export { CocaineIcon } from './CocaineIcon';
export { MargaritasIcon } from './MargaritasIcon';

import { BeerIcon } from './BeerIcon';
import { CoffeeIcon } from './CoffeeIcon';
import { WineIcon } from './WineIcon';
import { CinemaIcon } from './CinemaIcon';
import { StroopwafelIcon } from './StroopwafelIcon';
import { KroketIcon } from './KroketIcon';
import { BroodjeIcon } from './BroodjeIcon';
import { TramIcon } from './TramIcon';
import { BurgerIcon } from './BurgerIcon';
import { PizzaIcon } from './PizzaIcon';
import { WeedIcon } from './WeedIcon';
import { CocaineIcon } from './CocaineIcon';
import { MargaritasIcon } from './MargaritasIcon';
import type React from 'react';

export const ITEM_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  beer: BeerIcon,
  coffee: CoffeeIcon,
  wine: WineIcon,
  cinema: CinemaIcon,
  stroopwafel: StroopwafelIcon,
  kroket: KroketIcon,
  broodje: BroodjeIcon,
  tram: TramIcon,
  burger: BurgerIcon,
  pizza: PizzaIcon,
  weed: WeedIcon,
  cocaine: CocaineIcon,
  margaritas: MargaritasIcon,
};
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/icons/index.ts
git commit -m "feat: swap BJIcon for MargaritasIcon in icon registry"
```

---

### Task 4: Create DopamineBar component

**Files:**
- Create: `src/components/DopamineBar.tsx`
- Create: `src/__tests__/DopamineBar.test.tsx`

**Visual spec:**
- One row per distinct item in the combo (not per quantity — multiply dopamineMins × quantity)
- Each row: item label + qty, then a proportional filled bar, then time label (e.g., "1h 30m")
- Bottom row: Claude's bar, full width, labeled "All month"
- Scale: the longest bar in the items section = 80% of container width; Claude always fills 100%

**Step 1: Write the failing test**

Create `src/__tests__/DopamineBar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { DopamineBar } from '@/components/DopamineBar';
import type { ComboItem } from '@/lib/combo';

const mockCombo: ComboItem[] = [
  { item: { id: 'beer', label: 'Beer', price: 5, weight: 10, dopamineMins: 45 }, quantity: 2 },
  { item: { id: 'weed', label: 'Weed', price: 12, weight: 3, dopamineMins: 240 }, quantity: 1 },
];

describe('DopamineBar', () => {
  it('renders a row for each combo item', () => {
    render(<DopamineBar combo={mockCombo} />);
    expect(screen.getByText(/Beer/)).toBeInTheDocument();
    expect(screen.getByText(/Weed/)).toBeInTheDocument();
  });

  it('shows total dopamine time for each item accounting for quantity', () => {
    render(<DopamineBar combo={mockCombo} />);
    // Beer x2 = 90 mins = 1h 30m
    expect(screen.getByText('1h 30m')).toBeInTheDocument();
    // Weed x1 = 240 mins = 4h
    expect(screen.getByText('4h')).toBeInTheDocument();
  });

  it('renders the Claude row', () => {
    render(<DopamineBar combo={mockCombo} />);
    expect(screen.getByText(/Claude/)).toBeInTheDocument();
    expect(screen.getByText(/all month/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to confirm it fails**

```bash
npx jest DopamineBar --no-coverage
```

Expected: FAIL — "Cannot find module '@/components/DopamineBar'"

**Step 3: Implement DopamineBar**

Create `src/components/DopamineBar.tsx`:

```tsx
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

  return (
    <div className="w-full max-w-xl mx-auto mt-6 px-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        Dopamine timeline
      </p>

      <div className="space-y-2">
        {rows.map((row) => {
          const widthPct = (row.totalMins / maxItemMins) * 80;
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
        {' '}vs {Math.round(CLAUDE_DOPAMINE_MINS / 60 / 24)} days of Claude
      </p>
    </div>
  );
}
```

**Step 4: Run tests**

```bash
npx jest DopamineBar --no-coverage
```

Expected: PASS (3 tests)

**Step 5: Commit**

```bash
git add src/components/DopamineBar.tsx src/__tests__/DopamineBar.test.tsx
git commit -m "feat: add DopamineBar component with dopamine timeline visualization"
```

---

### Task 5: Create ClaudeBenefits component

**Files:**
- Create: `src/components/ClaudeBenefits.tsx`
- Create: `src/__tests__/ClaudeBenefits.test.tsx`

**Visual spec:** A card with header "Meanwhile, Claude..." and a bulleted list of benefits. Subtle styling — soft background, no border.

**Step 1: Write the failing test**

Create `src/__tests__/ClaudeBenefits.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { ClaudeBenefits } from '@/components/ClaudeBenefits';

describe('ClaudeBenefits', () => {
  it('renders the section header', () => {
    render(<ClaudeBenefits />);
    expect(screen.getByText(/meanwhile, claude/i)).toBeInTheDocument();
  });

  it('renders all benefit lines', () => {
    render(<ClaudeBenefits />);
    expect(screen.getByText(/always agrees with you/i)).toBeInTheDocument();
    expect(screen.getByText(/doesn't bomb iran/i)).toBeInTheDocument();
    expect(screen.getByText(/3am/i)).toBeInTheDocument();
    expect(screen.getByText(/rent/i)).toBeInTheDocument();
    expect(screen.getByText(/split the bill/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run test to confirm it fails**

```bash
npx jest ClaudeBenefits --no-coverage
```

Expected: FAIL — module not found

**Step 3: Implement ClaudeBenefits**

Create `src/components/ClaudeBenefits.tsx`:

```tsx
const BENEFITS = [
  'Always agrees with you',
  "Doesn't bomb Iran",
  'Available at 3am, no Uber needed',
  'Might start paying for your rent',
  'Never asks to split the bill',
];

export function ClaudeBenefits() {
  return (
    <div className="w-full max-w-xs mx-auto rounded-2xl bg-accent/8 px-6 py-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
        Meanwhile, Claude…
      </p>
      <ul className="space-y-2">
        {BENEFITS.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-text-primary">
            <span className="text-accent mt-0.5">✦</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Step 4: Run tests**

```bash
npx jest ClaudeBenefits --no-coverage
```

Expected: PASS (2 tests)

**Step 5: Commit**

```bash
git add src/components/ClaudeBenefits.tsx src/__tests__/ClaudeBenefits.test.tsx
git commit -m "feat: add ClaudeBenefits component with cheeky copy"
```

---

### Task 6: Update page.tsx — rebrand + wire new components

**Files:**
- Modify: `src/app/page.tsx`

Changes:
1. Update `<h1>` to "dope-a-meter" + subtitle "claude-culator"
2. Update tagline
3. Add `<DopamineBar>` below the isometric table (inside the stage section, below the flex row)
4. Add `<ClaudeBenefits>` between stage and footer

**Step 1: Update page.tsx**

Replace `src/app/page.tsx` entirely:

```tsx
'use client';

import { useState, useCallback } from 'react';
import { PlanToggle } from '@/components/PlanToggle';
import { IsometricTable } from '@/components/IsometricTable';
import { ComboCard } from '@/components/ComboCard';
import { ShuffleButton } from '@/components/ShuffleButton';
import { DopamineBar } from '@/components/DopamineBar';
import { ClaudeBenefits } from '@/components/ClaudeBenefits';
import { ITEMS, PLANS, type PlanKey } from '@/data/items';
import { generateCombo, type ComboResult } from '@/lib/combo';

function newCombo(plan: PlanKey): ComboResult {
  return generateCombo(PLANS[plan].price, ITEMS);
}

export default function Home() {
  const [plan, setPlan] = useState<PlanKey>('pro');
  const [comboKey, setComboKey] = useState(0);
  const [comboResult, setComboResult] = useState<ComboResult>(() => newCombo('pro'));

  const handlePlanChange = useCallback((newPlan: PlanKey) => {
    setPlan(newPlan);
    setComboResult(newCombo(newPlan));
    setComboKey(k => k + 1);
  }, []);

  const handleShuffle = useCallback(() => {
    setComboResult(newCombo(plan));
    setComboKey(k => k + 1);
  }, [plan]);

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center px-4 py-16 gap-12">

      {/* Hero */}
      <section className="text-center max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
          dope-a-meter
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-text-primary mb-3">
          claude-culator
        </h1>
        <p className="text-lg text-gray-500">
          Is Claude expensive? Let&apos;s put it in Amsterdam terms.
        </p>
      </section>

      {/* Plan toggle */}
      <PlanToggle selected={plan} onChange={handlePlanChange} />

      {/* Stage */}
      <section className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 w-full">
          <IsometricTable combo={comboResult.combo} comboKey={comboKey} />
        </div>
        <div className="flex flex-col items-center w-full md:w-auto">
          <ComboCard combo={comboResult.combo} remainder={comboResult.remainder} />
          <ShuffleButton onClick={handleShuffle} />
        </div>
      </section>

      {/* Dopamine bar */}
      <DopamineBar combo={comboResult.combo} />

      {/* Claude benefits */}
      <ClaudeBenefits />

      {/* Footer */}
      <footer className="text-center mt-auto pt-8 flex flex-col items-center gap-4">
        <a
          href="https://claude.ai/code"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-accent text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Get Claude Code
        </a>
        <p className="text-sm text-gray-400">
          Built to convince my friends. It worked on me first.
        </p>
        <a
          href="https://github.com/cinjoff/claude-cost-calculator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-300 hover:text-gray-400 transition-colors"
        >
          View on GitHub
        </a>
      </footer>
    </main>
  );
}
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rebrand to dope-a-meter claude-culator, wire DopamineBar and ClaudeBenefits"
```

---

### Task 7: Update existing tests for new data model

**Files:**
- Modify: `src/__tests__/combo.test.ts`
- Modify: `src/__tests__/ComboCard.test.tsx`

The `Item` interface now requires `dopamineMins`. Any test that creates mock `Item` objects needs the new field.

**Step 1: Run all tests to find failures**

```bash
npx jest --no-coverage
```

Look for type errors or test failures caused by missing `dopamineMins`.

**Step 2: Fix combo.test.ts**

In `src/__tests__/combo.test.ts`, find any inline `Item` objects (e.g., `{ id: ..., label: ..., price: ..., weight: ... }`) and add `dopamineMins: 60` (or any reasonable value) to each.

**Step 3: Fix ComboCard.test.tsx**

In `src/__tests__/ComboCard.test.tsx`, same — add `dopamineMins: 60` to any inline item objects.

**Step 4: Run all tests**

```bash
npx jest --no-coverage
```

Expected: all tests pass (existing 14 + 5 new = 19 total).

**Step 5: Commit**

```bash
git add src/__tests__/combo.test.ts src/__tests__/ComboCard.test.tsx
git commit -m "fix: add dopamineMins to mock items in existing tests"
```

---

### Task 8: Visual polish — globals.css

**Files:**
- Modify: `src/app/globals.css`

Add a subtle accent tint for the ClaudeBenefits background (`bg-accent/8` uses Tailwind opacity modifier — works fine in v4). No changes needed unless colors look off in the browser.

**Step 1: Verify `bg-accent/8` works**

Run dev server: `npm run dev`

Open http://localhost:3000 and check:
- ClaudeBenefits card has a very subtle salmon/terracotta tint
- DopamineBar bars render with `bg-accent/60` (semi-transparent) for items, solid `bg-accent` for Claude
- Hero shows "dope-a-meter" label above "claude-culator" heading
- Isometric table no longer has the BJ item

If `bg-accent/8` renders as transparent/invisible (Tailwind v4 quirk), add an explicit color to `globals.css`:

```css
@theme {
  --color-accent-subtle: oklch(from var(--color-accent) l c h / 8%);
}
```

Then replace `bg-accent/8` in ClaudeBenefits with `bg-accent-subtle`.

**Step 2: Final test run**

```bash
npx jest --no-coverage
```

Expected: all passing.

**Step 3: Push**

```bash
git push
```

---

## Summary of changes

| File | Action |
|------|--------|
| `src/data/items.ts` | Add `dopamineMins` field, replace BJ with margaritas bundle, export `CLAUDE_DOPAMINE_MINS` |
| `src/components/icons/MargaritasIcon.tsx` | New cocktail+taco SVG icon |
| `src/components/icons/index.ts` | Swap BJIcon → MargaritasIcon |
| `src/components/DopamineBar.tsx` | New component: proportional bars per combo item + Claude bar |
| `src/components/ClaudeBenefits.tsx` | New component: cheeky Claude benefits list |
| `src/app/page.tsx` | Rebrand hero, wire DopamineBar + ClaudeBenefits |
| `src/__tests__/DopamineBar.test.tsx` | New: 3 tests |
| `src/__tests__/ClaudeBenefits.test.tsx` | New: 2 tests |
| `src/__tests__/combo.test.ts` | Fix: add dopamineMins to mock items |
| `src/__tests__/ComboCard.test.tsx` | Fix: add dopamineMins to mock items |
