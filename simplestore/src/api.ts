import axios from "axios";
import { useAuthStore } from "./store/authStore";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// Request interceptor — auto-attach token if logged in
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// fetching categories
export const fetchCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data.map((cat: string) => ({
    id: cat,
    name: cat,
  }));
};

//Pagination for home page
export const fetchTrendingProducts = async () => {
  const { data } = await api.get("/products?limit=3");
  return data;
};

//all product 
export const fetchAllProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};


// product by categories 
export const fetchProductsByCategory = async (category: string) => {
  const { data } = await api.get(`/products/category/${category}`);
  return data;
};

// product by an id 
export const fetchProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};