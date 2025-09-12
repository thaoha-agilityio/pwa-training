import { formatCurrency, formatDate } from '../format';

describe('formatCurrency', () => {
  it('should format number with 2 decimals by default', () => {
    expect(formatCurrency(1234.5)).toBe('1,234.50');
    expect(formatCurrency(85)).toBe('85.00');
  });

  it('should format number with custom decimals', () => {
    expect(formatCurrency(1234.567, 3)).toBe('1,234.567');
    expect(formatCurrency(85.4, 1)).toBe('85.4');
  });

  it('should round correctly based on decimals', () => {
    expect(formatCurrency(1.2349, 3)).toBe('1.235');
    expect(formatCurrency(1.2344, 3)).toBe('1.234');
  });

  it('should handle zero', () => {
    expect(formatCurrency(0)).toBe('0.00');
  });
});

describe('formatDate', () => {
  it('should format date as YYYY-MM-DD', () => {
    const date = new Date('2025-09-12T14:35:00Z');
    expect(formatDate(date)).toBe('2025-09-12');
  });

  it('should pad month and day with leading zeros', () => {
    const date = new Date('2025-01-05T00:00:00Z');
    expect(formatDate(date)).toBe('2025-01-05');
  });

  it('should work with local timezone offset', () => {
    const date = new Date('1999-12-31T23:59:59-05:00');
    // ISO will convert to UTC → "2000-01-01T04:59:59.000Z"
    expect(formatDate(date)).toBe('2000-01-01');
  });

  it('should handle epoch start correctly', () => {
    const date = new Date(0); // Jan 1, 1970 UTC
    expect(formatDate(date)).toBe('1970-01-01');
  });
});
