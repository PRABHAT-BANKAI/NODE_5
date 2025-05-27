const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/mernJay");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
  }
};
module.exports = connection;