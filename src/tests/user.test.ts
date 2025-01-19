import request from "supertest";
import init from "../app";
import mongoose from "mongoose";
import User from "../models/user_model";

let app: any;

beforeAll(async () => {
  app = await init();
  await mongoose.connect(process.env.DATABASE_URL);
  await User.deleteMany(); // Clean up the database
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("User Registration and Login", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username", "testuser");
  });

  it("should not register a user with an existing email", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser2",
      email: "test@example.com",
      password: "password1234",
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe("User already exists");
  });

  it("should log in an existing user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });
});
