'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartItem from '../../../components/CartItem';
import { CartManager } from '../../../Lib/cart';
import { CartItem as CartItemType } from '../../../Lib/types';

export default function CartPage() {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = CartManager.getInstance();
    
    const updateCart = () => {
      setItems(cart.getItems());
      setTotal(cart.getTotal());
    };
    
    updateCart();
    const unsubscribe = cart.subscribe(updateCart);
    
    return unsubscribe;
  }, []);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
          <Link 
            href="/categories"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Total: ${total.toFixed(2)}
          </h2>
          <p className="text-gray-600">
            {items.reduce((count, item) => count + item.quantity, 0)} items
          </p>
        </div>
        
        <div className="flex gap-4">
          <Link 
            href="/categories"
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-md text-center hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/checkout"
            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md text-center hover:bg-green-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}


