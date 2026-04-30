import { memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, selectCartItems } from "../store/cartSlice";
import { useAppContext } from "../context/AppContext";
import {
  HiOutlineShoppingCart,
  HiOutlineStar,
  HiStar,
  HiOutlineArrowRight,
  HiCheck,
  HiOutlineExclamation,
} from "react-icons/hi";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= Math.round(rating) ? (
            <HiStar className="w-4 h-4 text-amber-400" />
          ) : (
            <HiOutlineStar className="w-4 h-4 text-slate-300 dark:text-slate-600" />
          )}
        </span>
      ))}
      <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}

function GridCard({ product, isInCart, onAddToCart }) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      {/* Stock Badge */}
      {product.stock < 10 && product.stock > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
          <HiOutlineExclamation className="w-3 h-3" />
          Only {product.stock} left
        </span>
      )}
      {product.stock === 0 && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
          Out of Stock
        </span>
      )}

      {/* In Cart Badge */}
      {isInCart && (
        <span className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
          <HiCheck className="w-3 h-3" />
          In Cart
        </span>
      )}

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className="product-image-container h-52 overflow-hidden bg-slate-50 dark:bg-slate-900">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-md w-fit capitalize">
          {product.category}
        </span>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2 transition-colors">
            {product.title}
          </h3>
        </Link>

        <StarRating rating={product.rating} />

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.brand && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {product.brand}
            </span>
          )}
        </div>

        <button
          onClick={onAddToCart}
          disabled={product.stock === 0}
          className={`w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
            isInCart
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-primary-600 hover:bg-primary-700 text-white"
          }`}
        >
          {product.stock === 0 ? (
            "Out of Stock"
          ) : isInCart ? (
            <>
              <HiCheck className="w-4 h-4" />
              Add More
            </>
          ) : (
            <>
              <HiOutlineShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ListCard({ product, isInCart, onAddToCart }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className="flex-shrink-0 w-32 h-32 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-md w-fit capitalize">
              {product.category}
            </span>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2 transition-colors">
                {product.title}
              </h3>
            </Link>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white flex-shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <StarRating rating={product.rating} />

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-2">
          <button
            onClick={onAddToCart}
            disabled={product.stock === 0}
            className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isInCart
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-primary-600 hover:bg-primary-700 text-white"
            }`}
          >
            {product.stock === 0 ? (
              "Out of Stock"
            ) : isInCart ? (
              <>
                <HiCheck className="w-3 h-3" />
                Add More
              </>
            ) : (
              <>
                <HiOutlineShoppingCart className="w-3 h-3" />
                Add to Cart
              </>
            )}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="py-2 px-4 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1"
          >
            View Details
            <HiOutlineArrowRight className="w-3 h-3" />
          </Link>
          {product.stock > 0 && product.stock < 10 && (
            <span className="text-xs text-orange-500 font-medium flex items-center gap-1">
              <HiOutlineExclamation className="w-3 h-3" />
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { state } = useAppContext();
  const cartItems = useSelector(selectCartItems);

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isListView = state.viewMode === "list";

  function handleAddToCart() {
    if (product.stock === 0) return;
    dispatch(addToCart(product));
    toast.success(`"${product.title}" added to cart`);
  }

  if (isListView) {
    return (
      <ListCard
        product={product}
        isInCart={isInCart}
        onAddToCart={handleAddToCart}
      />
    );
  }

  return (
    <GridCard
      product={product}
      isInCart={isInCart}
      onAddToCart={handleAddToCart}
    />
  );
}

export default memo(ProductCard);
