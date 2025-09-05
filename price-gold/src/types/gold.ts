export enum CurrencyPair {
  USDXAU = 'USDXAU',
  EURXAU = 'EURXAU',
  XAU = 'XAU',
}

export type Rates = Partial<Record<CurrencyPair, number>>;

export interface GoldPrice {
  date: string;
  price: number;
  rates: Rates;
}
