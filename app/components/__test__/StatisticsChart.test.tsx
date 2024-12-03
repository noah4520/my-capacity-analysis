import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import { StatisticsChart } from '../StatisticsChart';

describe('StatisticsChart', () => {

  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  const mockStats = {
    totalAnalyze: 10,
    totalProjectRequirements: 20,
    totalMaintenance: 15,
    totalMeetings: 8,
    totalLeaves: 2,
    totalOther: 5,
    grandTotal: 60,
    uniqueDates: new Set(['2023-01-01', '2023-01-02']),
  };

  it('renders StatisticsChart component', () => {
    render(<StatisticsChart stats={mockStats} />);
    expect(screen.getByText('工作時間分配')).toBeTruthy();
    expect(screen.getByText('總工時: 60.0 小時')).toBeTruthy();
    expect(screen.getByText('顯示各項工作時間佔比')).toBeTruthy();
  });

  it('filters out zero values', () => {
    const zeroStats = { ...mockStats, totalNotes: 0, totalLeaves: 0 };
    render(<StatisticsChart stats={zeroStats} />);
    expect(screen.queryByText('分析 (0h)')).toBeNull();
    expect(screen.queryByText('請假 (0h)')).toBeNull();
  });
});