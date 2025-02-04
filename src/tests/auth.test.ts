import request from "supertest";
import init from "../app";
import mongoose from "mongoose";
import { App } from "supertest/types";
import User from "../models/user_model";

type TestUser = {
  username: string;
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
};

const user: TestUser = {
  username: "username",
  email: "test@test.com",
  password: "1234567",
};

let app: App;
beforeAll(async () => {
  app = await init();
  console.log("Before all");
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Register Tests", () => {
  test("Register", async () => {
    const res = await request(app).post("/auth/register").send(user);
    expect(res.statusCode).toEqual(200);
  });

  test("Login", async () => {
    const res = await request(app).post("/auth/login").send(user);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    user.accessToken = res.body.accessToken;
    user.refreshToken = res.body.refreshToken;
  });

  test("Middleware", async () => {
    const res = await request(app).get("/user").send();
    expect(res.statusCode).not.toEqual(200);

    const res2 = await request(app)
      .get("/user")
      .set("Authorization", "Bearer " + user.accessToken)
      .send();
    expect(res2.statusCode).toEqual(200);

    await request(app)
      .post("/post")
      .set("Authorization", "Bearer " + user.accessToken)
      .send({
        title: "Post Title",
        message: "Post Content",
        owner: "12345",
      });
    expect(res2.statusCode).toEqual(200);
  });

  jest.setTimeout(10000);

  test("Refresh Token", async () => {
    await new Promise((r) => setTimeout(r, 6000));
    const res = await request(app)
      .get("/user")
      .set("Authorization", "Bearer " + user.accessToken)
      .send();
    expect(res.statusCode).not.toEqual(200);

    const res2 = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + user.refreshToken)
      .send();
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toHaveProperty("accessToken");
    expect(res2.body).toHaveProperty("refreshToken");
    user.accessToken = res2.body.accessToken;
    user.refreshToken = res2.body.refreshToken;

    const res3 = await request(app)
      .get("/user")
      .set("Authorization", "Bearer " + user.accessToken)
      .send();
    expect(res3.statusCode).toEqual(200);
  });

  test("Refresh Token hacked", async () => {
    const res = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + user.refreshToken)
      .send();
    expect(res.statusCode).toEqual(200);
    const newRefreshToken = res.body.refreshToken;
    const res2 = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + user.refreshToken)
      .send();
    expect(res2.statusCode).not.toEqual(200);
    const res3 = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + newRefreshToken)
      .send();
    expect(res3.statusCode).not.toEqual(200);
  });

  test("Logout", async () => {
    const res = await request(app).post("/auth/login").send(user);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    user.accessToken = res.body.accessToken;
    user.refreshToken = res.body.refreshToken;

    const res2 = await request(app)
      .get("/auth/logout")
      .set("Authorization", "Bearer " + user.refreshToken)
      .send();
    expect(res2.statusCode).toEqual(200);

    const res3 = await request(app)
      .get("/auth/refresh")
      .set("Authorization", "Bearer " + user.refreshToken)
      .send();
    expect(res3.statusCode).not.toEqual(200);
  });
});
