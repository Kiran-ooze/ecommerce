import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ShoppingBag, ShieldAlert, LogOut, ArrowRight, Menu, X } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={closeMenu}
          className="flex items-center gap-2.5 text-zinc-900 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-sm">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-zinc-900">
            ShopEasy
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
          <Link 
            to="/" 
            className="hover:text-zinc-900 transition-colors py-1"
          >
            Home
          </Link>

          <Link 
            to="/products" 
            className="hover:text-zinc-900 transition-colors py-1"
          >
            Products
          </Link>

          {user && (
            <>
              <Link 
                to="/cart" 
                className="hover:text-zinc-900 transition-colors py-1"
              >
                Cart
              </Link>

              <Link 
                to="/orders" 
                className="hover:text-zinc-900 transition-colors py-1"
              >
                Orders
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <button
              onClick={handleLogout}
              className="
                inline-flex
                items-center
                gap-1.5
                bg-zinc-100
                hover:bg-rose-50
                text-zinc-700
                hover:text-rose-600
                border
                border-zinc-200
                hover:border-rose-200
                text-xs
                font-semibold
                px-3.5
                py-2
                rounded-lg
                transition-all
                duration-150
                active:scale-95
              "
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="
                  text-zinc-700
                  hover:text-zinc-900
                  hover:bg-zinc-100
                  text-xs
                  font-semibold
                  px-3.5
                  py-2
                  rounded-lg
                  transition-all
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  bg-zinc-900
                  hover:bg-zinc-800
                  text-white
                  text-xs
                  font-semibold
                  px-4
                  py-2
                  rounded-lg
                  shadow-sm
                  transition-all
                  active:scale-95
                "
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 pt-3 pb-6 space-y-4">
          
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1 text-sm font-medium text-zinc-700">
            <Link 
              to="/" 
              onClick={closeMenu}
              className="px-3 py-2.5 rounded-lg hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              Home
            </Link>

            <Link 
              to="/products" 
              onClick={closeMenu}
              className="px-3 py-2.5 rounded-lg hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              Products
            </Link>

            {user && (
              <>
                <Link 
                  to="/cart" 
                  onClick={closeMenu}
                  className="px-3 py-2.5 rounded-lg hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                >
                  Cart
                </Link>

                <Link 
                  to="/orders" 
                  onClick={closeMenu}
                  className="px-3 py-2.5 rounded-lg hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                >
                  Orders
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-rose-600 bg-rose-50 border border-rose-200/60 font-semibold text-xs mt-1"
              >
                <ShieldAlert className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Action Buttons in Mobile Menu */}
          <div className="pt-3 border-t border-zinc-100">
            {user ? (
              <button
                onClick={handleLogout}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-zinc-100
                  hover:bg-rose-50
                  text-zinc-700
                  hover:text-rose-600
                  border
                  border-zinc-200
                  hover:border-rose-200
                  text-xs
                  font-semibold
                  py-2.5
                  rounded-lg
                  transition-all
                "
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="
                    w-full
                    text-center
                    text-zinc-700
                    hover:text-zinc-900
                    bg-zinc-100
                    hover:bg-zinc-200/80
                    text-xs
                    font-semibold
                    py-2.5
                    rounded-lg
                    transition-all
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="
                    w-full
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    bg-zinc-900
                    hover:bg-zinc-800
                    text-white
                    text-xs
                    font-semibold
                    py-2.5
                    rounded-lg
                    shadow-sm
                    transition-all
                  "
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

        </div>
      )}
    </header>
  );
}

export default Navbar;