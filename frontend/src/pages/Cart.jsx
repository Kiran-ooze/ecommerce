import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import API from "../api/axios";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await API.get("/cart");
      setCart(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
  if (quantity < 1) return;

  try {
    await API.put("/cart/update", {
      productId,
      quantity,
    });

    fetchCart();
  } catch (err) {
    alert("Failed to update quantity");
  }
};

  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

 const checkout = () => {
  navigate("/checkout");
};

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
        <div className="h-8 bg-zinc-200 rounded-lg w-48 animate-pulse"></div>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-28 bg-zinc-100 rounded-2xl border border-zinc-200/60 animate-pulse"
              ></div>
            ))}
          </div>
          <div className="lg:col-span-4 h-64 bg-zinc-100 rounded-2xl border border-zinc-200/60 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-900">Unable to load cart</h2>
          <p className="text-xs text-zinc-500">{error}</p>
          <button
            onClick={fetchCart}
            className="inline-flex items-center gap-2 text-xs font-semibold bg-zinc-900 text-white px-4 py-2.5 rounded-xl shadow-xs hover:bg-zinc-800 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-500 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">Your cart is empty</h2>
          <p className="text-xs text-zinc-500">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold bg-zinc-900 text-white px-5 py-2.5 rounded-xl shadow-xs hover:bg-zinc-800 transition-all active:scale-95"
          >
            Browse Catalog
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const total = (cart.products || []).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight mt-1">
            Shopping Cart
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold self-start sm:self-auto">
          <span>{cart.products.length} {cart.products.length === 1 ? "Item" : "Items"}</span>
        </div>
      </div>

      {/* Main Cart Content Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-2xs divide-y divide-zinc-100">
          {(cart.products || []).map((item) => (
            <div
              key={item.product._id}
              className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product Thumbnail & Name */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image || "https://via.placeholder.com/100"}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl border border-zinc-200/60 object-cover bg-zinc-50 shrink-0"
                />

                <div className="space-y-1">
                  <h2 className="font-bold text-sm sm:text-base text-zinc-900 line-clamp-1">
                    {item.product.name}
                  </h2>
                  <p className="text-xs font-bold text-zinc-900">
                    ₹{item.product.price}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Remove Trigger */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                
                {/* Stepper */}
                <div className="flex items-center border border-zinc-200 rounded-xl p-1 bg-zinc-50">
                  <button
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity - 1)
                    }
                    className="w-7 h-7 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200/80 text-zinc-800 font-bold flex items-center justify-center transition-all disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-8 text-center font-bold text-xs text-zinc-900">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                    className="w-7 h-7 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200/80 text-zinc-800 font-bold flex items-center justify-center transition-all"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Remove Trash Trigger */}
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200/60 transition-all"
                  title="Remove Item"
                  aria-label="Remove item from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-2xs space-y-5 sticky top-24">
          <h2 className="font-bold text-base text-zinc-900 border-b border-zinc-100 pb-3 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs text-zinc-400 font-medium">INR</span>
          </h2>

          <div className="space-y-3 text-xs text-zinc-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-zinc-900">₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="font-semibold text-zinc-900">Calculated at checkout</span>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
            <span className="font-bold text-sm text-zinc-900">Total</span>
            <span className="text-xl font-extrabold text-zinc-900">₹{total}</span>
          </div>

          <button
            onClick={checkout}
            className="
              w-full
              bg-zinc-900
              hover:bg-zinc-800
              text-white
              font-semibold
              text-xs
              py-3.5
              px-4
              rounded-xl
              shadow-xs
              transition-all
              duration-150
              active:scale-[0.98]
              inline-flex
              items-center
              justify-center
              gap-2
            "
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
            <span>Secure 256-bit SSL checkout</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Cart;