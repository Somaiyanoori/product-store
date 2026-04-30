import { memo } from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import toast from "react-hot-toast";
import { HiOutlineTrash, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

function CartItem({ item }) {
  const dispatch = useDispatch();

  function handleIncrease() {
    dispatch(increaseQuantity(item.id));
  }

  function handleDecrease() {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item.id));
      toast.error(`"${item.title}" removed from cart`);
    } else {
      dispatch(decreaseQuantity(item.id));
    }
  }

  function handleRemove() {
    dispatch(removeFromCart(item.id));
    toast.error(`"${item.title}" removed from cart`);
  }

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in">
      {/* Image */}
      <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-2">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
              {item.category}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
            title="Remove item"
            aria-label="Remove item from cart"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              aria-label="Decrease quantity"
            >
              <HiOutlineMinus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center font-semibold text-sm text-slate-800 dark:text-slate-200">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              aria-label="Increase quantity"
            >
              <HiOutlinePlus className="w-3 h-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              ${itemTotal}
            </span>
            {item.quantity > 1 && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ${item.price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CartItem);
