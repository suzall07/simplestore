import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProductsByCategory, fetchProductById, fetchCategories, fetchTrendingProducts } from "../api";

export const useProductsQuery = (category?: string | null) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => category ? fetchProductsByCategory(category) : fetchAllProducts(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductQuery = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTrendingProductsQuery = () => {
  return useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrendingProducts(),
    staleTime: 1000 * 60 * 5,
  });
};