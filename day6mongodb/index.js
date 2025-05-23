const express = require("express");
const connection = require("./config/db");
const UserModel = require("./models/UserModel");

const port = 8080;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let allUserData = await UserModel.find({});
    res.render("Home", { allUserData });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.post("/addData", async (req, res) => {
  try {
    await UserModel.create(req.body);
    console.log("user Added sucessfully");
    return res.redirect("/");
  } catch (error) {
    return res.send(error);
  }
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id; // _id oops private

  console.log(id);

  try {
    await UserModel.findByIdAndDelete(id );
    console.log("user Data deleted successfully");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}); //query

app.listen(port, (error) => {
  if (error) {
    console.log("server is not running");
    return;
  }

  connection();
  console.log("server is running", port);
});
