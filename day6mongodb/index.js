const express = require("express");
const connection = require("./config/db");
const UserModel = require("./models/UserModel");
const isAuth = require("./middleware/isAuth");
const upload = require("./middleware/multer");
const path = require("path");
const port = 8080;
const app = express();

app.set("view engine", "ejs");

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //middleware

// app.use(isAuth);

app.get("/", async (req, res) => {
  try {
    let allUserData = await UserModel.find({});
    res.render("Home", { allUserData });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.post("/addData", upload, async (req, res) => {
  try {
    console.log(req.file);
    if (req.file) {
      req.body.image = "./uploads" + "/" + req.file.filename;
    }

    await UserModel.create(req.body);
    console.log("user Added sucessfully");
    return res.redirect("/");
  } catch (error) {
    return res.send(error);
  }
});

app.get("/delete/", async (req, res) => {// query
  // const id = req.params.id; // _id oops private
  const id = req.query.id

  console.log(id);

  try {
    await UserModel.findByIdAndDelete(id);
    console.log("user Data deleted successfully");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}); //query

app.get("/edit/:id", isAuth, async (req, res) => {
  const id = req.params.id;

  try {
    const userData = await UserModel.findById(id);
    // console.log(userData);
    res.render("edit", { userData });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.post("/updateData", async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.body.id, req.body);
    console.log("you user Data updated successfully");
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
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
