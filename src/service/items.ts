import axios from "axios";

export interface Item {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  images: string[];
}

export interface SearchResults {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  results: Item[];
}

export const searchItems = (
  query: string,
  page: number = 1,
  limit: number = 10
) => {
  return axios({
    method: "GET",
    baseURL: import.meta.env.VITE_API_URL,
    url: `/items?search=${query}&page=${page}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getItem = (id: string) => {
  return axios({
    method: "GET",
    baseURL: import.meta.env.VITE_API_URL,
    url: `/items/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createItem = (data: FormData) => {
  return axios({
    method: "POST",
    baseURL: import.meta.env.VITE_API_URL,
    url: "/create",
    headers: {
      // Establecer Content-Type a multipart/form-data para la carga de archivos
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};
