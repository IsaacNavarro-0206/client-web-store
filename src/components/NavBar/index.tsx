import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NavBar = () => {
  //   const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  //   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Inicio", to: "/" },
    { name: "Buscar", to: "/items?search=" },
    { name: "Crear producto", to: "/create" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b  bg-white">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <span className="font-bold text-xl">Bazar</span>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.to
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />

                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )} *
              </Button>
            </Link>
          </div> */}
        </div>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Link to="/cart" className="mr-2">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />

              {/* {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )} */}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={closeMenu}
            >
              <span className="font-bold text-xl">Bazar</span>
            </Link>

            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="container grid gap-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center text-lg font-medium"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
