import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';
import { cx } from '../../lib/format';

/**
 * Native scroll-snap carousel (touch/trackpad friendly) with RTL-aware arrow controls
 * and progress pagination — replaces the reference's Swiper sliders without a dependency.
 */
export function Carousel({ children, itemClass, className, dark = false }: { children: ReactNode[]; itemClass: string; className?: string; dark?: boolean }) {
  const row = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft); // RTL: scrollLeft is 0 → negative
    setProgress(max > 0 ? pos / max : 0);
    setEdges({ start: pos < 4, end: pos > max - 4 });
  }, []);

  useEffect(() => {
    measure();
    const el = row.current;
    el?.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el?.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const w = first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
    // In RTL, "next" moves content leftward → negative scrollLeft.
    el.scrollBy({ left: -dir * w, behavior: 'smooth' });
  };

  const arrow = dark
    ? 'bg-white/10 text-white ring-1 ring-white/15 hover:bg-volt-400 hover:text-ink-900'
    : 'bg-white text-ink-900 shadow-soft ring-1 ring-ink-100 hover:bg-ink-900 hover:text-white';

  return (
    <div className={cx('relative', className)}>
      <div ref={row} className="snap-row no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 pt-1 sm:-mx-6 sm:gap-5 sm:px-6">
        {children.map((c, i) => (
          <div key={i} className={cx('shrink-0', itemClass)}>{c}</div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className={cx('relative h-1.5 flex-1 overflow-hidden rounded-full', dark ? 'bg-white/10' : 'bg-ink-200/70')}>
          <motion.div
            className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-volt-400 to-volt-600"
            animate={{ width: `${Math.max(14, progress * 100)}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </div>
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => step(-1)} disabled={edges.start} aria-label="قبلی" className={cx('grid h-11 w-11 place-items-center rounded-2xl transition-colors disabled:opacity-35', arrow)}>
            <Icon name="chevronRight" size={20} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => step(1)} disabled={edges.end} aria-label="بعدی" className={cx('grid h-11 w-11 place-items-center rounded-2xl transition-colors disabled:opacity-35', arrow)}>
            <Icon name="chevronLeft" size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
