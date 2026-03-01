# Claude Cost Calculator Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a one-pager that reframes Claude Pro/Max subscription cost as everyday Amsterdam spending, using animated isometric illustrations.

**Architecture:** Next.js App Router single page. A pure-function combo algorithm picks random Amsterdam items whose prices sum to the plan cost. Framer Motion animates items bouncing onto an isometric SVG tabletop. No backend, no database — all data is hardcoded constants.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Jest + @testing-library/react, deployed on Vercel.

---

## Project Structure

```
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    PlanToggle.tsx
    ComboCard.tsx
    IsometricTable.tsx
    ShuffleButton.tsx
    icons/
      BeerIcon.tsx
      CoffeeIcon.tsx
      WineIcon.tsx
      CinemaIcon.tsx
      StroopwafelIcon.tsx
      KroketIcon.tsx
      BroodjeIcon.tsx
      TramIcon.tsx
      BurgerIcon.tsx
      PizzaIcon.tsx
      WeedIcon.tsx
      CocaineIcon.tsx
      BJIcon.tsx
  lib/
    combo.ts
  data/
    items.ts
  __tests__/
    combo.test.ts
```

---

## Task 1: Scaffold the project

**Files:**
- Create: project root (run from `/Users/konstantin/Documents/github.nosync/claude-cost-calculator`)

**Step 1: Run create-next-app**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-eslint
```

When prompted, accept defaults. This will create the project in the current directory.

**Step 2: Rename src dir convention — move to src/**

```bash
mkdir -p src/app src/components/icons src/lib src/data src/__tests__
mv app src/app
mv components src/components 2>/dev/null || true
```

Wait — `create-next-app` with `--no-src-dir` puts files at root. Re-run with `--src-dir` instead:

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint
```

**Step 3: Install dependencies**

```bash
npm install framer-motion
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @types/jest jest-environment-jsdom
```

**Step 4: Configure Jest**

Create `jest.config.ts`:

```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
```

Create `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

**Step 5: Configure Plus Jakarta Sans in layout**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Claude vs Amsterdam',
  description: 'Is Claude expensive? Let\'s put it in Amsterdam terms.',
  openGraph: {
    title: 'Claude vs Amsterdam',
    description: 'Is Claude expensive? Let\'s put it in Amsterdam terms.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
```

**Step 6: Replace globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #FAF7F2;
  --color-table-top: #C8D9C0;
  --color-table-side-l: #B0C4A8;
  --color-table-side-r: #9DB89A;
  --color-accent: #E07A5F;
  --color-text: #1A1A2E;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

**Step 7: Update tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      colors: {
        bg: '#FAF7F2',
        accent: '#E07A5F',
        'text-primary': '#1A1A2E',
        'table-top': '#C8D9C0',
        'table-left': '#B0C4A8',
        'table-right': '#9DB89A',
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 8: Clean up boilerplate**

Replace `src/app/page.tsx` with a blank placeholder:

```typescript
export default function Home() {
  return <main className="min-h-screen bg-bg" />;
}
```

**Step 9: Verify it runs**

```bash
npm run dev
```

Expected: blank page at http://localhost:3000 with warm off-white background.

**Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind and Framer Motion

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Items data and combo algorithm

**Files:**
- Create: `src/data/items.ts`
- Create: `src/lib/combo.ts`
- Create: `src/__tests__/combo.test.ts`

**Step 1: Create items data**

Create `src/data/items.ts`:

```typescript
export interface Item {
  id: string;
  label: string;
  price: number;
  weight: number; // higher = more likely to appear
}

export const ITEMS: Item[] = [
  { id: 'beer',        label: 'Beer',        price: 5.00,  weight: 10 },
  { id: 'coffee',      label: 'Coffee',      price: 4.50,  weight: 10 },
  { id: 'wine',        label: 'Wine',        price: 6.00,  weight: 8  },
  { id: 'cinema',      label: 'Cinema',      price: 14.00, weight: 5  },
  { id: 'stroopwafel', label: 'Stroopwafel', price: 0.50,  weight: 8  },
  { id: 'kroket',      label: 'Kroket',      price: 2.50,  weight: 7  },
  { id: 'broodje',     label: 'Broodje',     price: 5.50,  weight: 7  },
  { id: 'tram',        label: 'Tram',        price: 3.20,  weight: 6  },
  { id: 'burger',      label: 'Burger',      price: 17.00, weight: 4  },
  { id: 'pizza',       label: 'Pizza',       price: 20.00, weight: 3  },
  { id: 'weed',        label: 'Weed',        price: 12.00, weight: 3  },
  { id: 'cocaine',     label: 'Cocaine',     price: 60.00, weight: 1  },
  { id: 'bj',          label: 'BJ',          price: 30.00, weight: 1  },
];

export const PLANS = {
  pro: { label: 'Pro', price: 19 },
  max: { label: 'Max', price: 95 },
} as const;

export type PlanKey = keyof typeof PLANS;
```

**Step 2: Write failing tests**

Create `src/__tests__/combo.test.ts`:

```typescript
import { generateCombo } from '@/lib/combo';
import { ITEMS, PLANS } from '@/data/items';

describe('generateCombo', () => {
  it('returns a non-empty combo', () => {
    const result = generateCombo(PLANS.pro.price, ITEMS);
    expect(result.combo.length).toBeGreaterThan(0);
  });

  it('never exceeds budget by more than €2', () => {
    for (let i = 0; i < 20; i++) {
      const result = generateCombo(PLANS.pro.price, ITEMS);
      const total = result.combo.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
      expect(total).toBeLessThanOrEqual(PLANS.pro.price + 2);
    }
  });

  it('remainder equals budget minus total cost', () => {
    const budget = PLANS.max.price;
    const result = generateCombo(budget, ITEMS);
    const total = result.combo.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
    expect(result.remainder).toBeCloseTo(budget - total, 1);
  });

  it('remainder is never negative by more than €2', () => {
    for (let i = 0; i < 20; i++) {
      const result = generateCombo(PLANS.pro.price, ITEMS);
      expect(result.remainder).toBeGreaterThanOrEqual(-2);
    }
  });

  it('never has more than 6 distinct items', () => {
    for (let i = 0; i < 20; i++) {
      const result = generateCombo(PLANS.max.price, ITEMS);
      expect(result.combo.length).toBeLessThanOrEqual(6);
    }
  });

  it('each combo item has quantity >= 1', () => {
    const result = generateCombo(PLANS.max.price, ITEMS);
    result.combo.forEach(c => {
      expect(c.quantity).toBeGreaterThanOrEqual(1);
    });
  });

  it('produces different combos on repeated calls (probabilistic)', () => {
    const results = new Set(
      Array.from({ length: 10 }, () =>
        generateCombo(PLANS.max.price, ITEMS).combo.map(c => c.item.id).join(',')
      )
    );
    expect(results.size).toBeGreaterThan(1);
  });
});
```

**Step 3: Run tests to verify they fail**

```bash
npm test -- --testPathPattern=combo
```

Expected: FAIL — `Cannot find module '@/lib/combo'`

**Step 4: Implement combo algorithm**

Create `src/lib/combo.ts`:

```typescript
import type { Item } from '@/data/items';

export interface ComboItem {
  item: Item;
  quantity: number;
}

export interface ComboResult {
  combo: ComboItem[];
  remainder: number;
}

/** Weighted Fisher-Yates shuffle */
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
    if (item.price > remaining + MAX_OVERAGE) continue;

    const maxQty = Math.min(
      Math.floor((remaining + MAX_OVERAGE) / item.price),
      4
    );
    if (maxQty < 1) continue;

    // Bias toward smaller quantities
    const qty = Math.ceil(Math.random() * maxQty);
    result.push({ item, quantity: qty });
    remaining -= item.price * qty;

    if (remaining <= 0) break;
  }

  return {
    combo: result,
    remainder: Math.round(remaining * 100) / 100,
  };
}
```

**Step 5: Run tests to verify they pass**

```bash
npm test -- --testPathPattern=combo
```

Expected: PASS — all 7 tests green.

**Step 6: Commit**

```bash
git add src/data/items.ts src/lib/combo.ts src/__tests__/combo.test.ts
git commit -m "feat: add Amsterdam items data and combo algorithm with tests

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Isometric SVG icon components

**Files:**
- Create: `src/components/icons/*.tsx` (13 files)

Each icon is a simple isometric SVG — three parallelogram faces (top, left, right) in distinct shades. All icons share the same `size` prop and a ~80×100 viewBox. The formula for isometric faces:

```
Top face:    4 corners forming a rhombus centered at top
Left face:   bottom-left parallelogram
Right face:  bottom-right parallelogram
```

**Step 1: Create the Beer icon as the reference**

Create `src/components/icons/BeerIcon.tsx`:

```tsx
interface IconProps {
  size?: number;
}

export function BeerIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Top face */}
      <polygon points="40,10 70,28 40,46 10,28" fill="#F5C842" />
      {/* Left face */}
      <polygon points="10,28 40,46 40,80 10,62" fill="#D4A017" />
      {/* Right face */}
      <polygon points="70,28 40,46 40,80 70,62" fill="#B8860B" />
      {/* Foam on top */}
      <ellipse cx="40" cy="10" rx="15" ry="6" fill="#FFF8DC" opacity="0.8" />
    </svg>
  );
}
```

**Step 2: Create all remaining icons using the same 3-face pattern**

Create `src/components/icons/CoffeeIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function CoffeeIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      <polygon points="40,15 65,30 40,45 15,30" fill="#8B5E3C" />
      <polygon points="15,30 40,45 40,75 15,60" fill="#6B4226" />
      <polygon points="65,30 40,45 40,75 65,60" fill="#4A2E1A" />
      {/* Steam suggestion */}
      <circle cx="32" cy="12" r="3" fill="#FAF7F2" opacity="0.5" />
      <circle cx="40" cy="9" r="3" fill="#FAF7F2" opacity="0.5" />
      <circle cx="48" cy="12" r="3" fill="#FAF7F2" opacity="0.5" />
    </svg>
  );
}
```

Create `src/components/icons/WineIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function WineIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Tall narrow shape */}
      <polygon points="40,8 58,20 40,32 22,20" fill="#C0392B" />
      <polygon points="22,20 40,32 40,85 22,73" fill="#922B21" />
      <polygon points="58,20 40,32 40,85 58,73" fill="#7B241C" />
      {/* Stem suggestion at base */}
      <polygon points="34,82 46,82 50,95 30,95" fill="#922B21" />
    </svg>
  );
}
```

Create `src/components/icons/CinemaIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function CinemaIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Flat ticket — thin box */}
      <polygon points="40,20 72,34 40,48 8,34" fill="#E8A820" />
      <polygon points="8,34 40,48 40,62 8,48" fill="#C68A10" />
      <polygon points="72,34 40,48 40,62 72,48" fill="#A06808" />
      {/* Ticket stub line */}
      <line x1="20" y1="27" x2="20" y2="55" stroke="#FAF7F2" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}
```

Create `src/components/icons/StroopwafelIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function StroopwafelIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Very flat disc — thin wafer */}
      <polygon points="40,30 68,42 40,54 12,42" fill="#D4A017" />
      <polygon points="12,42 40,54 40,62 12,50" fill="#B8860B" />
      <polygon points="68,42 40,54 40,62 68,50" fill="#8B6508" />
      {/* Grid pattern on top */}
      <line x1="30" y1="36" x2="50" y2="48" stroke="#B8860B" strokeWidth="1" />
      <line x1="40" y1="32" x2="40" y2="54" stroke="#B8860B" strokeWidth="1" />
    </svg>
  );
}
```

Create `src/components/icons/KroketIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function KroketIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Short cylinder — log shape */}
      <polygon points="40,25 66,38 40,51 14,38" fill="#D2691E" />
      <polygon points="14,38 40,51 40,72 14,59" fill="#A0522D" />
      <polygon points="66,38 40,51 40,72 66,59" fill="#8B4513" />
    </svg>
  );
}
```

Create `src/components/icons/BroodjeIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function BroodjeIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Rounded bun shape */}
      <polygon points="40,18 68,32 40,46 12,32" fill="#F5DEB3" />
      <polygon points="12,32 40,46 40,65 12,51" fill="#DEB887" />
      <polygon points="68,32 40,46 40,65 68,51" fill="#C4A265" />
      {/* Filling suggestion */}
      <polygon points="18,38 62,38 62,46 18,46" fill="#8B4513" opacity="0.4" />
    </svg>
  );
}
```

Create `src/components/icons/TramIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function TramIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* GVB blue tram box */}
      <polygon points="40,12 72,28 40,44 8,28" fill="#0066CC" />
      <polygon points="8,28 40,44 40,78 8,62" fill="#004C99" />
      <polygon points="72,28 40,44 40,78 72,62" fill="#003366" />
      {/* Windows */}
      <polygon points="18,30 30,36 30,44 18,38" fill="#99CCFF" opacity="0.6" />
      <polygon points="50,36 62,30 62,38 50,44" fill="#99CCFF" opacity="0.6" />
    </svg>
  );
}
```

Create `src/components/icons/BurgerIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function BurgerIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Top bun */}
      <polygon points="40,12 68,26 40,40 12,26" fill="#D2691E" />
      {/* Patty layer */}
      <polygon points="12,40 40,54 40,62 12,48" fill="#5C3317" />
      <polygon points="68,40 40,54 40,62 68,48" fill="#3D1F0A" />
      <polygon points="12,40 68,40 40,54" fill="#7A4520" />
      {/* Bottom bun */}
      <polygon points="12,60 40,74 40,82 12,68" fill="#C4A265" />
      <polygon points="68,60 40,74 40,82 68,68" fill="#A08050" />
      <polygon points="12,60 68,60 40,74" fill="#DEB887" />
    </svg>
  );
}
```

Create `src/components/icons/PizzaIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function PizzaIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Pizza box shape */}
      <polygon points="40,15 72,30 40,45 8,30" fill="#F4A460" />
      <polygon points="8,30 40,45 40,60 8,45" fill="#CD853F" />
      <polygon points="72,30 40,45 40,60 72,45" fill="#A0522D" />
      {/* Toppings on top face */}
      <circle cx="35" cy="28" r="3" fill="#CC3333" />
      <circle cx="48" cy="24" r="3" fill="#CC3333" />
      <circle cx="42" cy="34" r="3" fill="#CC3333" />
    </svg>
  );
}
```

Create `src/components/icons/WeedIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function WeedIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Small plastic bag shape — slightly irregular */}
      <polygon points="40,14 65,26 40,38 15,26" fill="#7CB342" />
      <polygon points="15,26 40,38 40,80 15,68" fill="#558B2F" />
      <polygon points="65,26 40,38 40,80 65,68" fill="#33691E" />
      {/* Knot at top */}
      <polygon points="36,10 44,10 46,18 34,18" fill="#558B2F" />
    </svg>
  );
}
```

Create `src/components/icons/CocaineIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function CocaineIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Small white envelope/packet */}
      <polygon points="40,18 68,30 40,42 12,30" fill="#F5F5F5" />
      <polygon points="12,30 40,42 40,72 12,60" fill="#E0E0E0" />
      <polygon points="68,30 40,42 40,72 68,60" fill="#BDBDBD" />
      {/* Fold crease */}
      <line x1="12" y1="30" x2="68" y2="30" stroke="#9E9E9E" strokeWidth="1" />
      <line x1="40" y1="18" x2="40" y2="42" stroke="#9E9E9E" strokeWidth="1" />
    </svg>
  );
}
```

Create `src/components/icons/BJIcon.tsx`:
```tsx
interface IconProps { size?: number }
export function BJIcon({ size = 64 }: IconProps) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" fill="none">
      {/* Red door shape — a classic De Wallen door */}
      <polygon points="40,10 70,24 40,38 10,24" fill="#CC2200" />
      <polygon points="10,24 40,38 40,90 10,76" fill="#991A00" />
      <polygon points="70,24 40,38 40,90 70,76" fill="#771300" />
      {/* Door knob */}
      <circle cx="52" cy="62" r="3" fill="#FFD700" />
    </svg>
  );
}
```

**Step 3: Create barrel export**

Create `src/components/icons/index.ts`:

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
export { BJIcon } from './BJIcon';

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
import { BJIcon } from './BJIcon';

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
  bj: BJIcon,
};
```

**Step 4: Verify build compiles**

```bash
npm run build
```

Expected: compiles successfully (icons not yet used so no render errors).

**Step 5: Commit**

```bash
git add src/components/icons/
git commit -m "feat: add isometric SVG icon components for all 13 Amsterdam items

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4: IsometricTable component

**Files:**
- Create: `src/components/IsometricTable.tsx`

This component renders the isometric tabletop SVG surface with items animating onto it using Framer Motion.

**Step 1: Create the component**

Create `src/components/IsometricTable.tsx`:

```tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { ComboItem } from '@/lib/combo';
import { ITEM_ICONS } from '@/components/icons';

interface IsometricTableProps {
  combo: ComboItem[];
  comboKey: number; // increment to trigger re-animation
}

// Grid positions on the isometric table surface (relative, 0-1)
const TABLE_POSITIONS = [
  { x: 0.5,  y: 0.3  },
  { x: 0.25, y: 0.45 },
  { x: 0.75, y: 0.45 },
  { x: 0.35, y: 0.6  },
  { x: 0.65, y: 0.6  },
  { x: 0.5,  y: 0.7  },
];

const itemVariants = {
  hidden: { y: -60, opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 300,
      damping: 18,
    },
  }),
  exit: {
    y: 60,
    opacity: 0,
    scale: 0.6,
    transition: { duration: 0.2 },
  },
};

export function IsometricTable({ combo, comboKey }: IsometricTableProps) {
  const TABLE_W = 480;
  const TABLE_H = 320;

  // Isometric table surface as SVG parallelogram
  // Top-left, top-right, bottom-right, bottom-left in isometric projection
  const tablePoints = `${TABLE_W * 0.5},20 ${TABLE_W - 20},${TABLE_H * 0.35} ${TABLE_W * 0.5},${TABLE_H * 0.7} 20,${TABLE_H * 0.35}`;
  const leftPoints  = `20,${TABLE_H * 0.35} ${TABLE_W * 0.5},${TABLE_H * 0.7} ${TABLE_W * 0.5},${TABLE_H - 20} 20,${TABLE_H * 0.65}`;
  const rightPoints = `${TABLE_W - 20},${TABLE_H * 0.35} ${TABLE_W * 0.5},${TABLE_H * 0.7} ${TABLE_W * 0.5},${TABLE_H - 20} ${TABLE_W - 20},${TABLE_H * 0.65}`;

  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ height: TABLE_H }}>
      {/* Isometric table surface */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${TABLE_W} ${TABLE_H}`}
        className="absolute inset-0"
      >
        <polygon points={tablePoints} fill="#C8D9C0" />
        <polygon points={leftPoints}  fill="#B0C4A8" />
        <polygon points={rightPoints} fill="#9DB89A" />
        {/* Subtle edge lines */}
        <polygon points={tablePoints} fill="none" stroke="#A8C498" strokeWidth="1" />
      </svg>

      {/* Items on the table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={comboKey}
          className="absolute inset-0"
        >
          {combo.flatMap((comboItem, i) =>
            Array.from({ length: Math.min(comboItem.quantity, 3) }, (_, qIdx) => {
              const posIdx = (i + qIdx) % TABLE_POSITIONS.length;
              const pos = TABLE_POSITIONS[posIdx];
              const Icon = ITEM_ICONS[comboItem.item.id];
              if (!Icon) return null;

              return (
                <motion.div
                  key={`${comboItem.item.id}-${qIdx}`}
                  custom={i + qIdx}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute"
                  style={{
                    left: `${pos.x * 100}%`,
                    top: `${pos.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Icon size={56} />
                  {comboItem.quantity > 1 && qIdx === 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {comboItem.quantity}
                    </span>
                  )}
                </motion.div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

**Step 2: Verify build compiles**

```bash
npm run build
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/components/IsometricTable.tsx
git commit -m "feat: add IsometricTable component with Framer Motion animations

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 5: PlanToggle component

**Files:**
- Create: `src/components/PlanToggle.tsx`
- Create: `src/__tests__/PlanToggle.test.tsx`

**Step 1: Write failing test**

Create `src/__tests__/PlanToggle.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PlanToggle } from '@/components/PlanToggle';

describe('PlanToggle', () => {
  it('renders Pro and Max options', () => {
    render(<PlanToggle selected="pro" onChange={() => {}} />);
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
  });

  it('shows the price for the selected plan', () => {
    render(<PlanToggle selected="pro" onChange={() => {}} />);
    expect(screen.getByText('€19/month')).toBeInTheDocument();
  });

  it('calls onChange with the other plan when clicked', () => {
    const onChange = jest.fn();
    render(<PlanToggle selected="pro" onChange={onChange} />);
    fireEvent.click(screen.getByText('Max'));
    expect(onChange).toHaveBeenCalledWith('max');
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=PlanToggle
```

Expected: FAIL — `Cannot find module '@/components/PlanToggle'`

**Step 3: Implement PlanToggle**

Create `src/components/PlanToggle.tsx`:

```tsx
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
```

**Step 4: Run tests to verify they pass**

```bash
npm test -- --testPathPattern=PlanToggle
```

Expected: PASS — all 3 tests green.

**Step 5: Commit**

```bash
git add src/components/PlanToggle.tsx src/__tests__/PlanToggle.test.tsx
git commit -m "feat: add PlanToggle component with tests

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 6: ComboCard and ShuffleButton components

**Files:**
- Create: `src/components/ComboCard.tsx`
- Create: `src/components/ShuffleButton.tsx`
- Create: `src/__tests__/ComboCard.test.tsx`

**Step 1: Write failing tests**

Create `src/__tests__/ComboCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { ComboCard } from '@/components/ComboCard';
import { ITEMS } from '@/data/items';

const mockCombo = [
  { item: ITEMS.find(i => i.id === 'beer')!, quantity: 3 },
  { item: ITEMS.find(i => i.id === 'coffee')!, quantity: 2 },
];

describe('ComboCard', () => {
  it('renders item labels', () => {
    render(<ComboCard combo={mockCombo} remainder={0.50} />);
    expect(screen.getByText(/Beer/)).toBeInTheDocument();
    expect(screen.getByText(/Coffee/)).toBeInTheDocument();
  });

  it('renders quantities', () => {
    render(<ComboCard combo={mockCombo} remainder={0.50} />);
    expect(screen.getByText(/× 3/)).toBeInTheDocument();
    expect(screen.getByText(/× 2/)).toBeInTheDocument();
  });

  it('renders remainder when positive', () => {
    render(<ComboCard combo={mockCombo} remainder={1.50} />);
    expect(screen.getByText(/€1.50 left/)).toBeInTheDocument();
  });

  it('does not render remainder when zero', () => {
    render(<ComboCard combo={mockCombo} remainder={0} />);
    expect(screen.queryByText(/left/)).not.toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- --testPathPattern=ComboCard
```

Expected: FAIL — `Cannot find module '@/components/ComboCard'`

**Step 3: Implement ComboCard**

Create `src/components/ComboCard.tsx`:

```tsx
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
```

**Step 4: Implement ShuffleButton**

Create `src/components/ShuffleButton.tsx`:

```tsx
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
```

**Step 5: Run tests to verify they pass**

```bash
npm test -- --testPathPattern=ComboCard
```

Expected: PASS — all 4 tests green.

**Step 6: Commit**

```bash
git add src/components/ComboCard.tsx src/components/ShuffleButton.tsx src/__tests__/ComboCard.test.tsx
git commit -m "feat: add ComboCard and ShuffleButton components with tests

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 7: Assemble the main page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace the placeholder page**

Replace `src/app/page.tsx` with:

```tsx
'use client';

import { useState, useCallback } from 'react';
import { PlanToggle } from '@/components/PlanToggle';
import { IsometricTable } from '@/components/IsometricTable';
import { ComboCard } from '@/components/ComboCard';
import { ShuffleButton } from '@/components/ShuffleButton';
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
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-text-primary mb-3">
          Is Claude expensive?
        </h1>
        <p className="text-lg text-gray-500">
          Let&apos;s put it in Amsterdam terms.
        </p>
      </section>

      {/* Plan toggle */}
      <PlanToggle selected={plan} onChange={handlePlanChange} />

      {/* Stage */}
      <section className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 w-full">
          <IsometricTable combo={comboResult.combo} comboKey={comboKey} />
        </div>
        <div className="flex flex-col items-center gap-0">
          <ComboCard combo={comboResult.combo} remainder={comboResult.remainder} />
          <ShuffleButton onClick={handleShuffle} />
        </div>
      </section>

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
          href="https://github.com/YOUR_USERNAME/claude-cost-calculator"
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

**Note:** Replace `YOUR_USERNAME` with the actual GitHub username once the repo is created.

**Step 2: Verify the app runs correctly**

```bash
npm run dev
```

Open http://localhost:3000. Expected:
- Headline renders
- Plan toggle switches between Pro/Max
- Isometric table shows items animating in
- ComboCard shows item list with prices
- Shuffle button generates a new combo

**Step 3: Run all tests**

```bash
npm test
```

Expected: all tests pass.

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble main page with all components wired together

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 8: GitHub setup and README

**Files:**
- Create: `README.md`
- Create: `.gitignore` (should already exist from create-next-app)

**Step 1: Create README**

Create `README.md`:

```markdown
# Claude vs Amsterdam

> Is Claude expensive? Let's put it in Amsterdam terms.

A one-pager that reframes the Claude Pro/Max subscription cost as everyday Amsterdam spending — beers, coffees, cinema tickets, and a few other local staples.

Live: [your-project.vercel.app](https://your-project.vercel.app)

## Running locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript
- Deployed on Vercel

## License

MIT
```

**Step 2: Create GitHub repo and push**

```bash
gh repo create claude-cost-calculator --public --source=. --remote=origin --push
```

If `gh` is not installed: create the repo manually at github.com, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/claude-cost-calculator.git
git push -u origin main
```

**Step 3: Connect to Vercel**

1. Go to vercel.com → New Project
2. Import the `claude-cost-calculator` GitHub repo
3. Keep all defaults (Vercel auto-detects Next.js)
4. Deploy

**Step 4: Update the README with live URL**

Edit `README.md` to replace `your-project.vercel.app` with the actual Vercel URL.

```bash
git add README.md
git commit -m "docs: add README with live URL

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push
```

---

## Task 9: Final polish

**Files:**
- Modify: `src/app/page.tsx` (mobile responsiveness check)
- Modify: `src/components/IsometricTable.tsx` (any visual tweaks)

**Step 1: Test on mobile viewport**

In browser DevTools, toggle the mobile viewport (375px width). Check:
- Text doesn't overflow
- Stage section stacks vertically (flex-col on mobile)
- ComboCard is full-width on mobile

Fix any layout issues. The `flex flex-col md:flex-row` on the Stage section should handle most of it.

**Step 2: Add meta og:image placeholder**

In `src/app/layout.tsx`, the metadata already has OpenGraph title/description. For a proper share preview, a static og:image can be added later — skip for now.

**Step 3: Run full test suite**

```bash
npm test
```

Expected: all tests pass.

**Step 4: Final commit and push**

```bash
git add -A
git commit -m "fix: mobile layout polish and final adjustments

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push
```

Vercel will auto-deploy on push.

---

## Done

The app is live at your Vercel URL. Share it with your Amsterdam friends and watch them justify the subscription in beers.
