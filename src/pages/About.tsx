import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button, Img, Reveal, SectionHeading } from '../components/ui/primitives';
import { branches } from '../data/catalog';
import { go } from '../store/useUI';
import { cx, fa } from '../lib/format';

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------- Animated counter (reused from the branches section) ---------------- */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="block text-xl font-black text-volt-400 sm:text-2xl" dir="ltr">{fa(v)}{suffix}</span>;
}

const HERO_STATS: Array<[number, string, string]> = [
  [12, '+', 'سال تجربه'],
  [48, 'K+', 'مشتری راضی'],
  [5, '', 'شعبه در کشور'],
  [35, '+', 'کارشناس فنی']
];

/* ---------------- Hero band ---------------- */
function Hero() {
  return (
    <section className="px-2 pt-3 sm:px-4">
      <div className="noise relative mx-auto max-w-[1320px] overflow-hidden rounded-[2.2rem] bg-ink-900 px-4 py-10 sm:rounded-[2.5rem] sm:px-8 sm:py-14 lg:px-12">
        <div className="dot-grid-light absolute inset-0 opacity-40" />
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-volt-400/20 blur-[120px]" />
        <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-ink-500/30 blur-[100px]" />

        <nav className="relative flex items-center gap-2 text-xs text-ink-400" aria-label="مسیر">
          <button onClick={() => go({ name: 'home' })} className="hover:text-white">خانه</button>
          <Icon name="chevronLeft" size={13} />
          <span className="text-volt-400">درباره ما</span>
        </nav>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="relative mt-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
          درباره آرنوتک
        </motion.h1>
        <p className="relative mt-2 max-w-2xl text-sm text-ink-300 sm:text-base">
          فروشنده‌ای که به اصالت، شفافیت و باور سادهٔ «خرید لپ‌تاپ نباید پیچیده باشد» پایبند است.
        </p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-8 grid grid-cols-2 divide-x divide-x-reverse divide-white/10 rounded-3xl bg-white/5 py-4 ring-1 ring-white/10 sm:grid-cols-4 sm:py-6 lg:mt-10"
        >
          {HERO_STATS.map(([n, s, l], i) => (
            <div key={l} className="text-center">
              <Counter to={n} suffix={s} />
              <p className="mt-0.5 text-xs text-ink-200 sm:text-sm">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Story timeline ---------------- */
const STORY = [
  { year: '۱۳۹۲', title: 'شروع از یک مغازه کوچک', text: 'آرنوتک در یک مغازه ۲۰ متری در ولیعصر شروع شد؛ با این باور که خرید لپ‌تاپ نباید پرریسک باشد.', icon: 'shop' },
  { year: '۱۳۹۵', title: 'راه‌اندازی کارگاه فنی', text: 'اولین کارگاه مجهز آرنوتک افتتاح شد. از آن روز، هر دستگاه پیش از ارسال ۴۰ مرحله تست می‌شود.', icon: 'wrench' },
  { year: '۱۳۹۸', title: 'گسترش به سه شهر', text: 'با اعتماد مشتریان، شعبه‌های اصفهان و مشهد افتتاح شدند و pertamaین تیم تخصصی فروش تشکیل شد.', icon: 'pin' },
  { year: '۱۴۰۱', title: 'فروشگاه آنلاین آرنوتک', text: 'سایت آرنوتک رونمایی شد: انتخاب آسان، مشاوره زنده، و پرداخت امن برای همه‌ی khách hàng در سراسر کشور.', icon: 'globe' },
  { year: '۱۴۰۴', title: 'پنج شعبه و هزاران مشتری', text: 'امروز آرنوتک با پنج شعبه فعال، کارگاه فنی یکپارچه و تیمی از کارشناسان، همراه گیمرها، дизайнеры و سازمان‌هاست.', icon: 'award' }
];

function Story() {
  return (
    <section id="story" className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="داستان ما" title="چگونه از یک مغازه کوچک به پنج شعبه رسیدیم" />
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-6 right-[27px] top-6 w-[3px] rounded-full bg-ink-200 sm:right-[35px]" />
        <ol className="space-y-5">
          {STORY.map((s, i) => (
            <motion.li
              key={s.year}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="relative flex gap-4 sm:gap-6"
            >
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink-900 text-sm font-black text-volt-400 shadow-card ring-4 ring-mist sm:h-[72px] sm:w-[72px] sm:text-lg">
                {s.year}
              </span>
              <div className={cx('flex flex-1 items-start gap-4 rounded-[1.8rem] p-5 ring-1 transition-colors duration-500', 'bg-white ring-ink-100')}>
                <div className="flex-1">
                  <h3 className="text-base font-black sm:text-lg text-ink-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-ink-600">{s.text}</p>
                </div>
                <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-mist text-ink-900 sm:grid">
                  <Icon name={s.icon} size={24} />
                </span>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Values ---------------- */
const VALUES = [
  { icon: 'shield', title: 'اصالت کالا، بدون компромیس', text: 'تمامی محصولات با کد رهگیری اصالت، فاکتور رسمی و گارانتی ۱۸ تا ۲۴ ماهه عرضه می‌شوند. هیچ کالای متشابه یا کارکرده در فروشگاه ما جای ندارد.' },
  { icon: 'percent', title: 'قیمت منصفانه، روزانه به‌روز', text: 'قیمت‌ها هر روز با بازار مقایسه می‌شوند و تخفیف‌های واقعی — نه نمایشی — روی کالاها قرار می‌گیرد.' },
  { icon: 'headset', title: 'همراهی تا پایان گارانتی', text: 'فروش پایان کار نیست. کارشناسان ما تا آخرین روز گارانتی پاسخگوی سوالات فنی و پیگیری شما هستند.' },
  { icon: 'wrench', title: 'تخصص فنی، نه فقط فروش', text: 'تیم ما از مهندسانی تشکیل شده که خودشان سیستم اسمبل می‌کنند، لپ‌تاپ را باز می‌کنند و تفاوت هر قطعه را می‌دانند.' }
];

function Values() {
  return (
    <section className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="ارزش‌های آرنوتک" title="به چه چیزی پایبندیم" />
      <div className="grid gap-4 sm:grid-cols-2">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06}>
            <div className="group relative h-full overflow-hidden rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-ink-100 transition-colors duration-500 hover:bg-ink-900">
              <span className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-volt-400/0 blur-2xl transition-colors duration-500 group-hover:bg-volt-400/30" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-900 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-volt-400">
                <Icon name={v.icon} size={26} />
              </span>
              <h3 className="relative mt-6 text-lg font-black text-ink-900 transition-colors group-hover:text-white">{v.title}</h3>
              <p className="relative mt-2 text-sm leading-7 text-ink-500 transition-colors group-hover:text-ink-300">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Workshop + team ---------------- */
function Workshop() {
  return (
    <section className="container-x pt-20 sm:pt-28">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <div className="relative h-[340px] min-h-[340px] overflow-hidden rounded-[2.2rem] sm:h-[420px]">
            <motion.img
              src="images/service-repair.jpg"
              alt="کارگاه فنی آرنوتک"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
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

        <div className="flex flex-col gap-5">
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-volt-100 px-3 py-1 text-xs font-black text-volt-700"><Icon name="wrench" size={14} /> کارگاه و تیم</span>
            <h3 className="mt-3 text-2xl font-black text-ink-900 sm:text-[1.7rem]">پشت هر دستگاه، یک تیم متخصص ایستاده است</h3>
            <p className="mt-3 text-[15px] leading-8 text-ink-600">
              در آرنوتک، فروشندگان فقط فروشنده نیستند؛ بیشتر آنها خودشان سیستم اسمبل می‌کنند و لپ‌تاپ را باز می‌کنند. کارگاه فنی ما با دستگاه‌های تست تخصصی، هر دستگاه را قبل از بسته‌بندی از نظر سلامت صفحه‌کلید، پورت‌ها، باتری و دمای پردازنده بررسی می‌کند.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button icon="arrowLeft" onClick={() => go({ name: 'shop' })}>مشاهده محصولات</Button>
              <Button variant="outline" onClick={() => go({ name: 'home' }, 'contact')}>تماس با کارشناسان</Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3 rounded-[2rem] bg-ink-900 p-4">
              {[
                ['award', '۱۰۰٪', 'کالاهای اصیل'],
                ['clock', '۲۴ تا ۷۲ ساعت', 'ارسال به سراسر کشور'],
                ['shield', '۱۸ ماه', 'گارانتی رسمی'],
                ['refresh', '۷ روز', 'ضمانت بازگشت']
              ].map(([ic, n, l], i) => (
                <div key={i} className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10 sm:p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-volt-400/20 text-volt-400 mx-auto mb-2"><Icon name={ic} size={18} /></span>
                  <p className="text-xl font-black text-volt-400 sm:text-2xl" dir="ltr">{n}</p>
                  <p className="mt-0.5 text-[11px] text-ink-300 sm:text-xs">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Branches mini ---------------- */
function BranchesMini() {
  return (
    <section className="container-x pt-20 sm:pt-28">
      <SectionHeading eyebrow="شبکه شعب" title="همه جا در کنار شما هستیم" />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
        <Reveal>
          <div className="rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-ink-100">
            <p className="text-sm leading-7 text-ink-600">
              آرنوتک در پنج شهر بزرگ کشور شعبه دارد. در هر شعبه می‌توانید محصولات را از نزدیک ببینید، تست کنید و سفارش خود را به‌صورت حضوری تحویل بگیرید.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {branches.map((b) => (
                <span key={b.city} className="rounded-full bg-mist px-3.5 py-1.5 text-xs font-bold text-ink-700">{b.label} · {b.city}</span>
              ))}
            </div>
            <Button className="mt-6 w-full" icon="arrowLeft" onClick={() => go({ name: 'home' }, 'branches')}>مشاهده نقشه شعبه‌ها</Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-full min-h-[280px] overflow-hidden rounded-[2rem] ring-1 ring-ink-100">
            <Img src="images/workspace.jpg" alt="تیم پشتیبانی آرنوتک" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-sm font-black text-white">پاسخگوی سوالات شما هستیم</p>
              <p className="mt-1 text-xs text-ink-300">معمولا در کمتر از ۱۰ دقیقه پاسخ می‌دهیم</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function Cta() {
  return (
    <section className="container-x pb-16 pt-12 sm:pt-20">
      <div className="noise relative overflow-hidden rounded-[2.2rem] bg-ink-900 px-6 py-12 text-center sm:px-10 sm:py-16">
        <div className="dot-grid-light absolute inset-0 opacity-40" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-volt-400/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-ink-500/30 blur-3xl" />
        <Reveal>
          <h3 className="relative text-2xl font-black text-white sm:text-[2rem]">آمادهٔ خرید هستید؟</h3>
          <p className="relative mt-3 text-sm text-ink-300 sm:text-base">از میان صدها محصول اصل، با مشاورهٔ رایگان کارشناسان ما انتخاب کنید.</p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Button variant="volt" size="lg" icon="arrowLeft" onClick={() => go({ name: 'shop' })}>بازدید از فروشگاه</Button>
            <Button variant="light" size="lg" icon="phone" onClick={() => go({ name: 'home' }, 'contact')}>مشاوره رایگان</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <Values />
      <Workshop />
      <BranchesMini />
      <Cta />
    </>
  );
}