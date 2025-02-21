import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
