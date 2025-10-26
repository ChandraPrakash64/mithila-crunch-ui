import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = () => {
  const handleSocialClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <footer className="bg-gradient-to-b from-indigo-950 to-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Mithila Crunch
            </span>
            <p className="text-gray-400 mt-4 max-w-xs">
              Authentic snacks, delivered with love from the heart of Mithila.
            </p>
          </div>

          <div>
            <span className="font-semibold text-white mb-4 block">Quick Links</span>
            <div className="space-y-2">
              {navLinks.map(link => (
                  <p 
                    key={link.name} 
                    onClick={() => scrollToSection(link.href)} 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </p>
              ))}
            </div>
          </div>

          <div>
            <span className="font-semibold text-white mb-4 block">Follow Us</span>
            <div className="flex gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleSocialClick}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Facebook className="w-5 h-5 text-gray-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleSocialClick}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={handleSocialClick}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Mithila Crunch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;