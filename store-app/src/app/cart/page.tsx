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

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-semibold">© 2025 CampusShop</p>
            <p className="text-sm text-gray-500">Built by Men in Tech</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="/categories" className="hover:text-blue-600 transition-colors">Categories</a>
            <a href="/cart" className="hover:text-blue-600 transition-colors">Cart</a>
          </div>
          <div className="text-center md:text-right text-sm">
            <a href="mailto:orders.myshop@gmail.com" className="hover:text-blue-600 transition-colors">
              orders.myshop@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
