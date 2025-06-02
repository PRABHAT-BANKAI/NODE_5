const express = require("express");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const cors = require("cors")

const app = express();

app.use(cors())


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);

app.listen(8082, (error) => {
  if (error) {
    console.log("Server not running", error);
    return;
  }
  // Database connection
  connection();
  console.log("Server running on port 8082");
});
