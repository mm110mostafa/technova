import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button, Img, Reveal, SectionHeading } from '../components/ui/primitives';
import { Carousel } from '../components/ui/Carousel';
import { ProductCard, ProductRow, useAddToCart } from '../components/product/ProductCard';
import { branches, builds, categories, faqs, productById, products, services, steps } from '../data/catalog';
import { go, useUI } from '../store/useUI';
import { cx, discountPercent, fa, pad2 } from '../lib/format';

const ease = [0.22, 1, 0.36, 1] as const;
const ViewAll = ({ onClick, label = 'مشاهده همه' }: { onClick: () => void; label?: string }) => (
  <Button variant="outline" size="sm" icon="arrowLeft" onClick={onClick}>{label}</Button>
);

/* ================= Categories ================= */
export function Categories() {
  return (
    <section id="categories" className="container-x pt-14 sm:pt-20">
      <SectionHeading eyebrow="دسته‌بندی محصولات" title="راحت‌تر کالای مدنظر خود را پیدا کنید" action={<ViewAll onClick={() => go({ name: 'shop' })} />} />
      <Carousel itemClass="w-[42%] sm:w-[30%] md:w-[23%] lg:w-[18.5%] xl:w-[13.4%]">
        {categories.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: i * 0.05 }}
            onClick={() => go({ name: 'shop', cat: c.id })}
            className="group w-full text-center"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] bg-white p-1.5 shadow-card ring-1 ring-ink-100 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-lift">
              <Img src={c.image} alt={c.title} className="aspect-square rounded-[1.4rem]" imgClass="group-hover:scale-110" />
              <span className="absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-xl bg-white/90 text-ink-900 opacity-0 shadow backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <Icon name={c.icon} size={18} />
              </span>
            </div>
            <p className="mt-3 text-[15px] font-extrabold text-ink-900">{c.title}</p>
            <p className="text-xs text-ink-400">{c.subtitle}</p>
          </motion.button>
        ))}
      </Carousel>
    </section>
  );
}

/* ================= Services ================= */
export function Services() {
  return (
    <section id="services" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="خدمات ما" title="با ما کیفیت متفاوتی را تجربه کنید" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.a
            key={s.title}
            href="#contact"
            onClick={(e) => { e.preventDefault(); go({ name: 'home' }, 'contact'); }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-ink-100 transition-colors duration-500 hover:bg-ink-900"
          >
            <span className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-volt-400/0 blur-2xl transition-colors duration-500 group-hover:bg-volt-400/30" />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-900 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-volt-400">
              <Icon name={s.icon} size={26} />
            </span>
            <h3 className="relative mt-6 text-lg font-black text-ink-900 transition-colors group-hover:text-white">{s.title}</h3>
            <p className="relative mt-2 text-sm leading-7 text-ink-500 transition-colors group-hover:text-ink-300">{s.text}</p>
            <span className="relative mt-6 flex items-center gap-2 text-sm font-bold text-ink-900 transition-colors group-hover:text-volt-400">
              {s.cta}
              <Icon name="arrowLeft" size={17} className="transition-transform group-hover:-translate-x-1.5" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ================= About + Why ================= */
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <section id="about" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="درباره آرنوتک" title="هرآنچه که باید درباره ما بدانید" />
      <div ref={ref} className="grid items-stretch gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="relative">
          <div className="relative h-full min-h-[340px] overflow-hidden rounded-[2.2rem]">
            <motion.img style={{ y }} src="images/service-repair.jpg" alt="کارگاه فنی آرنوتک" loading="lazy" className="absolute inset-0 h-[115%] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between gap-3">
              <div className="rounded-2xl bg-white/95 p-3 pl-5 shadow-lift backdrop-blur">
                <p className="text-[11px] text-ink-400">کارگاه فنی اختصاصی</p>
                <p className="font-black text-ink-900">تست ۴۰ مرحله‌ای پیش از ارسال</p>
              </div>
              <div className="hidden h-20 w-28 overflow-hidden rounded-2xl ring-4 ring-white sm:block">
                <img src="images/service-ram.jpg" alt="" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <p className="text-[15px] leading-8 text-ink-600">
              آرنوتک از سال ۱۳۹۲ با یک باور ساده شروع کرد: خرید لپ‌تاپ نباید پیچیده و پرریسک باشد. امروز با پنج شعبه در کشور، کارگاه فنی مجهز و تیمی از کارشناسان سخت‌افزار، هر سال به هزاران گیمر، دانشجو، طراح و سازمان کمک می‌کنیم دستگاهی بخرند که دقیقا با نیازشان جور است — نه گران‌تر، نه ضعیف‌تر.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button icon="arrowLeft" onClick={() => go({ name: 'home' }, 'branches')}>درباره آرنوتک</Button>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 space-x-reverse">
                  {['A', 'M', 'S', 'R'].map((l, i) => (
                    <span key={l} className={cx('grid h-10 w-10 place-items-center rounded-full text-xs font-black ring-4 ring-mist', ['bg-ink-900 text-white', 'bg-volt-400 text-ink-900', 'bg-ink-300 text-ink-900', 'bg-white text-ink-900'][i])}>{l}</span>
                  ))}
                </div>
                <div className="text-xs leading-5 text-ink-500"><b className="text-ink-900">۴.۹ از ۵</b><br />از ۱۲٬۰۰۰ دیدگاه</div>
              </div>
            </div>
          </Reveal>

          {/* "Why?" card — reference: navy card with big "چرا؟!" */}
          <Reveal delay={0.15} className="flex-1">
            <div className="noise relative flex h-full flex-col justify-between overflow-hidden rounded-[2.2rem] bg-ink-900 p-6 sm:p-8">
              <div className="dot-grid-light absolute inset-0 opacity-40" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-volt-400/25 blur-3xl" />
              <div className="relative flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-2xl font-black leading-[1.6] text-white sm:text-[1.7rem]">آرنوتک بهترین انتخاب<br />شما می‌تونه باشه…</h3>
                <span className="text-5xl font-black text-volt-400 sm:text-6xl">چرا<span className="text-white">؟!</span></span>
              </div>
              <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['shield', 'اصالت تضمینی', 'کد رهگیری برای تک‌تک کالاها'],
                  ['percent', 'قیمت منصفانه', 'مقایسه روزانه با بازار'],
                  ['headset', 'همراهی واقعی', 'پشتیبانی تا پایان گارانتی']
                ].map(([ic, t, d], i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease }}
                    className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                  >
                    <Icon name={ic} size={22} className="text-volt-400" />
                    <p className="mt-3 text-sm font-black text-white">{t}</p>
                    <p className="mt-1 text-xs text-ink-400">{d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= Builds / showcase (reference: projects slider) ================= */
export function Builds() {
  return (
    <section id="builds" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="ست‌های پیشنهادی" title="بخشی از سیستم‌هایی که برای مشتریان ساختیم" action={<ViewAll onClick={() => go({ name: 'shop', cat: 'pc' })} />} />
      <Carousel itemClass="w-[82%] sm:w-[46%] lg:w-[31.5%] xl:w-[23.8%]">
        {builds.map((b, i) => (
          <motion.article
            key={b.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: i * 0.07 }}
            className="group overflow-hidden rounded-[2rem] bg-white p-2 shadow-card ring-1 ring-ink-100"
          >
            <Img src={b.image} alt={b.title} className="aspect-[4/3.2] rounded-[1.6rem]" imgClass="group-hover:scale-105" />
            <div className="p-4">
              <h3 className="text-base font-black text-ink-900">{b.title}</h3>
              <ul className="mt-4 grid grid-cols-3 divide-x divide-x-reverse divide-ink-100 rounded-2xl bg-mist py-3 text-center">
                {[['پردازنده', b.cpu], ['گرافیک', b.gpu], ['کاربری', b.use]].map(([k, v]) => (
                  <li key={k} className="px-1">
                    <p className="text-[10.5px] text-ink-400">{k}</p>
                    <p className="mt-0.5 truncate text-[11.5px] font-bold text-ink-900" dir="auto">{v}</p>
                  </li>
                ))}
              </ul>
              <button onClick={() => go({ name: 'product', id: b.product })} className="mt-4 flex w-full items-center justify-between rounded-2xl bg-ink-100 px-4 py-3 text-sm font-bold text-ink-900 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                مشاهده ست
                <Icon name="arrowLeft" size={18} className="transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          </motion.article>
        ))}
      </Carousel>
    </section>
  );
}

/* ================= Product slider with tabs ================= */
export function ProductSlider() {
  const tabs = [
    { id: 'all', label: 'همه' },
    { id: 'laptop', label: 'لپ‌تاپ' },
    { id: 'gaming', label: 'گیمینگ' },
    { id: 'acc', label: 'لوازم جانبی' }
  ];
  const [tab, setTab] = useState('all');
  const list = useMemo(() => {
    if (tab === 'all') return products.filter((p) => p.featured);
    if (tab === 'acc') return products.filter((p) => ['keyboard', 'mouse', 'audio', 'memory'].includes(p.category));
    if (tab === 'gaming') return products.filter((p) => ['gaming', 'gpu', 'pc'].includes(p.category));
    return products.filter((p) => p.category === 'laptop' || p.category === 'monitor');
  }, [tab]);

  return (
    <section id="products" className="container-x pt-20 sm:pt-28">
      <SectionHeading
        eyebrow="محصولات ما"
        title="محصولات منتخب فروشگاه آرنوتک"
        action={
          <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-1 rounded-2xl bg-white p-1 ring-1 ring-ink-100">
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} className={cx('relative h-10 shrink-0 rounded-xl px-4 text-sm font-bold transition-colors', tab === t.id ? 'text-white' : 'text-ink-500 hover:text-ink-900')}>
                  {tab === t.id && <motion.span layoutId="ptab" className="absolute inset-0 rounded-xl bg-ink-900" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        }
      />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
          <Carousel itemClass="w-[78%] sm:w-[46%] lg:w-[31.5%] xl:w-[23.8%]">
            {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </Carousel>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ================= Promo banners ================= */
export function PromoBanners() {
  return (
    <section className="container-x pt-20 sm:pt-28">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { id: 'storm-4070', tag: 'گرافیک نسل جدید', title: 'قدرت RTX، بدون مصالحه', text: 'کارت‌های گرافیک سری ۴۰ با DLSS 3.5 و ضمانت اصالت', img: 'images/cat-gpu.jpg', dark: true },
          { id: 'aero-14', tag: 'سبک‌تر از همیشه', title: 'اولترابوک Aero 14', text: 'نمایشگر OLED، ۱۸ ساعت شارژ و فقط ۱.۱ کیلوگرم', img: 'images/p-ultrabook.png', dark: false }
        ].map((b, i) => (
          <Reveal key={b.id} delay={i * 0.1}>
            <motion.button
              whileHover="hover"
              onClick={() => go({ name: 'product', id: b.id })}
              className={cx('group relative flex min-h-[220px] w-full items-center overflow-hidden rounded-[2.2rem] p-6 text-right sm:p-8', b.dark ? 'bg-ink-900' : 'bg-volt-400')}
            >
              {b.dark && <div className="dot-grid-light absolute inset-0 opacity-40" />}
              <div className="relative z-10 max-w-[55%]">
                <span className={cx('text-xs font-bold', b.dark ? 'text-volt-400' : 'text-ink-700')}>{b.tag}</span>
                <h3 className={cx('mt-2 text-xl font-black leading-8 sm:text-2xl', b.dark ? 'text-white' : 'text-ink-900')}>{b.title}</h3>
                <p className={cx('mt-2 text-xs leading-6 sm:text-sm', b.dark ? 'text-ink-300' : 'text-ink-800')}>{b.text}</p>
                <span className={cx('mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black', b.dark ? 'bg-volt-400 text-ink-900' : 'bg-ink-900 text-white')}>
                  اطلاعات بیشتر <Icon name="arrowLeft" size={16} />
                </span>
              </div>
              <motion.div
                variants={{ hover: { rotate: -4, scale: 1.06 } }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="absolute -left-6 bottom-0 top-0 w-[52%]"
              >
                <img src={b.img} alt="" loading="lazy" className={cx('h-full w-full object-cover', b.dark ? 'rounded-r-[3rem] opacity-90' : 'rounded-r-[3rem] mix-blend-multiply')} />
                <div className={cx('absolute inset-0', b.dark ? 'bg-gradient-to-l from-ink-900 via-ink-900/20 to-transparent' : 'bg-gradient-to-l from-volt-400 via-transparent to-transparent')} />
              </motion.div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= Amazing deals with countdown ================= */
function useCountdown() {
  const target = useMemo(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 0);
    return d.getTime();
  }, []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.max(0, Math.floor((target - now) / 1000));
  return { h: Math.floor(s / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function Deals() {
  const { h, m, s } = useCountdown();
  const deals = products.filter((p) => p.deal);
  return (
    <section id="deals" className="px-2 pt-20 sm:px-4 sm:pt-28">
      <div className="noise relative mx-auto max-w-[1320px] overflow-hidden rounded-[2.2rem] bg-ink-900 px-4 py-10 sm:rounded-[2.5rem] sm:px-8 sm:py-14 lg:px-12">
        <div className="dot-grid-light absolute inset-0 opacity-40" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-volt-400/20 blur-[100px]" />
        <div className="relative grid gap-8 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="text-center lg:text-right">
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
              className="mx-auto inline-grid h-16 w-16 place-items-center rounded-3xl bg-volt-400 text-ink-900 shadow-glow lg:mx-0"
            >
              <Icon name="zap" size={30} />
            </motion.span>
            <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">تخفیف <span className="text-gradient-volt">شگفت‌انگیز</span></h2>
            <p className="mt-2 text-sm text-ink-300">پیشنهادهای امروز فقط تا پایان شب</p>
            <div className="mt-6 flex justify-center gap-2 lg:justify-start" dir="ltr">
              {[[h, 'ساعت'], [m, 'دقیقه'], [s, 'ثانیه']].map(([v, l], i) => (
                <div key={l as string} className="flex items-center gap-2">
                  <div className="w-16 rounded-2xl bg-white/5 py-2.5 text-center ring-1 ring-white/10">
                    <AnimatePresence mode="popLayout">
                      <motion.div key={v as number} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }} className="text-2xl font-black text-white">
                        {pad2(v as number)}
                      </motion.div>
                    </AnimatePresence>
                    <div className="text-[10px] text-ink-400">{l}</div>
                  </div>
                  {i < 2 && <span className="text-xl font-black text-volt-400">:</span>}
                </div>
              ))}
            </div>
            <Button variant="volt" className="mt-7" icon="arrowLeft" onClick={() => go({ name: 'shop' })}>همه شگفت‌انگیزها</Button>
          </div>
          <Carousel dark itemClass="w-[72%] sm:w-[44%] md:w-[36%] xl:w-[23.5%]">
            {deals.map((p, i) => <DealCard key={p.id} id={p.id} index={i} />)}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function DealCard({ id, index }: { id: string; index: number }) {
  const p = productById[id];
  const addToCart = useAddToCart();
  const sold = 40 + ((index * 17) % 50);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      className="group flex h-full flex-col rounded-[1.8rem] bg-white p-3"
    >
      <button onClick={() => go({ name: 'product', id })} className="relative block">
        <Img src={p.images[0]} alt={p.title} className="aspect-square rounded-[1.4rem] bg-mist" imgClass="group-hover:scale-105" />
        <span className="absolute right-2.5 top-2.5 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-black text-white">٪{fa(discountPercent(p.price, p.oldPrice))}</span>
      </button>
      <h3 className="mt-3 line-clamp-1 px-1 text-center text-sm font-extrabold text-ink-900">{p.title}</h3>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="text-xs text-ink-400 line-through">{fa(p.oldPrice!)}</span>
        <span className="text-[15px] font-black text-ink-900">{fa(p.price)}</span>
      </div>
      <div className="mt-3 px-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
          <motion.div initial={{ width: 0 }} whileInView={{ width: sold + '%' }} viewport={{ once: true }} transition={{ duration: 1.2, ease, delay: 0.3 }} className="h-full rounded-full bg-gradient-to-l from-rose-500 to-volt-400" />
        </div>
        <p className="mt-1.5 text-[11px] text-ink-400">٪{fa(sold)} فروخته شد</p>
      </div>
      <button onClick={() => addToCart(p)} className="mt-3 flex h-10 items-center justify-center gap-2 rounded-xl bg-ink-900 text-sm font-bold text-white transition-colors hover:bg-volt-400 hover:text-ink-900">
        <Icon name="bag" size={16} /> افزودن به سبد
      </button>
    </motion.div>
  );
}

/* ================= Best sellers grid (reference: listing grid 3×N) ================= */
export function BestSellers() {
  const list = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 9);
  return (
    <section id="best" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="پرفروش‌ترین‌ها" title="بهترین محصولات فروشگاه آرنوتک" action={<ViewAll onClick={() => go({ name: 'shop' })} />} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {list.map((p, i) => <ProductRow key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
}

/* ================= Branches + counters + hotspot map ================= */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{fa(v)}{suffix}</span>;
}

export function Branches() {
  const [active, setActive] = useState(0);
  const b = branches[active];
  return (
    <section id="branches" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="شعب آرنوتک" title="همه جا در کنار شما هستیم" />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        <div className="flex flex-col gap-5">
          <Reveal>
            <div className="rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-ink-100">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-volt-100 px-3 py-1 text-xs font-black text-volt-700"><Icon name="pin" size={14} /> {b.label}</span>
                  <h3 className="mt-3 text-2xl font-black text-ink-900">شعبه {b.city}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-500">{b.addr}. ساعت کاری: شنبه تا پنجشنبه ۹ تا ۲۱ — امکان تست حضوری دستگاه و تحویل فوری سفارش.</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex flex-wrap gap-2">
                {branches.map((x, i) => (
                  <button key={x.city} onClick={() => setActive(i)} className={cx('rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors', i === active ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200')}>{x.city}</button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-3 rounded-[2rem] bg-ink-900 p-4 sm:p-6">
              {[[48, 'K+', 'مشتری راضی'], [12, '+', 'سال تجربه'], [35, '+', 'کارشناس فنی']].map(([n, s, l]) => (
                <div key={l as string} className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10 sm:p-4">
                  <p className="text-2xl font-black text-volt-400 sm:text-3xl" dir="ltr"><Counter to={n as number} suffix={s as string} /></p>
                  <p className="mt-1 text-[11px] text-ink-300 sm:text-xs">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative h-full min-h-[340px] overflow-hidden rounded-[2rem] bg-white shadow-card ring-1 ring-ink-100">
            <div className="dot-grid absolute inset-0" />
            {/* stylised Iran silhouette */}
            <svg viewBox="0 0 100 100" className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] text-ink-100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path fill="currentColor" stroke="#D5DAEE" strokeWidth=".6" d="M14 10 L28 8 L38 14 L50 18 L62 16 L74 12 L88 20 L92 34 L88 46 L92 58 L86 70 L76 78 L70 90 L56 88 L46 80 L36 78 L28 66 L24 54 L16 46 L12 34 L8 22 Z" />
            </svg>
            {branches.map((x, i) => (
              <button
                key={x.city}
                onClick={() => setActive(i)}
                style={{ left: `${x.x}%`, top: `${x.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={'شعبه ' + x.city}
              >
                <span className={cx('hotspot relative block h-4 w-4 rounded-full ring-4 transition-transform', i === active ? 'scale-125 bg-volt-400 ring-ink-900' : 'bg-ink-900 ring-white')} />
                <span className={cx('absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-ink-900 px-3 py-1.5 text-xs font-bold text-white shadow-lift transition-all', i === active ? 'opacity-100' : 'pointer-events-none translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100')}>
                  {x.city}
                </span>
              </button>
            ))}
            <div className="absolute bottom-4 right-4 rounded-2xl bg-white/90 px-4 py-2 text-xs font-bold text-ink-600 shadow-soft backdrop-blur">
              ارسال به <b className="text-ink-900">۳۱ استان</b> کشور
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Order steps — scroll-activated timeline ================= */
export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeIdx, setActiveIdx] = useState(-1);
  useEffect(() => scrollYProgress.on('change', (v) => setActiveIdx(Math.min(3, Math.floor(v * 4.2) - (v < 0.02 ? 1 : 0)))), [scrollYProgress]);

  return (
    <section id="steps" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="مراحل سفارش" title="سریع‌ترین روش خرید و تحویل" />
      <div ref={ref} className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-6 right-[27px] top-6 w-[3px] rounded-full bg-ink-200 sm:right-[35px]">
          <motion.div style={{ height: h }} className="w-full rounded-full bg-gradient-to-b from-volt-400 to-volt-600" />
        </div>
        <ol className="space-y-5">
          {steps.map((s, i) => {
            const on = i <= activeIdx;
            return (
              <li key={s.title} className="relative flex gap-4 sm:gap-6">
                <motion.span
                  animate={{ scale: on ? 1 : 0.9, backgroundColor: on ? '#FFCB24' : '#FFFFFF' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-black text-ink-900 shadow-card ring-1 ring-ink-100 sm:h-[72px] sm:w-[72px] sm:text-xl"
                >
                  {pad2(i + 1)}
                </motion.span>
                <motion.div
                  animate={{ opacity: on ? 1 : 0.55, x: on ? 0 : -6 }}
                  transition={{ duration: 0.4 }}
                  className={cx('flex flex-1 items-center gap-4 rounded-[1.8rem] p-5 ring-1 transition-colors duration-500', on ? 'bg-ink-900 ring-ink-900' : 'bg-white ring-ink-100')}
                >
                  <div className="flex-1">
                    <h3 className={cx('text-base font-black sm:text-lg', on ? 'text-white' : 'text-ink-900')}>{s.title}</h3>
                    <p className={cx('mt-1.5 text-sm leading-7', on ? 'text-ink-300' : 'text-ink-500')}>{s.text}</p>
                  </div>
                  <span className={cx('hidden h-14 w-14 shrink-0 place-items-center rounded-2xl sm:grid', on ? 'bg-white/10 text-volt-400' : 'bg-ink-100 text-ink-400')}>
                    <Icon name={s.icon} size={26} />
                  </span>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ================= FAQ ================= */
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="سوالات متداول" title="مهم‌ترین اصل برای ما جلب رضایت شماست" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className={cx('overflow-hidden rounded-[1.6rem] ring-1 transition-colors', on ? 'bg-white shadow-card ring-ink-200' : 'bg-white/60 ring-ink-100')}>
                  <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center gap-3 p-4 text-right sm:p-5">
                    <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors', on ? 'bg-volt-400 text-ink-900' : 'bg-ink-100 text-ink-500')}>
                      <Icon name="message" size={18} />
                    </span>
                    <span className="flex-1 text-[15px] font-extrabold text-ink-900">{f.q}</span>
                    <motion.span animate={{ rotate: on ? 45 : 0 }} className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-xl', on ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-900')}>
                      <Icon name="plus" size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                        <div className="px-5 pb-5 sm:pr-[4.75rem]">
                          <span className="text-xs font-black text-volt-600">پاسخ</span>
                          <p className="mt-1 text-sm leading-7 text-ink-600">{f.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink-900 p-3">
            <Img src="images/workspace.jpg" alt="پشتیبانی آرنوتک" className="aspect-[4/3] rounded-[1.6rem] lg:aspect-auto lg:flex-1" />
            <div className="p-4 sm:p-5">
              <h3 className="text-xl font-black text-white">پاسخگوی سوالات شما هستیم</h3>
              <p className="mt-2 text-sm text-ink-300">پاسخ سوالتان را پیدا نکردید؟ کارشناسان ما معمولا در کمتر از ۱۰ دقیقه پاسخ می‌دهند.</p>
              <Button variant="volt" className="mt-5 w-full" onClick={() => go({ name: 'home' }, 'contact')}>
                <Icon name="plus" size={18} /> ایجاد پرسش جدید
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Contact ================= */
export function Contact() {
  const toast = useUI((s) => s.toast);
  const [form, setForm] = useState({ name: '', phone: '', topic: 'مشاوره خرید', msg: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.name.trim().length < 3) err.name = 'نام را کامل وارد کنید';
    if (!/^0?9\d{9}$/.test(form.phone.replace(/[\s-]/g, '').replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))))) err.phone = 'شماره موبایل معتبر نیست';
    if (form.msg.trim().length < 5) err.msg = 'پیام خود را بنویسید';
    setErrors(err);
    if (Object.keys(err).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: '', phone: '', topic: 'مشاوره خرید', msg: '' });
      toast({ title: 'پیام شما ثبت شد', text: 'کارشناسان ما به‌زودی تماس می‌گیرند', icon: 'check' });
    }, 900);
  };

  const field = 'h-12 w-full rounded-2xl border-0 bg-mist px-4 text-sm text-ink-900 ring-1 ring-ink-100 transition placeholder:text-ink-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ink-900';

  return (
    <section id="contact" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="تماس با ما" title="با ما در ارتباط باشید" />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <form onSubmit={submit} noValidate className="rounded-[2rem] bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-7">
            <p className="text-sm leading-7 text-ink-500">برای مشاوره خرید، استعلام قیمت سازمانی یا ثبت درخواست تعمیر، فرم زیر را پر کنید.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-ink-600">نام و نام خانوادگی</span>
                <input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="مثلا: سارا محمدی" />
                {errors.name && <span className="mt-1 block text-xs text-rose-500">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-ink-600">شماره موبایل</span>
                <input className={field + ' text-left'} dir="ltr" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0912 345 6789" />
                {errors.phone && <span className="mt-1 block text-xs text-rose-500">{errors.phone}</span>}
              </label>
            </div>
            <div className="mt-4">
              <span className="mb-1.5 block text-xs font-bold text-ink-600">موضوع</span>
              <div className="flex flex-wrap gap-2">
                {['مشاوره خرید', 'خرید سازمانی', 'تعمیر و ارتقا', 'پیگیری سفارش'].map((t) => (
                  <button type="button" key={t} onClick={() => setForm({ ...form, topic: t })} className={cx('rounded-full px-4 py-2 text-xs font-bold transition-colors', form.topic === t ? 'bg-ink-900 text-white' : 'bg-mist text-ink-600 ring-1 ring-ink-100 hover:ring-ink-300')}>{t}</button>
                ))}
              </div>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-bold text-ink-600">توضیحات</span>
              <textarea rows={5} className={field + ' h-auto py-3'} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} placeholder="بودجه، نوع کاربری یا مشکل دستگاه را بنویسید…" />
              {errors.msg && <span className="mt-1 block text-xs text-rose-500">{errors.msg}</span>}
            </label>
            <Button type="submit" disabled={sending} className="mt-5 w-full sm:w-auto" icon={sending ? undefined : 'arrowLeft'}>
              {sending ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> در حال ارسال…</>) : 'ارسال پیام'}
            </Button>
          </form>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col gap-4">
            <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-[2rem] ring-1 ring-ink-100">
              <iframe
                title="موقعیت شعبه مرکزی آرنوتک"
                loading="lazy"
                className="absolute inset-0 h-full w-full grayscale-[0.4]"
                src="https://www.openstreetmap.org/export/embed.html?bbox=51.405%2C35.715%2C51.425%2C35.730&layer=mapnik&marker=35.7225%2C51.415"
              />
            </div>
            <div className="grid gap-3 rounded-[2rem] bg-ink-900 p-5 sm:grid-cols-[1fr_auto]">
              <ul className="space-y-2.5 text-sm text-ink-200">
                <li className="flex items-center gap-2.5"><Icon name="phone" size={17} className="text-volt-400" /> <a href="tel:02191001234" className="hover:text-white">۰۲۱-۹۱۰۰۱۲۳۴</a></li>
                <li className="flex items-center gap-2.5"><Icon name="mail" size={17} className="text-volt-400" /> <span dir="ltr">hello@arnotech.ir</span></li>
                <li className="flex items-start gap-2.5"><Icon name="pin" size={17} className="mt-0.5 text-volt-400" /> تهران، ولیعصر، مجتمع آرنو</li>
              </ul>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-xs font-bold text-white">شبکه‌های اجتماعی ما</p>
                <div className="mt-3 flex gap-2">
                  {['instagram', 'telegram', 'whatsapp'].map((s) => (
                    <motion.a whileHover={{ y: -3, rotate: -6 }} key={s} href="#" onClick={(e) => e.preventDefault()} aria-label={s} className="grid h-10 w-10 place-items-center rounded-xl bg-volt-400 text-ink-900">
                      <Icon name={s} size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= Brand marquee / trust strip ================= */
export function TrustStrip() {
  const items = [
    ['shield', 'ضمانت اصالت کالا'], ['truck', 'ارسال همان‌روز تهران'], ['refresh', '۷ روز ضمانت بازگشت'],
    ['card', 'خرید اقساطی بدون ضامن'], ['headset', 'پشتیبانی ۲۴/۷'], ['award', 'نماد اعتماد الکترونیک']
  ];
  return (
    <div className="mt-10 overflow-hidden border-y border-ink-100 bg-white py-4">
      <div className="marquee flex w-max gap-10">
        {[...items, ...items].map(([ic, t], i) => (
          <span key={i} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-bold text-ink-600">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-volt-100 text-volt-700"><Icon name={ic} size={16} /></span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
