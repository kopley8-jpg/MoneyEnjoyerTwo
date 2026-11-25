import z from 'zod';

export const CURRENCIES = {
  RUB: { symbol: '₽', exponent: 2 },
  UAH: { symbol: '₴', exponent: 2 },
  USD: { symbol: '$', exponent: 2 },
  EUR: { symbol: '€', exponent: 2 },
  JPY: { symbol: '¥', exponent: 0 },
};

export type CurrencyCode = keyof typeof CURRENCIES;
export const currencyCodes = Object.keys(CURRENCIES) as CurrencyCode[];
export const zodCurrencyCodes = currencyCodes.map(c => z.literal(c));
