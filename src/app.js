// Main application setup

import express from "express"; // Web framework for handling routes and requests.
import cors from "cors"; // Middleware for handling Cross-Origin Resource Sharing
import dotenv from "dotenv"; // To manage environment variables.
import mongoose from "mongoose"; // MongoDB ODM for database operations.
import path from "path";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Frontend View Engine Ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: true, // Automatically build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => console.log("MongoDB Connected."))
  .catch((err) => console.error("Database connection error:", err));

export default app;
