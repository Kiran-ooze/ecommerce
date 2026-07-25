import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Award, ShoppingBag } from "lucide-react";

import API from "../api/axios";
import useAuth from "../hooks/useAuth";
import ProductCard from "../components/ProductCard";

function Home() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data.slice(0, 6));
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-20">
      
      {/* SaaS Style Hero Section */}
      <section className="relative rounded-3xl bg-white border border-zinc-200/80 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-sm">
        
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60"></div>

        <div className="relative z-10 max-w-3xl space-y-6 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>Next-Gen Online Shopping</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
            Everything you need, <br />
            <span className="text-zinc-400">delivered straight to you.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-600 text-base sm:text-lg max-w-xl leading-relaxed">
            Discover premium electronics, fashion, and everyday essentials curated for maximum quality and speed.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="
                inline-flex
                items-center
                gap-2
                bg-zinc-900
                hover:bg-zinc-800
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                text-sm
                shadow-sm
                transition-all
                active:scale-95
              "
            >
              <ShoppingBag className="w-4 h-4" />
              Explore Products
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products"
              className="
                inline-flex
                items-center
                gap-2
                bg-zinc-100
                hover:bg-zinc-200/80
                text-zinc-800
                border
                border-zinc-200
                px-6
                py-3
                rounded-xl
                font-semibold
                text-sm
                transition-all
                active:scale-95
              "
            >
              Browse Catalog
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Products Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200/80 pb-5">
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
              Featured Products
            </h2>
          </div>

          <Link
            to="/products"
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-zinc-700
              hover:text-zinc-900
              bg-white
              hover:bg-zinc-100
              border
              border-zinc-200
              px-4
              py-2
              rounded-lg
              shadow-2xs
              transition-all
            "
          >
            View All Products
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div 
                key={n} 
                className="h-80 bg-zinc-100 rounded-2xl border border-zinc-200/60 animate-pulse"
              ></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 shadow-2xs">
            No products available at the moment.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Minimal Feature Highlights Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-zinc-200/80 rounded-2xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">Express Delivery</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Fast and reliable door-to-door delivery with real-time package tracking.
          </p>
        </div>

        <div className="p-6 bg-white border border-zinc-200/80 rounded-2xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">Encrypted Checkout</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            End-to-end payment encryption ensuring maximum security for every order.
          </p>
        </div>

        <div className="p-6 bg-white border border-zinc-200/80 rounded-2xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">Verified Quality</h3>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Every product in our store is hand-tested and backed by guaranteed customer satisfaction.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;