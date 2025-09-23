"use client";

console.log('🏁 Homepage loaded!');

import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { products, categories } from '../../Lib/products';
import { useEffect } from 'react';

export default function HomePage() {

  useEffect(() => {
    console.log('🎉 useEffect in homepage running!');
  }, []);
  
  const featuredProducts = products.slice(0, 6);

  // Popular categories - first 8 categories for homepage display
  const popularCategories = categories.slice(0, 8);
  
  // Deal of the day - just pick a product (you can make this dynamic later)
  const dealOfTheDay = products.find(p => p.id === '5'); // Gaming laptop as example

  return (
    <div className="min-h-[100dvh] max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section with Animation */}
      <div className="rmx-4 mt-6 mb-12 relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden rounded-2xl shadow-2xl md:mx-8 lg:mx-12">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
          <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-purple-400 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }}></div>
          <div className="floating-element absolute bottom-20 left-1/3 w-16 h-16 bg-green-400 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Electronics for
              <span className="text-gradient bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"> Every Need</span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Discover cutting-edge technology, smart home solutions, and professional equipment all in one place
            </p>
            <Link 
              href="/categories"
              className="hero-cta inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-green-700"
            >
              Explore Products
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Deal of the Day */}
        {dealOfTheDay && (
          <section className="py-8 -mt-8 relative z-10">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔥</span>
                    <h2 className="text-2xl md:text-3xl font-bold">Deal of the Day</h2>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{dealOfTheDay.name}</h3>
                  <p className="text-red-100 mb-3">{dealOfTheDay.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold">${dealOfTheDay.price}</span>
                    <span className="text-red-200 line-through text-lg">${(dealOfTheDay.price * 1.2).toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  href={`/products/${dealOfTheDay.id}`}
                  className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors whitespace-nowrap"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Popular Categories Section */}
        <section className="py-12">
          <div className="text-center mb-10">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {popularCategories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="category-card group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center hover:scale-105 border border-gray-100"
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` 
                }}
              >
                <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors font-medium"
            >
              View All Categories
              <span className="text-sm">({categories.length})</span>
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-gray-50 -mx-4 px-4 md:rounded-3xl">
          <div className="text-center mb-10">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">Handpicked favorites from our collection</p>
          </div>

          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-72">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` 
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

    
        </section>

        {/* Trust/Features Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="feature-card p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We deliver right to your doorsteps</p>
            </div>
            <div className="feature-card p-6">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Trusted Quality</h3>
              <p className="text-gray-600">Carefully selected items students actually need.</p>
            </div>
            <div className="feature-card p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
              <p className="text-gray-600">Reach us quickly via mail.</p>
            </div>
          </div>
        </section>


        {/* footer */}
        <footer className="bg-gray-100 text-gray-700 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            
            {/* Brand / Identity */}
            <div className="text-center md:text-left">
              <p className="font-semibold">© 2025 CampusShop</p>
              <p className="text-sm text-gray-500">Built by Men in Tech</p>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-6 text-sm">
              <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="/categories" className="hover:text-blue-600 transition-colors">Categories</a>
              <a href="/cart" className="hover:text-blue-600 transition-colors">Cart</a>
            </div>

            {/* Contact */}
            <div className="text-center md:text-right text-sm">
              <a href="mailto:orders.myshop@gmail.com" className="hover:text-blue-600 transition-colors">
                orders.myshop@gmail.com
              </a>
            </div>
            
          </div>
        </footer>

      </div>

      {/* Custom CSS - Add this to your global CSS file */}
      <style jsx>{`
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .text-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .hero-title {
          animation: fadeInUp 1s ease-out 0.2s both;
        }
        
        .hero-subtitle {
          animation: fadeInUp 1s ease-out 0.4s both;
        }
        
        .hero-cta {
          animation: fadeInUp 1s ease-out 0.6s both;
        }
        
        .section-title {
          animation: fadeInUp 0.8s ease-out both;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .category-card:hover {
          transform: translateY(-5px);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .feature-card {
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}