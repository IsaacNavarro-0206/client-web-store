import Layout from "@/layout";
import CreateItem from "@/pages/createItem";
import Home from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/create", element: <CreateItem /> },
    ],
  },
]);
