import { describe, expect, it } from 'vitest';
import { formatEventDate, formatEventDateRange, formatPostDate } from '../../src/lib/dates';

describe('date formatting', () => {
  it('formats event dates for people, without shifting the day', () => {
    expect(formatEventDate('2027-01-16')).toBe('Sat, Jan 16, 2027');
    expect(formatEventDate('2027-06-08')).toBe('Tue, Jun 8, 2027');
  });

  it('joins date ranges with an en dash and collapses single-day ranges', () => {
    expect(formatEventDateRange('2026-12-01', '2027-01-25')).toBe(
      'Tue, Dec 1, 2026 – Mon, Jan 25, 2027',
    );
    expect(formatEventDateRange('2027-04-10')).toBe('Sat, Apr 10, 2027');
    expect(formatEventDateRange('2027-04-10', '2027-04-10')).toBe('Sat, Apr 10, 2027');
  });

  it('formats post dates in long form', () => {
    expect(formatPostDate('2026-11-08')).toBe('November 8, 2026');
  });

  it('rejects values that are not plain ISO dates', () => {
    expect(() => formatEventDate('Jan 16')).toThrow(/2027-01-16/);
  });
});
