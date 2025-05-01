import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-50 min-h-screen h-auto flex flex-col justify-start items-center">
      <NavBar />

      <Outlet />
    </div>
  );
};

export default Layout;
