// Main application setup

import express from "express"; // Web framework for handling routes and requests.
import cors from "cors"; // Middleware for handling Cross-Origin Resource Sharing
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";
import session from "express-session";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("src/public")));

// Session setup for authentication
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/", viewRoutes);

// Frontend View Engine Ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

export default app;
