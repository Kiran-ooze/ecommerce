
const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No products selected.",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required.",
      });
    }

    let totalAmount = 0;

    // Calculate total from database
    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock.`,
        });
      }

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      products,
      totalAmount,
      shippingAddress,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Place Cash on Delivery Order
const placeCODOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required.",
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty.",
      });
    }

    let totalAmount = 0;

    // Validate stock & calculate total
    for (const item of cart.products) {
      const product = item.product;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock.`,
        });
      }

      totalAmount += product.price * item.quantity;
    }

    // Create Order
    const order = await Order.create({
      user: req.user.id,
      products: cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
      shippingAddress,
      paymentMethod: "cod",
      paymentStatus: "pending",
      status: "pending",
    });

    // Reduce Stock
    for (const item of cart.products) {
      const product = item.product;

      product.stock -= item.quantity;
      product.sold += item.quantity;

      await product.save();
    }

    // Clear Cart
    cart.products = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).populate("products.product");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  placeCODOrder,
  getMyOrders,
  getAllOrders,
};