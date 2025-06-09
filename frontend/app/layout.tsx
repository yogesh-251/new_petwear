// app/layout.tsx
import './globals.css'
import Link from 'next/link'
import Navbar from '@/components/Navbar';
import Script from 'next/script';
// import { ThemeProvider } from '@/components/theme-provider'
// import ThemeToggle from '@/components/ThemeToggle'

export const metadata = {
  title: 'Petwear',
  description: 'Pet Brand.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        {/* <ThemeProvider> */}
        <header className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
          <Navbar />
          {/* <Link href="/" className="font-bold">🐾 Petwear</Link>
          <nav className="space-x-4">
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
            <Link href="/account">Dashboard</Link>
            <Link href="/logout">Logout</Link>
            <Link href="/products" className="text-gray-700 dark:text-gray-200 hover:underline">
              Products
            </Link>
          </nav> */}
          {/* <ThemeToggle /> */}
        </header>

        <main className="p-4">         
          {children}  
          {/* Razorpay script */}
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="beforeInteractive"
          />
        </main>

        <footer className="p-4 mt-10 text-center text-gray-500">
          © 2025 Petwear. All rights reserved.
        </footer>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
