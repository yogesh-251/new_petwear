'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = () => {
    useCartStore.getState().addToCart({
      id: product.id,
      name: product.name,
      price: product.price/100,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <Link href={`/products/${product.id}`}>
      <h2 className="text-lg font-semibold mt-2 dark:text-white">{product.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
      <p className="text-yellow-600 font-bold mt-1">₹{product.price/100}</p>
      </Link>
      <button 
        onClick={addToCart}
        className="mt-6 px-6 py-2 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400">
        Add to Cart
      </button>
    </div> 
  );
};

export default ProductCard;
