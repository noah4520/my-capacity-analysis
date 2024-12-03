import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TimeEntryForm } from '../TimeEntryForm';
import { TimeEntry } from '../../types/entry';

describe('TimeEntryForm', () => {
  const mockNewEntry: TimeEntry = {
    analyze: '',
    projectRequirements: '',
    maintenance: '',
    meetings: '',
    leaves: '',
    other: '',
  };

  const mockOnInputChange = vi.fn();
  const mockOnAddEntry = vi.fn();

  it('renders TimeEntryForm component', () => {
    render(
      <TimeEntryForm 
        newEntry={mockNewEntry} 
        onInputChange={mockOnInputChange} 
        onAddEntry={mockOnAddEntry} 
      />
    );

    expect(screen.getByLabelText('分析 (小時)')).toBeTruthy();
    expect(screen.getByLabelText('專案需求 (小時)')).toBeTruthy();
    expect(screen.getByLabelText('維運 (小時)')).toBeTruthy();
    expect(screen.getByLabelText('會議 (小時)')).toBeTruthy();
    expect(screen.getByLabelText('請假 (小時)')).toBeTruthy();
    expect(screen.getByLabelText('其他')).toBeTruthy();
    expect(screen.getByText('新增記錄')).toBeTruthy();
  });

  it('calls onInputChange when input values change', () => {
    render(
      <TimeEntryForm 
        newEntry={mockNewEntry} 
        onInputChange={mockOnInputChange} 
        onAddEntry={mockOnAddEntry} 
      />
    );

    const analyzeInput = screen.getByLabelText('分析 (小時)');
    fireEvent.change(analyzeInput, { target: { value: '5' } });
    expect(mockOnInputChange).toHaveBeenCalledWith('analyze', '5');

    const projectRequirementsInput = screen.getByLabelText('專案需求 (小時)');
    fireEvent.change(projectRequirementsInput, { target: { value: '10' } });
    expect(mockOnInputChange).toHaveBeenCalledWith('projectRequirements', '10');
  });
});