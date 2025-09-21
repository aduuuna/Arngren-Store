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
        alert('Error submitting order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        <div className="text-center">Loading checkout...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        <div className="text-center">Redirecting to cart...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.product.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Information Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., +233 123 456 789"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address *
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your complete delivery address"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Payment Process</h3>
              <p className="text-sm text-blue-700">
                After submitting this order, we will call you within 15 minutes to confirm your order 
                and arrange payment. We accept mobile money, bank transfer, or cash on delivery.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {isSubmitting ? 'Submitting Order...' : 'Submit Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
