const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Connect Database
connectDB();

const app = express();

console.log("FRONTEND_URL =", process.env.FRONTEND_URL);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      process.env.FRONTEND_URL, // Vercel frontend
    ],
    credentials: true,
  })
);
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});