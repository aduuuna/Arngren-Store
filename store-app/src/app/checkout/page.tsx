'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartManager } from '../../../Lib/cart';
import { CartItem, OrderForm } from '../../../Lib/types';

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

      if (response.ok) {
        // Clear cart and redirect to success page
        cart.clearCart();
        alert('Order submitted successfully! We will call you shortly to confirm payment.');
        router.push('/');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Loading Checkout</h1>
            <p className="text-slate-600">Preparing your order...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Checkout</h1>
            <button
              onClick={() => router.push('/cart')}
              className="text-slate-600 hover:text-slate-800 text-sm flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cart
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-blue-600">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">1</div>
              Cart
            </div>
            <div className="flex-1 h-px bg-blue-600"></div>
            <div className="flex items-center text-blue-600">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">2</div>
              Checkout
            </div>
            <div className="flex-1 h-px bg-slate-300"></div>
            <div className="flex items-center text-slate-400">
              <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">3</div>
              Confirmation
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Customer Information Form - Full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Customer Information</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="text-slate-700 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                      className="text-slate-700 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      (Please include the country code, e.g., +1 for the USA) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="text-slate-700 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                      className="text-slate-700 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Enter your complete delivery address with landmarks"
                    />
                  </div>
                </div>

                {/* Payment Process Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">How Payment Works</h3>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p>• We'll call you within <strong>24 hours</strong> to confirm your order</p>
                        <p>• Choose from: <strong>Mobile Money, Bank Transfer, or Cash on Delivery</strong></p>
                        <p>• Your items will be prepared after payment confirmation</p>
                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button - Hidden on mobile (sticky version below) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hidden sm:flex w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors items-center justify-center"
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
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
                  <div className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-sm font-medium">
                    {itemCount} item{itemCount !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-md bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-900 text-sm leading-tight mb-1 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-slate-600">
                            ${item.product.price.toFixed(2)} × {item.quantity}
                          </p>
                          <p className="font-semibold text-slate-900 text-sm">
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
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-green-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-slate-700">Secure</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-slate-700">Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Submit Button */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
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