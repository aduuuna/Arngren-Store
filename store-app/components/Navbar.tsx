"use client";
import Link from 'next/link';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { CartManager } from "../Lib/cart";
import { categories } from '../Lib/products';

console.log('🏠 Navbar component loaded!');

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log('Navbar useEffect running');
    
    const cart = CartManager.getInstance();
    console.log('Got cart instance, visitor ID:', cart.getVisitorId());
    
    const updateCartCount = () => {
      const count = cart.getItemCount();
      console.log('Updating cart count to:', count);
      setCartCount(count);
    };
    
    // Initial count
    updateCartCount();
    
    // Subscribe to changes
    const unsubscribe = cart.subscribe(updateCartCount);
    
    return unsubscribe;
  }, []);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesRef.current && 
        !categoriesRef.current.contains(event.target as Node) &&
        categoriesButtonRef.current &&
        !categoriesButtonRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesOpen(false);
      }
    };

    if (isCategoriesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isCategoriesOpen]);

  // Close mobile menu when category is selected
  const handleCategoryClick = () => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, action: { (): void; (): void; }) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    } else if (event.key === 'Escape') {
      setIsCategoriesOpen(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            Arngren Store
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
              Home
            </Link>
            
            {/* Categories with improved dropdown */}
            <div className="relative">
              <button
                ref={categoriesButtonRef}
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                onKeyDown={(e) => handleKeyDown(e, () => setIsCategoriesOpen(!isCategoriesOpen))}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1"
                aria-expanded={isCategoriesOpen}
                aria-haspopup="true"
              >
                Categories
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Fixed size dropdown with scroll */}
              {isCategoriesOpen && (
                <div 
                  ref={categoriesRef}
                  className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-2">
                    {categories.map((category, index) => (
                      <Link
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        onClick={handleCategoryClick}
                        className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors focus:outline-none focus:bg-blue-50 focus:text-blue-600"
                        role="menuitem"
                        tabIndex={isCategoriesOpen ? 0 : -1}
                      >
                        <span className="mr-3 text-lg">{category.icon}</span>
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/cart"
              className="relative text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1"
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button with hamburger/close animation */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span 
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu with slide animation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-gray-200">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-3 px-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
            >
              Home
            </Link>
            
            {/* Categories toggle for mobile */}
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="w-full flex items-center justify-between py-3 px-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
            >
              Categories
              <svg 
                className={`h-4 w-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Mobile categories list with animation */}
            <div className={`transition-all duration-300 overflow-hidden ${
              isCategoriesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="max-h-64 overflow-y-auto bg-gray-50 rounded-lg mx-2 my-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    onClick={handleCategoryClick}
                    className="flex items-center py-3 px-4 text-gray-600 hover:text-gray-800 hover:bg-white transition-colors border-b border-gray-200 last:border-b-0"
                  >
                    <span className="mr-3 text-lg">{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              href="/cart" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between py-3 px-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
            >
              <span>🛒 Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white rounded-full text-xs px-2 py-1 font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}