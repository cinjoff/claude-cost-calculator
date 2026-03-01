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
      expect(result.combo.length).toBeLessThanOrEqual(5);
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
