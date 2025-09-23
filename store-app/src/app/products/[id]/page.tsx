'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '../../../../Lib/products';
import { CartManager } from '../../../../Lib/cart';
import { Product } from '../../../../Lib/types';
import Image from 'next/image';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      const foundProduct = getProductById(resolvedParams.id);
      setProduct(foundProduct || null);
      setIsLoading(false);
    }
  }, [resolvedParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="mb-6 flex items-center space-x-2">
              <div className="h-4 bg-slate-200 rounded w-12"></div>
              <div className="h-4 bg-slate-200 rounded w-1"></div>
              <div className="h-4 bg-slate-200 rounded w-20"></div>
              <div className="h-4 bg-slate-200 rounded w-1"></div>
              <div className="h-4 bg-slate-200 rounded w-32"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image skeleton */}
              <div className="aspect-square bg-slate-200 rounded-2xl"></div>
              
              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                </div>
                <div className="h-10 bg-slate-200 rounded w-32"></div>
                <div className="h-12 bg-slate-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Add a slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const cart = CartManager.getInstance();
    for (let i = 0; i < quantity; i++) {
      cart.addItem(product);
    }
    
    setIsAddingToCart(false);
    setShowAddedToCart(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowAddedToCart(false);
    }, 3000);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Breadcrumb Navigation */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-white/20">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:bg-blue-50 px-2 py-1 rounded-full"
            >
              Home
            </Link>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link 
              href={`/categories/${product.category}`} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:bg-blue-50 px-2 py-1 rounded-full"
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-600 font-medium bg-slate-100/60 px-2 py-1 rounded-full truncate max-w-48">
              {product.name}
            </span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Product Image */}
          <div className="relative group">
            <div className="aspect-square bg-white rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <Image 
                src={product.image} 
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Floating badge */}
            {product.inStock && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
                In Stock
              </div>
            )}
          </div>
          
          {/* Enhanced Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                {product.description}
              </p>
            </div>
            
            {/* Enhanced Price Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl font-bold text-green-700">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-slate-600 ml-2">per unit</span>
                </div>
                {product.inStock ? (
                  <div className="flex items-center text-green-600 bg-green-100 px-4 py-2 rounded-full font-semibold shadow-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Available Now
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 bg-red-100 px-4 py-2 rounded-full font-semibold">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Out of Stock
                  </div>
                )}
              </div>
            </div>

            {product.inStock ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm space-y-6">
                {/* Enhanced Quantity Selector */}
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold text-lg">Quantity:</label>
                  <div className="flex items-center bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 font-bold text-xl"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <div className="w-16 h-12 flex items-center justify-center font-bold text-lg bg-slate-50 border-x border-slate-200">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Total Price:</span>
                    <span className="text-2xl font-bold text-blue-700">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  {quantity > 1 && (
                    <div className="text-sm text-slate-500 mt-1">
                      ${product.price.toFixed(2)} × {quantity} items
                    </div>
                  )}
                </div>
                
                {/* Enhanced Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 flex items-center justify-center ${
                    isAddingToCart 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500 cursor-not-allowed' 
                      : showAddedToCart
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }`}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Adding to Cart...
                    </>
                  ) : showAddedToCart ? (
                    <>
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5m3.5-2.5h6" />
                      </svg>
                      Add to Cart • ${totalPrice.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Quick Actions */}
                <div className="flex gap-3">
                  <Link 
                    href="/cart"
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 text-center hover:shadow-md"
                  >
                    View Cart
                  </Link>
                  <Link 
                    href="/checkout"
                    className="flex-1 bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 text-green-800 py-3 px-4 rounded-xl font-semibold transition-all duration-200 text-center hover:shadow-md"
                  >
                    Quick Checkout
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 text-center">
                <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="text-xl font-bold text-red-800 mb-2">Currently Out of Stock</h3>
                <p className="text-red-600">We&apos;ll notify you when this item becomes available again.</p>
                <button className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 px-6 py-2 rounded-xl font-semibold transition-colors duration-200">
                  Notify Me
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="bg-white/40 backdrop-blur-sm border border-white/20 text-slate-700 py-8 mt-16 rounded-2xl shadow-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg">© 2025 MediTools Store</p>
              <div className="text-sm text-slate-500 flex items-center justify-center md:justify-start mt-2">
                <span>Developed by aduuuna</span>
                <a href="https://github.com/aduuuna" target="_blank" rel="noopener noreferrer" className="ml-3 text-slate-600 hover:text-slate-800 transition-colors duration-200 hover:scale-110 transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/joy-owusu-ansah" target="_blank" rel="noopener noreferrer" className="ml-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 hover:scale-110 transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Home</Link>
              <Link href="/categories" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Categories</Link>
              <Link href="/cart" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">Cart</Link>
            </div>
            <div className="text-center md:text-right text-sm">
              <div className="text-slate-500">Need help? Contact us!</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}