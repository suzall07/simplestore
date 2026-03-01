import axios from "axios";

const BASE = "https://fakestoreapi.com";

export const fetchCategories = async () => {
  const { data } = await axios.get(`${BASE}/products/categories`);

  const icons: Record<string, string> = {
    "electronics": "ELECTRONICS",
    "jewelery": "LUXURY",
    "men's clothing": "MENS",
    "women's clothing": "LADIES",
  };

  return data.map((cat: string) => ({
    id: cat,
    name: cat,
    icon: icons[cat] ?? "",
  }));
};

export const fetchTrendingProducts = async () => {
  const { data } = await axios.get(`${BASE}/products?limit=3`);
  return data;
};