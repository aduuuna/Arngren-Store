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
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/categories"
            className="text-blue-600 hover:underline text-sm inline-block mb-4"
          >
            ← Back to Categories
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <span className="text-4xl">{category.icon}</span>
            {category.name}
          </h1>
          <p className="text-gray-600 mt-2">
            {products.length} products in this category
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No products found in this category.
            </p>
            <Link
              href="/categories"
              className="text-blue-600 hover:underline text-sm"
            >
              Browse other categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
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
