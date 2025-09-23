'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartItem from '../../../components/CartItem';
import { CartManager } from '../../../Lib/cart';
import { CartItem as CartItemType } from '../../../Lib/types';

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cart = CartManager.getInstance();

    const updateCart = () => {
      setItems(cart.getItems());
      setTotal(cart.getTotal());
      setIsLoading(false);
    };

    const timer = setTimeout(updateCart, 100);
    const unsubscribe = cart.subscribe(updateCart);

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
      
      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center sm:text-left">
          Your Cart
        </h1>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-blue-600 text-lg">Loading cart...</p>
            </div>
          </div>
        )}

        {/* Empty Cart */}
        {!isLoading && items.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5m3.5-2.5h6"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-blue-600 mb-6">Add some products to get started</p>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Cart Items + Summary */}
        {!isLoading && items.length > 0 && (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            {/* Cart Summary (static on mobile, sticky on desktop) */}
            <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Total: ${total.toFixed(2)}
                  </h2>
                  <p className="text-sm text-blue-600">
                    {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/categories"
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 sm:px-6 py-3 rounded-lg text-center font-medium transition-colors border border-slate-300 hover:border-slate-400"
                >
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Continue Shopping
                  </span>
                </Link>
                <Link
                  href="/checkout"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-lg text-center font-medium transition-colors shadow-sm"
                >
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Proceed to Checkout
                  </span>
                </Link>
              </div>

              {/* Subtotal Info */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm text-blue-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer */}
        <footer className="bg-white/40 backdrop-blur-sm border border-white/20 text-slate-700 py-8 rounded-2xl shadow-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg">© 2025 Arngren Store</p>
              <div className="text-sm text-slate-500 flex items-center justify-center md:justify-start mt-2">
                <span>Crafted with ❤️ by aduuuna</span>
                <a 
                  href="https://github.com/aduuuna" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-3 text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-110 transform"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/in/joy-owusu-ansah" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 text-slate-600 hover:text-blue-600 transition-all duration-200 hover:scale-110 transform"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">
                Home
              </Link>
              <Link href="/categories" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">
                Categories
              </Link>
              <Link href="/cart" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">
                Cart
              </Link>
            </div>
            <div className="text-center md:text-right text-sm">
              <div className="text-slate-500">Need help? Contact us!</div>
            </div>
          </div>
        </footer>
    </div>
  );
}
