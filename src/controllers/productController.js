import Product from "../models/product.js";
import { paginate } from "../utils/paginate.js";

// Get list of all products
export const getProducts = async (request, response) => {
  try {
    const pageNumber = request.query.page || 1;
    const products = await Product.find();
    response
      .status(200)
      .json(paginate(products, pageNumber, process.env.PAGE_ITEMS));
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get a product using SKU code
export const getProduct = async (request, response) => {
  try {
    const { sku } = request.params;

    if (!sku)
      return response
        .status(400)
        .json({ message: "SKU of a product is required." });

    const product = await Product.findOne({ sku });

    if (!product)
      return response
        .status(400)
        .json({ message: `Product with SKU: ${sku} not found.` });

    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// Add a New Product
export const addProduct = async (request, response) => {
  try {
    const { sku, name, image, price, description, category, stocks } =
      request.body;

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

    if (product)
      return response
        .status(400)
        .json({ message: `Product with SKU: ${sku} already present.` });

    const newProduct = new Product({
      sku,
      name,
      image,
      price,
      description,
      category,
      stocks,
    });

    await newProduct.save();
    response
      .status(200)
      .json({ message: "Product added successfully!", newProduct });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};

// Update Product stocks
export const updateProductStocks = async (request, response) => {
  try {
    let { sku, stocks } = request.body;

    if (!sku)
      return response
        .status(400)
        .json({ message: "SKU of a product is required." });
    if (!stocks)
      return response
        .status(400)
        .json({ message: "Stocks of a product is required." });
    if (stocks < 0)
      return response
        .status(400)
        .json({ message: "Stocks of a product cannot be in negative." });

    const product = await Product.findOne({ sku });

    console.log(product);

    if (!product)
      return response
        .status(400)
        .json({ message: `Product with SKU: ${sku} not available.` });

    product.stocks = stocks;

    await product.save();

    response
      .status(200)
      .json({ message: "Product stock successfully updated", product });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error });
  }
};
