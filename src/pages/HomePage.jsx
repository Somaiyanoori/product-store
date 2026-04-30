import { useCallback } from "react";
import { useAppContext, APP_ACTIONS } from "../context/AppContext";
import SettingsPanel from "../components/SettingsPanel";
import ProductList from "../components/ProductList";
import {
  HiOutlineSearch,
  HiOutlineX,
  HiOutlineBadgeCheck,
  HiOutlineLightningBolt,
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
} from "react-icons/hi";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-6">
      <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-12 pr-10 py-3 rounded-2xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
        aria-label="Search products"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          aria-label="Clear search"
        >
          <HiOutlineX className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

function HeroSection() {
  return (
    <div className="rounded-3xl mb-8 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-slate-900 text-white p-8 sm:p-12 shadow-xl overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <HiOutlineShoppingBag className="w-8 h-8" />
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome to ProductStore
          </h1>
        </div>
        <p className="text-primary-100 text-base sm:text-lg mb-6 max-w-2xl">
          Discover thousands of amazing products at the best prices. Browse by
          category, search, and add your favorites to the cart.
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium">
            <HiOutlineBadgeCheck className="w-4 h-4" />
            Quality Products
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium">
            <HiOutlineLightningBolt className="w-4 h-4" />
            Fast Delivery
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-sm font-medium">
            <HiOutlineCurrencyDollar className="w-4 h-4" />
            Best Prices
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { state, dispatch } = useAppContext();

  const handleSearchChange = useCallback(
    (value) => {
      dispatch({ type: APP_ACTIONS.SET_SEARCH_QUERY, payload: value });
    },
    [dispatch],
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection />
      <SearchBar value={state.searchQuery} onChange={handleSearchChange} />
      <SettingsPanel />
      <ProductList />
    </main>
  );
}
