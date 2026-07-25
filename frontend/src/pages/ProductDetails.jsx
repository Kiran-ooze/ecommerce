import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Plus, Minus, ShieldCheck, Truck, AlertCircle } from "lucide-react";
import API from "../api/axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await API.post("/cart/add", {
        productId: product._id,
        quantity,
      });

      console.log(response.data);
      alert("Product added to cart");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
        "Failed to add product to cart"
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-2xs grid md:grid-cols-2 gap-10 animate-pulse">
          <div className="h-96 bg-zinc-100 rounded-2xl"></div>
          <div className="space-y-6 justify-center flex flex-col">
            <div className="h-6 bg-zinc-100 rounded-lg w-1/3"></div>
            <div className="h-10 bg-zinc-100 rounded-lg w-3/4"></div>
            <div className="h-8 bg-zinc-100 rounded-lg w-1/4"></div>
            <div className="h-20 bg-zinc-100 rounded-lg w-full"></div>
            <div className="h-12 bg-zinc-100 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900">Unable to load product</h2>
          <p className="text-xs text-zinc-500">{error || "Product not found."}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold bg-zinc-900 text-white px-4 py-2.5 rounded-xl shadow-xs hover:bg-zinc-800 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
      
      {/* Back Button Link */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 px-3.5 py-2 rounded-xl shadow-2xs transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Products
        </Link>
      </div>

      {/* Main Product Details Card */}
      <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-10 shadow-2xs grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Product Image Container */}
        <div className="relative bg-zinc-50 border border-zinc-200/60 rounded-2xl overflow-hidden flex items-center justify-center p-4">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full h-80 sm:h-96 object-cover rounded-xl shadow-xs"
          />
        </div>

        {/* Product Info & Actions */}
        <div className="space-y-6">
          
          <div>
            {product.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold uppercase tracking-wider mb-3">
                {product.category}
              </span>
            )}
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-zinc-900">
                ₹{product.price}
              </span>
              <span className="text-xs text-zinc-400 font-medium">INR</span>
            </div>
          </div>

          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed border-t border-b border-zinc-100 py-5">
            {product.description}
          </p>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-4 pt-2">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Select Quantity
              </span>

              {/* Quantity Stepper */}
              <div className="flex items-center border border-zinc-200 rounded-xl p-1 bg-zinc-50">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200/80 text-zinc-800 font-bold flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-white"
                  aria-label="Decrease Quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="w-12 text-center font-bold text-sm text-zinc-900">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200/80 text-zinc-800 font-bold flex items-center justify-center transition-all"
                  aria-label="Increase Quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className="
                w-full
                bg-zinc-900
                hover:bg-zinc-800
                text-white
                font-semibold
                text-sm
                py-3.5
                px-6
                rounded-xl
                shadow-xs
                transition-all
                duration-150
                active:scale-[0.98]
                inline-flex
                items-center
                justify-center
                gap-2.5
              "
            >
              <ShoppingBag className="w-4 h-4" />
              Add To Cart (₹{(product.price * quantity).toFixed(2)})
            </button>

          </div>

          {/* Micro Trust Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-zinc-700" />
              <span>Fast 24-48h Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-700" />
              <span>Verified Guarantee</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;