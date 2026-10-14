import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button, Price, Stars } from '../components/ui/primitives';
import { ProductCard, useAddToCart, useWish } from '../components/product/ProductCard';
import { Qty } from '../components/layout/Overlays';
import { Carousel } from '../components/ui/Carousel';
import { categoryById, productById, products } from '../data/catalog';
import { useShop } from '../store/useShop';
import { go } from '../store/useUI';
import { cx, fa } from '../lib/format';

export default function ProductPage({ id }: { id: string }) {
  const p = productById[id];
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState<string | undefined>(p?.colors?.[0]);
  const [tab, setTab] = useState<'specs' | 'desc' | 'reviews'>('specs');
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const addToCart = useAddToCart();
  const wish = useWish();
  const inWish = useShop((s) => s.wishlist.includes(id));

  useEffect(() => { setImg(0); setQty(1); setColor(p?.colors?.[0]); setTab('specs'); }, [id]);

  if (!p) {
    return (
      <div className="container-x grid min-h-[60vh] place-items-center text-center">
        <div>
          <p className="text-7xl font-black text-ink-200">۴۰۴</p>
          <h1 className="mt-3 text-xl font-black text-ink-900">محصول پیدا نشد</h1>
          <Button className="mt-6" onClick={() => go({ name: 'shop' })}>بازگشت به فروشگاه</Button>
        </div>
      </div>
    );
  }

  const related = products.filter((x) => x.id !== p.id && (x.category === p.category || x.brand === p.brand)).concat(products.filter((x) => x.featured && x.id !== p.id)).filter((x, i, a) => a.findIndex((y) => y.id === x.id) === i).slice(0, 8);
  const c = categoryById[p.category];
  const out = p.stock <= 0;

  return (
    <div className="container-x pt-6">
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-ink-400" aria-label="مسیر">
        <button onClick={() => go({ name: 'home' })} className="hover:text-ink-900">خانه</button>
        <Icon name="chevronLeft" size={13} />
        <button onClick={() => go({ name: 'shop', cat: p.category })} className="hover:text-ink-900">{c.title}</button>
        <Icon name="chevronLeft" size={13} />
        <span className="font-bold text-ink-700">{p.title}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            className="relative aspect-square cursor-zoom-in overflow-hidden rounded-[2.2rem] bg-white shadow-card ring-1 ring-ink-100"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={img}
                src={p.images[img]}
                alt={p.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: zoom.on ? 1.8 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.35 }, scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                style={{ transformOrigin: `${zoom.x}% ${zoom.y}%` }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            {p.badge && <span className="absolute right-4 top-4 rounded-full bg-ink-900 px-3 py-1.5 text-xs font-bold text-white">{{ new: 'جدید', hot: 'پرفروش', limited: 'موجودی محدود' }[p.badge]}</span>}
            {p.images.length > 1 && (
              <div className="absolute inset-x-4 bottom-4 flex justify-between md:hidden">
                <button onClick={() => setImg((img - 1 + p.images.length) % p.images.length)} aria-label="قبلی" className="grid h-10 w-10 place-items-center rounded-xl bg-white/90 shadow"><Icon name="chevronRight" /></button>
                <button onClick={() => setImg((img + 1) % p.images.length)} aria-label="بعدی" className="grid h-10 w-10 place-items-center rounded-xl bg-white/90 shadow"><Icon name="chevronLeft" /></button>
              </div>
            )}
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {p.images.map((src, i) => (
                <motion.button whileHover={{ y: -3 }} key={src} onClick={() => setImg(i)} className={cx('h-20 w-20 overflow-hidden rounded-2xl ring-2 transition sm:h-24 sm:w-24', i === img ? 'ring-ink-900' : 'opacity-60 ring-transparent hover:opacity-100')}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-bold text-ink-600">{p.brand}</span>
            <span className={cx('rounded-full px-3 py-1 text-xs font-bold', out ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700')}>{out ? 'ناموجود' : p.stock < 6 ? `تنها ${fa(p.stock)} عدد در انبار` : 'موجود در انبار'}</span>
          </div>
          <h1 className="mt-4 text-2xl font-black leading-[1.6] text-ink-900 sm:text-3xl">{p.title}</h1>
          <p className="mt-1 text-sm text-ink-500">{p.subtitle}</p>
          <div className="mt-3 flex items-center gap-2">
            <Stars value={p.rating} size={16} />
            <span className="text-sm font-bold text-ink-900">{fa(p.rating)}</span>
            <button onClick={() => setTab('reviews')} className="text-xs text-ink-400 underline-offset-4 hover:underline">({fa(p.reviews)} دیدگاه)</button>
          </div>

          <ul className="mt-6 space-y-2.5 rounded-[1.6rem] bg-white p-5 ring-1 ring-ink-100">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm leading-6 text-ink-700"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-volt-400 text-ink-900"><Icon name="check" size={13} stroke={2.6} /></span>{h}</li>
            ))}
          </ul>

          {p.colors && (
            <div className="mt-6">
              <p className="mb-2.5 text-sm font-bold text-ink-700">رنگ</p>
              <div className="flex gap-2.5">
                {p.colors.map((col) => (
                  <button key={col} onClick={() => setColor(col)} aria-label={'رنگ ' + col} className={cx('h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-mist transition', color === col ? 'ring-ink-900' : 'ring-transparent')} style={{ background: col }} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 rounded-[1.8rem] bg-white p-5 shadow-card ring-1 ring-ink-100">
            <Price price={p.price} oldPrice={p.oldPrice} size="lg" />
            <p className="mt-1 text-xs text-ink-400">یا اقساط ۱۲ ماهه از ماهی {fa(Math.round(p.price / 12 / 10000) * 10000)} تومان</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {!out && <Qty value={qty} max={p.stock} onChange={(v) => setQty(Math.max(1, v))} />}
              <Button size="lg" className="flex-1" icon="bag" disabled={out} onClick={() => addToCart(p, qty, color)}>
                {out ? 'ناموجود — خبرم کن' : 'افزودن به سبد خرید'}
              </Button>
              <Button size="lg" variant="ghost" onClick={() => wish(p)} aria-label="علاقه‌مندی" className="w-14 !px-0">
                <Icon name="heart" filled={inWish} className={inWish ? 'text-rose-500' : ''} />
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[['shield', 'ضمانت اصالت'], ['truck', 'ارسال سریع'], ['refresh', '۷ روز بازگشت']].map(([ic, t]) => (
              <div key={t} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3 text-center ring-1 ring-ink-100">
                <Icon name={ic} size={20} className="text-ink-600" />
                <span className="text-[11px] font-bold text-ink-600">{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <section className="mt-14">
        <div className="flex gap-1 rounded-2xl bg-white p-1 ring-1 ring-ink-100 sm:inline-flex">
          {([['specs', 'مشخصات فنی'], ['desc', 'معرفی'], ['reviews', 'دیدگاه‌ها']] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={cx('relative h-11 flex-1 rounded-xl px-5 text-sm font-bold transition-colors', tab === k ? 'text-white' : 'text-ink-500')}>
              {tab === k && <motion.span layoutId="ptabs" className="absolute inset-0 rounded-xl bg-ink-900" />}
              <span className="relative">{l}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-5 rounded-[2rem] bg-white p-5 ring-1 ring-ink-100 sm:p-8">
            {tab === 'specs' && (
              <dl className="grid gap-x-10 sm:grid-cols-2">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4 border-b border-ink-100 py-3.5 text-sm">
                    <dt className="text-ink-400">{k}</dt>
                    <dd className="font-bold text-ink-900" dir="auto">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {tab === 'desc' && (
              <div className="max-w-3xl space-y-4 text-[15px] leading-8 text-ink-600">
                <p>{p.title} برای کاربرانی طراحی شده که در کنار عملکرد قدرتمند، به کیفیت ساخت و تجربه روزمره بی‌دردسر اهمیت می‌دهند. {p.highlights[0]} و {p.highlights[1]} این محصول را به یکی از متعادل‌ترین گزینه‌های رده خود تبدیل کرده است.</p>
                <p>این محصول توسط کارشناسان آرنوتک تست سلامت شده و با ضمانت اصالت، فاکتور رسمی و گارانتی معتبر ارسال می‌شود. برای مشاوره درباره پیکربندی یا ارتقا، با کارشناسان ما در تماس باشید.</p>
              </div>
            )}
            {tab === 'reviews' && (
              <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                <div className="rounded-3xl bg-mist p-5 text-center">
                  <p className="text-5xl font-black text-ink-900">{fa(p.rating)}</p>
                  <div className="mt-2 flex justify-center"><Stars value={p.rating} size={18} /></div>
                  <p className="mt-2 text-xs text-ink-400">از {fa(p.reviews)} دیدگاه</p>
                </div>
                <ul className="space-y-3">
                  {[['علی ر.', 'خرید دوممه از آرنوتک. بسته‌بندی عالی بود و دستگاه دقیقا همونی بود که مشاور پیشنهاد داد.', 5], ['نگار م.', 'کیفیت ساخت فوق‌العاده‌ست. ارسال تهران همون روز انجام شد.', 5], ['حامد ک.', 'نسبت به قیمت خیلی خوبه، فقط کاش رنگ‌بندی بیشتری داشت.', 4]].map(([n, t, r]) => (
                    <li key={n as string} className="rounded-3xl bg-mist p-4">
                      <div className="flex items-center justify-between"><span className="text-sm font-black text-ink-900">{n}</span><Stars value={r as number} size={12} /></div>
                      <p className="mt-2 text-sm leading-7 text-ink-600">{t}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600"><Icon name="check" size={13} /> خریدار این محصول</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-black text-ink-900">محصولات مرتبط</h2>
        <Carousel itemClass="w-[78%] sm:w-[46%] lg:w-[31.5%] xl:w-[23.8%]">
          {related.map((x, i) => <ProductCard key={x.id} p={x} index={i} />)}
        </Carousel>
      </section>

      {/* Mobile sticky buy bar */}
      {!out && (
        <div className="fixed inset-x-3 bottom-[88px] z-30 flex items-center gap-3 rounded-[1.6rem] bg-ink-900 p-2.5 pr-4 shadow-lift md:hidden">
          <div className="flex-1">
            <p className="text-[10px] text-ink-400">قیمت</p>
            <p className="text-sm font-black text-white">{fa(p.price)} <span className="text-[10px] text-ink-400">تومان</span></p>
          </div>
          <button onClick={() => addToCart(p, qty, color)} className="flex h-11 items-center gap-2 rounded-2xl bg-volt-400 px-5 text-sm font-black text-ink-900">
            <Icon name="bag" size={17} /> افزودن
          </button>
        </div>
      )}
    </div>
  );
}
