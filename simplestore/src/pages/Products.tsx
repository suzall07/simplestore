import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchCategories, fetchAllProducts, fetchProductsByCategory } from "../api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type Category = { id: string; name: string };
type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const categoryPromise = fetchCategories();
    const productsPromise = selectedCategory 
      ? fetchProductsByCategory(selectedCategory) 
      : fetchAllProducts();

    Promise.allSettled([categoryPromise, productsPromise])
      .then(([catRes, prodRes]) => {
        if (catRes.status === "fulfilled") setCategories(catRes.value);
        if (prodRes.status === "fulfilled") {
          setProducts(prodRes.value);
        } else {
          setError("Failed to load products.");
        }
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleCategoryClick = (id: string | null) => {
    if (id) {
      setSearchParams({ category: id });
    } else {
      setSearchParams({});
    }
  };

  if (loading && products.length === 0) return <LoadingSpinner />;

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16">
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-display text-4xl mb-4 text-[#111111]">Shop</h1>
        <p className="text-text-muted font-light">Explore our collection of essentials.</p>
      </div>

      <div className="lg:flex gap-16">
        {/* Sidebar / Filters */}
        <aside className="w-full lg:w-48 shrink-0 mb-12 lg:mb-0">
          <div className="sticky top-24">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#111111] mb-6">Categories</h2>
            <ul className="flex flex-wrap lg:flex-col gap-y-3 gap-x-6">
              <li>
                <button 
                  onClick={() => handleCategoryClick(null)}
                  className={`text-sm transition-colors ${!selectedCategory ? 'text-[#111111] font-medium' : 'text-text-muted hover:text-[#111111]'}`}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`text-sm capitalize transition-colors ${selectedCategory === cat.id ? 'text-[#111111] font-medium' : 'text-text-muted hover:text-[#111111]'}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content / Grid */}
        <div className="flex-1">
          {error ? (
            <div className="text-center py-20">
              <p className="text-text-muted mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-outline">Retry</button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs text-text-muted font-light">{products.length} Products found</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {products.map((product) => (
                  <Link to={`/products/${product.id}`} key={product.id} className="group">
                    <div className="aspect-[4/5] bg-bg-soft flex items-center justify-center p-10 transition-colors group-hover:bg-[#f0f0ed]">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-full max-w-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                    <div className="mt-5">
                      <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1.5">{product.category}</div>
                      <h3 className="text-sm font-medium text-[#111111] line-clamp-1 group-hover:underline decoration-1 underline-offset-4 mb-2">{product.title}</h3>
                      <div className="font-display text-base">${product.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
