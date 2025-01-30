import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cartController";

const router = express.Router();

// Get Cart (Protected Route)
router.get("/", protect, getCart);

// Add Item to Cart
router.post("/add", protect, addToCart);

// Update Cart Item
router.put("/update/:productSKU", protect, updateCart);

// Remove Item from Cart
router.delete("/remove/:productSKU", protect, removeFromCart);

export default router;
