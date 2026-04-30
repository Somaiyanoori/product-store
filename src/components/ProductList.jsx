import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { useProducts, useSearchProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import {
  HiOutlineExclamationCircle,
  HiOutlineRefresh,
  HiOutlineInbox,
} from "react-icons/hi";

function EmptyState({ message = "No products found" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <HiOutlineInbox className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {message}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        Try changing your filters or search query
      </p>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <HiOutlineExclamationCircle className="w-16 h-16 text-red-400 mb-4" />
      <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
        Something went wrong
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-md">
        {error?.message || "Failed to load products. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
      >
        <HiOutlineRefresh className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}

function ResultsInfo({ count, isFiltered }) {
  return (
    <div className="flex items-center justify-between mb-4 text-sm text-slate-500 dark:text-slate-400">
      <span>
        Showing{" "}
        <strong className="text-slate-700 dark:text-slate-300">{count}</strong>{" "}
        product{count !== 1 ? "s" : ""}
        {isFiltered && " (filtered)"}
      </span>
    </div>
  );
}

export default function ProductList() {
  const { state } = useAppContext();
  const isSearching = state.searchQuery.trim().length >= 2;

  const browseQuery = useProducts({ category: state.selectedCategory });
  const searchQuery = useSearchProducts(state.searchQuery);

  const activeQuery = isSearching ? searchQuery : browseQuery;
  const { data, isLoading, isError, error, refetch } = activeQuery;

  const products = useMemo(() => {
    const rawProducts = data?.products ?? [];
    let sorted = [...rawProducts];

    switch (state.sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sorted;
  }, [data, state.sortBy]);

  if (isLoading) {
    return <LoadingSkeleton count={12} />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        message={
          isSearching
            ? `No products found for "${state.searchQuery}"`
            : "No products in this category"
        }
      />
    );
  }

  const isListView = state.viewMode === "list";

  return (
    <div>
      <ResultsInfo
        count={products.length}
        isFiltered={isSearching || state.selectedCategory !== "all"}
      />
      <div
        className={
          isListView
            ? "flex flex-col gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
