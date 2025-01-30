import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      ref: "User",
      required: [true, "Username is required"],
    },
    items: [
      {
        productSKU: {
          type: String,
          ref: "Product",
          required: [true, "Product sku code is required"],
        },
        quantity: {
          type: Number,
          require: [true, "Quantity is required"],
          min: [1, "Quantity cannot be less than 1"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
