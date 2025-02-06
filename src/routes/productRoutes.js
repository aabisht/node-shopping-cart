import expres from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProductStocks,
} from "../controllers/productController.js";

const router = expres.Router();

// Get ALl products
router.get("/", getProducts);

// Get a product using a SKU id
router.get("/:sku", getProduct);

// Add a new product
router.post("/", addProduct);

// Update a product stock
router.put("/", updateProductStocks);

export default router;
