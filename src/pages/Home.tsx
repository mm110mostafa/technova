import { Hero } from '../sections/Hero';
import { About, BestSellers, Branches, Builds, Categories, Contact, Deals, FAQ, ProductSlider, PromoBanners, Services, Steps, TrustStrip } from '../sections/HomeSections';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories />
      <Services />
      <About />
      <Builds />
      <ProductSlider />
      <PromoBanners />
      <Deals />
      <BestSellers />
      <Branches />
      <Steps />
      <FAQ />
      <Contact />
    </>
  );
}
