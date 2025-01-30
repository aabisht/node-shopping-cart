import Product from "../models/product.js";

// Get list of all products
export const getProducts = async (request, response) => {
  try {
    const products = await Product.find();
    response.json(products);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get a product using SKU code
export const getProduct = async (request, response) => {
  try {
    const { sku } = request.body;

    if (!sku)
      return response
        .status(400)
        .json({ message: "SKU of a product is required." });

    const product = await Product.findOne({ sku });

    if (!product)
      return response
        .status(400)
        .json({ message: `Product with SKU: ${sku} not found.` });

    response.json(product);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// Add a New Product
export const addProduct = async (request, response) => {
  try {
    const { sku, name, image, price, description, stocks } = request.body;

    if (!sku)
      return response
        .status(400)
        .json({ message: "SKU of a product is required." });
    if (!name)
      return response
        .status(400)
        .json({ message: "Name of a product is required." });
    if (!image)
      return response
        .status(400)
        .json({ message: "Image of a product is required." });
    if (!price)
      return response
        .status(400)
        .json({ message: "Price of a product is required." });
    if (!stocks)
      return response
        .status(400)
        .json({ message: "Stocks of a product is required." });

    const product = await Product.findOne({ sku });

    if (!product)
      return response
        .status(400)
        .json({ message: `Product with SKU: ${sku} not found.` });

    const newProduct = new Product({
      sku,
      name,
      image,
      price,
      description,
      stocks,
    });

    await newProduct.save();
    response
      .status(201)
      .json({ message: "User registered successfully!", newProduct });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};
