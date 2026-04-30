import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  clearCart,
} from "../store/cartSlice";
import CartItem from "../components/CartItem";
import toast from "react-hot-toast";
import {
  HiOutlineShoppingCart,
  HiOutlineShoppingBag,
  HiOutlineTrash,
  HiOutlineArrowLeft,
  HiOutlineCheck,
  HiOutlineTruck,
} from "react-icons/hi";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <HiOutlineShoppingCart className="w-20 h-20 text-slate-300 dark:text-slate-600 mb-6" />
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-3">
        Your cart is empty
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
        Looks like you haven&apos;t added anything yet. Start shopping to fill
        it up.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        <HiOutlineShoppingBag className="w-5 h-5" />
        Start Shopping
      </Link>
    </div>
  );
}

function OrderSummary({ totalItems, totalPrice, onClearCart, onCheckout }) {
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm sticky top-24">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
        Order Summary
      </h3>

      <div className="flex flex-col gap-3 mb-5">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>
            Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
          </span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <HiOutlineTruck className="w-4 h-4" />
            Shipping
          </span>
          <span
            className={`font-medium ${
              shipping === 0
                ? "text-green-500"
                : "text-slate-800 dark:text-slate-200"
            }`}
          >
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
            Add ${(50 - totalPrice).toFixed(2)} more for free shipping
          </p>
        )}
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>Tax (8%)</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 my-4" />

      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-slate-800 dark:text-white text-base">
          Total
        </span>
        <span className="font-bold text-xl text-primary-600 dark:text-primary-400">
          ${grandTotal.toFixed(2)}
        </span>
      </div>

      <button
        onClick={onCheckout}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all mb-3"
      >
        <HiOutlineCheck className="w-5 h-5" />
        Checkout Now
      </button>

      <Link
        to="/"
        className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-all"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Link>

      <button
        onClick={onClearCart}
        className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-colors"
      >
        <HiOutlineTrash className="w-4 h-4" />
        Clear Cart
      </button>
    </div>
  );
}

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  function handleClearCart() {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
      toast.success("Cart cleared");
    }
  }

  function handleCheckout() {
    toast.success("Order placed successfully! Thank you for shopping.");
    dispatch(clearCart());
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-3">
          <HiOutlineShoppingCart className="w-8 h-8" />
          Shopping Cart
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {totalItems > 0
            ? `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`
            : "Your cart is empty"}
        </p>
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              onClearCart={handleClearCart}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </main>
  );
}
