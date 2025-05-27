const express = require("express");

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the User API",
  });
});

userRoutes.post("/register", (req, res) => {
  res.json({
    message: "User registration successful",
    userData: req.body.userName,
  });
});

module.exports = userRoutes;
