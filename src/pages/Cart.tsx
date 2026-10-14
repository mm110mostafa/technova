import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button, Img } from '../components/ui/primitives';
import { Qty } from '../components/layout/Overlays';
import { ProductCard } from '../components/product/ProductCard';
import { productById, products } from '../data/catalog';
import { useCartTotals, useShop } from '../store/useShop';
import { go, useUI } from '../store/useUI';
import { cx, fa, toman } from '../lib/format';

export function CartPage() {
  const cart = useShop((s) => s.cart);
  const setQty = useShop((s) => s.setQty);
  const remove = useShop((s) => s.remove);
  const clear = useShop((s) => s.clear);
  const coupon = useShop((s) => s.coupon);
  const applyCoupon = useShop((s) => s.applyCoupon);
  const toast = useUI((s) => s.toast);
  const t = useCartTotals();
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'cart' | 'done'>('cart');
  const [placing, setPlacing] = useState(false);

  if (step === 'done') {
    return (
      <div className="container-x grid min-h-[60vh] place-items-center pt-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
          <motion.span initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.15, type: 'spring' }} className="mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-volt-400 text-ink-900 shadow-glow">
            <Icon name="check" size={46} stroke={2.6} />
          </motion.span>
          <h1 className="mt-6 text-2xl font-black text-ink-900">سفارش شما با موفقیت ثبت شد</h1>
          <p className="mt-2 text-sm text-ink-500">کد پیگیری: <b className="text-ink-900" dir="ltr">ARN-{fa(Math.floor(100000 + Math.random() * 899999))}</b></p>
          <p className="mt-1 text-xs text-ink-400">(نسخه نمایشی — پرداختی انجام نشده است)</p>
          <Button className="mt-7" icon="arrowLeft" onClick={() => go({ name: 'shop' })}>ادامه خرید</Button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-x pt-10">
        <div className="grid place-items-center rounded-[2.2rem] bg-white py-20 text-center ring-1 ring-ink-100">
          <span className="grid h-24 w-24 place-items-center rounded-[2rem] bg-ink-100 text-ink-400"><Icon name="bag" size={40} stroke={1.4} /></span>
          <h1 className="mt-5 text-xl font-black text-ink-900">سبد خرید شما خالی است</h1>
          <p className="mt-1 text-sm text-ink-400">می‌توانید از پیشنهادهای ویژه شروع کنید.</p>
          <Button className="mt-6" icon="arrowLeft" onClick={() => go({ name: 'shop' })}>رفتن به فروشگاه</Button>
        </div>
        <h2 className="mb-5 mt-14 text-xl font-black text-ink-900">شاید بپسندید</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {products.filter((p) => p.featured).slice(0, 4).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    );
  }

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => { setPlacing(false); clear(); setStep('done'); window.scrollTo({ top: 0 }); }, 1200);
  };

  return (
    <div className="container-x pt-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-ink-900">سبد خرید</h1>
          <p className="mt-1 text-sm text-ink-400">{fa(t.count)} کالا در سبد شماست</p>
        </div>
        <button onClick={clear} className="flex items-center gap-1.5 text-sm font-bold text-ink-400 hover:text-rose-500"><Icon name="trash" size={16} /> حذف همه</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {cart.map((l) => {
              const p = productById[l.id];
              if (!p) return null;
              return (
                <motion.li key={l.id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.35 }} className="flex gap-4 rounded-[1.8rem] bg-white p-3 ring-1 ring-ink-100 sm:p-4">
                  <button onClick={() => go({ name: 'product', id: p.id })}>
                    <Img src={p.images[0]} alt={p.title} className="h-24 w-24 rounded-2xl bg-mist sm:h-32 sm:w-32" />
                  </button>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <button onClick={() => go({ name: 'product', id: p.id })} className="line-clamp-2 text-right text-sm font-extrabold leading-6 text-ink-900 sm:text-base">{p.title}</button>
                        <p className="mt-0.5 line-clamp-1 text-xs text-ink-400">{p.subtitle}</p>
                        {l.color && <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-ink-500"><span className="h-3.5 w-3.5 rounded-full ring-1 ring-ink-200" style={{ background: l.color }} /> رنگ انتخابی</span>}
                      </div>
                      <button onClick={() => remove(p.id)} aria-label="حذف" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-ink-300 hover:bg-rose-50 hover:text-rose-500"><Icon name="trash" size={17} /></button>
                    </div>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3">
                      <Qty value={l.qty} max={p.stock} onChange={(v) => setQty(p.id, v)} small />
                      <div className="text-left">
                        {p.oldPrice && <p className="text-xs text-ink-400 line-through">{fa(p.oldPrice * l.qty)}</p>}
                        <p className="text-base font-black text-ink-900">{toman(p.price * l.qty)}</p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-6">
            <h2 className="font-black text-ink-900">خلاصه سفارش</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-ink-500">جمع کالاها</dt><dd className="font-bold text-ink-900">{toman(t.subtotal + t.savings)}</dd></div>
              {t.savings > 0 && <div className="flex justify-between text-emerald-600"><dt>تخفیف کالاها</dt><dd className="font-bold">-{toman(t.savings)}</dd></div>}
              {t.couponOff > 0 && <div className="flex justify-between text-emerald-600"><dt>کد تخفیف ({coupon})</dt><dd className="font-bold">-{toman(t.couponOff)}</dd></div>}
              <div className="flex justify-between"><dt className="text-ink-500">هزینه ارسال</dt><dd className={cx('font-bold', t.shipping ? 'text-ink-900' : 'text-emerald-600')}>{t.shipping ? toman(t.shipping) : 'رایگان'}</dd></div>
            </dl>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (applyCoupon(code)) toast({ title: 'کد تخفیف اعمال شد', icon: 'percent' });
                else toast({ title: 'کد تخفیف معتبر نیست', text: 'کد ARNO10 را امتحان کنید', icon: 'info' });
              }}
              className="mt-5 flex gap-2"
            >
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="کد تخفیف" dir="ltr" className="h-11 min-w-0 flex-1 rounded-xl border-0 bg-mist px-3 text-left text-sm uppercase ring-1 ring-ink-100 focus:outline-none focus:ring-2 focus:ring-ink-900" />
              <button className="h-11 rounded-xl bg-ink-100 px-4 text-sm font-bold text-ink-900 hover:bg-ink-200">اعمال</button>
            </form>
            <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-5">
              <span className="font-bold text-ink-600">مبلغ قابل پرداخت</span>
              <span className="text-xl font-black text-ink-900">{toman(t.total)}</span>
            </div>
            <Button variant="volt" size="lg" className="mt-5 w-full" disabled={placing} onClick={placeOrder}>
              {placing ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900/30 border-t-ink-900" /> در حال ثبت…</>) : (<><Icon name="card" size={19} /> ثبت سفارش و پرداخت</>)}
            </Button>
            <p className="mt-3 text-center text-[11px] text-ink-400">پرداخت امن · نسخه نمایشی بدون اتصال به درگاه</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function WishlistPage() {
  const ids = useShop((s) => s.wishlist);
  const list = ids.map((id) => productById[id]).filter(Boolean);
  return (
    <div className="container-x pt-6">
      <h1 className="text-3xl font-black text-ink-900">علاقه‌مندی‌ها</h1>
      <p className="mt-1 text-sm text-ink-400">{fa(list.length)} محصول ذخیره شده</p>
      {list.length === 0 ? (
        <div className="mt-6 grid place-items-center rounded-[2.2rem] bg-white py-20 text-center ring-1 ring-ink-100">
          <span className="grid h-24 w-24 place-items-center rounded-[2rem] bg-rose-50 text-rose-400"><Icon name="heart" size={40} stroke={1.4} /></span>
          <h2 className="mt-5 text-lg font-black text-ink-900">هنوز چیزی ذخیره نکرده‌اید</h2>
          <p className="mt-1 text-sm text-ink-400">روی آیکن قلب هر محصول بزنید تا اینجا نگهش داریم.</p>
          <Button className="mt-6" onClick={() => go({ name: 'shop' })}>کشف محصولات</Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
