import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

// Google Form base view URL (up to /viewform)
const FORM_BASE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScC3wMY0RSSmmbhMq1ihu6PLSKJCncn3KRo9cPJ0iELbAX0Lg/viewform';
// Replace this with the entry id you get from "Get pre-filled link" (example: entry.123456789)
const ORDER_FIELD = 'entry.1691287091';

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  // remove non-digit characters and parse integer
  const numeric = priceStr.replace(/[^0-9.]/g, '');
  return Number(numeric) || 0;
}

const Cart = () => {
  const { cart, removeFromCart, updateQty, clearCart, isOpen, setIsOpen } = useCart();

  const subtotal = cart.reduce((sum, it) => sum + parsePrice(it.price) * (it.qty || 1), 0);

  const handleCheckout = () => {
    if (!FORM_BASE_URL || !ORDER_FIELD || !ORDER_FIELD.startsWith('entry.')) {
      toast({ title: 'Checkout not configured', description: 'Provide the Google Form entry id (entry.xxx) to enable prefilled checkout.' });
      return;
    }

    // Build a readable order summary
    const lines = cart.map(item => {
      const qty = item.qty || 1;
      return `${qty} × ${item.name} (${item.weight}, ${item.texture}) — ${item.price}`;
    });
    lines.push('');
    lines.push(`Subtotal: ₹${subtotal}`);
    const payload = lines.join('\n');

    const params = new URLSearchParams();
    params.set(ORDER_FIELD, payload);

    const prefillUrl = `${FORM_BASE_URL}?usp=pp_url&${params.toString()}`;

    window.open(prefillUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex">
      {/* clickable overlay to the left - closes the drawer */}
      <div className="flex-1" onClick={() => setIsOpen(false)} />

      {/* drawer on the right */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-slate-900 text-white p-6 overflow-auto shadow-xl max-h-screen">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Your Cart</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-gray-300">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.weight} · {item.texture}</div>
                  <div className="text-sm text-gray-300">{item.price} × {item.qty}</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateQty(idx, (item.qty || 1) - 1)}>-</Button>
                    <div className="px-2">{item.qty}</div>
                    <Button size="sm" variant="outline" onClick={() => updateQty(idx, (item.qty || 1) + 1)}>+</Button>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => removeFromCart(idx)}>Remove</Button>
                </div>
              </div>
            ))}

            <div className="border-t border-slate-700 pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-300">Subtotal</div>
                <div className="font-bold">₹{subtotal}</div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleCheckout}>Checkout</Button>
                <Button variant="ghost" onClick={clearCart}>Clear</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
