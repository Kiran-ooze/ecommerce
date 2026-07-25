import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, ArrowLeft } from "lucide-react";
import {
  createPaymentOrder,
  verifyPayment,
  getRazorpayKey,
} from "../api/paymentApi";

function Checkout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shippingAddress: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handlePayment = async () => {
  if (!formData.shippingAddress.trim()) {
    alert("Please enter your shipping address.");
    return;
  }

  try {
    setLoading(true);

    // Get Razorpay Public Key
    const { key } = await getRazorpayKey();

    // Create Order
    const data = await createPaymentOrder({
      shippingAddress: formData.shippingAddress,
    });

    const options = {
      key,
      amount: data.razorpayOrder.amount,
      currency: data.razorpayOrder.currency,
      name: "Your Store",
      description: "Order Payment",
      order_id: data.razorpayOrder.id,

      handler: async function (response) {
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: data.orderId,
          });

          navigate("/payment-success");
        } catch (error) {
          console.error(error);
          navigate("/payment-failed");
        }
      },

      prefill: {
        name: "",
        email: "",
      },

      theme: {
        color: "#18181b",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function () {
      navigate("/payment-failed");
    });

    razorpay.open();
  } catch (error) {
    alert(error.response?.data?.message || "Unable to initiate payment.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-extrabold text-zinc-900 mt-4">Checkout</h1>

        <p className="text-sm text-zinc-500 mt-2">
          Enter your delivery address and continue to payment.
        </p>
      </div>

      {/* Shipping Address */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-zinc-700" />
          <h2 className="font-bold text-lg">Shipping Address</h2>
        </div>

        <textarea
          name="shippingAddress"
          rows="5"
          placeholder="Enter your complete shipping address..."
          value={formData.shippingAddress}
          onChange={handleChange}
          className="
            w-full
            border
            border-zinc-300
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-zinc-900
            resize-none
          "
        />
      </div>

      {/* Payment */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-zinc-700" />
          <h2 className="font-bold text-lg">Payment</h2>
        </div>

        <div className="border rounded-xl p-4 bg-zinc-50">
          <p className="font-semibold">Razorpay</p>

          <p className="text-sm text-zinc-500 mt-1">
            Pay securely using UPI, Cards, Net Banking, or Wallets.
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="
            w-full
            bg-zinc-900
            hover:bg-zinc-800
            text-white
            py-3.5
            rounded-xl
            font-semibold
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
