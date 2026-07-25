import API from "./axios";

// Place Cash on Delivery Order
export const placeCODOrder = async (shippingAddress) => {
  const response = await API.post("/orders/cod", {
    shippingAddress,
  });

  return response.data;
};