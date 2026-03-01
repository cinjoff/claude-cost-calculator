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
  const [plan, setPlan] = useState<PlanKey>('max');
  const [comboKey, setComboKey] = useState(0);
  const [comboResult, setComboResult] = useState<ComboResult>(() => newCombo('max'));

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
