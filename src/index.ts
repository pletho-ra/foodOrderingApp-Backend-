import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute.routes";
import myRestaurantRoute from "./routes/myRestaurantRoute.routes";
import { v2 as cloudinary } from "cloudinary";
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to the mongo_db database"));

const app = express();
app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health is ok!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

app.listen(7000, () => {
  console.log(" Server is running on the port : 7000");
});
