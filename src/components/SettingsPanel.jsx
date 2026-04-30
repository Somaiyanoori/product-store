import { useState } from "react";
import { useAppContext, APP_ACTIONS } from "../context/AppContext";
import { useCategories } from "../hooks/useProducts";
import {
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineRefresh,
  HiOutlineAdjustments,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";

export default function SettingsPanel() {
  const { state, dispatch } = useAppContext();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name", label: "Name A-Z" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div className="mb-6">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl mb-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
      >
        <span className="flex items-center gap-2">
          <HiOutlineAdjustments className="w-4 h-4" />
          Filters & Settings
        </span>
        {isOpen ? (
          <HiOutlineChevronUp className="w-4 h-4" />
        ) : (
          <HiOutlineChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Settings Content */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm flex flex-col gap-5 lg:flex-row lg:items-end lg:flex-wrap animate-fade-in">
          {/* View Mode */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              View Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  dispatch({
                    type: APP_ACTIONS.SET_VIEW_MODE,
                    payload: "grid",
                  })
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  state.viewMode === "grid"
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <HiOutlineViewGrid className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: APP_ACTIONS.SET_VIEW_MODE,
                    payload: "list",
                  })
                }
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  state.viewMode === "list"
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                <HiOutlineViewList className="w-4 h-4" />
                List
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Category
            </label>
            <select
              value={state.selectedCategory}
              onChange={(e) =>
                dispatch({
                  type: APP_ACTIONS.SET_CATEGORY,
                  payload: e.target.value,
                })
              }
              className="px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[180px]"
              disabled={categoriesLoading}
            >
              <option value="all">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() +
                    cat.slice(1).replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Sort By
            </label>
            <select
              value={state.sortBy}
              onChange={(e) =>
                dispatch({
                  type: APP_ACTIONS.SET_SORT_BY,
                  payload: e.target.value,
                })
              }
              className="px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[180px]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Theme
            </label>
            <button
              onClick={() => dispatch({ type: APP_ACTIONS.TOGGLE_THEME })}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600"
            >
              {state.theme === "dark" ? (
                <>
                  <HiOutlineSun className="w-4 h-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <HiOutlineMoon className="w-4 h-4" />
                  Dark Mode
                </>
              )}
            </button>
          </div>

          {/* Reset */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Reset
            </label>
            <button
              onClick={() => dispatch({ type: APP_ACTIONS.RESET_SETTINGS })}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40"
            >
              <HiOutlineRefresh className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
