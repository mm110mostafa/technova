import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer, MobileMenu, MobileTabBar, QuickView, SearchOverlay, Toasts } from './components/layout/Overlays';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/Product';
import { CartPage, WishlistPage } from './pages/Cart';
import { consumeAnchor, parseHash, scrollToId, toHash, useUI } from './store/useUI';
import { Icon } from './components/ui/Icon';
import type { Route } from './types';

function Page({ route }: { route: Route }) {
  switch (route.name) {
    case 'shop':
      return <Shop cat={route.cat} q={route.q} />;
    case 'product':
      return <ProductPage id={route.id} />;
    case 'cart':
      return <CartPage />;
    case 'wishlist':
      return <WishlistPage />;
    default:
      return <Home />;
  }
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-right bg-gradient-to-l from-volt-400 to-volt-600" />;
}

const RING_R = 26.5;
const RING_C = 2 * Math.PI * RING_R;

function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.3 });
  const dashOffset = useTransform(progress, [0, 1], [RING_C, 0]);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 600));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="بازگشت به بالا"
          title="بازگشت به بالا"
          className="group fixed bottom-24 left-4 z-30 grid h-14 w-14 place-items-center md:bottom-6 md:left-6"
        >
          {/* scroll-progress ring — fills as you go down the page */}
          <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="28" cy="28" r={RING_R} fill="none" strokeWidth="2" className="stroke-ink-900/10" />
            <motion.circle
              cx="28" cy="28" r={RING_R} fill="none" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={RING_C}
              style={{ strokeDashoffset: dashOffset }}
              className="stroke-volt-400"
            />
          </svg>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-ink-900 shadow-lift ring-1 ring-white/10 transition-all duration-300 group-hover:bg-ink-800 group-hover:shadow-glow">
            <span className="flex flex-col items-center text-white transition-colors duration-300 group-hover:text-volt-400">
              <Icon name="chevronDown" size={18} stroke={2.4} className="-mb-1 rotate-180" />
              <Icon name="chevronDown" size={18} stroke={2.4} className="rotate-180" />
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const route = useUI((s) => s.route);
  const setRoute = useUI((s) => s.setRoute);

  useEffect(() => {
    const on = () => {
      setRoute(parseHash(window.location.hash));
      const a = consumeAnchor();
      if (a) setTimeout(() => scrollToId(a), 450);
      else window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, [setRoute]);

  return (
    <>
      <ScrollProgress />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={toHash(route)}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[70vh] pb-28 md:pb-0"
        >
          <Page route={route} />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <MobileMenu />
      <SearchOverlay />
      <QuickView />
      <Toasts />
      <MobileTabBar />
      <BackToTop />
    </>
  );
}
