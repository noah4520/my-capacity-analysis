import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DateSelector } from '../DateSelector';

describe('DateSelector', () => {
  const mockOnDateSelect = vi.fn();
  const mockDate = new Date('2023-10-01');

  it('renders DateSelector component', () => {
    render(<DateSelector selectedDate={mockDate} onDateSelect={mockOnDateSelect} />);
    expect(screen.getByText('選擇日期')).toBeTruthy();
  });
});