import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductsQuery, useCategoriesQuery } from "../hooks/useProductsQuery";
import ProductCard from "../components/ProductCard";
import ProductsSkeleton from "../components/ProductsSkeleton";
import type { Category, Product } from "../types";

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("q") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | null>(null);
  
  const { data: products = [], isLoading, error } = useProductsQuery(selectedCategory);
  const { data: categories = [] } = useCategoriesQuery();

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((product: Product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const sortedAndFilteredProducts = useMemo(() => {
    const sorted = filteredProducts.slice();
    
    if (sortBy === 'asc') {
      sorted.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sortBy === 'desc') {
      sorted.sort((a: Product, b: Product) => b.price - a.price);
    }
    
    return sorted;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedAndFilteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAndFilteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedAndFilteredProducts, currentPage]);

  const handleCategoryClick = useCallback((id: string | null) => {
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (id) {
      newParams.set("category", id);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  }, [searchParams]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(p => Math.max(1, p - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(p => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'asc' | 'desc' | null);
    setCurrentPage(1); // reset to page 1 on sort change
  }, []);

  if (isLoading) return <ProductsSkeleton />;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-16">
      <div className="mb-16">
        <h1 className="font-display text-4xl mb-4 text-[#111111]">Shop</h1>
        <p className="text-text-muted font-light text-sm">Explore our collection of essentials.</p>
      </div>

      <div className="lg:flex gap-16">
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
              {categories.map((cat: Category) => (
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

        <div className="flex-1">
          <>
            <div className="flex justify-between items-center mb-10">
              <span className="text-xs text-text-muted font-light">{sortedAndFilteredProducts.length} items found</span>
              
              <div className="flex items-center gap-3">
                <label className="text-[10px] uppercase tracking-widest text-text-muted">Sort by</label>
                <select 
                  value={sortBy || ''}
                  onChange={handleSortChange}
                  className="text-xs bg-transparent border border-border-custom rounded-custom px-3 py-1.5 focus:outline-none focus:border-[#111111]"
                >
                  <option value="">Featured</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {paginatedProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-text-muted font-light italic">
                No products match your search.
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-20 pt-10 border-t border-border-custom">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 text-text-muted hover:text-[#111111] disabled:opacity-20 transition-opacity"
                >
                  ←
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 text-text-muted hover:text-[#111111] disabled:opacity-20 transition-opacity"
                >
                  →
                </button>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Products;