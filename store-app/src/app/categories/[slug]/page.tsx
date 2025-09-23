import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "../../../../components/ProductCard";
import { categories, getProductsByCategory } from "../../../../Lib/products";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Breadcrumb Navigation */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-white/20 w-fit">
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
              href="/categories" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:bg-blue-50 px-2 py-1 rounded-full"
            >
              Categories
            </Link>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-600 font-medium bg-slate-100/60 px-2 py-1 rounded-full">
              {category.name}
            </span>
          </div>
        </nav>

        {/* Simplified Mobile-Friendly Header */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <span className="text-4xl">{category.icon}</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                {category.name}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 px-4 py-2 rounded-full font-semibold shadow-sm border border-blue-200">
                  {products.length} {products.length === 1 ? 'Product' : 'Products'}
                </div>
                {products.length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 px-4 py-2 rounded-full font-semibold shadow-sm border border-green-200 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Available
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 hover:gap-3 group bg-blue-50/50 hover:bg-blue-100/50 px-4 py-2 rounded-full border border-blue-200/50"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <main className="mb-16">
          {products.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No Products Available</h3>
              <p className="text-slate-600 text-lg mb-6 max-w-md mx-auto">
                We&apos;re currently updating our {category.name.toLowerCase()} collection. Check back soon for new arrivals!
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Browse All Categories
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Sort/Filter Bar */}
              <div className="bg-white/40 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600 font-medium">Showing all products</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-sm text-slate-500">
                    Updated recently
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <div 
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'forwards',
                      animation: 'fade-in-up 0.6s ease-out forwards'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
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
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.239 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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