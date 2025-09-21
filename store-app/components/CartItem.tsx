'use client';

import { CartItem as CartItemType } from '../Lib/types';
import { CartManager } from '../Lib/cart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const cart = CartManager.getInstance();

  const handleQuantityChange = (newQuantity: number) => {
    cart.updateQuantity(item.product.id, newQuantity);
  };

  const handleRemove = () => {
    cart.removeItem(item.product.id);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <img 
        src={item.product.image} 
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
        <p className="text-gray-600">${item.product.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={handleRemove}
          className="text-red-600 text-sm hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
}