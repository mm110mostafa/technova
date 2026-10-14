import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartLine, Route } from '../types';
import { productMap } from '../data/catalog';

interface Toast {
  id: number;
  text: string;
  tone: 'ok' | 'info';
}

interface StoreState {
  /* --- commerce --- */
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  addToCart: (id: string, qty?: number, color?: string) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;

  /* --- ui --- */
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  quickView: string | null;
  toasts: Toast[];
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  setQuickView: (id: string | null) => void;
  toast: (text: string, tone?: Toast['tone']) => void;
  dismissToast: (id: number) => void;
}

let toastSeq = 1;

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      compare: [],
      addToCart: (id, qty = 1, color) => {
        const p = productMap[id];
        if (!p || p.stock === 0) return;
        set((s) => {
          const line = s.cart.find((l) => l.id === id);
          const cart = line
            ? s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(p.stock, l.qty + qty), color: color ?? l.color } : l))
            : [...s.cart, { id, qty: Math.min(p.stock, qty), color }];
          return { cart };
        });
        get().toast(`«${p.title}» به سبد خرید اضافه شد`);
      },
      setQty: (id, qty) =>
        set((s) => ({
          cart: qty <= 0 ? s.cart.filter((l) => l.id !== id) : s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(productMap[id]?.stock ?? qty, qty) } : l))
        })),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((l) => l.id !== id) })),
      clearCart: () => set({ cart: [] }),
      toggleWish: (id) => {
        const has = get().wishlist.includes(id);
        set((s) => ({ wishlist: has ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] }));
        get().toast(has ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها اضافه شد', 'info');
      },

      cartOpen: false,
      searchOpen: false,
      menuOpen: false,
      quickView: null,
      toasts: [],
      setCartOpen: (v) => set({ cartOpen: v }),
      setSearchOpen: (v) => set({ searchOpen: v }),
      setMenuOpen: (v) => set({ menuOpen: v }),
      setQuickView: (id) => set({ quickView: id }),
      toast: (text, tone = 'ok') => {
        const id = toastSeq++;
        set((s) => ({ toasts: [...s.toasts.slice(-2), { id, text, tone }] }));
        setTimeout(() => get().dismissToast(id), 2800);
      },
      dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }),
    {
      name: 'arnotech-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, compare: s.compare })
    }
  )
);

/* ---------- derived selectors ---------- */
export const useCartCount = () => useStore((s) => s.cart.reduce((n, l) => n + l.qty, 0));

export const useCartTotals = () => {
  const cart = useStore((s) => s.cart);
  let subtotal = 0;
  let saved = 0;
  for (const l of cart) {
    const p = productMap[l.id];
    if (!p) continue;
    subtotal += p.price * l.qty;
    if (p.oldPrice) saved += (p.oldPrice - p.price) * l.qty;
  }
  const shipping = subtotal === 0 || subtotal >= 10_000_000 ? 0 : 290_000;
  return { subtotal, saved, shipping, total: subtotal + shipping };
};

/* ---------- tiny hash router ---------- */
function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [path, query = ''] = h.split('?');
  const params = new URLSearchParams(query);
  const seg = path.split('/').filter(Boolean);
  if (seg[0] === 'shop') return { name: 'shop', cat: (params.get('cat') as any) || undefined, q: params.get('q') || undefined };
  if (seg[0] === 'product' && seg[1]) return { name: 'product', id: decodeURIComponent(seg[1]) };
  if (seg[0] === 'cart') return { name: 'cart' };
  if (seg[0] === 'wishlist') return { name: 'wishlist' };
  return { name: 'home' };
}

interface RouterState {
  route: Route;
  sync: () => void;
}

export const useRouter = create<RouterState>()((set) => ({
  route: parseHash(),
  sync: () => set({ route: parseHash() })
}));

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    useRouter.getState().sync();
    useStore.setState({ menuOpen: false, searchOpen: false, quickView: null });
  });
}

export const href = {
  home: () => '#/',
  shop: (cat?: string, q?: string) => {
    const p = new URLSearchParams();
    if (cat) p.set('cat', cat);
    if (q) p.set('q', q);
    const s = p.toString();
    return '#/shop' + (s ? '?' + s : '');
  },
  product: (id: string) => `#/product/${id}`,
  cart: () => '#/cart',
  wishlist: () => '#/wishlist'
};

export const go = (to: string) => {
  window.location.hash = to.replace(/^#/, '');
};
