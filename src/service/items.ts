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
}

export const searchItems = (query: string) => {
  return axios({
    method: "GET",
    baseURL: import.meta.env.VITE_API_URL,
    url: `/items?search=${query}`,
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

export const createItem = (data: Item) => {
  return axios({
    method: "POST",
    baseURL: import.meta.env.VITE_API_URL,
    url: "/create",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};
