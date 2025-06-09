'use client';

import { useCartStore } from '@/store/cart';
import Link from 'next/link';

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useCartStore();

  const total = items.reduce((sum, item) => sum + item.price/100 * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty 🛒</h2>
        <Link href="/products" className="text-blue-500 underline">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-4">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p>₹{item.price/100}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="px-2 py-1 rounded bg-gray-200"
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.id)}
              className="px-2 py-1 rounded bg-gray-200"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 text-sm underline"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right space-y-3">
        <p className="text-lg">
          <strong>Total:</strong> ₹{total}
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Clear Cart
          </button>
          <Link href="/checkout">
            <button className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
