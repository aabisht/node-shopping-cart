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
        quantity: {
          type: Number,
          require: [true, "Quantity is required"],
          min: [1, "Quantity cannot be less than 1"],
        },
        product: {
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
