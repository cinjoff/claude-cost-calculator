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
