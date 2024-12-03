import { beforeAll } from "vitest";

/**
 * @see https://github.com/jsdom/jsdom/issues/3368#issuecomment-1147970817
 */
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TimeAllocationTracker from './page';

describe('TimeAllocationTracker', () => {
  it('renders without crashing', () => {
    render(<TimeAllocationTracker />);
    expect(screen.getByText(/時間記錄/)).toBeTruthy();
  });
});