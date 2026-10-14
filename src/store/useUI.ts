import { create } from 'zustand';
import type { CategoryId, Route } from '../types';

export interface Toast {
  id: number;
  title: string;
  text?: string;
  icon?: string;
  image?: string;
}

interface UIState {
  route: Route;
  cartOpen: boolean;
  menuOpen: boolean;
  searchOpen: boolean;
  quickView: string | null;
  toasts: Toast[];
  setRoute: (r: Route) => void;
  setCart: (v: boolean) => void;
  setMenu: (v: boolean) => void;
  setSearch: (v: boolean) => void;
  setQuickView: (id: string | null) => void;
  toast: (t: Omit<Toast, 'id'>) => void;
  dismiss: (id: number) => void;
}

/* ---------------- Hash router ---------------- */
export function parseHash(hash: string): Route {
  const h = hash.replace(/^#\/?/, '');
  const [path, query = ''] = h.split('?');
  const qs = new URLSearchParams(query);
  const [seg, arg] = path.split('/');
  switch (seg) {
    case 'shop':
      return { name: 'shop', cat: (qs.get('cat') as CategoryId) || undefined, q: qs.get('q') || undefined };
    case 'product':
      return arg ? { name: 'product', id: arg } : { name: 'shop' };
    case 'cart':
      return { name: 'cart' };
    case 'wishlist':
      return { name: 'wishlist' };
    default:
      return { name: 'home' };
  }
}

export function toHash(r: Route): string {
  switch (r.name) {
    case 'shop': {
      const qs = new URLSearchParams();
      if (r.cat) qs.set('cat', r.cat);
      if (r.q) qs.set('q', r.q);
      const s = qs.toString();
      return '#/shop' + (s ? '?' + s : '');
    }
    case 'product':
      return '#/product/' + r.id;
    case 'cart':
      return '#/cart';
    case 'wishlist':
      return '#/wishlist';
    default:
      return '#/';
  }
}

let toastId = 0;

export const useUI = create<UIState>()((set) => ({
  route: parseHash(window.location.hash),
  cartOpen: false,
  menuOpen: false,
  searchOpen: false,
  quickView: null,
  toasts: [],
  setRoute: (route) => set({ route }),
  setCart: (cartOpen) => set({ cartOpen }),
  setMenu: (menuOpen) => set({ menuOpen }),
  setSearch: (searchOpen) => set({ searchOpen }),
  setQuickView: (quickView) => set({ quickView }),
  toast: (t) => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { ...t, id }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })), 3200);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) }))
}));

/** Navigate to a route (updates the hash; the hashchange listener syncs the store). */
export function go(r: Route, anchor?: string) {
  const next = toHash(r);
  useUI.setState({ menuOpen: false, searchOpen: false, quickView: null, cartOpen: false });
  if (window.location.hash === next || (next === '#/' && !window.location.hash)) {
    useUI.getState().setRoute(r);
    if (anchor) scrollToId(anchor);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  pendingAnchor = anchor ?? null;
  window.location.hash = next;
}

let pendingAnchor: string | null = null;
export function consumeAnchor() {
  const a = pendingAnchor;
  pendingAnchor = null;
  return a;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
