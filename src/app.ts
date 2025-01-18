import express, { Express } from "express";
const app = express();
import env from "dotenv";
env.config();

import mongoose from "mongoose";
import bodyParser from "body-parser";

const init = () => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("connected to database"));
    mongoose
      .connect(
        process.env.DATABASE_URL || "mongodb://localhost:27017/NutriNet-backend"
      )
      .then(() => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        resolve(app);
      });
  });
  return promise;
};

export default init;
