"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CartManager } from "../Lib/cart";
import { categories } from '../Lib/products';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const cart = CartManager.getInstance();
    const updateCartCount = () => setCartCount(cart.getItemCount());
    
    updateCartCount();
    const unsubscribe = cart.subscribe(updateCartCount);
    
    return unsubscribe;
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            MediTools Store
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <div className="relative group">
              <Link href="/categories" className="text-gray-600 hover:text-gray-800">
                Categories
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    {category.icon} {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              href="/cart" 
              className="relative text-gray-600 hover:text-gray-800"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link href="/" className="block py-2 text-gray-600">Home</Link>
            <Link href="/categories" className="block py-2 text-gray-600">Categories</Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="block py-2 pl-4 text-gray-600"
              >
                {category.icon} {category.name}
              </Link>
            ))}
            <Link href="/cart" className="block py-2 text-gray-600">
              🛒 Cart ({cartCount})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}