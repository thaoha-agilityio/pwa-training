export type Currency = 'USD' | 'EUR';

export interface GoldPrice {
  date: string;
  price: number;
  currency: Currency;
}
