import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine } from '../types';
import { productById } from '../data/catalog';

interface ShopState {
  cart: CartLine[];
  wishlist: string[];
  coupon: string | null;
  add: (id: string, qty?: number, color?: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleWish: (id: string) => boolean;
  applyCoupon: (code: string) => boolean;
}

export const COUPONS: Record<string, number> = { ARNO10: 0.1, WELCOME5: 0.05 };

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      coupon: null,
      add: (id, qty = 1, color) =>
        set((s) => {
          const stock = productById[id]?.stock ?? 0;
          const line = s.cart.find((l) => l.id === id);
          if (line) {
            return { cart: s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(stock, l.qty + qty), color: color ?? l.color } : l)) };
          }
          return { cart: [...s.cart, { id, qty: Math.min(stock, qty), color }] };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          cart: qty <= 0 ? s.cart.filter((l) => l.id !== id) : s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(productById[id]?.stock ?? qty, qty) } : l))
        })),
      remove: (id) => set((s) => ({ cart: s.cart.filter((l) => l.id !== id) })),
      clear: () => set({ cart: [], coupon: null }),
      toggleWish: (id) => {
        const has = get().wishlist.includes(id);
        set((s) => ({ wishlist: has ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] }));
        return !has;
      },
      applyCoupon: (code) => {
        const c = code.trim().toUpperCase();
        if (COUPONS[c]) {
          set({ coupon: c });
          return true;
        }
        return false;
      }
    }),
    { name: 'arnotech-shop' }
  )
);

/** Derived totals — computed from the cart, never stored. */
export function useCartTotals() {
  const cart = useShop((s) => s.cart);
  const coupon = useShop((s) => s.coupon);
  let count = 0;
  let subtotal = 0;
  let savings = 0;
  for (const l of cart) {
    const p = productById[l.id];
    if (!p) continue;
    count += l.qty;
    subtotal += p.price * l.qty;
    if (p.oldPrice) savings += (p.oldPrice - p.price) * l.qty;
  }
  const couponOff = coupon ? Math.round(subtotal * (COUPONS[coupon] ?? 0)) : 0;
  const shipping = subtotal === 0 || subtotal > 20_000_000 ? 0 : 450_000;
  return { count, subtotal, savings, couponOff, shipping, total: subtotal - couponOff + shipping };
}
