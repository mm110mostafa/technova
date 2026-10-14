import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Icon } from '../ui/Icon';
import { Button, ease } from '../ui/primitives';
import { href } from '../../store/useStore';
import { fa, toman } from '../../lib/format';
import { productMap } from '../../data/catalog';

const line = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: (i: number) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease, delay: 0.15 + i * 0.1 } })
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yPill = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const hero = productMap['helix-g16'];

  return (
    <section ref={ref} id="hero" className="relative pt-[100px] sm:pt-[108px]">
      <div className="container-x">
        <div className="noise relative overflow-hidden rounded-[32px] bg-ink-900 sm:rounded-[40px]">
          {/* atmosphere */}
          <div className="dot-grid-light absolute inset-0 opacity-50" />
          <div className="absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-ink-600/50 blur-[110px]" />
          <div className="absolute -bottom-40 left-[20%] h-[420px] w-[420px] rounded-full bg-volt-500/20 blur-[120px]" />

          <div className="relative grid items-center gap-10 px-5 pb-8 pt-10 sm:px-10 sm:pb-12 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-14 lg:py-16 xl:px-16">
            {/* Copy */}
            <div className="relative z-10 text-center lg:text-right">
              <motion.div initial="hidden" animate="show" custom={0} variants={line} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pe-4 ps-1.5 text-xs font-bold text-ink-200 backdrop-blur">
                <span className="rounded-full bg-volt-400 px-2.5 py-1 text-[11px] font-black text-ink-900">جدید</span>
                نسل ۱۴ اینتل و RTX سری ۴۰ رسید
              </motion.div>

              <h1 className="font-black tracking-tight text-white">
                <motion.span initial="hidden" animate="show" custom={1} variants={line} className="block text-[2.6rem] leading-[1.2] sm:text-6xl lg:text-[4.2rem] xl:text-[4.8rem]">
                  آرنـوتِــک
                </motion.span>
                <motion.span initial="hidden" animate="show" custom={2} variants={line} className="text-gradient-volt mt-2 block text-[1.45rem] leading-[1.5] sm:text-3xl lg:text-[2.2rem]">
                  قدرتی که دست‌هایتان را آزاد می‌کند
                </motion.span>
              </h1>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease, delay: 0.55 }} className="mx-auto my-7 h-px w-40 origin-right bg-gradient-to-l from-volt-400 to-transparent lg:mx-0" />

              <motion.p initial="hidden" animate="show" custom={4} variants={line} className="mx-auto max-w-lg text-[0.95rem] leading-8 text-ink-200 sm:text-base lg:mx-0">
                مرجع تخصصی لپ‌تاپ، سیستم‌های اسمبل‌شده و لوازم جانبی حرفه‌ای. با ضمانت اصالت کالا، مشاوره رایگان کارشناسان و ارسال همان‌روز در تهران، دستگاهی را انتخاب کنید که دقیقاً برای کار شما ساخته شده.
              </motion.p>

              <motion.div initial="hidden" animate="show" custom={5} variants={line} className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                <Button href={href.shop()} variant="volt" size="lg" icon="arrowLeft">بازدید از فروشگاه</Button>
                <Button href="#categories" variant="light" size="lg">انتخاب دسته‌بندی</Button>
              </motion.div>

              <motion.dl initial="hidden" animate="show" custom={6} variants={line} className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-x-reverse divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04] py-4 backdrop-blur lg:mx-0">
                {[
                  ['+۱۲٬۰۰۰', 'مشتری راضی'],
                  ['۱۰۰٪', 'ضمانت اصالت'],
                  ['۲۴ساعته', 'ارسال سریع']
                ].map(([v, l]) => (
                  <div key={l} className="px-2 text-center">
                    <dt className="text-lg font-black text-white sm:text-xl">{v}</dt>
                    <dd className="mt-1 text-[11px] text-ink-300 sm:text-xs">{l}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            {/* Composition (reference: tall pill portrait + product card + rotating gears) */}
            <div className="relative mx-auto h-[400px] w-full max-w-[560px] sm:h-[500px] lg:h-[560px]">
              <motion.div
                style={{ y: yPill }}
                initial={{ opacity: 0, y: 60, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.3 }}
                className="absolute right-0 top-0 h-[86%] w-[42%] overflow-hidden rounded-[999px] border border-white/15 p-2"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[999px]">
                  <img src="images/setup-dark.jpg" alt="میز کار گیمینگ با سه مانیتور" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  <span className="absolute inset-x-0 bottom-6 text-center text-xs font-bold text-white/90">اسمبل اختصاصی</span>
                </div>
              </motion.div>

              <motion.a
                href={href.product(hero.id)}
                style={{ y: yCard }}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.45 }}
                className="group absolute bottom-0 left-0 w-[66%] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-ink-700 to-ink-950 p-4 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] sm:p-5"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-volt-400/30 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-lg bg-volt-400 px-2 py-1 text-[10px] font-black text-ink-900 sm:text-[11px]">پرفروش‌ترین</span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-white">
                    <Icon name="star" size={13} filled className="text-volt-400" /> {fa(hero.rating)}
                  </span>
                </div>
                <img src={hero.images[0]} alt={hero.title} className="relative mx-auto my-2 aspect-[4/3] w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="relative">
                  <h3 className="truncate text-sm font-extrabold text-white sm:text-base">{hero.title}</h3>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-bold text-volt-300 sm:text-sm">{toman(hero.price)}</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-ink-900 transition-transform duration-300 group-hover:-rotate-45">
                      <Icon name="arrowLeft" size={16} />
                    </span>
                  </div>
                </div>
              </motion.a>

              {/* rotating "fans" — echo the reference's spinning gear accents */}
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.8, ease }} className="absolute left-[8%] top-[6%] grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/5 text-volt-400 backdrop-blur sm:h-20 sm:w-20">
                <Icon name="fan" size={34} className="spin-slow" stroke={1.4} />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.95, ease }} className="absolute right-[38%] top-[44%] grid h-12 w-12 place-items-center rounded-full bg-volt-400 text-ink-900 shadow-glow">
                <Icon name="fan" size={24} className="spin-slower" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.1, ease }}
                className="absolute bottom-[18%] right-[2%] hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 pe-5 text-white backdrop-blur-md sm:flex"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/20 text-emerald-300">
                  <Icon name="shield" size={20} />
                </span>
                <span>
                  <span className="block text-xs font-black">گارانتی ۲۴ ماهه</span>
                  <span className="block text-[11px] text-ink-300">+ ۷ روز بازگشت</span>
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* scroll cue (reference: floating icon under hero) */}
        <div className="relative -mt-7 flex justify-center">
          <motion.a
            href="#categories"
            aria-label="ادامه صفحه"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="grid h-14 w-14 place-items-center rounded-2xl border-4 border-mist bg-volt-400 text-ink-900 shadow-glow"
          >
            <Icon name="chevronDown" size={22} stroke={2.4} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
