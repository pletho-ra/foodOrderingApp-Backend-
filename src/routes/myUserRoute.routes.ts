import express from "express";
import myUserController from "../controllers/myUserController.controller";
import { jwtCheck, jwtParse } from "../middleware/auth.middleware";
import { validateMyUserRequest } from "../middleware/validation.middleware";

export const router = express.Router();

// /api/my/user
router.get("/", jwtCheck, jwtParse, myUserController.getCurrentUser); 
router.post("/", jwtCheck, myUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, myUserController.updateCurrentUser);
export default router;