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
