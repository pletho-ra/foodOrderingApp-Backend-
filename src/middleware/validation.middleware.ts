import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationError = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  handleValidationError,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant name must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),

  body("deliveryPrice")
    .isFloat()
    .notEmpty()
    .withMessage("Delivery price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .notEmpty()
    .withMessage("Estimated delivery time must be a positive number"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines must not be empty"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name")
    .isString()
    .notEmpty()
    .withMessage("Menu item name must be a string"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("Menu item price must be a positive number"),
  handleValidationError,
];
