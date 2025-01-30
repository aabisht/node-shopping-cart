import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      require: [true, "Product sku code is required"],
      unique: [true, "Product sku code should be unique"],
    },
    name: { type: String, require: [true, "Product name is required"] },
    image: { type: String, require: [true, "Product image is required"] },
    price: { type: Number, require: [true, "Product price is required"] },
    description: { type: String },
    category: { type: String },
    stocks: {
      type: Number,
      require: [true, "Product stocks is required"],
      min: [0, "Product stocks cannot be in negative number"],
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
