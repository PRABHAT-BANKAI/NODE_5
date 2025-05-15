const express = require("express");
const app = express();
const port = 8081;

app.set("view engine", "ejs");

let userData = {
  userName: "superman",
  age: "11",
  city: "america",
};

app.get("/", (req, res) => {
  res.render("home", { userData });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/features", (req, res) => {
  res.render("features");
});

app.listen(port, (error) => {
  if (error) {
    console.log("server  is not connected");
    return;
  }

  console.log("server is connected", port);
});
