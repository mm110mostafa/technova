import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { Icon } from '../ui/Icon';
import { Img, Price } from '../ui/primitives';
import { useShop } from '../../store/useShop';
import { go, useUI } from '../../store/useUI';
import { cx, discountPercent, fa } from '../../lib/format';
import { categoryById } from '../../data/catalog';

const badgeMap = {
  new: { text: 'جدید', cls: 'bg-ink-900 text-white' },
  hot: { text: 'پرفروش', cls: 'bg-volt-400 text-ink-900' },
  limited: { text: 'موجودی محدود', cls: 'bg-rose-500 text-white' }
};

export function useAddToCart() {
  const add = useShop((s) => s.add);
  const toast = useUI((s) => s.toast);
  return (p: Product, qty = 1, color?: string) => {
    if (p.stock <= 0) return;
    add(p.id, qty, color);
    toast({ title: 'به سبد خرید اضافه شد', text: p.title, image: p.images[0] });
  };
}

export function useWish() {
  const toggle = useShop((s) => s.toggleWish);
  const toast = useUI((s) => s.toast);
  return (p: Product) => {
    const on = toggle(p.id);
    toast({ title: on ? 'به علاقه‌مندی‌ها افزوده شد' : 'از علاقه‌مندی‌ها حذف شد', text: p.title, icon: 'heart' });
  };
}

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const inWish = useShop((s) => s.wishlist.includes(p.id));
  const setQuickView = useUI((s) => s.setQuickView);
  const addToCart = useAddToCart();
  const wish = useWish();
  const d = discountPercent(p.price, p.oldPrice);
  const out = p.stock <= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.07 }}
      className="group relative flex h-full flex-col rounded-[1.75rem] bg-white p-3 shadow-card ring-1 ring-ink-100 transition-shadow duration-500 hover:shadow-lift"
    >
      {/* Image */}
      <div className="relative">
        <button onClick={() => go({ name: 'product', id: p.id })} className="block w-full" aria-label={p.title}>
          <Img src={p.images[0]} alt={p.title} className="aspect-[1/0.86] rounded-[1.35rem] bg-mist" imgClass="group-hover:scale-[1.06]" />
        </button>
        <div className="pointer-events-none absolute right-3 top-3 flex flex-col items-start gap-1.5">
          {d > 0 && <span className="rounded-full bg-volt-400 px-2.5 py-1 text-xs font-black text-ink-900 shadow">٪{fa(d)}-</span>}
          {p.badge && <span className={cx('rounded-full px-2.5 py-1 text-[11px] font-bold shadow', badgeMap[p.badge].cls)}>{badgeMap[p.badge].text}</span>}
        </div>
        {/* Action rail (reference: hover side actions) */}
        <div className="absolute left-3 top-3 flex flex-col gap-2 md:translate-x-[-8px] md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-x-0 md:group-hover:opacity-100">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => wish(p)}
            aria-label="افزودن به علاقه‌مندی"
            className={cx('grid h-9 w-9 place-items-center rounded-xl shadow-soft backdrop-blur transition-colors', inWish ? 'bg-rose-500 text-white' : 'bg-white/90 text-ink-900 hover:bg-white')}
          >
            <Icon name="heart" size={17} filled={inWish} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setQuickView(p.id)}
            aria-label="مشاهده سریع"
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/90 text-ink-900 shadow-soft backdrop-blur hover:bg-white"
          >
            <Icon name="eye" size={17} />
          </motion.button>
        </div>
        {out && (
          <div className="absolute inset-0 grid place-items-center rounded-[1.35rem] bg-white/55 backdrop-blur-[2px]">
            <span className="rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold text-white">ناموجود</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-ink-400">{categoryById[p.category]?.title}</span>
          <span className="flex items-center gap-1 font-bold text-ink-700">
            {fa(p.rating)}
            <Icon name="star" size={13} filled stroke={1} className="text-volt-500" />
          </span>
        </div>
        <button onClick={() => go({ name: 'product', id: p.id })} className="text-right">
          <h3 className="line-clamp-2 min-h-[3rem] text-[15px] font-extrabold leading-6 text-ink-900 transition-colors group-hover:text-ink-600">{p.title}</h3>
        </button>
        <p className="mt-1 line-clamp-1 text-xs text-ink-400">{p.subtitle}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <Price price={p.price} oldPrice={p.oldPrice} />
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ rotate: -8 }}
            disabled={out}
            onClick={() => addToCart(p)}
            aria-label="افزودن به سبد خرید"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink-900 text-white shadow-soft transition-colors hover:bg-volt-400 hover:text-ink-900 disabled:bg-ink-200 disabled:text-ink-400"
          >
            <Icon name={out ? 'close' : 'plus'} size={20} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

/** Compact horizontal card — used by "best sellers" listing grid (reference listing grid). */
export function ProductRow({ p, index = 0 }: { p: Product; index?: number }) {
  const d = discountPercent(p.price, p.oldPrice);
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.06 }}
      whileHover={{ y: -4 }}
      onClick={() => go({ name: 'product', id: p.id })}
      className="group flex items-center gap-4 rounded-3xl bg-white p-3 text-right shadow-card ring-1 ring-ink-100 transition-shadow hover:shadow-lift"
    >
      <Img src={p.images[0]} alt={p.title} className="h-24 w-24 shrink-0 rounded-2xl bg-mist sm:h-28 sm:w-28" imgClass="group-hover:scale-110" />
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-1 text-sm font-extrabold text-ink-900">{p.title}</h3>
        <div className="mt-1.5 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon key={i} name="star" size={12} filled stroke={1} className={i <= Math.round(p.rating) ? 'text-volt-500' : 'text-ink-200'} />
          ))}
          <span className="mr-1 text-[11px] text-ink-400">({fa(p.reviews)})</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-black text-ink-900">{fa(p.price)}</span>
          <span className="text-[11px] text-ink-400">تومان</span>
          {d > 0 && <span className="rounded-full bg-volt-100 px-2 py-0.5 text-[10px] font-black text-volt-700">٪{fa(d)}</span>}
        </div>
      </div>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-100 text-ink-900 transition-colors group-hover:bg-ink-900 group-hover:text-white">
        <Icon name="chevronLeft" size={18} />
      </span>
    </motion.button>
  );
}
