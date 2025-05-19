const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let record = [];

app.get("/", (req, res) => {
  res.render("home", { record });
});

app.post("/adddata", (req, res) => {
  console.log(req.body);
  const { userName, age } = req.body; // destructuring

  if (userName === "" || age == "") {
    console.log("invalid credetial");
    res.redirect("/");
  }

  record.push(req.body);
  console.log("data added succesfully");
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  // console.log(req.params);
  record = record.filter((item, index) => index != req.params.id);

  res.redirect("/");
});
app.get("/edit/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let storeData = record[req.params.id]; // [11,22,33,44,55] arr[2]

  res.render("edit", { storeData, id });
});

app.post("/updateData", (req, res) => {
  let { id, userName, age } = req.body;
  console.log(req.body);

  console.log(id, userName, age);

  record[id] = { userName, age };
  res.redirect("/");
});

app.listen(port, (error) => {
  if (error) {
    console.log("server is not running");
  }

  console.log("server is running", port);
});
