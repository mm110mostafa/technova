import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CategoryId } from '../types';
import { Icon } from '../components/ui/Icon';
import { Button, Chip } from '../components/ui/primitives';
import { ProductCard } from '../components/product/ProductCard';
import { brands, categories, categoryById, products } from '../data/catalog';
import { go } from '../store/useUI';
import { cx, fa, toman } from '../lib/format';

type Sort = 'popular' | 'cheap' | 'expensive' | 'discount' | 'rating';
const sorts: Array<[Sort, string]> = [['popular', 'محبوب‌ترین'], ['rating', 'بیشترین امتیاز'], ['cheap', 'ارزان‌ترین'], ['expensive', 'گران‌ترین'], ['discount', 'بیشترین تخفیف']];
const MAX = 200_000_000;

export default function Shop({ cat, q }: { cat?: CategoryId; q?: string }) {
  const [sort, setSort] = useState<Sort>('popular');
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [query, setQuery] = useState(q ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => setQuery(q ?? ''), [q]);

  const list = useMemo(() => {
    const s = query.trim().toLowerCase();
    let r = products.filter((p) =>
      (!cat || p.category === cat) &&
      (!selBrands.length || selBrands.includes(p.brand)) &&
      p.price <= maxPrice &&
      (!inStock || p.stock > 0) &&
      (!onSale || !!p.oldPrice) &&
      (!s || (p.title + p.subtitle + p.brand).toLowerCase().includes(s))
    );
    const disc = (x: typeof r[number]) => (x.oldPrice ? (x.oldPrice - x.price) / x.oldPrice : 0);
    r = [...r].sort((a, b) =>
      sort === 'cheap' ? a.price - b.price :
      sort === 'expensive' ? b.price - a.price :
      sort === 'discount' ? disc(b) - disc(a) :
      sort === 'rating' ? b.rating - a.rating :
      b.reviews - a.reviews
    );
    return r;
  }, [cat, selBrands, maxPrice, inStock, onSale, query, sort]);

  const activeCount = selBrands.length + (maxPrice < MAX ? 1 : 0) + (inStock ? 1 : 0) + (onSale ? 1 : 0);
  const reset = () => { setSelBrands([]); setMaxPrice(MAX); setInStock(false); setOnSale(false); setQuery(''); };
  const c = cat ? categoryById[cat] : null;

  const Filters = (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-black text-ink-900">جستجو در نتایج</h4>
        <div className="flex items-center gap-2 rounded-2xl bg-mist px-3 ring-1 ring-ink-100 focus-within:ring-ink-900">
          <Icon name="search" size={17} className="text-ink-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="نام محصول…" className="h-11 w-full border-0 bg-transparent text-sm focus:outline-none focus:ring-0" />
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-black text-ink-900">برند</h4>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => {
            const on = selBrands.includes(b);
            return (
              <button key={b} onClick={() => setSelBrands(on ? selBrands.filter((x) => x !== b) : [...selBrands, b])} className={cx('flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-colors', on ? 'bg-ink-900 text-white' : 'bg-mist text-ink-600 ring-1 ring-ink-100 hover:ring-ink-300')}>
                {on && <Icon name="check" size={13} />}{b}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-black text-ink-900">حداکثر قیمت</h4>
          <span className="text-xs font-bold text-ink-500">{toman(maxPrice)}</span>
        </div>
        <input type="range" min={3_000_000} max={MAX} step={1_000_000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" dir="ltr" aria-label="حداکثر قیمت" />
      </div>
      <div className="space-y-2">
        {[[inStock, setInStock, 'فقط کالاهای موجود'], [onSale, setOnSale, 'فقط تخفیف‌دارها']].map(([v, set, l]) => (
          <button key={l as string} onClick={() => (set as (b: boolean) => void)(!(v as boolean))} className="flex w-full items-center justify-between rounded-2xl bg-mist px-4 py-3 text-sm font-bold text-ink-700 ring-1 ring-ink-100">
            {l as string}
            <span className={cx('relative h-6 w-11 rounded-full transition-colors', v ? 'bg-ink-900' : 'bg-ink-200')}>
              <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={cx('absolute top-1 h-4 w-4 rounded-full bg-white shadow', v ? 'left-1' : 'right-1')} />
            </span>
          </button>
        ))}
      </div>
      {activeCount > 0 && <Button variant="ghost" className="w-full" onClick={reset}>پاک کردن فیلترها ({fa(activeCount)})</Button>}
    </div>
  );

  return (
    <div className="container-x pt-6">
      {/* Banner */}
      <div className="noise relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-10 sm:px-10">
        <div className="dot-grid-light absolute inset-0 opacity-40" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-volt-400/20 blur-3xl" />
        {c && <img src={c.image} alt="" className="absolute inset-y-0 left-0 hidden w-2/5 object-cover opacity-40 [mask-image:linear-gradient(to_left,black,transparent)] md:block" />}
        <nav className="relative flex items-center gap-2 text-xs text-ink-400" aria-label="مسیر">
          <button onClick={() => go({ name: 'home' })} className="hover:text-white">خانه</button>
          <Icon name="chevronLeft" size={13} />
          <button onClick={() => go({ name: 'shop' })} className="hover:text-white">فروشگاه</button>
          {c && (<><Icon name="chevronLeft" size={13} /><span className="text-volt-400">{c.title}</span></>)}
        </nav>
        <motion.h1 key={cat ?? 'all'} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="relative mt-4 text-3xl font-black text-white sm:text-4xl">
          {c ? c.title : q ? `نتایج «${q}»` : 'فروشگاه آرنوتک'}
        </motion.h1>
        <p className="relative mt-2 text-sm text-ink-300">{fa(list.length)} محصول اصل با ضمانت و ارسال سریع</p>
      </div>

      {/* Category chips */}
      <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1">
        <Chip active={!cat} onClick={() => go({ name: 'shop' })}><Icon name="grid" size={16} />همه</Chip>
        {categories.map((x) => (
          <Chip key={x.id} active={cat === x.id} onClick={() => go({ name: 'shop', cat: x.id })}><Icon name={x.icon} size={16} />{x.title}</Chip>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[2rem] bg-white p-5 shadow-card ring-1 ring-ink-100">
            <h3 className="mb-5 flex items-center gap-2 font-black text-ink-900"><Icon name="sliders" size={18} /> فیلترها</h3>
            {Filters}
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center gap-2">
            <button onClick={() => setFiltersOpen(true)} className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-bold text-ink-900 ring-1 ring-ink-200 lg:hidden">
              <Icon name="sliders" size={17} /> فیلتر {activeCount > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-volt-400 text-[10px] font-black">{fa(activeCount)}</span>}
            </button>
            <div className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto rounded-2xl bg-white p-1 ring-1 ring-ink-100">
              <span className="hidden shrink-0 px-3 text-xs font-bold text-ink-400 sm:inline">مرتب‌سازی:</span>
              {sorts.map(([k, l]) => (
                <button key={k} onClick={() => setSort(k)} className={cx('relative h-9 shrink-0 rounded-xl px-3 text-xs font-bold transition-colors sm:text-[13px]', sort === k ? 'text-white' : 'text-ink-500 hover:text-ink-900')}>
                  {sort === k && <motion.span layoutId="sort-pill" className="absolute inset-0 rounded-xl bg-ink-900" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">{l}</span>
                </button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid place-items-center rounded-[2rem] bg-white py-20 text-center ring-1 ring-ink-100">
              <span className="grid h-20 w-20 place-items-center rounded-3xl bg-ink-100 text-ink-400"><Icon name="search" size={34} /></span>
              <h3 className="mt-4 font-black text-ink-900">محصولی با این فیلترها پیدا نشد</h3>
              <p className="mt-1 text-sm text-ink-400">فیلترها را تغییر دهید یا پاک کنید.</p>
              <Button className="mt-5" onClick={reset}>پاک کردن فیلترها</Button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                    <ProductCard p={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFiltersOpen(false)} className="fixed inset-0 z-50 bg-ink-950/50 backdrop-blur-sm lg:hidden" />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, i) => i.offset.y > 120 && setFiltersOpen(false)}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-white p-5 pb-8 lg:hidden"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink-200" />
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-black text-ink-900">فیلترها</h3>
                <button onClick={() => setFiltersOpen(false)} className="text-sm font-bold text-ink-500">بستن</button>
              </div>
              {Filters}
              <Button className="mt-6 w-full" onClick={() => setFiltersOpen(false)}>نمایش {fa(list.length)} محصول</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
