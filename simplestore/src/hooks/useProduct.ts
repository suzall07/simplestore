import { useState, useEffect } from "react";
import { fetchAllProducts, fetchProductsByCategory, fetchProductById } from "../api";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
      setError(null);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    setLoading(true);
    try {
      const data = await fetchProductsByCategory(category);
      setProducts(data);
      setError(null);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    setLoading(true);
    try {
      const data = await fetchProductById(id);
      setError(null);
      return data;
    } catch {
      setError("Failed to load product");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    getAllProducts,
    getProductsByCategory,
    getProductById
  };
};