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
