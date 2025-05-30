const multer = require("multer");

const path = require("path")

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});
const upload = multer({ storage }).single("file");

module.exports = upload;
