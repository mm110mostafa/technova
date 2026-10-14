import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { Button, SectionHeading, ease } from '../ui/primitives';
import { faqs } from '../../data/catalog';
import { useStore } from '../../store/useStore';
import { cx, fa } from '../../lib/format';

/* ---------------- Animated counter ---------------- */
export function Counter({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={className}>
      {fa(v)}
      {suffix}
    </span>
  );
}

/* ---------------- Branches + hotspot map ---------------- */
const spots = [
  { id: 1, name: 'شعبه مرکزی', city: 'تهران، خیابان ولیعصر', x: 47, y: 30, main: true },
  { id: 2, name: 'شعبه دوم', city: 'مشهد، بلوار سجاد', x: 80, y: 28 },
  { id: 3, name: 'شعبه سوم', city: 'اصفهان، چهارباغ بالا', x: 50, y: 52 },
  { id: 4, name: 'شعبه چهارم', city: 'شیراز، خیابان ملاصدرا', x: 53, y: 72 },
  { id: 5, name: 'نمایندگی', city: 'تبریز، خیابان امام', x: 22, y: 14 }
];

export function Branches() {
  const [active, setActive] = useState(1);
  return (
    <section id="branches" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="شعب آرنوتک" title="همه‌جا در کنار شما هستیم" />
        <div className="mt-10 grid gap-5 lg:grid-cols-[.9fr_1.4fr]">
          <div className="flex flex-col gap-5">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="rounded-[28px] border border-ink-100 bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-lg font-black text-ink-900">
                <Icon name="pin" className="text-volt-500" /> شعبه مرکزی تهران
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink-400">
                بیش از ۱۲۰۰ مترمربع فضای نمایش و تست محصول؛ قبل از خرید، لپ‌تاپ‌ها و مانیتورها را از نزدیک امتحان کنید و با کارشناسان ما گفتگو کنید.
              </p>
              <Button href="#contact" variant="primary" size="sm" icon="arrowLeft" className="mt-5">مسیریابی و ساعات کاری</Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.1 }} className="grid flex-1 grid-cols-3 gap-3 rounded-[28px] bg-volt-400 p-5 sm:p-6">
              {[
                [12000, '+', 'مشتری راضی'],
                [45, '+', 'متخصص فنی'],
                [12, '', 'سال سابقه']
              ].map(([n, s, l]) => (
                <div key={l as string} className="flex flex-col justify-center rounded-2xl bg-white/40 p-3 text-center backdrop-blur">
                  <span className="block text-[11px] font-bold text-ink-700">{l}</span>
                  <Counter to={n as number} suffix={s as string} className="mt-1 block text-xl font-black text-ink-900 sm:text-2xl" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="noise relative min-h-[340px] overflow-hidden rounded-[32px] bg-ink-900 sm:min-h-[420px]"
          >
            <div className="dot-grid-light absolute inset-0" />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-[8%] h-[84%] w-[84%] opacity-[.18]" aria-hidden="true">
              <path d="M12 8 L30 4 L48 14 L62 10 L84 14 L92 30 L88 50 L94 66 L80 88 L62 94 L48 84 L34 78 L22 62 L16 44 L6 30 Z" fill="#6B7BBE" stroke="#A7B1DA" strokeWidth=".4" />
            </svg>
            <div className="absolute inset-[8%]">
              {spots.map((s) => (
                <div key={s.id} className="absolute" style={{ left: s.x + '%', top: s.y + '%' }}>
                  <button
                    onMouseEnter={() => setActive(s.id)}
                    onFocus={() => setActive(s.id)}
                    onClick={() => setActive(s.id)}
                    aria-label={s.name + ' — ' + s.city}
                    className={cx('hotspot relative -translate-x-1/2 -translate-y-1/2 rounded-full', s.main ? 'h-5 w-5' : 'h-3.5 w-3.5')}
                  >
                    <span className="relative block h-full w-full rounded-full border-2 border-ink-900 bg-volt-400" />
                  </button>
                  <AnimatePresence>
                    {active === s.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.25, ease }}
                        className="pointer-events-none absolute bottom-5 left-1/2 z-10 w-max -translate-x-1/2 rounded-2xl bg-white px-4 py-2.5 text-center shadow-lift"
                      >
                        <span className="block text-xs font-black text-ink-900">{s.name}</span>
                        <span className="block text-[11px] text-ink-400">{s.city}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-volt-400" /> {fa(5)} شعبه فعال در سراسر کشور
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ordering process timeline (scroll-linked) ---------------- */
const steps = [
  { icon: 'search', title: 'انتخاب یا مشاوره', text: 'محصول مورد نظر را انتخاب کنید یا با کارشناسان ما برای پیکربندی ایده‌آل مشورت کنید.' },
  { icon: 'card', title: 'ثبت سفارش و پرداخت', text: 'پرداخت امن آنلاین، کارت‌به‌کارت یا اقساطی؛ فاکتور رسمی بلافاصله صادر می‌شود.' },
  { icon: 'box', title: 'تست و بسته‌بندی', text: 'هر دستگاه پیش از ارسال تست سلامت شده و با فوم ضدضربه و پلمپ امنیتی بسته‌بندی می‌شود.' },
  { icon: 'truck', title: 'تحویل درب منزل', text: 'ارسال همان‌روز در تهران و ۲۴ تا ۷۲ ساعت در سایر شهرها، با بیمه کامل مرسوله.' }
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <section id="process" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="مراحل سفارش" title="سریع‌ترین مسیر از انتخاب تا تحویل" center />
        <div ref={ref} className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute bottom-0 right-6 top-0 w-[2px] rounded-full bg-ink-100 md:right-1/2 md:translate-x-1/2" />
          <motion.div style={{ height }} className="absolute right-6 top-0 w-[2px] rounded-full bg-gradient-to-b from-volt-400 to-ink-900 md:right-1/2 md:translate-x-1/2" />
          <ol className="space-y-10 md:space-y-14">
            {steps.map((s, i) => (
              <li key={s.title} className={cx('relative grid items-center gap-6 pr-16 md:grid-cols-2 md:pr-0', i % 2 === 1 && 'md:[&>*:first-child]:col-start-2')}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.75, ease }}
                  className={cx('rounded-[26px] border border-ink-100 bg-white p-5 shadow-card sm:p-6', i % 2 ? 'md:mr-12' : 'md:ml-12')}
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mist text-ink-900">
                      <Icon name={s.icon} size={22} />
                    </span>
                    <h3 className="text-lg font-black text-ink-900">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-ink-400">{s.text}</p>
                </motion.div>
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="absolute right-6 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 translate-x-1/2 place-items-center rounded-2xl bg-ink-900 text-sm font-black text-volt-400 ring-8 ring-mist md:right-1/2"
                >
                  {fa('0' + (i + 1))}
                </motion.span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ accordion ---------------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="سوالات متداول" title="مهم‌ترین اصل برای ما رضایت شماست" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                  className={cx('overflow-hidden rounded-[22px] border bg-white transition-colors duration-300', isOpen ? 'border-ink-900 shadow-card' : 'border-ink-100')}
                >
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center gap-4 p-4 text-right sm:p-5">
                    <span className={cx('grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300', isOpen ? 'bg-volt-400 text-ink-900' : 'bg-mist text-ink-500')}>
                      <Icon name="info" size={19} />
                    </span>
                    <span className="flex-1 text-[0.95rem] font-extrabold leading-7 text-ink-900">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-100 text-ink-900">
                      <Icon name="plus" size={17} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                        <div className="mx-4 mb-5 border-t border-dashed border-ink-100 pt-4 sm:mx-5">
                          <span className="mb-1 block text-xs font-black text-volt-600">پاسخ</span>
                          <p className="text-sm leading-8 text-ink-500">{f.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[32px] bg-ink-900 p-6"
          >
            <img src="images/workspace.jpg" alt="میز کار با مانیتور و لپ‌تاپ" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-volt-400 text-ink-900">
                <Icon name="headset" size={24} />
              </span>
              <h3 className="mt-4 text-2xl font-black text-white">پاسخگوی سوالات شما هستیم</h3>
              <p className="mt-2 text-sm leading-7 text-ink-300">شنبه تا پنجشنبه، ۹ صبح تا ۹ شب. میانگین زمان پاسخ: کمتر از ۳ دقیقه.</p>
              <Button href="#contact" variant="volt" icon="plus" className="mt-5">ایجاد پرسش جدید</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const toast = useStore((s) => s.toast);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      form.reset();
      toast('پیام شما ثبت شد؛ به‌زودی با شما تماس می‌گیریم');
      setTimeout(() => setSent(false), 3000);
    }, 1100);
  };
  const input = 'h-12 w-full rounded-2xl border border-ink-100 bg-mist px-4 text-sm text-ink-900 outline-none transition-all placeholder:text-ink-300 focus:border-ink-900 focus:bg-white focus:ring-4 focus:ring-ink-900/5';
  return (
    <section id="contact" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="تماس با ما" title="با ما در ارتباط باشید" />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="rounded-[32px] border border-ink-100 bg-white p-6 shadow-card sm:p-8"
          >
            <p className="text-sm leading-7 text-ink-400">برای مشاوره خرید، استعلام قیمت سازمانی یا پیگیری سفارش، فرم زیر را تکمیل کنید. کارشناسان ما در کمتر از یک ساعت کاری با شما تماس می‌گیرند.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-ink-700">نام و نام خانوادگی</span>
                <input required name="name" className={input} placeholder="مثلاً سارا محمدی" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold text-ink-700">شماره تماس</span>
                <input required name="phone" type="tel" inputMode="tel" pattern="[0-9۰-۹+\- ]{8,}" className={input} placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" dir="rtl" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-bold text-ink-700">موضوع</span>
                <select name="topic" className={input + ' appearance-none'}>
                  <option>مشاوره خرید لپ‌تاپ</option>
                  <option>اسمبل سیستم اختصاصی</option>
                  <option>ارتقا و خدمات فنی</option>
                  <option>خرید سازمانی</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-bold text-ink-700">توضیحات</span>
                <textarea name="message" rows={5} className={input + ' h-auto resize-none py-3'} placeholder="کاربری مورد نظر، بودجه تقریبی و…" />
              </label>
            </div>
            <Button type="submit" variant="primary" className="mt-6 w-full sm:w-auto sm:min-w-[180px]" disabled={sending}>
              {sending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> در حال ارسال…
                </span>
              ) : sent ? (
                <span className="flex items-center gap-2"><Icon name="check" size={18} /> ارسال شد</span>
              ) : (
                'ارسال پیام'
              )}
            </Button>
          </motion.form>

          <div className="flex flex-col gap-5">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.1 }} className="h-[260px] overflow-hidden rounded-[32px] border border-ink-100 bg-ink-100 shadow-card">
              <iframe
                title="موقعیت شعبه مرکزی آرنوتک روی نقشه"
                loading="lazy"
                className="h-full w-full grayscale-[.4]"
                src="https://www.openstreetmap.org/export/embed.html?bbox=51.395%2C35.715%2C51.425%2C35.735&layer=mapnik&marker=35.725%2C51.41"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: 0.2 }} className="grid flex-1 gap-5 sm:grid-cols-[1.3fr_1fr]">
              <ul className="space-y-4 rounded-[28px] bg-ink-900 p-6 text-white">
                {[
                  ['phone', 'تلفن', '۰۲۱-۹۱۰۰۱۲۳۴'],
                  ['mail', 'ایمیل', 'hello@arnotech.ir'],
                  ['pin', 'آدرس', 'تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۴']
                ].map(([ic, k, v]) => (
                  <li key={k} className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-volt-400">
                      <Icon name={ic} size={18} />
                    </span>
                    <span>
                      <span className="block text-[11px] text-ink-300">{k}</span>
                      <span className="mt-0.5 block text-sm font-bold leading-6">{v}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col justify-between rounded-[28px] bg-volt-400 p-6">
                <h3 className="text-lg font-black text-ink-900">شبکه‌های اجتماعی ما</h3>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {['instagram', 'telegram', 'whatsapp', 'linkedin'].map((s) => (
                    <motion.a key={s} href="#" whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }} aria-label={s} className="grid h-12 place-items-center rounded-2xl bg-ink-900 text-white transition-colors hover:bg-white hover:text-ink-900">
                      <Icon name={s} size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
