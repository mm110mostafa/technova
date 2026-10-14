import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { Button, SectionHeading, ease } from '../ui/primitives';
import { CarouselNav, useCarousel } from './Categories';
import { ProductCard, ProductRow } from '../product/ProductCard';
import { builds, categories, products } from '../../data/catalog';
import { href, useStore } from '../../store/useStore';
import { cx, discountPercent, fa, pad2, toman } from '../../lib/format';

/* ---------------- Builds / projects slider ---------------- */
export function Builds() {
  const { ref, scroll } = useCarousel();
  return (
    <section id="builds" className="relative scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="پروژه‌ها و سیستم‌های اسمبل‌شده"
          title="بخشی از سیستم‌هایی که ساخته‌ایم"
          action={<CarouselNav onPrev={() => scroll(-1)} onNext={() => scroll(1)} />}
        />
        <div ref={ref} className="snap-row no-scrollbar -mx-4 mt-10 flex gap-5 overflow-x-auto px-4 pb-6 sm:mx-0 sm:px-0">
          {builds.map((b, i) => (
            <motion.article
              key={b.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: Math.min(i, 4) * 0.07 }}
              className="group w-[82%] shrink-0 sm:w-[46%] lg:w-[31.5%] xl:w-[23.7%]"
            >
              <div className="overflow-hidden rounded-[28px] border border-ink-100 bg-white shadow-card transition-shadow duration-500 group-hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
                  <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-black text-ink-900 backdrop-blur">{b.use}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-black text-ink-900">{b.title}</h3>
                  <dl className="mt-4 grid grid-cols-3 divide-x divide-x-reverse divide-ink-100 rounded-2xl bg-mist py-3">
                    {([['پردازنده', b.cpu], ['گرافیک', b.gpu], ['کاربرد', b.use]] as [string, string][]).map(([k, v]) => (
                      <div key={k} className="px-2 text-center">
                        <dt className="text-[10px] font-bold text-ink-400">{k}</dt>
                        <dd className="mt-1 truncate text-xs font-extrabold text-ink-900">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a href="#contact" className="mt-4 flex items-center justify-between rounded-2xl border border-ink-100 px-4 py-3 text-sm font-extrabold text-ink-900 transition-colors duration-300 group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-white">
                    سفارش مشابه
                    <Icon name="arrowLeft" size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Products slider with tab filter ---------------- */
export function ProductSlider() {
  const { ref, scroll } = useCarousel();
  const tabs = [{ id: 'all', title: 'همه' }, ...categories.filter((c) => products.some((p) => p.category === c.id)).slice(0, 5)];
  const [tab, setTab] = useState('all');
  const list = useMemo(() => (tab === 'all' ? products.filter((p) => p.featured) : products.filter((p) => p.category === tab)), [tab]);

  return (
    <section id="products" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="محصولات ما"
          title="جدیدترین‌های فروشگاه آرنوتک"
          action={
            <div className="flex items-center gap-3">
              <Button href={href.shop()} variant="outline" size="sm" icon="chevronLeft">مشاهده همه</Button>
              <div className="hidden sm:block"><CarouselNav onPrev={() => scroll(-1)} onNext={() => scroll(1)} /></div>
            </div>
          }
        />
        <div className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="فیلتر دسته">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cx('relative h-11 shrink-0 rounded-2xl px-5 text-sm font-bold transition-colors', tab === t.id ? 'text-white' : 'bg-white text-ink-600 hover:text-ink-900')}
            >
              {tab === t.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-2xl bg-ink-900" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{t.title}</span>
            </button>
          ))}
        </div>
        <div ref={ref} className="snap-row no-scrollbar -mx-4 mt-6 flex gap-5 overflow-x-auto px-4 pb-8 pt-2 sm:mx-0 sm:px-0">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.35, ease }} className="w-[74%] shrink-0 sm:w-[44%] md:w-[31%] lg:w-[23.6%]">
                <ProductCard p={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Deals with live countdown ---------------- */
function useCountdown(hours = 9) {
  const [end] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + hours, 0, 0, 0);
    return d.getTime();
  });
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, end - now);
  return { h: Math.floor(diff / 3.6e6), m: Math.floor((diff % 3.6e6) / 6e4), s: Math.floor((diff % 6e4) / 1000) };
}

function TimeBox({ v, l }: { v: number; l: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white/10 text-2xl font-black text-white backdrop-blur sm:h-16 sm:w-16">
        <AnimatePresence mode="popLayout">
          <motion.span key={v} initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.35, ease }}>
            {pad2(v)}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1.5 text-[11px] text-ink-300">{l}</span>
    </div>
  );
}

export function Deals() {
  const { h, m, s } = useCountdown();
  const deals = products.filter((p) => p.deal);
  const [active, setActive] = useState(0);
  const p = deals[active];
  const addToCart = useStore((st) => st.addToCart);
  const off = discountPercent(p.price, p.oldPrice);
  const sold = 100 - Math.min(90, p.stock * 6);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % deals.length), 6000);
    return () => clearInterval(t);
  }, [deals.length]);

  return (
    <section id="deals" className="scroll-mt-28 py-10 sm:py-16">
      <div className="container-x">
        <div className="noise relative overflow-hidden rounded-[32px] bg-ink-900 sm:rounded-[40px]">
          <div className="dot-grid-light absolute inset-0 opacity-40" />
          <div className="absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-volt-500/25 blur-[120px]" />
          <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr_.9fr] lg:p-12">
            {/* Intro + timer */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-volt-400 px-3 py-1.5 text-xs font-black text-ink-900">
                <Icon name="zap" size={14} /> تخفیف شگفت‌انگیز
              </span>
              <h2 className="mt-5 text-3xl font-black leading-[1.4] text-white sm:text-4xl">
                پیشنهادهایی که <span className="text-gradient-volt">تکرار نمی‌شوند</span>
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-300">تخفیف‌های امروز فقط تا پایان شمارش معکوس فعال‌اند. موجودی محدود است.</p>
              <div className="mt-6 flex items-center gap-2" aria-label="زمان باقی‌مانده">
                <TimeBox v={s} l="ثانیه" />
                <span className="-mt-5 text-xl font-black text-volt-400">:</span>
                <TimeBox v={m} l="دقیقه" />
                <span className="-mt-5 text-xl font-black text-volt-400">:</span>
                <TimeBox v={h} l="ساعت" />
              </div>
            </div>

            {/* Active product */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.a
                  key={p.id}
                  href={href.product(p.id)}
                  initial={{ opacity: 0, x: -40, rotate: -2 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: 40, rotate: 2 }}
                  transition={{ duration: 0.55, ease }}
                  className="group relative block overflow-hidden rounded-[28px] bg-white p-3"
                >
                  <img src={p.images[0]} alt={p.title} className="aspect-[4/3] w-full rounded-[22px] object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span className="absolute right-6 top-6 grid h-16 w-16 place-items-center rounded-full bg-rose-500 text-center text-white shadow-lg">
                    <span className="text-lg font-black leading-none">
                      ٪{fa(off)}
                      <span className="block text-[9px] font-bold">تخفیف</span>
                    </span>
                  </span>
                </motion.a>
              </AnimatePresence>
            </div>

            {/* Details */}
            <div className="text-white">
              <AnimatePresence mode="wait">
                <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease }}>
                  <h3 className="text-xl font-black leading-8">{p.title}</h3>
                  <p className="mt-1 text-sm text-ink-300">{p.subtitle}</p>
                  <div className="mt-5">
                    <span className="block text-sm text-ink-400 line-through">{p.oldPrice ? toman(p.oldPrice) : ''}</span>
                    <span className="block text-2xl font-black text-volt-300">{toman(p.price)}</span>
                  </div>
                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs text-ink-300">
                      <span>{fa(sold)}٪ فروخته شد</span>
                      <span>{fa(p.stock)} عدد باقی‌مانده</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div key={p.id} initial={{ width: 0 }} animate={{ width: sold + '%' }} transition={{ duration: 1.2, ease }} className="h-full rounded-full bg-gradient-to-l from-volt-300 to-volt-500" />
                    </div>
                  </div>
                  <Button onClick={() => addToCart(p.id)} variant="volt" className="mt-6 w-full" icon="bag">افزودن به سبد</Button>
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start" role="tablist" aria-label="پیشنهادها">
                {deals.map((d, i) => (
                  <button key={d.id} onClick={() => setActive(i)} aria-label={d.title} aria-selected={i === active} role="tab" className="relative h-2 overflow-hidden rounded-full bg-white/15 transition-all duration-500" style={{ width: i === active ? 36 : 10 }}>
                    {i === active && <motion.span key={'p' + active} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 6, ease: 'linear' }} className="absolute inset-y-0 right-0 bg-volt-400" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Promo banners (reference: two navy banners w/ product & yellow CTA) ---------------- */
export function PromoBanners() {
  const items = [
    { title: 'سیستم گیمینگ رؤیایی‌ات را بساز', sub: 'اسمبل اختصاصی با قطعات نسل جدید و تست ۲۴ ساعته', img: 'images/cat-gpu.jpg', to: href.shop('pc'), cta: 'شروع اسمبل' },
    { title: 'لوازم جانبی، تا ۳۰٪ تخفیف', sub: 'کیبورد، ماوس و هدفون‌های حرفه‌ای برای میز کارت', img: 'images/cat-keyboard.jpg', to: href.shop('keyboard'), cta: 'خرید لوازم جانبی' }
  ];
  return (
    <section className="py-10 sm:py-14">
      <div className="container-x grid gap-5 md:grid-cols-2">
        {items.map((b, i) => (
          <motion.a
            key={b.title}
            href={b.to}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: i * 0.1 }}
            whileHover={{ rotate: i === 0 ? -0.6 : 0.6, scale: 1.01 }}
            className="group relative flex min-h-[220px] overflow-hidden rounded-[30px] bg-ink-900 sm:min-h-[240px]"
          >
            <img src={b.img} alt="" loading="lazy" className="absolute inset-y-0 left-0 h-full w-[55%] object-cover opacity-90 transition-transform duration-[1000ms] group-hover:scale-110" style={{ maskImage: 'linear-gradient(to left, transparent, #000 45%)', WebkitMaskImage: 'linear-gradient(to left, transparent, #000 45%)' }} />
            <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-ink-900 via-ink-900/95 to-transparent" />
            <div className="absolute -right-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-volt-400/20 blur-3xl" />
            <div className="relative flex max-w-[62%] flex-col justify-center p-6 sm:p-8">
              <h3 className="text-xl font-black leading-8 text-white sm:text-2xl sm:leading-10">{b.title}</h3>
              <p className="mt-2 text-xs leading-6 text-ink-300 sm:text-sm">{b.sub}</p>
              <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-volt-400 px-4 py-2.5 text-sm font-black text-ink-900 transition-transform duration-300 group-hover:-translate-x-1">
                {b.cta}
                <Icon name="arrowLeft" size={16} />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Best sellers listing grid ---------------- */
export function BestSellers() {
  const list = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 9);
  return (
    <section id="bestsellers" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="پرفروش‌ترین‌ها" title="محبوب‌ترین محصولات آرنوتک" action={<Button href={href.shop()} variant="outline" size="sm" icon="chevronLeft">مشاهده همه</Button>} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {list.map((p, i) => (
            <ProductRow key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
