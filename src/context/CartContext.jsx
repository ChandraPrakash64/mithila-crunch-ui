import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('mc_cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('mc_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const addToCart = (item) => {
    // item: { id, name, weight, texture, price, qty }
    setCart((prev) => {
      // merge by id+weight+texture
      const idx = prev.findIndex(i => i.id === item.id && i.weight === item.weight && i.texture === item.texture);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + (item.qty || 1) };
        return copy;
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index, qty) => {
    setCart((prev) => {
      const copy = [...prev];
      if (copy[index]) copy[index].qty = Math.max(1, qty);
      return copy;
    });
  };

  const clearCart = () => setCart([]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    isOpen,
    setIsOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default CartContext;
