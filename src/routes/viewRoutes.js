import express from "express";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import { paginate } from "../utils/paginate.js";
import { setRequestUser } from "../middlewares/authMiddleware.js";

const router = express.Router();
let activePage = "home";

router.get("/", async (request, response, next) => {
  try {
    const products = paginate(await Product.find(), 1, process.env.PAGE_ITEMS);

    return response.render("layout", {
      pageTitle: "Home | Product Shop",
      template: "home",
      productData: products,
      activePage,
      pageScript: "home",
      token: request.session.token,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/p/:sku", async (request, response, next) => {
  try {
    const { sku } = request.params;
    const product = await Product.findOne({ sku });

    return response.render("layout", {
      pageTitle: `${product.name} | Product Shop`,
      template: "product",
      product,
      activePage: "product-detail",
      pageScript: null,
      token: request.session.token,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/login", (request, response, next) => {
  if (request.session.token) {
    response.redirect("/");
  } else {
    try {
      return response.render("layout", {
        pageTitle: "Login | Product Shop",
        template: "login",
        activePage: "login",
        pageScript: "login",
        token: request.session.token,
      });
    } catch (error) {
      return next(error);
    }
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
});

router.get("/register", (request, response, next) => {
  if (request.session.token) {
    response.redirect("/");
  } else {
    try {
      return response.render("layout", {
        pageTitle: "Register | Product Shop",
        template: "register",
        activePage: "register",
        pageScript: "register",
        token: request.session.token,
      });
    } catch (error) {
      return next(error);
    }
  }
});

router.get("/cart", async (request, response, next) => {
  if (!request.session.token) {
    response.redirect("/");
  } else {
    try {
      const user = setRequestUser(request.session.token);

      const cart = await Cart.findOne({
        username: user.username,
      });

      return response.render("layout", {
        pageTitle: "Cart | Product Shop",
        template: "cart",
        activePage: "cart",
        pageScript: "cart",
        token: request.session.token,
        cart: cart || { items: [], totalPrice: 0 },
        shippingCharges: process.env.SHIPPING_CHARGES,
      });
    } catch (error) {
      return next(error);
    }
  }
});

export default router;
