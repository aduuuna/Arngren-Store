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
    
    // Small delay to ensure cart is properly initialized
    const timer = setTimeout(updateCart, 100);
    const unsubscribe = cart.subscribe(updateCart);
    
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-blue-600 text-lg">Loading cart...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5m3.5-2.5h6" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-blue-600 mb-6">Add some products to get started</p>
            <Link 
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Cart</h1>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </div>
        </div>
        
        {/* Cart Items */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        {/* Cart Summary - Sticky on mobile */}
        <div className="sticky bottom-0 bg-white rounded-lg shadow-lg border border-slate-200 p-4 sm:p-6 sm:static sm:shadow-sm">
          {/* Summary Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
            <div className="mb-2 sm:mb-0">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Total: ${total.toFixed(2)}
              </h2>
              <p className="text-sm text-blue-600">
                {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
              </p>
            </div>
            
            {/* Mobile-only quick total */}
            <div className="sm:hidden bg-blue-50 rounded-lg p-3 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</div>
                <div className="text-sm text-blue-600">{itemCount} items</div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              href="/categories"
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 sm:px-6 py-3 rounded-lg text-center font-medium transition-colors border border-slate-300 hover:border-slate-400"
            >
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </span>
            </Link>
            <Link 
              href="/checkout"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-lg text-center font-medium transition-colors shadow-sm"
            >
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Proceed to Checkout
              </span>
            </Link>
          </div>

          {/* Mobile-only additional info */}
          <div className="sm:hidden mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between text-sm text-blue-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        {/* <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 text-sm">Secure Checkout</h3>
              <p className="text-xs text-blue-600">SSL encrypted</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 text-sm">Phone Confirmation</h3>
              <p className="text-xs text-blue-600">We&apos;ll call within 24hrs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 text-sm">Fast Delivery</h3>
              <p className="text-xs text-blue-600">Same day available</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}