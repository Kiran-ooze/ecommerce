const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// All Cart Routes Require Login

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.put("/update", protect, updateCartQuantity);

router.delete("/:id", protect, removeFromCart);

router.delete("/clear", protect, clearCart);

module.exports = router;