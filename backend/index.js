import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config()

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

try {
  mongoose.connect(MONGO_URL);
  console.log("connected to MONGODB");
} catch {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
