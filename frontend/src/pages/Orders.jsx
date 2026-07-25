import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PackageCheck,
  Calendar,
  ArrowRight,
  AlertCircle,
  ShoppingBag,
  Clock,
} from "lucide-react";
import API from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get("/orders");
      setOrders(response.data.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-6">
        <div className="h-8 bg-zinc-200 rounded-lg w-48 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-48 bg-zinc-100 rounded-2xl border border-zinc-200/60 animate-pulse"
            ></div>
          ))}
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
          <h2 className="text-lg font-bold text-zinc-900">
            Unable to load orders
          </h2>
          <p className="text-xs text-zinc-500">{error}</p>
          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 text-xs font-semibold bg-zinc-900 text-white px-4 py-2.5 rounded-xl shadow-xs hover:bg-zinc-800 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-500 mx-auto flex items-center justify-center">
            <PackageCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">No orders found</h2>
          <p className="text-xs text-zinc-500">
            You haven't placed any orders yet. Start exploring our store!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold bg-zinc-900 text-white px-5 py-2.5 rounded-xl shadow-xs hover:bg-zinc-800 transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Start Shopping
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            History
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight mt-1">
            My Orders
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-semibold self-start sm:self-auto">
          <span>
            {orders.length} Total {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-2xs hover:border-zinc-300 transition-all space-y-5"
          >
            {/* Top Order Metadata Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase">
                    Order ID:
                  </span>
                  <span className="font-mono text-xs font-semibold bg-zinc-100 border border-zinc-200/60 px-2 py-0.5 rounded-md text-zinc-800">
                    {order._id}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`
  inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border capitalize
  ${
    order.status === "delivered"
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : order.status === "cancelled"
        ? "bg-rose-50 border-rose-200 text-rose-700"
        : order.status === "shipped"
          ? "bg-blue-50 border-blue-200 text-blue-700"
          : "bg-amber-50 border-amber-200 text-amber-700"
  }
`}
                >
                  <Clock className="w-3 h-3" />
                  {order.status}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              {order.products.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={
                        item.product.image || "https://via.placeholder.com/80"
                      }
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl border border-zinc-200/60 object-cover bg-zinc-50 shrink-0"
                    />

                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Quantity:{" "}
                        <span className="font-semibold text-zinc-700">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-xs sm:text-sm text-zinc-900">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Bottom Total */}
            <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
              <span
                className={`text-xs font-semibold capitalize ${
                  order.paymentStatus === "paid"
                    ? "text-emerald-600"
                    : order.paymentStatus === "failed"
                      ? "text-rose-600"
                      : "text-amber-600"
                }`}
              >
                Payment {order.paymentStatus}
              </span>

              <div className="text-right">
                <span className="text-xs text-zinc-400 font-semibold block">
                  Total Amount
                </span>
                <span className="text-lg font-extrabold text-zinc-900">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
