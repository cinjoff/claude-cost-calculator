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
