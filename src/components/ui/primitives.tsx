import { useState, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Icon } from './Icon';
import { cx, fa, toman, discountPercent } from '../../lib/format';

/* ---------------- Motion presets ---------------- */
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: i * 0.07 } })
};

export function Reveal({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Section heading (reference: big title + gradient-orb eyebrow) ---------------- */
export function Orb({ className = '' }: { className?: string }) {
  return (
    <span className={cx('relative inline-grid h-6 w-6 place-items-center', className)} aria-hidden="true">
      <span className="absolute inset-0 rounded-full border border-volt-400/60" />
      <span className="h-4 w-4 rounded-full bg-gradient-to-b from-ink-700 to-volt-400 shadow-[0_0_12px_rgba(255,203,36,.55)]" />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
  light = false,
  center = false
}: {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cx('mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between', center && 'md:flex-col md:items-center text-center')}>
      <Reveal className={cx('max-w-2xl', center && 'mx-auto')}>
        <div className={cx('mb-3 flex items-center gap-2.5 text-sm font-bold', center && 'justify-center', light ? 'text-volt-300' : 'text-ink-500')}>
          <Orb />
          {eyebrow}
        </div>
        <h2 className={cx('text-[1.7rem] font-black leading-[1.35] tracking-tight sm:text-4xl', light ? 'text-white' : 'text-ink-900')}>{title}</h2>
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}

/* ---------------- Buttons ---------------- */
type BtnVariant = 'primary' | 'volt' | 'ghost' | 'outline' | 'light';
const btnStyles: Record<BtnVariant, string> = {
  primary: 'bg-ink-900 text-white hover:bg-ink-800 shadow-[0_14px_30px_-14px_rgba(10,18,48,.8)]',
  volt: 'bg-volt-400 text-ink-900 hover:bg-volt-300 shadow-glow',
  ghost: 'bg-ink-100 text-ink-900 hover:bg-ink-200',
  outline: 'border border-ink-200 bg-white text-ink-900 hover:border-ink-900',
  light: 'bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20'
};

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  /** When provided the button renders as an anchor with the same styles. */
  href?: string;
}

export function Button({ variant = 'primary', icon, size = 'md', className, children, href, ...rest }: BtnProps) {
  const sizes = { sm: 'h-10 px-4 text-sm', md: 'h-12 px-6 text-[15px]', lg: 'h-14 px-7 text-base' };
  const classes = cx(
    'group inline-flex select-none items-center justify-center gap-2 rounded-2xl font-bold transition-colors disabled:pointer-events-none disabled:opacity-50',
    sizes[size],
    btnStyles[variant],
    className
  );
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />}
    </>
  );
  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        className={classes}
        {...(rest as object)}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={classes}
      {...(rest as object)}
    >
      {inner}
    </motion.button>
  );
}

/* ---------------- Image with skeleton + fade ---------------- */
export function Img({ src, alt, className, imgClass, eager = false }: { src: string; alt: string; className?: string; imgClass?: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cx('relative overflow-hidden', !loaded && 'skeleton', className)}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cx('h-full w-full object-cover transition-[opacity,transform] duration-700', loaded ? 'opacity-100' : 'opacity-0', imgClass)}
      />
    </div>
  );
}

/* ---------------- Rating ---------------- */
export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`امتیاز ${fa(value)} از ۵`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={size} filled stroke={1} className={i <= Math.round(value) ? 'text-volt-500' : 'text-ink-200'} />
      ))}
    </div>
  );
}

/* ---------------- Price block ---------------- */
export function Price({ price, oldPrice, size = 'md', light = false }: { price: number; oldPrice?: number; size?: 'sm' | 'md' | 'lg'; light?: boolean }) {
  const d = discountPercent(price, oldPrice);
  const big = { sm: 'text-base', md: 'text-lg', lg: 'text-3xl' }[size];
  return (
    <div className="flex flex-col items-start gap-1">
      {d > 0 && (
        <div className="flex items-center gap-2">
          <span className={cx('text-xs line-through', light ? 'text-ink-300' : 'text-ink-400')}>{fa(oldPrice!)}</span>
          <span className="rounded-full bg-volt-400 px-2 py-0.5 text-[11px] font-black text-ink-900">٪{fa(d)}</span>
        </div>
      )}
      <div className={cx('font-black tracking-tight', big, light ? 'text-white' : 'text-ink-900')}>
        {fa(price)} <span className={cx('text-xs font-medium', light ? 'text-ink-300' : 'text-ink-400')}>تومان</span>
      </div>
    </div>
  );
}

export { toman };

/* ---------------- Misc ---------------- */
export function Chip({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-bold transition-all',
        active ? 'bg-ink-900 text-white shadow-soft' : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-ink-900'
      )}
    >
      {children}
    </button>
  );
}

export function IconButton({ icon, label, onClick, badge, className, active }: { icon: string; label: string; onClick?: () => void; badge?: number; className?: string; active?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={label}
      className={cx('relative grid h-11 w-11 place-items-center rounded-2xl transition-colors', active ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-900 hover:bg-ink-200', className)}
    >
      <Icon name={icon} size={20} />
      {!!badge && (
        <motion.span
          key={badge}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          className="absolute -left-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-volt-400 px-1 text-[11px] font-black text-ink-900 ring-2 ring-white"
        >
          {fa(badge)}
        </motion.span>
      )}
    </motion.button>
  );
}
