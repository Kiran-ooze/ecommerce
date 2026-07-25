import API from "./axios";

// Create Razorpay Order
export const createPaymentOrder = async (data) => {
  const response = await API.post("/payment/create-order", data);

  return response.data;
};

// Verify Razorpay Payment
export const verifyPayment = async (paymentData) => {
  const response = await API.post("/payment/verify", paymentData);

  return response.data;
};

// Get Razorpay Public Key
export const getRazorpayKey = async () => {
  const response = await API.get("/payment/key");

  return response.data;
};