import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Statistics } from '../Statistics';
import { StatisticsProp } from "../../types/entry"

describe('Statistics', () => {
  const mockStats: StatisticsProp = {
    totalAnalyze: 10,
    totalProjectRequirements: 20,
    totalMaintenance: 15,
    totalMeetings: 8,
    totalLeaves: 2,
    totalOther: 3,
    grandTotal: 60,
    uniqueDates: new Set(['2023-10-01', '2023-10-02']),
  };

  it('renders Statistics component', () => {
    render(<Statistics stats={mockStats} />);
    expect(screen.getByText('時間統計總覽')).toBeTruthy();
    expect(screen.getByText('分析')).toBeTruthy();
    expect(screen.getByText('專案需求')).toBeTruthy();
    expect(screen.getByText('維運')).toBeTruthy();
    expect(screen.getByText('會議')).toBeTruthy();
    expect(screen.getByText('請假')).toBeTruthy();
    expect(screen.getByText('其他')).toBeTruthy();
    expect(screen.getByText('總計')).toBeTruthy();
    expect(screen.getByText('已記錄天數：2 天')).toBeTruthy();
  });

  it('displays correct total and percentages', () => {
    render(<Statistics stats={mockStats} />);
    expect(screen.getAllByText('10.0')).toBeTruthy();
    expect(screen.getAllByText('16.7%')).toBeTruthy();
    expect(screen.getAllByText('20.0')).toBeTruthy();
    expect(screen.getAllByText('33.3%')).toBeTruthy();
    expect(screen.getAllByText('15.0')).toBeTruthy();
    expect(screen.getAllByText('25.0%')).toBeTruthy();
    expect(screen.getAllByText('8.0')).toBeTruthy();
    expect(screen.getAllByText('13.3%')).toBeTruthy();
    expect(screen.getAllByText('2.0')).toBeTruthy();
    expect(screen.getAllByText('3.3%')).toBeTruthy();
    expect(screen.getAllByText('60.0')).toBeTruthy();
    expect(screen.getAllByText('100%')).toBeTruthy();
  });
});