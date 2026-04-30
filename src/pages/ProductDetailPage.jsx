import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../store/cartSlice";
import { useProduct } from "../hooks/useProducts";
import toast from "react-hot-toast";
import {
  HiOutlineShoppingCart,
  HiOutlineArrowLeft,
  HiOutlineExclamationCircle,
  HiStar,
  HiOutlineStar,
  HiOutlinePlus,
  HiOutlineMinus,
  HiCheck,
  HiOutlineTag,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiOutlineChevronRight,
} from "react-icons/hi";

function StarRating({ rating, reviewCount }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.round(rating) ? (
              <HiStar className="w-5 h-5 text-amber-400" />
            ) : (
              <HiOutlineStar className="w-5 h-5 text-slate-300 dark:text-slate-600" />
            )}
          </span>
        ))}
      </div>
      <span className="font-semibold text-slate-700 dark:text-slate-300">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-slate-500 dark:text-slate-400 text-sm">
          ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}

function ImageGallery({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 aspect-square flex items-center justify-center">
        <img
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-primary-600 shadow-md"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary-400"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
      <div className="skeleton rounded-2xl aspect-square bg-slate-200 dark:bg-slate-700" />
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="skeleton h-8 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="skeleton h-4 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="skeleton h-4 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="skeleton h-4 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="skeleton h-10 w-32 rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="skeleton h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">
            {review.reviewerName}
          </p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s}>
                {s <= review.rating ? (
                  <HiStar className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <HiOutlineStar className="w-3.5 h-3.5 text-slate-300" />
                )}
              </span>
            ))}
          </div>
        </div>
        <span className="text-xs text-slate-400">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {review.comment}
      </p>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError, error } = useProduct(Number(id));

  const isInCart = cartItems.some((item) => item.id === Number(id));
  const cartItem = cartItems.find((item) => item.id === Number(id));

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`${quantity}x "${product.title}" added to cart`);
  }

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DetailSkeleton />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <HiOutlineExclamationCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Failed to load product
        </h2>
        <p className="text-slate-500 mb-6">{error?.message}</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mx-auto px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </main>
    );
  }

  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : null;

  const originalPrice = discount
    ? (product.price / (1 - discount / 100)).toFixed(2)
    : null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
        <Link
          to="/"
          className="hover:text-primary-600 dark:hover:text-primary-400"
        >
          Home
        </Link>
        <HiOutlineChevronRight className="w-3 h-3" />
        <span className="capitalize">{product.category}</span>
        <HiOutlineChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 font-medium line-clamp-1">
          {product.title}
        </span>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Images */}
        <ImageGallery
          images={product.images || [product.thumbnail]}
          title={product.title}
        />

        {/* Product Info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full capitalize">
              {product.category}
            </span>
            {product.brand && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                by <strong>{product.brand}</strong>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {product.title}
          </h1>

          <StarRating
            rating={product.rating}
            reviewCount={product.reviews?.length}
          />

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {discount && (
              <>
                <span className="text-lg text-slate-400 line-through">
                  ${originalPrice}
                </span>
                <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-lg">
                  -{discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                product.stock > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                product.stock > 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {product.stock > 0
                ? product.stock < 10
                  ? `Only ${product.stock} left in stock`
                  : `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </span>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                >
                  <HiOutlineTag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Cart Status */}
          {isInCart && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium">
              <HiCheck className="w-4 h-4" />
              {cartItem.quantity} already in your cart
              <Link to="/cart" className="ml-auto underline">
                View Cart
              </Link>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <HiOutlineMinus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-semibold text-slate-800 dark:text-slate-200">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <HiOutlinePlus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <HiOutlineShoppingCart className="w-5 h-5" />
                Add {quantity > 1 ? `${quantity}x` : ""} to Cart
              </button>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            {product.sku && (
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <HiOutlineTag className="w-3 h-3" />
                  SKU
                </p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {product.sku}
                </p>
              </div>
            )}
            {product.warrantyInformation && (
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <HiOutlineShieldCheck className="w-3 h-3" />
                  Warranty
                </p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {product.warrantyInformation}
                </p>
              </div>
            )}
            {product.shippingInformation && (
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <HiOutlineTruck className="w-3 h-3" />
                  Shipping
                </p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {product.shippingInformation}
                </p>
              </div>
            )}
            {product.returnPolicy && (
              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <HiOutlineRefresh className="w-3 h-3" />
                  Returns
                </p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {product.returnPolicy}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-5">
            Customer Reviews ({product.reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className="mt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
      </div>
    </main>
  );
}
