import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/primitives';
import { go, scrollToId } from '../store/useUI';
import { fa } from '../lib/format';
import { productById } from '../data/catalog';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const featured = productById['helix-g16'];

  const title = 'آرنوتک';
  return (
    <section ref={ref} id="hero" className="px-2 pt-3 sm:px-4">
      <div className="noise relative mx-auto max-w-[1320px] overflow-hidden rounded-[2rem] bg-ink-900 sm:rounded-[2.5rem]">
        {/* atmosphere */}
        <div className="dot-grid-light absolute inset-0 opacity-50" />
        <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-volt-400/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-[380px] w-[380px] rounded-full bg-ink-500/40 blur-[120px]" />
        <svg className="absolute inset-x-0 bottom-0 h-24 w-full text-ink-800/60" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60 C 300 0 500 100 800 50 S 1100 20 1200 60 V100 H0Z" fill="currentColor" />
        </svg>

        <div className="relative grid items-center gap-10 px-5 pb-14 pt-12 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-14 lg:pb-20 lg:pt-16">
          {/* Copy */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 py-1.5 pl-4 pr-1.5 text-xs font-bold text-ink-200 ring-1 ring-white/10 backdrop-blur lg:mx-0"
            >
              <span className="rounded-full bg-volt-400 px-2.5 py-1 text-[11px] font-black text-ink-900">جدید</span>
              نسل تازه لپ‌تاپ‌های Core Ultra رسید
            </motion.div>

            <h1 className="font-black leading-none tracking-tight text-white">
              <span className="sr-only">آرنوتک — فروشگاه تخصصی لپ‌تاپ و لوازم کامپیوتری</span>
              {/* Persian is cursive — animate the whole word (per-letter spans would break joining). */}
              <span aria-hidden="true" className="block overflow-hidden pb-2 text-[3.6rem] sm:text-[5rem] lg:text-[6rem]">
                <motion.span
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease, delay: 0.3 }}
                  className="inline-block"
                >
                  {title}
                  <span className="text-volt-400">.</span>
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.75 }}
              className="mt-4 text-xl font-extrabold text-volt-400 sm:text-2xl"
            >
              فروشگاه تخصصی لپ‌تاپ و لوازم کامپیوتری
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease, delay: 0.9 }}
              className="mx-auto my-6 h-px w-40 origin-right bg-gradient-to-l from-volt-400 via-white/30 to-transparent lg:mx-0"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1 }}
              className="mx-auto max-w-lg text-[15px] leading-8 text-ink-300 lg:mx-0"
            >
              از اولترابوک‌های سبک برای روزمره تا ماشین‌های گیمینگ با RTX سری ۴۰؛ هر دستگاه پیش از ارسال تست می‌شود، با ضمانت اصالت و مشاوره صادقانه به دستتان می‌رسد.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.1 }}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <Button variant="volt" size="lg" icon="arrowLeft" onClick={() => go({ name: 'shop' })}>
                بازدید از فروشگاه
              </Button>
              <Button variant="light" size="lg" onClick={() => scrollToId('services')}>
                <Icon name="headset" size={19} /> مشاوره رایگان خرید
              </Button>
            </motion.div>
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-x-reverse divide-white/10 rounded-3xl bg-white/5 py-4 ring-1 ring-white/10 lg:mx-0"
            >
              {[
                ['+۱۲', 'سال تجربه'],
                ['+۴۸K', 'مشتری راضی'],
                ['۲۴/۷', 'پشتیبانی']
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <dt className="text-xl font-black text-white">{n}</dt>
                  <dd className="mt-0.5 text-xs text-ink-200">{l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Visual — reference: tall pill portrait card + product card + rotating gears */}
          <div className="relative mx-auto flex w-full max-w-[560px] flex-col gap-4 sm:flex-row sm:items-end sm:justify-center">
            <motion.div style={{ y: yA }} className="relative w-full sm:w-[38%] sm:shrink-0">
              <motion.button
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => go({ name: 'shop', cat: 'pc' })}
                className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[2rem] p-1.5 ring-1 ring-white/20 sm:aspect-[0.44] sm:rounded-full"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] sm:rounded-full">
                  <img src="images/setup-dark.jpg" alt="ست گیمینگ آرنوتک" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-8 text-center">
                    <p className="text-[11px] text-ink-300">ساخت سیستم</p>
                    <p className="text-sm font-black text-white">سفارشی شما</p>
                    <span className="mx-auto mt-2 grid h-9 w-9 place-items-center rounded-full bg-volt-400 text-ink-900 transition-transform group-hover:rotate-45">
                      <Icon name="arrowUpLeft" size={18} />
                    </span>
                  </div>
                </div>
              </motion.button>
              {/* gear */}
              <div className="absolute -right-4 top-10 grid h-14 w-14 place-items-center rounded-full bg-ink-800 text-volt-400 ring-4 ring-ink-900 sm:-right-6 sm:h-16 sm:w-16">
                <Icon name="fan" size={30} className="spin-slow" />
              </div>
            </motion.div>

            <motion.div style={{ y: yB }} className="relative w-full sm:w-[58%]">
              <motion.button
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.65 }}
                whileHover={{ y: -6 }}
                onClick={() => go({ name: 'product', id: featured.id })}
                className="group relative block w-full overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-ink-600 to-ink-800 p-3 pb-4 text-right shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] ring-1 ring-white/20 sm:p-4 sm:pb-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-volt-400 px-2.5 py-1 text-[10px] font-black text-ink-900 sm:text-[11px]">٪۱۰ تخفیف</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-white">
                    {fa(featured.rating)} <Icon name="star" size={13} filled stroke={1} className="text-volt-400" />
                  </span>
                </div>
                <div className="relative my-3 overflow-hidden rounded-[1.6rem]">
                  <img src={featured.images[0]} alt={featured.title} className="aspect-[1.05] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="text-[11px] text-ink-300">لپ‌تاپ گیمینگ</p>
                <p className="line-clamp-1 text-sm font-black text-white sm:text-base">Helix G16 · RTX 4070</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-black text-volt-400 sm:text-base">{fa(featured.price / 1_000_000)} <span className="text-[10px] text-ink-300">میلیون تومان</span></span>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-ink-900 transition-colors group-hover:bg-volt-400">
                    <Icon name="bag" size={17} />
                  </span>
                </div>
              </motion.button>
              <div className="absolute -bottom-5 -left-3 grid h-12 w-12 place-items-center rounded-full bg-ink-800 text-ink-300 ring-4 ring-ink-900 sm:h-14 sm:w-14">
                <Icon name="fan" size={24} className="spin-slower" />
              </div>
              {/* floating trust chip */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease, delay: 1.3 }}
                className="absolute -left-4 top-1/3 hidden items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-lift sm:flex"
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Icon name="shield" size={17} /></span>
                <span className="text-right leading-tight">
                  <span className="block text-[11px] font-black text-ink-900">ضمانت اصالت</span>
                  <span className="block text-[10px] text-ink-400">گارانتی ۱۸ ماهه</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* scroll cue (reference: small bouncing login icon pill) */}
      <div className="relative z-10 -mt-7 flex justify-center">
        <button onClick={() => scrollToId('categories')} aria-label="مشاهده دسته‌بندی‌ها" className="grid h-14 w-14 place-items-center rounded-full bg-mist p-1.5">
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="grid h-full w-full place-items-center rounded-full bg-volt-400 text-ink-900 shadow-glow"
          >
            <Icon name="chevronDown" size={20} stroke={2.4} />
          </motion.span>
        </button>
      </div>
    </section>
  );
}
