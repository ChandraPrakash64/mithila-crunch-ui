import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
    const scrollToProducts = () => {
        document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 bg-gradient-to-br from-slate-900 via-orange-900/30 to-slate-900">
      <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)]"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20"
        >
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span className="text-sm font-medium">Authentic Traditional Taste</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent"
        >
          Mithila Crunch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Experience the crunchy, divine flavor of Thekua, handcrafted with love and tradition.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50"
          >
            Explore Flavors
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-20 relative w-full max-w-4xl mx-auto"
        >
           <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-20 blur-2xl"></div>
           <img 
            class="relative w-full mx-auto rounded-2xl shadow-2xl border border-white/10"
            alt="Beautifully arranged Thekua snacks on a platter" src="https://images.unsplash.com/photo-1666973523950-3ca3149d348c" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;