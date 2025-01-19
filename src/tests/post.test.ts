import request from "supertest";
import init from "../App"; // Adjust the path as needed
import mongoose from "mongoose";
import { App } from "supertest/types";
import User from "../models/user_model";
import Post from "../models/post_model"; // Import your Post model

let app: App;
let user: { accessToken: string; refreshToken: string };

// This will create a new user before each test
const createUser = async () => {
  const userData = {
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  };
  await User.deleteMany(); // Clean up the database
  await request(app).post("/auth/register").send(userData);
  const res = await request(app).post("/auth/login").send(userData);
  user = {
    accessToken: res.body.accessToken,
    refreshToken: res.body.refreshToken,
  };
};

beforeAll(async () => {
  app = await init();
  await mongoose.connect(process.env.DATABASE_URL);
  await createUser(); // Create a user for testing
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Post Controller Tests", () => {
  test("Create a new post", async () => {
    const res = await request(app)
      .post("/post")
      .set("Authorization", "Bearer " + user.accessToken)
      .send({
        text: "This is a test post",
        image: "test-image-url.jpg",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("text", "This is a test post");
  });

  test("Get all posts", async () => {
    const res = await request(app)
      .get("/post")
      .set("Authorization", "Bearer " + user.accessToken);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Get a specific post", async () => {
    // First, create a post to retrieve it later
    const postCreationRes = await request(app)
      .post("/post")
      .set("Authorization", "Bearer " + user.accessToken)
      .send({
        text: "Post to be retrieved",
        image: "another-test-image.jpg",
      });
    const postId = postCreationRes.body._id; // Get the ID of the created post

    const res = await request(app)
      .get(`/post/${postId}`)
      .set("Authorization", "Bearer " + user.accessToken);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("text", "Post to be retrieved");
  });

  test("Update a post", async () => {
    // Create a post to update it later
    const postCreationRes = await request(app)
      .post("/post")
      .set("Authorization", "Bearer " + user.accessToken)
      .send({
        text: "Post to be updated",
        image: "update-image.jpg",
      });
    const postId = postCreationRes.body._id; // Get the ID of the created post

    const res = await request(app)
      .put("/post")
      .set("Authorization", "Bearer " + user.accessToken)
      .send({
        _id: postId,
        text: "Updated post text",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("text", "Updated post text");
  });

  test("Delete a post", async () => {
    // Create a post to delete it later
    const postCreationRes = await request(app)
      .post("/post")
      .set("Authorization", "Bearer " + user.accessToken)
      .send({
        text: "Post to be deleted",
        image: "delete-image.jpg",
      });
    const postId = postCreationRes.body._id; // Get the ID of the created post

    const res = await request(app)
      .delete(`/post`)
      .set("Authorization", "Bearer " + user.accessToken)
      .send({
        _id: postId,
      });
    expect(res.statusCode).toEqual(200);
  });
});
