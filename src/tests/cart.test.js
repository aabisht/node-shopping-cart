import request from "supertest";
import app from "../app.js";
import { connectTestDB, closeTestDB } from "./setup.js";
import { server, io } from "../server.js";

let token;
let productSKU;
let cartItemId;

const productData = {
  sku: "29872457",
  name: "Nike - Air Force 1 '07 Next Nature Women's Shoes",
  image:
    "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/29872457/2024/6/1/1df5da55-5cb5-421d-a112-411153ab30e71717226811380NikeAirForce107NextNatureWomensShoes1.jpg",
  price: 8195,
  description:
    "The radiance lives on in the Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best: crisp materials, bold colours and the perfect amount of flash to make you shine.",
  category: "footwear",
  stocks: 10,
};

beforeAll(async () => {
  await connectTestDB();

  // Register and login a test user
  await request(app).post("/api/auth/register").send({
    firstName: "Jane",
    lastName: "Doe",
    username: "jane",
    email: "jane@example.com",
    password: "password123",
  });

  const userRes = await request(app).post("/api/auth/login").send({
    username: "jane",
    password: "password123",
  });

  token = userRes.body.token;

  // Add a test product
  const productRes = await request(app).post("/api/products").send(productData);

  productSKU = productRes.body.newProduct.sku;
});

afterAll(async () => {
  await closeTestDB();

  if (io) io.close();
  if (server && server.close) {
    server.close(() => console.log("Server closed"));
  }
});

describe("Cart Management", () => {
  it("should add a product to the cart", async () => {
    const res = await request(app)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ productSKU, quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBe(1);
    expect(res.body.items[0].quantity).toBe(2);
  });

  it("should get cart detail for a user", async () => {
    await request(app)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ productSKU, quantity: 1 });

    const res = await request(app)
      .get("/api/cart/")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("should update cart for a user", async () => {
    await request(app)
      .post("/api/cart/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ productSKU, quantity: 1 });

    const res = await request(app)
      .put(`/api/cart/update/${productSKU}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
  });
});
