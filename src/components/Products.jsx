import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const productData = [
  {
    id: 1,
    name: 'Jaggery Thekua',
    image: 'Jaggery flavored Thekua cookies on a dark background',
    bgColor: 'bg-amber-900/20',
    borderColor: 'border-amber-600/50',
    gradient: 'from-amber-500 to-orange-600',
    variants: [
      {
        weight: '225gm',
        price: '₹279',
        originalPrice: '₹399',
      },
      {
        weight: '450gm',
        price: '₹384',
        originalPrice: '₹549',
      },
    ],
    textureOptions: ['Crispy', 'Soft'],
  },
  {
    id: 2,
    name: 'Sugar Thekua',
    image: 'Sugar coated Thekua cookies looking crispy',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-500/50',
    gradient: 'from-yellow-400 to-amber-500',
    variants: [
      {
        weight: '225gm',
        price: '₹279',
        originalPrice: '₹399',
      },
      {
        weight: '450gm',
        price: '₹384',
        originalPrice: '₹549',
      },
    ],
    textureOptions: ['Crispy', 'Soft'],
  },
];

const ProductCard = ({ product }) => {
  const [selectedWeight, setSelectedWeight] = useState(product.variants[0].weight);
  const [selectedTexture, setSelectedTexture] = useState(product.textureOptions[0]);
  const { addToCart } = useCart();

  const selectedVariant = product.variants.find(v => v.weight === selectedWeight);

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, weight: selectedWeight, texture: selectedTexture, price: selectedVariant.price, qty: 1 });
    toast({
      title: `Added ${product.name} (${selectedWeight}, ${selectedTexture}) to cart!`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (product.id - 1) * 0.2, duration: 0.8 }}
      className={`relative overflow-hidden rounded-3xl p-8 border ${product.borderColor} ${product.bgColor} backdrop-blur-sm group flex flex-col`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="mb-6 rounded-2xl overflow-hidden shadow-lg"
      >
        <img class="w-full h-64 object-cover" alt={product.image} src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
      </motion.div>

      <h3 className="text-3xl font-bold mb-4 text-white">{product.name}</h3>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-300 mb-2">Select Weight:</p>
        <div className="flex gap-3">
          {product.variants.map(variant => (
            <Button
              key={variant.weight}
              onClick={() => setSelectedWeight(variant.weight)}
              variant="outline"
              className={cn(
                'border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all',
                selectedWeight === variant.weight && `bg-gradient-to-r ${product.gradient} border-transparent shadow-lg`
              )}
            >
              {variant.weight}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-300 mb-2">Select Texture:</p>
        <div className="flex gap-3">
          {product.textureOptions.map(texture => (
            <Button
              key={texture}
              onClick={() => setSelectedTexture(texture)}
              variant="outline"
              className={cn(
                'border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all',
                selectedTexture === texture && `bg-gradient-to-r ${product.gradient} border-transparent shadow-lg`
              )}
            >
              {texture}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow"></div>

      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">{selectedVariant.price}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-500 line-through">{selectedVariant.originalPrice}</span>
            <span className="text-sm font-bold text-green-400">30% OFF</span>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          size="lg"
          className={`bg-gradient-to-r ${product.gradient} text-white px-6 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/30`}
        >
          <ShoppingCart className="mr-2 w-5 h-5" />
          Add
        </Button>
      </div>
    </motion.div>
  );
};


const Products = () => {
  return (
    <section id="products" className="py-24 px-4 bg-gradient-to-b from-slate-900 to-indigo-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Our Offerings
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your favorite flavor, weight, and texture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {productData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;