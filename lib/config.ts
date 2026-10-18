export const STORE = {
  brand: 'EUROFIT',
  tag: 'FUEL THE WORK. OWN THE RESULT.',
  currency: 'KES', // SAMPLE market setting: confirm before public sales
  locale: 'en-KE',
  shippingFreeThreshold: 10000,
  shippingFlat: 450,
  email: '', // add real support address before launch
  phone: '', // add real contact number before launch
} as const;
export const money = (value: number) => new Intl.NumberFormat(STORE.locale, { style: 'currency', currency: STORE.currency, maximumFractionDigits: 0 }).format(value);
