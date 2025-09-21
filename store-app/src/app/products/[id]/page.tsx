'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '../../../../Lib/products';
import { CartManager } from '../../../../Lib/cart';
import { Product } from '../../../../Lib/types';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundProduct = getProductById(params.id);
    setProduct(foundProduct || null);
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    const cart = CartManager.getInstance();
    for (let i = 0; i < quantity; i++) {
      cart.addItem(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href={`/categories/${product.category}`} className="text-blue-600 hover:text-blue-800">
          {product.category}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-green-600">
              ${product.price}
            </span>
            {product.inStock && (
              <span className="ml-4 text-green-600 bg-green-100 px-2 py-1 rounded text-sm">
                In Stock
              </span>
            )}
          </div>

          {product.inStock ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          ) : (
            <div className="text-red-600 font-semibold text-lg">
              Currently out of stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
