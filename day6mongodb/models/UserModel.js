const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  // email: {
  //   type: String,
  //   require: true,
  // },
  // password: {
  //   type: String,
  //   require: true,
  // },
  // gender: {
  //   type: String,
  //   require: true,
  // },
  // city: {
  //   type: String,
  //   require: true,
  // },
  // imagePath: {
  //   type: String,
  //   require: true,
  // },
});

const UserModel = mongoose.model("smit", userSchema);

module.exports = UserModel;
