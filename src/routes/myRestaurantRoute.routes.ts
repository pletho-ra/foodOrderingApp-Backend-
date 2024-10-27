import express from "express";
import multer from "multer";
import myRestaurantController from "../controllers/myRestaurantController.controller";
import { jwtCheck, jwtParse } from "../middleware/auth.middleware";
import { validateMyRestaurantRequest } from "../middleware/validation.middleware";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

// /api/my/Restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  myRestaurantController.createMyRestaurant
);

export default router;
