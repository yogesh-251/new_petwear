'use client';

import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) router.push('/cart');
  }, [items]);

  const total = items.reduce((acc, item) => acc + item.price/100 * item.quantity, 0);

  const handlePayment = async () => {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      body: JSON.stringify({ items }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: 'INR',
      name: 'Petwear',
      description: 'Order Payment',
      order_id: data.order.id,
      handler: async (response: any) => {
        console.log('Payment success', response);
        clearCart();
        router.push('/account');
      },
      prefill: {
        name: 'Petwear Customer',
        email: 'test@example.com',
      },
      theme: {
        color: '#FDD835',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>{item.name} x {item.quantity}</span>
          <span>₹{item.price/100 * item.quantity}</span>
        </div>
      ))}
      <div className="mt-4 text-right font-bold text-lg">Total: ₹{total}</div>
      <button
        onClick={handlePayment}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded"
      >
        Pay with Razorpay
      </button>
    </div>
  );
}
