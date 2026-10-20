import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { Button, Img, Price, Stars } from '../ui/primitives';
import { Logo } from './Header';
import { categories, productById, products } from '../../data/catalog';
import { useCartTotals, useShop } from '../../store/useShop';
import { go, useUI } from '../../store/useUI';
import { cx, fa, toman } from '../../lib/format';
import { useAddToCart, useWish } from '../product/ProductCard';

const ease = [0.22, 1, 0.36, 1] as const;

function useLockScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [lock]);
}

function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm"
    />
  );
}

function Drawer({ open, onClose, side, children, label }: { open: boolean; onClose: () => void; side: 'left' | 'right'; children: ReactNode; label: string }) {
  useLockScroll(open);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-label={label}
            initial={{ x: side === 'left' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'left' ? '-100%' : '100%' }}
            transition={{ duration: 0.5, ease }}
            className={cx('fixed bottom-0 top-0 z-50 flex w-[min(420px,92vw)] flex-col bg-white shadow-2xl', side === 'left' ? 'left-0 rounded-r-[2rem]' : 'right-0 rounded-l-[2rem]')}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Cart drawer ---------------- */
export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const setCart = useUI((s) => s.setCart);
  const cart = useShop((s) => s.cart);
  const setQty = useShop((s) => s.setQty);
  const remove = useShop((s) => s.remove);
  const t = useCartTotals();
  const freeLeft = Math.max(0, 20_000_000 - t.subtotal);
  const progress = Math.min(100, (t.subtotal / 20_000_000) * 100);

  return (
    <Drawer open={open} onClose={() => setCart(false)} side="left" label="سبد خرید">
      <div className="flex items-center justify-between border-b border-ink-100 p-5">
        <div>
          <h3 className="text-lg font-black text-ink-900">سبد خرید</h3>
          <p className="text-xs text-ink-400">{fa(t.count)} کالا</p>
        </div>
        <button onClick={() => setCart(false)} aria-label="بستن" className="grid h-10 w-10 place-items-center rounded-xl bg-ink-100 hover:bg-ink-200">
          <Icon name="close" size={18} />
        </button>
      </div>

      {cart.length > 0 && (
        <div className="border-b border-ink-100 px-5 py-4">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold text-ink-600">
            <Icon name="truck" size={16} className="text-volt-600" />
            {freeLeft > 0 ? <>تنها {toman(freeLeft)} تا ارسال رایگان</> : 'ارسال این سفارش رایگان است 🎉'}
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-ink-100">
            <motion.div initial={{ width: 0 }} animate={{ width: progress + '%' }} transition={{ duration: 0.8, ease }} className="h-full rounded-full bg-gradient-to-l from-volt-400 to-volt-600" />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-5">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="grid h-24 w-24 place-items-center rounded-[2rem] bg-ink-100 text-ink-400">
              <Icon name="bag" size={40} stroke={1.4} />
            </motion.div>
            <h4 className="mt-5 font-black text-ink-900">سبد خرید شما خالی است</h4>
            <p className="mt-1 text-sm text-ink-400">از میان صدها محصول اصل، انتخاب کنید.</p>
            <Button className="mt-6" icon="arrowLeft" onClick={() => go({ name: 'shop' })}>رفتن به فروشگاه</Button>
          </div>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {cart.map((l) => {
                const p = productById[l.id];
                if (!p) return null;
                return (
                  <motion.li
                    key={l.id}
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="flex gap-3 rounded-3xl bg-mist p-3"
                  >
                    <Img src={p.images[0]} alt={p.title} className="h-20 w-20 shrink-0 rounded-2xl bg-white" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start gap-2">
                        <button onClick={() => go({ name: 'product', id: p.id })} className="line-clamp-2 flex-1 text-right text-sm font-bold leading-6 text-ink-900">{p.title}</button>
                        <button onClick={() => remove(p.id)} aria-label="حذف" className="text-ink-300 transition-colors hover:text-rose-500"><Icon name="trash" size={17} /></button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <Qty value={l.qty} max={p.stock} onChange={(v) => setQty(p.id, v)} small />
                        <span className="text-sm font-black text-ink-900">{fa(p.price * l.qty)}</span>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <div className="space-y-3 border-t border-ink-100 p-5">
          {t.savings > 0 && (
            <div className="flex justify-between text-sm text-emerald-600"><span>سود شما از خرید</span><span className="font-bold">{toman(t.savings)}</span></div>
          )}
          <div className="flex justify-between text-base"><span className="font-bold text-ink-600">جمع کل</span><span className="font-black text-ink-900">{toman(t.subtotal)}</span></div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => go({ name: 'cart' })}>مشاهده سبد</Button>
            <Button variant="volt" icon="arrowLeft" onClick={() => go({ name: 'cart' })}>تسویه حساب</Button>
          </div>
        </div>
      )}
    </Drawer>
  );
}

export function Qty({ value, onChange, max, small }: { value: number; onChange: (v: number) => void; max: number; small?: boolean }) {
  const s = small ? 'h-8 w-8' : 'h-12 w-12';
  return (
    <div className={cx('flex items-center rounded-2xl bg-white ring-1 ring-ink-200', small ? 'p-0.5' : 'p-1')}>
      <motion.button whileTap={{ scale: 0.85 }} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="افزایش" className={cx('grid place-items-center rounded-xl text-ink-900 hover:bg-ink-100 disabled:opacity-30', s)}>
        <Icon name="plus" size={small ? 15 : 18} />
      </motion.button>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className={cx('text-center font-black text-ink-900', small ? 'w-7 text-sm' : 'w-10')}>
          {fa(value)}
        </motion.span>
      </AnimatePresence>
      <motion.button whileTap={{ scale: 0.85 }} onClick={() => onChange(value - 1)} aria-label="کاهش" className={cx('grid place-items-center rounded-xl text-ink-900 hover:bg-ink-100', s)}>
        <Icon name={value <= 1 ? 'trash' : 'minus'} size={small ? 15 : 18} />
      </motion.button>
    </div>
  );
}

/* ---------------- Mobile menu ---------------- */
export function MobileMenu() {
  const open = useUI((s) => s.menuOpen);
  const setMenu = useUI((s) => s.setMenu);
  const [catOpen, setCatOpen] = useState(false);
  // keep the category grid collapsed each time the drawer opens — the user expands it on demand
  useEffect(() => { if (open) setCatOpen(false); }, [open]);
  return (
    <Drawer open={open} onClose={() => setMenu(false)} side="right" label="منوی اصلی">
      <div className="flex items-center justify-between border-b border-ink-100 p-5">
        <Logo />
        <button onClick={() => setMenu(false)} aria-label="بستن" className="grid h-10 w-10 place-items-center rounded-xl bg-ink-100"><Icon name="close" size={18} /></button>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <button onClick={() => go({ name: 'home' })} className="flex w-full items-center gap-3 rounded-2xl p-3 font-bold text-ink-900 hover:bg-mist">
          <Icon name="home" className="text-ink-400" /> صفحه اصلی
        </button>
        <button onClick={() => setCatOpen(!catOpen)} className="flex w-full items-center gap-3 rounded-2xl p-3 font-bold text-ink-900 hover:bg-mist">
          <Icon name="grid" className="text-ink-400" /> دسته‌بندی محصولات
          <Icon name="chevronDown" size={16} className={cx('mr-auto transition-transform', catOpen && 'rotate-180')} />
        </button>
        <AnimatePresence initial={false}>
          {catOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="grid grid-cols-3 gap-2 px-1 py-2">
                {categories.map((c, i) => (
                  <motion.button
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i }}
                    onClick={() => go({ name: 'shop', cat: c.id })}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-mist p-2.5 text-center"
                  >
                    <Img src={c.image} alt="" className="aspect-square w-full rounded-xl" />
                    <span className="text-[11.5px] font-bold leading-4 text-ink-900">{c.title}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={() => go({ name: 'shop' })} className="flex w-full items-center gap-3 rounded-2xl p-3 font-bold text-ink-900 hover:bg-mist">
          <Icon name="bag" className="text-ink-400" /> فروشگاه
          <Icon name="chevronLeft" size={16} className="mr-auto text-ink-300" />
        </button>
        {[
          ['zap', 'شگفت‌انگیزها', () => go({ name: 'home' }, 'deals')],
          ['wrench', 'خدمات ارتقا و تعمیر', () => go({ name: 'home' }, 'services')],
          ['heart', 'علاقه‌مندی‌ها', () => go({ name: 'wishlist' })],
          ['info', 'سوالات متداول', () => go({ name: 'home' }, 'faq')],
          ['phone', 'تماس با ما', () => go({ name: 'home' }, 'contact')],
          ['shield', 'درباره ما', () => go({ name: 'home' }, 'about')]
        ].map(([icon, label, fn]) => (
          <button key={label as string} onClick={fn as () => void} className="flex w-full items-center gap-3 rounded-2xl p-3 font-bold text-ink-900 hover:bg-mist">
            <Icon name={icon as string} className="text-ink-400" /> {label as string}
          </button>
        ))}
      </nav>
      <div className="border-t border-ink-100 p-4">
        <a href="tel:02191001234" className="flex items-center justify-center gap-2 rounded-2xl bg-ink-900 py-3.5 font-bold text-white">
          <Icon name="phone" className="text-volt-400" /> مشاوره رایگان: ۹۱۰۰۱۲۳۴
        </a>
      </div>
    </Drawer>
  );
}

/* ---------------- Search overlay ---------------- */
export function SearchOverlay() {
  const open = useUI((s) => s.searchOpen);
  const setSearch = useUI((s) => s.setSearch);
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useLockScroll(open);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); setSearch(true); }
      if (e.key === 'Escape') setSearch(false);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [setSearch]);
  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 120); else setQ(''); }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products.filter((p) => (p.title + p.subtitle + p.brand + p.category).toLowerCase().includes(s)).slice(0, 6);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={() => setSearch(false)} />
          <motion.div
            role="dialog"
            aria-label="جستجو"
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-x-3 top-4 z-50 mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl sm:top-16"
          >
            <form
              onSubmit={(e) => { e.preventDefault(); go({ name: 'shop', q: q.trim() || undefined }); }}
              className="flex items-center gap-3 border-b border-ink-100 p-4"
            >
              <Icon name="search" size={22} className="text-ink-400" />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="مثلا: لپ‌تاپ گیمینگ، RTX، کیبورد…"
                className="h-11 flex-1 border-0 bg-transparent text-base font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-0"
              />
              <button type="button" onClick={() => setSearch(false)} className="rounded-xl bg-ink-100 px-3 py-1.5 text-xs font-bold text-ink-500">Esc</button>
            </form>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {!q && (
                <div className="p-2">
                  <p className="mb-3 text-xs font-bold text-ink-400">جستجوهای پرطرفدار</p>
                  <div className="flex flex-wrap gap-2">
                    {['RTX 4070', 'اولترابوک', 'مانیتور خمیده', 'کیبورد مکانیکال', 'DDR5', 'هدفون'].map((t) => (
                      <button key={t} onClick={() => setQ(t)} className="rounded-full bg-mist px-3.5 py-2 text-sm font-bold text-ink-700 hover:bg-ink-100">{t}</button>
                    ))}
                  </div>
                </div>
              )}
              {q && results.length === 0 && <p className="p-6 text-center text-sm text-ink-400">نتیجه‌ای برای «{q}» پیدا نشد.</p>}
              {results.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => go({ name: 'product', id: p.id })}
                  className="flex w-full items-center gap-3 rounded-2xl p-2 text-right hover:bg-mist"
                >
                  <Img src={p.images[0]} alt="" className="h-14 w-14 shrink-0 rounded-xl" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-ink-900">{p.title}</span>
                    <span className="block truncate text-xs text-ink-400">{p.subtitle}</span>
                  </span>
                  <span className="text-sm font-black text-ink-900">{fa(p.price)}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Quick view modal ---------------- */
export function QuickView() {
  const id = useUI((s) => s.quickView);
  const setQuickView = useUI((s) => s.setQuickView);
  const p = id ? productById[id] : null;
  const addToCart = useAddToCart();
  const wish = useWish();
  const inWish = useShop((s) => (id ? s.wishlist.includes(id) : false));
  const [img, setImg] = useState(0);
  useLockScroll(!!p);
  useEffect(() => setImg(0), [id]);

  return (
    <AnimatePresence>
      {p && (
        <>
          <Backdrop onClick={() => setQuickView(null)} />
          <motion.div
            role="dialog"
            aria-label={p.title}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-x-3 bottom-3 top-auto z-50 mx-auto max-h-[90vh] max-w-4xl overflow-y-auto rounded-[2rem] bg-white p-4 shadow-2xl sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:p-6"
          >
            <button onClick={() => setQuickView(null)} aria-label="بستن" className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-xl bg-ink-100 hover:bg-ink-200"><Icon name="close" size={18} /></button>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div key={img} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                    <Img src={p.images[img]} alt={p.title} className="aspect-square rounded-3xl bg-mist" />
                  </motion.div>
                </AnimatePresence>
                {p.images.length > 1 && (
                  <div className="mt-3 flex gap-2">
                    {p.images.map((src, i) => (
                      <button key={src} onClick={() => setImg(i)} className={cx('h-16 w-16 overflow-hidden rounded-2xl ring-2 transition', i === img ? 'ring-ink-900' : 'ring-transparent opacity-60 hover:opacity-100')}>
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-ink-400">{p.brand}</span>
                <h3 className="mt-1 text-xl font-black leading-8 text-ink-900">{p.title}</h3>
                <div className="mt-2 flex items-center gap-2"><Stars value={p.rating} /><span className="text-xs text-ink-400">{fa(p.reviews)} دیدگاه</span></div>
                <ul className="mt-5 space-y-2">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-ink-600"><Icon name="check" size={18} className="text-volt-600" />{h}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <Price price={p.price} oldPrice={p.oldPrice} size="lg" />
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1" variant="primary" icon="bag" disabled={p.stock <= 0} onClick={() => { addToCart(p); setQuickView(null); }}>
                      {p.stock > 0 ? 'افزودن به سبد' : 'ناموجود'}
                    </Button>
                    <Button variant="ghost" onClick={() => wish(p)} aria-label="علاقه‌مندی" className="w-12 !px-0">
                      <Icon name="heart" filled={inWish} className={inWish ? 'text-rose-500' : ''} />
                    </Button>
                  </div>
                  <button onClick={() => go({ name: 'product', id: p.id })} className="mt-3 w-full text-center text-sm font-bold text-ink-500 hover:text-ink-900">مشاهده جزئیات کامل ←</button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Toasts ---------------- */
export function Toasts() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismiss);
  const setCart = useUI((s) => s.setCart);
  return (
    <div className="pointer-events-none fixed bottom-24 left-3 right-3 z-[60] flex flex-col items-center gap-2 sm:bottom-6 sm:left-6 sm:right-auto sm:items-start">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-3xl bg-ink-900 p-2.5 pl-3 text-white shadow-2xl ring-1 ring-white/10"
          >
            {t.image ? (
              <img src={t.image} alt="" className="h-12 w-12 rounded-2xl object-cover" />
            ) : (
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-volt-400"><Icon name={t.icon ?? 'check'} /></span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">{t.title}</p>
              {t.text && <p className="truncate text-xs text-ink-300">{t.text}</p>}
            </div>
            {t.image ? (
              <button onClick={() => { setCart(true); dismiss(t.id); }} className="rounded-xl bg-volt-400 px-3 py-2 text-xs font-black text-ink-900">مشاهده</button>
            ) : (
              <button onClick={() => dismiss(t.id)} aria-label="بستن" className="text-ink-400"><Icon name="close" size={16} /></button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Mobile bottom tab bar ---------------- */
export function MobileTabBar() {
  const route = useUI((s) => s.route);
  const { setCart, setSearch, setMenu } = useUI();
  const { count } = useCartTotals();
  const items = [
    { icon: 'home', label: 'خانه', active: route.name === 'home', fn: () => go({ name: 'home' }) },
    { icon: 'grid', label: 'دسته‌ها', active: false, fn: () => setMenu(true) },
    { icon: 'search', label: 'جستجو', active: false, fn: () => setSearch(true) },
    { icon: 'bag', label: 'فروشگاه', active: route.name === 'shop', fn: () => go({ name: 'shop' }) },
    { icon: 'card', label: 'سبد', active: route.name === 'cart', fn: () => setCart(true), badge: count }
  ];
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-[1.6rem] bg-white/90 p-1.5 shadow-lift ring-1 ring-ink-100 backdrop-blur-xl md:hidden" aria-label="ناوبری موبایل">
      <ul className="grid grid-cols-5">
        {items.map((it) => (
          <li key={it.label}>
            <button onClick={it.fn} className="relative flex w-full flex-col items-center gap-0.5 rounded-2xl py-2 text-[10.5px] font-bold">
              {it.active && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-2xl bg-ink-900" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className={cx('relative', it.active ? 'text-volt-400' : 'text-ink-500')}>
                <Icon name={it.icon} size={21} />
                {!!it.badge && <span className="absolute -left-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-volt-400 px-1 text-[9px] font-black text-ink-900">{fa(it.badge)}</span>}
              </span>
              <span className={cx('relative', it.active ? 'text-white' : 'text-ink-500')}>{it.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
