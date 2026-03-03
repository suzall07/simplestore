import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

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