import { motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { Button, SectionHeading, ease } from '../ui/primitives';
import { fa } from '../../lib/format';

const services = [
  { icon: 'headset', title: 'مشاوره تخصصی خرید', text: 'کارشناسان ما بر اساس نوع کار و بودجه، بهترین پیکربندی را رایگان پیشنهاد می‌دهند.', cta: 'درخواست مشاوره' },
  { icon: 'cpu', title: 'اسمبل سیستم اختصاصی', text: 'انتخاب قطعات هماهنگ، کابل‌کشی حرفه‌ای و ۲۴ ساعت تست استرس پیش از تحویل.', cta: 'سفارش اسمبل' },
  { icon: 'wrench', title: 'ارتقا و سرویس فنی', text: 'ارتقای رم و SSD، سرویس فن و خمیر سیلیکون، با قطعات اصل در کمتر از ۳ ساعت.', cta: 'رزرو نوبت' },
  { icon: 'card', title: 'خرید اقساطی آسان', text: 'تا ۱۲ ماه اقساط بدون ضامن با پیش‌پرداخت ۲۰٪، برای اغلب لپ‌تاپ‌ها و سیستم‌ها.', cta: 'شرایط اقساط' }
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="خدمات ما" title="با ما کیفیت متفاوتی را تجربه کنید" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#contact"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-ink-100 bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-900 hover:bg-ink-900 hover:shadow-lift"
            >
              <span className="absolute -left-6 -top-6 text-[7rem] font-black leading-none text-ink-100/70 transition-colors duration-500 group-hover:text-white/5">{fa(i + 1)}</span>
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-mist text-ink-900 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-volt-400">
                <Icon name={s.icon} size={26} />
              </span>
              <h3 className="relative mt-6 text-lg font-black text-ink-900 transition-colors duration-500 group-hover:text-white">{s.title}</h3>
              <p className="relative mt-2 flex-1 text-sm leading-7 text-ink-400 transition-colors duration-500 group-hover:text-ink-300">{s.text}</p>
              <span className="relative mt-6 flex items-center gap-2 text-sm font-extrabold text-ink-900 transition-colors duration-500 group-hover:text-volt-400">
                {s.cta}
                <Icon name="arrowLeft" size={17} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow="درباره آرنوتک" title="هر آنچه باید درباره ما بدانید" />
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="relative min-h-[360px] overflow-hidden rounded-[32px] sm:min-h-[460px]"
          >
            <img src="images/service-ram.jpg" alt="کارشناس فنی در حال نصب رم روی مادربرد" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
            <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between gap-4">
              <div className="rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur">
                <span className="block text-3xl font-black text-ink-900">{fa(12)}+</span>
                <span className="text-xs font-bold text-ink-400">سال تجربه تخصصی</span>
              </div>
              <div className="hidden overflow-hidden rounded-2xl border-4 border-white shadow-lift sm:block">
                <img src="images/service-repair.jpg" alt="لحیم‌کاری برد الکترونیکی" loading="lazy" className="h-28 w-40 object-cover" />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="text-[0.98rem] leading-9 text-ink-500">
              آرنوتک از سال ۱۳۹۲ با یک هدف ساده شروع کرد: «هیچ‌کس نباید لپ‌تاپ اشتباه بخرد». امروز با بیش از ۱۲ هزار مشتری، انبار مرکزی در تهران و تیم فنی مجرب، تجربه‌ای شفاف از انتخاب تا خدمات پس از فروش ارائه می‌دهیم. هر دستگاه پیش از ارسال توسط تیم کنترل کیفیت ما بررسی و پلمپ می‌شود.
            </motion.p>
            <div>
              <Button href="#contact" variant="primary" icon="arrowLeft">بیشتر درباره آرنوتک</Button>
            </div>

            {/* "Why us" dark card (reference: navy card with big "چرا؟!") */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="noise relative mt-auto overflow-hidden rounded-[32px] bg-ink-900 p-6 text-white sm:p-8"
            >
              <div className="dot-grid-light absolute inset-0 opacity-50" />
              <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-volt-400/20 blur-3xl" />
              <div className="relative flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-xl font-black leading-9 sm:text-2xl">
                  آرنوتک بهترین انتخاب
                  <br />
                  شما می‌تونه باشه…
                </h3>
                <span className="text-5xl font-black text-volt-400 sm:text-6xl">
                  چـرا<span className="text-white">؟!</span>
                </span>
              </div>
              <ul className="relative mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['shield', 'ضمانت اصالت و سلامت فیزیکی'],
                  ['truck', 'ارسال همان‌روز با بیمه کامل'],
                  ['refresh', '۷ روز بازگشت بدون قیدوشرط'],
                  ['headset', 'پشتیبانی فنی مادام‌العمر']
                ].map(([ic, t]) => (
                  <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm font-bold">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-volt-400 text-ink-900">
                      <Icon name={ic} size={18} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
