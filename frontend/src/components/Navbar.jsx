import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ShoppingBag, ShieldAlert, LogOut, ArrowRight } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 text-zinc-900 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-sm">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-zinc-900">
            ShopEasy
          </span>
        </Link>

        {/* Navigation Links */}
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

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
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

      </div>
    </header>
  );
}

export default Navbar;