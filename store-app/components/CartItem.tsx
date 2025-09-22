'use client';

import { CartItem as CartItemType } from '../Lib/types';
import { CartManager } from '../Lib/cart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const cart = CartManager.getInstance();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      cart.removeItem(item.product.id);
    } else {
      cart.updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    cart.removeItem(item.product.id);
  };

  const totalPrice = (item.product.price * item.quantity).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      {/* Mobile Layout - Stacked */}
      <div className="sm:hidden">
        {/* Top Row: Image and Product Info */}
        <div className="flex gap-3 mb-3">
          <img 
            src={item.product.image} 
            alt={item.product.name}
            className="w-16 h-16 object-cover rounded-lg bg-slate-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1 line-clamp-2">
              {item.product.name}
            </h3>
            <p className="text-blue-600 text-sm">${item.product.price.toFixed(2)} each</p>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-1 self-start"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Bottom Row: Quantity Controls and Total */}
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-blue-50 rounded-lg p-1">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-md bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 hover:text-slate-800 transition-colors"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-10 text-center text-sm font-medium text-slate-900">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-md bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 hover:text-slate-800 transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-slate-900">${totalPrice}</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden sm:flex sm:items-center sm:gap-6">
        <img 
          src={item.product.image} 
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-lg bg-slate-100"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">
            {item.product.name}
          </h3>
          <p className="text-blue-600">${item.product.price.toFixed(2)} each</p>
        </div>
        
        <div className="flex items-center bg-blue-50 rounded-lg p-1">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-10 h-10 rounded-md bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 hover:text-slate-800 transition-colors"
            aria-label="Decrease quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center font-medium text-slate-900">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-10 h-10 rounded-md bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 hover:text-slate-800 transition-colors"
            aria-label="Increase quantity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        
        <div className="text-right min-w-0">
          <p className="text-xl font-bold text-slate-900 mb-1">${totalPrice}</p>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}