import { useEffect, useState } from "react";
import { Search, PackageSearch, AlertCircle, X } from "lucide-react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredProducts(products);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold">
          <span>Catalog</span>
          <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
          <span>{filteredProducts.length} Items</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Explore All Products
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          Search and discover top-rated electronics, clothing, books, and daily gear.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={handleSearch}
            className="
              w-full
              bg-white
              border
              border-zinc-200/80
              rounded-xl
              pl-11
              pr-10
              py-3
              text-sm
              text-zinc-900
              placeholder:text-zinc-400
              focus:outline-none
              focus:border-zinc-900
              shadow-2xs
              transition-all
            "
          />

          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1 rounded-md transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Products Grid / Skeleton / Empty State */}
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="h-80 bg-zinc-100 rounded-2xl border border-zinc-200/60 animate-pulse"
            ></div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-500 mx-auto flex items-center justify-center">
            <PackageSearch className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-zinc-900 text-base">No products found</h3>
          <p className="text-xs text-zinc-500">
            We couldn't find any products matching "{search}". Try searching for something else.
          </p>
          <button
            onClick={clearSearch}
            className="inline-block text-xs font-semibold text-zinc-900 underline hover:text-zinc-600 pt-1"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Products;