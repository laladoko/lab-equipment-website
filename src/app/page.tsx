import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Brands from './components/Brands';
import BrandStats from './components/BrandStats';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const stats = {
    customers: 1000,
    years: 15,
    countries: 20,
    awards: 50
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Brands />
      <BrandStats stats={stats} />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
