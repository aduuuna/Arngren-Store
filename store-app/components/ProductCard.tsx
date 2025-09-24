'use client';

import Link from 'next/link';
import { Product } from '../Lib/types';
import { CartManager } from '../Lib/cart';
import Image from 'next/image';
import { useState } from 'react';

console.log('🎯 ProductCard component loaded!');

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop event bubbling
    
    console.log('Add to cart button clicked for:', product.name);
    setIsAdding(true);
    
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const cart = CartManager.getInstance();
    console.log('Got cart instance');
    cart.addItem(product);
    
    setIsAdding(false);
    setShowAdded(true);
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowAdded(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative overflow-hidden">
          <Image 
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          {/* Stock badge */}
          {product.inStock ? (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
              In Stock
            </div>
          ) : (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
              Out of Stock
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="text-xs text-gray-500">per unit</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 transform active:scale-95 flex items-center justify-center min-w-[120px] shadow-md hover:shadow-lg ${
              !product.inStock
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : isAdding
                ? 'bg-blue-500 text-white cursor-not-allowed'
                : showAdded
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:-translate-y-0.5'
            }`}
          >
            {!product.inStock ? (
              'Out of Stock'
            ) : isAdding ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding...
              </>
            ) : showAdded ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5m3.5-2.5h6" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
        
        {/* Quick view link */}
        <Link 
          href={`/products/${product.id}`}
          className="mt-3 block text-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}