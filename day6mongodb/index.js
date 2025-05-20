const express = require("express");
const connection = require("./config/db");
const UserModel = require("./model/UserModel");
const port = 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get("/", (req, res) => {
  res.send("welcome database");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    await UserModel.create(req.body);

    res.send("user added successfully");
  } catch (error) {
    res.send(error);
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
