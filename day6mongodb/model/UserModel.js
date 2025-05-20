const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
});

const UserModel = mongoose.model("smit", userSchema);

module.exports = UserModel;
