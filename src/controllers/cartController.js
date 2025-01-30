import Cart from "../models/cart.js";
import Product from "../models/product.js";
import { io } from "../server.js";

const getTotalPrice = (items) => {
  return items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );
};

// Get User Cart
export const getCart = async (request, response) => {
  try {
    const cart = await Cart.findOne({
      username: request.user.username,
    }).populate("items.product");

    response.json(cart || { items: [], totalPrice: 0 });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// Add Item to Cart
export const addToCart = async (request, response) => {
  try {
    const { productSKU, quantity } = request.body;

    // Check for the cart linked to user.
    let cart = await Cart.findOne({ user: request.user.username });
    if (!cart) {
      cart = new Cart({
        user: request.user.username,
        items: [],
        totalPrice: 0,
      });
    }

    // Check if product is available in our database
    const product = await Product.findOne({ sku: productSKU });
    if (!product) response.status(404).json({ message: "Product not found" });

    // Check for existing item
    const existingItem = cart.items.find(
      (item) => item.productSKU === productSKU,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productSKU, quantity });
    }

    // Calcuate total price of products in cart
    cart.totalPrice = getTotalPrice(cart.items);

    await cart.save();

    // Emit cart update to all connected clients
    io.emit("cartUpdated", cart);

    response.json(cart);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// Update Cart Item Quantity
export const updateCart = async (request, response) => {
  try {
    const { quantity } = request.body;
    const cart = await Cart.findOne({ user: request.user.username });

    const item = cart.items.find(
      (item) => item.productSKU === request.params.productSKU,
    );

    if (!item)
      return response.status(404).json({ message: "Item not found in cart!" });

    item.quantity = quantity;

    cart.totalPrice = getTotalPrice(cart.items);
    await cart.save();

    // Emit cart update to all connected clients
    io.emit("cartUpdated", cart);

    response.json(cart);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

//  Remove Item from Cart
export const removeFromCart = async (request, response) => {
  try {
    const cart = await Cart.findOne({ user: request.user.username });

    cart.items = cart.items.filter(
      (item) => item.productSKU === request.params.productSKU,
    );
    cart.totalPrice = getTotalPrice(cart.items);

    await cart.save();

    // Emit cart update to all connected clients
    io.emit("cartUpdated", cart);

    response.json(cart);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};
