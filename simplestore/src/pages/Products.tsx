import { useState, useEffect, useMemo } from "react";
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

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("q") || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

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
          setCurrentPage(1); // Reset to page 1 on category change
        } else {
          setError("Failed to load products.");
        }
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  // Filter products based on URL search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryClick = (id: string | null) => {
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (id) {
      newParams.set("category", id);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search query changes
  }, [searchQuery]);

  if (loading && products.length === 0) return <LoadingSpinner />;

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16">
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-display text-4xl mb-4 text-[#111111]">Shop</h1>
        <p className="text-text-muted font-light text-sm">Explore our collection of essentials.</p>
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
              <div className="flex justify-between items-center mb-10">
                <span className="text-xs text-text-muted font-light">{filteredProducts.length} items found</span>
              </div>
              
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                  {paginatedProducts.map((product) => (
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
              ) : (
                <div className="text-center py-20 text-text-muted font-light italic">
                  No products match your search.
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-20 pt-10 border-t border-border-custom">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-text-muted hover:text-[#111111] disabled:opacity-20 transition-opacity"
                  >
                    ←
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 text-xs rounded-full transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-[#111111] text-white' 
                          : 'text-text-muted hover:bg-bg-soft hover:text-[#111111]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-text-muted hover:text-[#111111] disabled:opacity-20 transition-opacity"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
