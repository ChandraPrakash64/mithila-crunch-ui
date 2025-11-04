import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import Cart from '@/components/Cart';

function App() {
  return (
    <>
      <Helmet>
        <title>Mithila Crunch - Authentic Thekua Snacks & Cookies</title>
        <meta name="description" content="Discover the authentic taste of Mithila with our delicious Thekua, available in Sugar and Jaggery flavors. Order your crunchy snack today!" />
      </Helmet>
      <CartProvider>
        <div className="min-h-screen">
          <Header />
          <Hero />
          <Products />
          <Contact />
          <Footer />
          <Cart />
          <Toaster />
        </div>
      </CartProvider>
    </>
  );
}

export default App;