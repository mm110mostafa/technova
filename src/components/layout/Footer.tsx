import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { Logo } from './Header';
import { categories } from '../../data/catalog';
import { go, useUI } from '../../store/useUI';

export function Footer() {
  const [email, setEmail] = useState('');
  const toast = useUI((s) => s.toast);
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink-950 text-ink-300">
      <div className="dot-grid-light absolute inset-0 opacity-40" />
      <div className="absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-volt-400/10 blur-[100px]" />

      <div className="container-x relative">
        {/* Newsletter band */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-12 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-2xl font-black text-white">اولین نفری باشید که از تخفیف‌ها باخبر می‌شود</h3>
            <p className="mt-2 text-sm text-ink-400">هفته‌ای یک ایمیل؛ بدون اسپم، فقط بهترین پیشنهادها و راهنمای خرید.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) return toast({ title: 'ایمیل معتبر نیست', icon: 'info' });
              toast({ title: 'عضویت شما ثبت شد', text: email, icon: 'check' });
              setEmail('');
            }}
            className="flex w-full max-w-md items-center gap-2 rounded-2xl bg-white/5 p-1.5 ring-1 ring-white/10 focus-within:ring-volt-400"
          >
            <Icon name="mail" size={18} className="mr-3 text-ink-400" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              dir="ltr"
              placeholder="you@email.com"
              aria-label="ایمیل"
              className="h-11 min-w-0 flex-1 border-0 bg-transparent text-left text-sm text-white placeholder:text-ink-500 focus:outline-none focus:ring-0"
            />
            <motion.button whileTap={{ scale: 0.95 }} className="h-11 rounded-xl bg-volt-400 px-5 text-sm font-black text-ink-900 hover:bg-volt-300">
              عضویت
            </motion.button>
          </form>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-7 text-ink-400">
              آرنوتک از ۱۳۹۲ همراه گیمرها، طراحان و کسب‌وکارهاست؛ با ضمانت اصالت، مشاوره صادقانه و پشتیبانی واقعی پس از خرید.
            </p>
            <div className="mt-6 flex gap-2">
              {['instagram', 'telegram', 'whatsapp', 'linkedin'].map((s) => (
                <motion.a key={s} whileHover={{ y: -3 }} href="#" aria-label={s} onClick={(e) => e.preventDefault()} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-ink-200 ring-1 ring-white/10 transition-colors hover:bg-volt-400 hover:text-ink-900">
                  <Icon name={s} size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black text-white">دسته‌بندی‌ها</h4>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button onClick={() => go({ name: 'shop', cat: c.id })} className="transition-colors hover:text-volt-400">{c.title}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black text-white">راهنمای خرید</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                ['شیوه‌های پرداخت و اقساط', 'faq'],
                ['رویه ارسال سفارش', 'steps'],
                ['شرایط گارانتی و مرجوعی', 'faq'],
                ['خدمات ارتقا و تعمیر', 'services'],
                ['سوالات متداول', 'faq']
              ].map(([t, a]) => (
                <li key={t}>
                  <button onClick={() => go({ name: 'home' }, a)} className="transition-colors hover:text-volt-400">{t}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black text-white">ارتباط با ما</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5"><Icon name="pin" size={18} className="mt-0.5 text-volt-400" /> تهران، خیابان ولیعصر، بالاتر از پارک ساعی، مجتمع آرنو، طبقه ۲</li>
              <li className="flex gap-2.5"><Icon name="phone" size={18} className="text-volt-400" /> <a href="tel:02191001234" className="hover:text-white">۰۲۱-۹۱۰۰۱۲۳۴</a></li>
              <li className="flex gap-2.5"><Icon name="mail" size={18} className="text-volt-400" /> <span dir="ltr">hello@arnotech.ir</span></li>
            </ul>
            <div className="mt-5 flex gap-2">
              {['اینماد', 'ساماندهی', 'اتحادیه'].map((t) => (
                <div key={t} className="grid h-16 w-16 place-items-center rounded-2xl bg-white/5 text-center text-[10px] font-bold text-ink-400 ring-1 ring-white/10">
                  <Icon name="award" size={20} className="mb-0.5 text-ink-300" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-ink-500 sm:flex-row">
          <p>© ۱۴۰۵ آرنوتک. تمامی حقوق محفوظ است.</p>
          <p>طراحی‌شده با دقت برای تجربه‌ای بی‌نقص در هر صفحه‌نمایش</p>
        </div>
      </div>
    </footer>
  );
}
