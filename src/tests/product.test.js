import { connectTestDB, closeTestDB } from "./setup.js";
import request from "supertest";
import app from "../app.js"; // Import Express app

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

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

describe("Product", () => {
  it("should add a produt", async () => {
    const res = await request(app).post("/api/products").send(productData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should not add a produt with same sku", async () => {
    const res = await request(app).post("/api/products").send(productData);

    expect(res.statusCode).toBe(400);
  });

  it("should give a list of poducts in paginated way", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("items");
  });

  it("should give a poducts based on SKU", async () => {
    const res = await request(app).get(`/api/products/${productData.sku}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name");
  });
});
