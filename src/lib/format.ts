const nf = new Intl.NumberFormat('fa-IR');

/** 12500000 → "۱۲٬۵۰۰٬۰۰۰"; strings get Persian digits. */
export const fa = (n: number | string): string =>
  typeof n === 'number' ? nf.format(n) : String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

export const toman = (n: number): string => `${fa(n)} تومان`;

export const discountPercent = (price: number, oldPrice?: number): number =>
  oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

export const cx = (...c: Array<string | false | null | undefined>): string => c.filter(Boolean).join(' ');

export const pad2 = (n: number): string => fa(String(n).padStart(2, '0'));
