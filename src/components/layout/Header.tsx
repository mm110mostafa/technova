import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { IconButton, Img } from '../ui/primitives';
import { categories, products } from '../../data/catalog';
import { useCartTotals, useShop } from '../../store/useShop';
import { go, useUI } from '../../store/useUI';
import { cx, fa, toman } from '../../lib/format';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <button onClick={() => go({ name: 'home' })} className="group flex items-center gap-2.5" aria-label="آرنوتک - صفحه اصلی">
      <span className={cx('relative grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg]', light ? 'bg-white' : 'bg-ink-900')}>
        <span className="h-4 w-4 rounded-full bg-volt-400 shadow-[0_0_16px_#FFCB24]" />
        <span className={cx('absolute bottom-2 h-[3px] w-5 rounded-full', light ? 'bg-ink-900/20' : 'bg-white/25')} />
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className={cx('text-xl font-black tracking-tight', light ? 'text-white' : 'text-ink-900')}>آرنوتک</span>
        <span className={cx('mt-1 text-[10px] font-bold tracking-[0.2em]', light ? 'text-ink-300' : 'text-ink-400')}>ARNOTECH</span>
      </span>
    </button>
  );
}

const nav = [
  { label: 'فروشگاه', icon: 'bag', mega: true },
  { label: 'لپ‌تاپ گیمینگ', icon: 'gamepad', to: () => go({ name: 'shop', cat: 'gaming' }) },
  { label: 'خدمات', icon: 'wrench', to: () => go({ name: 'home' }, 'services') },
  { label: 'شگفت‌انگیزها', icon: 'zap', to: () => go({ name: 'home' }, 'deals') },
  { label: 'تماس با ما', icon: 'phone', to: () => go({ name: 'home' }, 'contact') }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const { count } = useCartTotals();
  const wishCount = useShop((s) => s.wishlist.length);
  const { setCart, setMenu, setSearch } = useUI();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      {/* Announcement strip */}
      <div className="relative z-40 bg-ink-900 text-[12.5px] text-ink-200">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <p className="flex items-center gap-2 truncate">
            <Icon name="truck" size={15} className="text-volt-400" />
            ارسال رایگان برای سفارش‌های بالای ۲۰ میلیون تومان · کد <b className="font-black text-volt-400">ARNO10</b> برای ۱۰٪ تخفیف اولین خرید
          </p>
          <div className="hidden items-center gap-5 md:flex">
            <span className="flex items-center gap-1.5"><Icon name="clock" size={14} /> شنبه تا پنجشنبه ۹ تا ۲۱</span>
            <a href="tel:02191001234" className="flex items-center gap-1.5 font-bold text-white hover:text-volt-400"><Icon name="phone" size={14} /> ۰۲۱-۹۱۰۰۱۲۳۴</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 px-2 pt-2 sm:px-4">
        <motion.div
          animate={{ y: 0 }}
          className={cx(
            'mx-auto max-w-[1320px] rounded-[1.6rem] transition-all duration-500',
            scrolled ? 'bg-white/85 shadow-soft ring-1 ring-ink-100 backdrop-blur-xl' : 'bg-white ring-1 ring-ink-100'
          )}
          onMouseLeave={() => setMega(false)}
        >
          <div className="flex h-[72px] items-center gap-3 px-3 sm:px-5">
            {/* Mobile menu */}
            <IconButton icon="menu" label="منو" onClick={() => setMenu(true)} className="lg:hidden" />

            <Logo />

            {/* Desktop nav */}
            <nav className="mr-6 hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
              {nav.map((n) => (
                <button
                  key={n.label}
                  onMouseEnter={() => setMega(!!n.mega)}
                  onFocus={() => setMega(!!n.mega)}
                  onClick={() => (n.mega ? go({ name: 'shop' }) : n.to?.())}
                  className={cx(
                    'relative flex h-11 items-center gap-1.5 rounded-xl px-3.5 text-[14.5px] font-bold transition-colors',
                    n.mega && mega ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
                  )}
                >
                  <Icon name={n.icon} size={17} className="text-ink-400" />
                  {n.label}
                  {n.mega && <Icon name="chevronDown" size={15} className={cx('transition-transform', mega && 'rotate-180')} />}
                </button>
              ))}
            </nav>

            <div className="mr-auto flex items-center gap-2">
              <button
                onClick={() => setSearch(true)}
                className="hidden h-11 w-60 items-center gap-2 rounded-2xl bg-ink-100 px-4 text-sm text-ink-400 transition-colors hover:bg-ink-200 xl:flex"
              >
                <Icon name="search" size={18} />
                جستجوی محصول، برند…
                <kbd className="mr-auto rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold text-ink-400 ring-1 ring-ink-200">/</kbd>
              </button>
              <IconButton icon="search" label="جستجو" onClick={() => setSearch(true)} className="xl:hidden" />
              <IconButton icon="heart" label="علاقه‌مندی‌ها" badge={wishCount} onClick={() => go({ name: 'wishlist' })} className="hidden sm:grid" />
              <a href="tel:02191001234" className="hidden h-11 items-center gap-2 rounded-2xl bg-ink-900 px-4 text-sm font-bold text-white transition-colors hover:bg-ink-800 2xl:flex">
                <Icon name="phone" size={17} className="text-volt-400" /> ۹۱۰۰۱۲۳۴
              </a>
              <IconButton icon="bag" label="سبد خرید" badge={count} onClick={() => setCart(true)} active />
            </div>
          </div>

          {/* Mega menu */}
          <AnimatePresence>
            {mega && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="hidden overflow-hidden lg:block"
              >
                <MegaMenu onPick={() => setMega(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>
    </>
  );
}

function MegaMenu({ onPick }: { onPick: () => void }) {
  const deal = products.find((p) => p.id === 'helix-g16')!;
  const groups = [
    { title: 'لپ‌تاپ و سیستم', ids: ['laptop', 'gaming', 'pc'] },
    { title: 'نمایشگر و گرافیک', ids: ['monitor', 'gpu', 'memory'] },
    { title: 'لوازم جانبی', ids: ['keyboard', 'mouse', 'audio'] }
  ];
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1.25fr] gap-6 border-t border-ink-100 p-6">
      {groups.map((g, gi) => (
        <motion.div key={g.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * gi }}>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-ink-900">
            <span className="h-2 w-2 rounded-sm bg-volt-400" /> {g.title}
          </h4>
          <ul className="space-y-1">
            {g.ids.map((id) => {
              const c = categories.find((x) => x.id === id)!;
              return (
                <li key={id}>
                  <button
                    onClick={() => { onPick(); go({ name: 'shop', cat: c.id }); }}
                    className="group flex w-full items-center gap-3 rounded-2xl p-2 text-right transition-colors hover:bg-mist"
                  >
                    <Img src={c.image} alt="" className="h-12 w-12 shrink-0 rounded-xl" imgClass="group-hover:scale-110" />
                    <span className="flex-1">
                      <span className="block text-sm font-bold text-ink-900">{c.title}</span>
                      <span className="block text-xs text-ink-400">{c.subtitle}</span>
                    </span>
                    <Icon name="chevronLeft" size={16} className="text-ink-300 transition-transform group-hover:-translate-x-1 group-hover:text-ink-900" />
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      ))}
      <motion.button
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        onClick={() => { onPick(); go({ name: 'product', id: deal.id }); }}
        className="group relative overflow-hidden rounded-3xl bg-ink-900 p-5 text-right text-white"
      >
        <div className="dot-grid-light absolute inset-0 opacity-60" />
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-volt-400/30 blur-3xl" />
        <span className="relative inline-flex items-center gap-1 rounded-full bg-volt-400 px-3 py-1 text-[11px] font-black text-ink-900">
          <Icon name="zap" size={13} /> پیشنهاد ویژه هفته
        </span>
        <h5 className="relative mt-3 text-lg font-black">{deal.title}</h5>
        <p className="relative mt-1 text-xs text-ink-300">{deal.subtitle}</p>
        <Img src={deal.images[0]} alt="" className="relative mt-3 h-28 rounded-2xl" imgClass="group-hover:scale-105" />
        <div className="relative mt-3 flex items-center justify-between">
          <span className="text-sm font-black">{toman(deal.price)}</span>
          <span className="text-xs text-ink-300 line-through">{fa(deal.oldPrice!)}</span>
        </div>
      </motion.button>
    </div>
  );
}
