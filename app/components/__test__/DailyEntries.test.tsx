import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DailyEntries } from '../DailyEntries';
import { TimeEntryWithDate } from '../../types/entry';

describe('DailyEntries', () => {
  const mockEntries: TimeEntryWithDate[] = [
    {
      id: 1,
      analyze: '2',
      projectRequirements: '1',
      maintenance: '1',
      meetings: '1',
      leaves: '0',
      other: '0',
      date: new Date('2023-10-01')
    },
    {
      id: 2,
      analyze: '1',
      projectRequirements: '2',
      maintenance: '0',
      meetings: '1',
      leaves: '1',
      other: '0',
      date: new Date('2023-10-01')
    },
  ];

  const mockOnDeleteEntry = vi.fn();

  it('renders daily total time', () => {
    render(<DailyEntries entries={mockEntries} onDeleteEntry={mockOnDeleteEntry} dailyTotal="5" />);
    expect(screen.getByText(/當日總工作時間：5 小時/)).toBeTruthy();
  });

  it('renders entries correctly', () => {
    render(<DailyEntries entries={mockEntries} onDeleteEntry={mockOnDeleteEntry} dailyTotal="5" />);
    expect(screen.getAllByText(/分析: 1 小時/)[0]).toBeTruthy();
    expect(screen.getAllByText(/專案需求: 2 小時/)).toBeTruthy();
    expect(screen.getAllByText(/維運: 0 小時/)).toBeTruthy();
    expect(screen.getAllByText(/會議: 1 小時/)).toBeTruthy();
    expect(screen.getAllByText(/請假: 1 小時/)).toBeTruthy();
    expect(screen.getAllByText(/其他: 0 小時/)).toBeTruthy();
  });

  it('calls onDeleteEntry when delete button is clicked', () => {
    render(<DailyEntries entries={mockEntries} onDeleteEntry={mockOnDeleteEntry} dailyTotal="5" />);
    const deleteButtons = screen.getAllByRole('button');
    fireEvent.click(deleteButtons[0]);
    expect(mockOnDeleteEntry).toHaveBeenCalledWith(1);
  });
});