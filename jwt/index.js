const express = require("express");
const connection = require("./config/db");
const userRouter = require("./router/userRouter");
const auth = require("./middleware/auth");

const app = express();
const port = 8081;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.use(auth);

app.get("/product", (req, res) => {
  res.send("product data");
});

app.listen(port, (err) => {
  if (err) {
    console.log("server is not running");
    return;
  }

  connection();
  console.log("server is  running");
});
