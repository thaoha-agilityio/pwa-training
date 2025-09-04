// export type Currency = 'USD' | 'EUR';

export enum CurrencyPair {
  USDXAU = 'USDXAU',
  EURXAU = 'EURXAU',
  XAU = 'XAU',
}

// Rates object with optional pairs
export type Rates = Partial<Record<CurrencyPair, number>>;

export interface GoldPrice {
  date: string;
  price: number;
  rates: Rates;
}
