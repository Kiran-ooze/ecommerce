const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// User Routes

router.post("/", protect, createOrder);

router.get("/", protect, getMyOrders);

// Cancel Order (User)
router.put("/cancel/:id", protect, (req, res) => {
  res.json({
    message: "Cancel order feature coming soon.",
  });
});

// Admin Routes

router.get("/all", protect, admin, getAllOrders);

// Update Order Status (Admin)
router.put("/status/:id", protect, admin, (req, res) => {
  res.json({
    message: "Update order status feature coming soon.",
  });
});

module.exports = router;