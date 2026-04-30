import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppContext, APP_ACTIONS } from "../context/AppContext";
import { selectCartTotalItems } from "../store/cartSlice";
import {
  HiOutlineShoppingCart,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineHome,
  HiOutlineShoppingBag,
} from "react-icons/hi";

export default function Navbar() {
  const { state, dispatch } = useAppContext();
  const cartTotalItems = useSelector(selectCartTotalItems);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = state.theme === "dark";

  function handleToggleTheme() {
    dispatch({ type: APP_ACTIONS.TOGGLE_THEME });
  }

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary-600 dark:text-primary-400 hover:opacity-80"
          >
            <HiOutlineShoppingBag className="w-7 h-7" />
            <span>ProductStore</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`font-medium text-sm transition-colors ${
                isActive("/")
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className={`font-medium text-sm transition-colors ${
                isActive("/cart")
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
            >
              Cart
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <HiOutlineSun className="w-5 h-5" />
              ) : (
                <HiOutlineMoon className="w-5 h-5" />
              )}
            </button>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg"
              aria-label={`Cart with ${cartTotalItems} items`}
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartTotalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartTotalItems > 99 ? "99+" : cartTotalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <HiOutlineX className="w-5 h-5" />
              ) : (
                <HiOutlineMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 py-3 flex flex-col gap-2 animate-fade-in">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium ${
                isActive("/")
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <HiOutlineHome className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium ${
                isActive("/cart")
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <HiOutlineShoppingCart className="w-4 h-4" />
              Cart {cartTotalItems > 0 && `(${cartTotalItems})`}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
