// Main application setup

import express from "express"; // Web framework for handling routes and requests.
import cors from "cors"; // Middleware for handling Cross-Origin Resource Sharing
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Frontend View Engine Ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

export default app;
