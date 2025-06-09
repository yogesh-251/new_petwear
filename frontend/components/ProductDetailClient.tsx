'use client';

import { useCartStore } from '@/store/cart';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const addToCart = () => {
    useCartStore.getState().addToCart({
      id: product.id,
      name: product.name,
      price: product.price/100,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-1/2 rounded-2xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold dark:text-white">{product.name}</h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{product.description}</p>
          <p className="mt-4 text-xl font-semibold text-yellow-600">₹{product.price/100}</p>
          <button 
            onClick={addToCart}
            className="mt-6 px-6 py-2 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
