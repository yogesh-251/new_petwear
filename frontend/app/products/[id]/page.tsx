// app/product/[id]/page.tsx

import ProductDetailClient from '@/components/ProductDetailClient'; // Adjust the path if needed
// import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`, {
    cache: 'no-store', // or 'force-cache' if you want caching
  });
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  const product: Product = await res.json();

  return <ProductDetailClient product={product} />;
}
