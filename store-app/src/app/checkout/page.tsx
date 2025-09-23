'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartManager } from '../../../Lib/cart';
import { CartItem, OrderForm } from '../../../Lib/types';
import Image from 'next/image';

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(''); // Add error state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const router = useRouter();

  useEffect(() => {
    const cart = CartManager.getInstance();
    
    const initializeCheckout = () => {
      const cartItems = cart.getItems();
      const cartTotal = cart.getTotal();
      
      setItems(cartItems);
      setTotal(cartTotal);
      setIsLoading(false);
      
      // If cart is empty, redirect to cart page
      if (cartItems.length === 0) {
        router.push('/cart');
      }
    };
    
    // Small delay to ensure cart is properly loaded from localStorage
    const timer = setTimeout(initializeCheckout, 100);
    
    return () => clearTimeout(timer);
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError(''); // Clear any previous errors

    const cart = CartManager.getInstance();
    const orderData: OrderForm = {
      ...formData,
      items: cart.getItems(), // Get fresh cart data
      total: cart.getTotal(),
    };

    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Clear cart and redirect to success page
        cart.clearCart();
        alert('Order submitted successfully! We will call you shortly to confirm payment.');
        router.push('/');
      } else {
        // Show validation or server errors
        setError(responseData.message || 'Please check your information and try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      // Always reset submitting state
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <div className="relative mx-auto mb-4 w-16 h-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 animate-pulse">Loading Checkout</h1>
            <p className="text-slate-600 animate-pulse">Preparing your order...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Checkout</h1>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <p className="text-slate-600">Redirecting to cart...</p>
          </div>
        </div>
      </div>
    );
  }

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Checkout</h1>
            <button
              onClick={() => router.push('/cart')}
              className="text-slate-600 hover:text-slate-800 text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cart
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Customer Information Form - Full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Customer Information</h2>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="text-slate-700 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="text-slate-700 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="text-slate-700 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                      placeholder="+233 123 456 789"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-2">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      rows={4}
                      value={formData.address}
                      onChange={handleInputChange}
                      className="text-slate-700 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 resize-none"
                      placeholder="Enter your complete delivery address with landmarks"
                    />
                  </div>
                </div>

                {/* Payment Process Info */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-green-900 mb-3 text-lg">How Payment Works</h3>
                      <div className="text-sm text-green-800 space-y-2">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <p>We'll call you within <strong>2-4 hours</strong> to confirm your order</p>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <p>Choose from: <strong>Mobile Money, Bank Transfer, or Cash on Delivery</strong></p>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <p>Your items will be prepared after payment confirmation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button - Hidden on mobile (sticky version below) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hidden sm:flex w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5m3.5-2.5h6" />
                      </svg>
                      Submit Order (${total.toFixed(2)})
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary - Sticky on desktop */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="lg:sticky lg:top-6">
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {itemCount} item{itemCount !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg hover:from-slate-100 hover:to-blue-100 transition-all duration-200">
                      <Image 
                        src={item.product.image} 
                        alt={item.product.name}
                        width={400}
                        height={300}
                        className="w-12 h-12 object-cover rounded-md bg-white shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-900 text-sm leading-tight mb-1 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-slate-600">
                            ${item.product.price.toFixed(2)} × {item.quantity}
                          </p>
                          <p className="font-bold text-slate-900 text-sm">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-600">Subtotal</span>
                    <span className="font-medium text-blue-600">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
                      <span className="text-lg font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-green-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Trust badges */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mb-2 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-200 shadow-sm">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-700">Secure</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-2 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200 shadow-sm">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-700">Fast Call</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-2 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-200 shadow-sm">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-slate-700">Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Sticky Submit Button - FIXED */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl backdrop-blur-sm bg-opacity-95">
          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-bold hover:from-green-700 hover:to-green-800 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg active:transform active:scale-95"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5m3.5-2.5h6" />
                </svg>
                Submit Order • ${total.toFixed(2)}
              </>
            )}
          </button>
        </div>

        {/* Mobile bottom padding to account for sticky button */}
        <div className="sm:hidden h-24"></div>
      </div>
    </div>
  );
}