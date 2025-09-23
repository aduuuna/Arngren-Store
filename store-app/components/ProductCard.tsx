'use client';

import Link from 'next/link';
import { Product } from '../Lib/types';
import { CartManager } from '../Lib/cart';
import Image from 'next/image';

console.log('🎯 ProductCard component loaded!');

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    console.log('Add to cart button clicked for:', product.name);
    const cart = CartManager.getInstance();
    console.log('Got cart instance');
    cart.addItem(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <Image 
          src={product.image} 
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}