import axios from "axios";

const BASE = "https://fakestoreapi.com";

export const fetchCategories = async () => {
  const { data } = await axios.get(`${BASE}/products/categories`);
  
  return data.map((cat: string) => ({
    id: cat,
    name: cat,
  }));
};

export const fetchTrendingProducts = async () => {
  const { data } = await axios.get(`${BASE}/products?limit=3`);
  return data;
};

export const fetchAllProducts = async () => {
  const { data } = await axios.get(`${BASE}/products`);
  return data;
};

export const fetchProductsByCategory = async (category: string) => {
  const { data } = await axios.get(`${BASE}/products/category/${category}`);
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data } = await axios.get(`${BASE}/products/${id}`);
  return data;
};