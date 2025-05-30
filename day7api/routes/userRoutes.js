const express = require("express");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/multer");
const UserModel = require("../models/UserModel");

const userRoutes = express.Router();



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



userRoutes.get("/all", async (req, res) => {
  const { search, sortBy = "createdAt", sortOrder = "desc" } = req.query;//{ sortOrder,sortBy ,search}
  console.log(sortOrder)

  let filter = {};
  if (search) {
    filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
  }

  try {
    const users = await UserModel.find(filter).sort({
      [sortBy]: sortOrder === "asc" ? 1 : -1,//{email:-1}
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


userRoutes.delete("/delete", async (req, res) => {
  const { id } = req.query;
  
  if (!id) return res.status(400).json({ error: "ID is required" });
console.log(id)
  try {
    const result = await UserModel.findByIdAndDelete(id);
    console.log(result)
    if (!result) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, deletedUser: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRoutes;
