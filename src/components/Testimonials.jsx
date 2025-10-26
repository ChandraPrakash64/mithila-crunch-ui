import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    quote: "Absolutely divine! The Jaggery Thekua reminds me of my grandmother's cooking. Perfectly crunchy and not too sweet.",
    rating: 5,
    image: 'Priya Sharma smiling',
  },
  {
    name: 'Rahul Kumar',
    location: 'Delhi',
    quote: 'Mithila Crunch has nailed it. The Sugar Thekua is my go-to evening snack now. Super fast delivery too!',
    rating: 5,
    image: 'Rahul Kumar happy',
  },
  {
    name: 'Ananya Singh',
    location: 'Bangalore',
    quote: "I ordered both flavors and can't decide which one I love more. Authentic taste and beautiful packaging. Highly recommended!",
    rating: 5,
    image: 'Ananya Singh enjoying food',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 bg-gradient-to-b from-indigo-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            From Our Customers
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <img class="w-14 h-14 rounded-full object-cover mr-4 border-2 border-amber-400" alt={testimonial.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <div>
                  <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 flex-grow">"{testimonial.quote}"</p>
              <div className="flex">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;