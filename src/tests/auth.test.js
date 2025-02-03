import { connectTestDB, closeTestDB } from "./setup";
import request from "supertest";
import app from "../app.js"; // Import Express app

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

let token;

describe("User Authentication", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      firstName: "User",
      lastName: " 2",
      username: "user2",
      email: "user2@example.com",
      password: "passw0rd",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should not register a new user if user exist", async () => {
    const res = await request(app).post("/api/auth/register").send({
      firstName: "User",
      lastName: " 2",
      username: "user2",
      email: "user2@example.com",
      password: "passw0rd",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should login existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "user2",
      password: "passw0rd",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should not login with incorrect username or password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "user2",
      password: "password",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
