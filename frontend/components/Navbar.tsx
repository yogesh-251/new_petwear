'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Moon, Sun, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setDark(saved === 'dark');
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <nav className="p-4 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-yellow-500">Petwear</Link>
        <div className="flex items-center gap-4">
          <Link href="/products" className={pathname === '/products' ? 'font-semibold' : ''}>
            Products
          </Link>
          <Link href="/account" className={pathname === '/account' ? 'font-semibold' : ''}>
            Account
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1">
                {totalQty}
              </span>
            )}
          </Link>
          <button onClick={toggleTheme}>
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
