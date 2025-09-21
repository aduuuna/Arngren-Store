import Link from 'next/link';
import { categories, getProductsByCategory } from '../../../Lib/products';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => {
          const categoryProducts = getProductsByCategory(category.slug);
          
          return (
            <div key={category.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">{category.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {categoryProducts.length} products available
                </p>
                <Link
                  href={`/categories/${category.slug}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Products
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}