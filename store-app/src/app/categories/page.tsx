import Link from "next/link";
import { categories, getProductsByCategory } from "../../../Lib/products";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className=" flex-grow max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Categories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.slug);

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden block"
              >
                <div className="p-6 text-center">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-600">
                    {categoryProducts.length} products available
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* footer */}
      <footer className="bg-gray-100 text-gray-700 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-semibold">© 2025 CampusShop</p>
            <p className="text-sm text-gray-500">Built by Men in Tech</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="/categories" className="hover:text-blue-600 transition-colors">Categories</a>
            <a href="/cart" className="hover:text-blue-600 transition-colors">Cart</a>
          </div>
          <div className="text-center md:text-right text-sm">
            <a href="mailto:orders.myshop@gmail.com" className="hover:text-blue-600 transition-colors">
              orders.myshop@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
