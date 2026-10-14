import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
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

function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 700));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="بازگشت به بالا"
          className="fixed bottom-6 right-6 z-30 hidden h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-white shadow-lift hover:bg-volt-400 hover:text-ink-900 md:grid"
        >
          <Icon name="chevronDown" size={20} className="rotate-180" />
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
