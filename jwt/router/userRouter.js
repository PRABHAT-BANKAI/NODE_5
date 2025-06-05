const express = require("express");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken")
userRouter.get("/all", async (req, res) => {
  const data = await UserModel.find({});

  res.status(200).json(data);
});

userRouter.post("/user-register", async (req, res) => {
  if (!req.body) {
    return res.status(401).json({
      message: "not responding",
    });
  }
  let { userName, email, password } = req.body;

  password = await bcrypt.hash(password, 10);
  await UserModel.insertOne({ userName, email, password });

  return res.status(201).json(req.body);
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;// destructure
  try {
    const user = await UserModel.findOne({ email });// it will return whole object email
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    if (await bcrypt.compare(password, user.password)) {


      let token = jwt.sign({ user },"jay", {// return token 3q4taeguakdggjkad3490ru9-apjo34w
        expiresIn: "2h",
      });
      res.status(200).json({
        message: "Login successfully",
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
