import { useEffect, useState } from "react";
import { PlusCircle, Trash2, ShieldAlert, Plus, Package, CheckCircle2, AlertCircle } from "lucide-react";
import API from "../api/axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", product);

      setMessage("Product added successfully");
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });

      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);
      setMessage("Product deleted");
      fetchProducts();
    } catch (error) {
      setMessage("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        <div className="h-8 bg-zinc-200 rounded-lg w-56 animate-pulse"></div>
        <div className="h-64 bg-zinc-100 rounded-2xl border border-zinc-200/60 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Admin Console
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Inventory & Products Dashboard
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold self-start sm:self-auto">
          <Package className="w-3.5 h-3.5" />
          <span>{products.length} Products Online</span>
        </div>
      </div>

      {/* Message Notification Banner */}
      {message && (
        <div className="p-4 rounded-xl bg-zinc-900 text-white text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{message}</span>
          </div>
          <button
            onClick={() => setMessage("")}
            className="text-zinc-400 hover:text-white text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Add Product Section */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-4">
          <PlusCircle className="w-5 h-5 text-zinc-900" />
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
            Add New Product
          </h2>
        </div>

        <form onSubmit={addProduct} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Product Name *
            </label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Category *
            </label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Price (₹) *
            </label>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              placeholder="99.99"
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Stock Quantity
            </label>
            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              placeholder="50"
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Image URL
            </label>
            <input
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description and specifications..."
              className="
                w-full
                bg-zinc-50
                border
                border-zinc-200
                rounded-xl
                px-3.5
                py-2.5
                text-xs
                text-zinc-900
                placeholder:text-zinc-400
                focus:outline-none
                focus:bg-white
                focus:border-zinc-900
                transition-all
              "
              rows="3"
            />
          </div>

          <button
            type="submit"
            className="
              md:col-span-2
              bg-zinc-900
              hover:bg-zinc-800
              text-white
              font-semibold
              text-xs
              py-3
              px-4
              rounded-xl
              shadow-xs
              transition-all
              active:scale-[0.98]
              inline-flex
              items-center
              justify-center
              gap-2
              mt-2
            "
          >
            <Plus className="w-4 h-4" />
            Add Product to Inventory
          </button>
        </form>
      </div>

      {/* Product Management Inventory List */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
            Manage Existing Inventory
          </h2>
          <span className="text-xs font-semibold text-zinc-400">
            {products.length} Items Total
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-10 text-zinc-500 text-xs">
            No products found in database. Add your first product above.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="
                  group
                  bg-white
                  border
                  border-zinc-200/80
                  hover:border-zinc-300
                  rounded-xl
                  p-4
                  space-y-3
                  transition-all
                  shadow-2xs
                "
              >
                <div className="relative h-40 w-full overflow-hidden rounded-lg bg-zinc-100 border border-zinc-100">
                  <img
                    src={item.image || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.category && (
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs border border-zinc-200 text-zinc-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-zinc-900 line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-zinc-900">
                      ₹{item.price}
                    </span>
                    {item.stock && (
                      <span className="text-[11px] font-medium text-zinc-500">
                        Stock: {item.stock}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteProduct(item._id)}
                  className="
                    w-full
                    bg-rose-50
                    hover:bg-rose-100
                    text-rose-700
                    border
                    border-rose-200/60
                    font-semibold
                    text-xs
                    py-2
                    px-3
                    rounded-lg
                    transition-all
                    active:scale-95
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                  "
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Admin;