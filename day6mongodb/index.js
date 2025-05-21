const express = require("express");
const connection = require("./config/db");
const UserModel = require("./models/UserModel");

const port = 8080;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {

  // let allUserData = UserModel.find({})
  res.render("Home");
});

app.post("/", async (req, res) => {
  try {
    await UserModel.create(req.body);
    return res.send("user added successfully");
  } catch (error) {
    return res.send(error);
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log("server is not running");
    return;
  }

  connection();
  console.log("server is running", port);
});
