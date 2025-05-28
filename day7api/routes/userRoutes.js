const express = require("express");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/multer");
const UserModel = require("../models/UserModel");

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the User API",
  });
});

userRoutes.post(
  "/add",
  upload,
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("gender").notEmpty(),
    body("hobby").isArray({ min: 1 }),
    body("city").notEmpty(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { name, email, password, gender, hobby, city } = req.body;
    const file = req.file?.filename || "";
    try {
      const userData = new UserModel({
        name,
        email,
        password,
        gender,
        hobby,
        city,
        file,
      }); // create data in mongodb
      await userData.save();
      return res
        .status(201)
        .json({ success: true, message: "your data added " });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = userRoutes;
