import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-sm p-8 text-center space-y-6">

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">
            Payment Successful
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Thank you! Your payment has been received and your order has been placed successfully.
          </p>
        </div>

        {/* Success Message */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-sm font-medium text-emerald-700">
            Your order is now being processed.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">

          <Link
            to="/orders"
            className="w-full inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 rounded-xl transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            View My Orders
          </Link>

          <Link
            to="/products"
            className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-semibold py-3 rounded-xl transition-all"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </div>
    </div>
  );
}

export default PaymentSuccess;