import Layout from "@/layout";
import CreateItem from "@/pages/createItem";
import Home from "@/pages/home";
import ProductDetail from "@/pages/productDetail";
import SearchItems from "@/pages/searchItems";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "items/:id", element: <ProductDetail /> },
      { path: "items", element: <SearchItems /> },
      { path: "create", element: <CreateItem /> },
    ],
  },
]);
