import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { SectionHeading, ease } from '../ui/primitives';
import { categories, products } from '../../data/catalog';
import { href } from '../../store/useStore';
import { fa } from '../../lib/format';

export function useCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    // RTL: positive "next" visually moves left → negative scrollLeft
    el.scrollBy({ left: -dir * step, behavior: 'smooth' });
  };
  return { ref, scroll };
}

export function CarouselNav({ onPrev, onNext, dark }: { onPrev: () => void; onNext: () => void; dark?: boolean }) {
  const cls = dark
    ? 'border-white/15 text-white hover:bg-volt-400 hover:text-ink-900 hover:border-volt-400'
    : 'border-ink-200 bg-white text-ink-900 hover:bg-ink-900 hover:text-white hover:border-ink-900';
  return (
    <div className="flex items-center gap-2">
      <motion.button whileTap={{ scale: 0.9 }} onClick={onPrev} aria-label="قبلی" className={'grid h-12 w-12 place-items-center rounded-2xl border transition-colors ' + cls}>
        <Icon name="chevronRight" />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={onNext} aria-label="بعدی" className={'grid h-12 w-12 place-items-center rounded-2xl border transition-colors ' + cls}>
        <Icon name="chevronLeft" />
      </motion.button>
    </div>
  );
}

export function Categories() {
  const { ref, scroll } = useCarousel();
  return (
    <section id="categories" className="scroll-mt-28 py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="دسته‌بندی محصولات"
          title={<>راحت‌تر کالای مورد نظرتان را <span className="relative whitespace-nowrap">پیدا کنید<span className="absolute -bottom-1 right-0 h-3 w-full -z-10 rounded bg-volt-300/70" /></span></>}
          action={<CarouselNav onPrev={() => scroll(-1)} onNext={() => scroll(1)} />}
        />
        <div ref={ref} className="snap-row no-scrollbar -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-6 sm:mx-0 sm:gap-5 sm:px-0">
          {categories.map((c, i) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <motion.a
                key={c.id}
                href={href.shop(c.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: Math.min(i, 6) * 0.06 }}
                className="group relative w-[44%] shrink-0 sm:w-[30%] md:w-[23%] lg:w-[17.5%] xl:w-[14.6%]"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[999px] border border-ink-100 bg-white p-1.5 shadow-card transition-all duration-500 group-hover:border-volt-400 group-hover:shadow-lift">
                  <div className="relative h-full w-full overflow-hidden rounded-[999px]">
                    <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                    <span className="absolute left-1/2 top-4 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-white/90 text-ink-900 backdrop-blur transition-all duration-500 group-hover:bg-volt-400">
                      <Icon name={c.icon} size={19} />
                    </span>
                    <div className="absolute inset-x-0 bottom-5 text-center">
                      <h3 className="text-sm font-black text-white sm:text-base">{c.title}</h3>
                      <p className="mt-0.5 text-[11px] text-white/70">{count ? `${fa(count)} محصول` : c.subtitle}</p>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
