import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import cloudinary from "cloudinary";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res.status(409).json({ message: "Restaurant already exists" });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadRespnse = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = new Restaurant({
      ...req.body,
      imageUrl: uploadRespnse.url,
      user: req.userId,
      lastUpdated: new Date(),
    });

    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " Error creating Restaurant" });
  }
};

export default {
  createMyRestaurant,
};
