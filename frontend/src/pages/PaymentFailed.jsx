import { XCircle, RefreshCcw, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function PaymentFailed() {
  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm p-8 text-center space-y-6">

        {/* Failed Icon */}
        <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto">
          <XCircle className="w-9 h-9 text-rose-600" />
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">
            Payment Failed
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            We couldn't complete your payment. No worries—you can try again or return to your cart.
          </p>
        </div>

        {/* Error Message */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <p className="text-sm font-medium text-rose-700">
            Your order has not been confirmed.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">

          <Link
            to="/checkout"
            className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 rounded-xl transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            Retry Payment
          </Link>

          <Link
            to="/cart"
            className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-semibold py-3 rounded-xl transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            Back to Cart
          </Link>

        </div>

      </div>
    </div>
  );
}

export default PaymentFailed;