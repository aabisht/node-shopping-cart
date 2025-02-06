import express from "express";
import { authMiddlewareAPI } from "../middlewares/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Get Cart (authMiddlewareAPIed Route)
router.get("/", authMiddlewareAPI, getCart);

// Add Item to Cart
router.post("/add", authMiddlewareAPI, addToCart);

// Update Cart Item
router.put("/update/:productSKU", authMiddlewareAPI, updateCart);

// Remove Item from Cart
router.delete("/remove/:productSKU", authMiddlewareAPI, removeFromCart);

export default router;
