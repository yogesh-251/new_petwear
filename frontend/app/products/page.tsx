import { fetchProducts } from '@/lib/api/api';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
