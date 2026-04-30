import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://dummyjson.com";

async function fetchProducts({ limit = 30, skip = 0, category = "" } = {}) {
  let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}&select=id,title,price,thumbnail,rating,stock,category,description,brand`;

  if (category && category !== "all") {
    url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  return response.json();
}

async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/category-list`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

async function searchProducts(query) {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=30`,
  );
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }
  return response.json();
}

export function useProducts({ limit = 30, skip = 0, category = "all" } = {}) {
  return useQuery({
    queryKey: ["products", { limit, skip, category }],
    queryFn: () => fetchProducts({ limit, skip, category }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}

export function useSearchProducts(query) {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 2,
  });
}
