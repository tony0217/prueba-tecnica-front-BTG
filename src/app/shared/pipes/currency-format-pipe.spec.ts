import { CurrencyFormatPipe } from './currency-format-pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a number as COP currency', () => {
    const result = pipe.transform(500000);
    expect(result).toContain('500');
  });

  it('should handle zero value', () => {
    const result = pipe.transform(0);
    expect(result).toBeDefined();
  });
});
