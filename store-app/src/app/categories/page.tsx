import Link from "next/link";
import { categories, getProductsByCategory } from "../../../Lib/products";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Shop by Category
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our complete range of medical tools and equipment organized by category. 
              Find exactly what you need for your healthcare practice.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <main className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category) => {
              const categoryProducts = getProductsByCategory(category.slug);

              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group block bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="p-8 text-center">
                    {/* Category Icon */}
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-5xl">{category.icon}</span>
                    </div>
                    
                    {/* Category Name */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {category.name}
                    </h2>
                    
                    {/* Products Count */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 px-4 py-2 rounded-full font-semibold shadow-sm border border-blue-200">
                        {categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'}
                      </div>
                      {categoryProducts.length > 0 && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                      )}
                    </div>
                    
                    {/* View Category Button */}
                    <div className="inline-flex items-center gap-2 text-blue-600 group-hover:text-blue-800 font-medium transition-all duration-200 group-hover:gap-3">
                      <span>View Category</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/10 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </Link>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-12 bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900">Quality Assured</h3>
                <p className="text-sm text-slate-600">All products meet medical standards</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900">Fast Delivery</h3>
                <p className="text-sm text-slate-600">Quick campus delivery service</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto shadow-sm">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900">Expert Support</h3>
                <p className="text-sm text-slate-600">Professional guidance available</p>
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Footer */}
        <footer className="bg-white/40 backdrop-blur-sm border border-white/20 text-slate-700 py-8 rounded-2xl shadow-sm">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg">© 2025 Arngren Store</p>
              <div className="text-sm text-slate-500 flex items-center justify-center md:justify-start mt-2">
                <span>Crafted with ❤️ by aduuuna</span>
                <a 
                  href="https://github.com/aduuuna" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-3 text-slate-600 hover:text-slate-800 transition-all duration-200 hover:scale-110 transform"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/in/joy-owusu-ansah" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 text-slate-600 hover:text-blue-600 transition-all duration-200 hover:scale-110 transform"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">
                Home
              </Link>
              <Link href="/categories" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">
                Categories
              </Link>
              <Link href="/cart" className="hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">
                Cart
              </Link>
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