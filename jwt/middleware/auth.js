const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(req.body,"body");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let decoded =   jwt.verify(token.split(" ")[1], "jay"); /// ["Bearer","aelj23iuwefjoju0203jowe"]
    console.log(decoded)

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log(decoded.email + "     "+ req.body.email)
    if (decoded.user.email !== req.body.email) {
      return res.status(400).json({ message: "Invalid email" });
    }
    // console.log(decoded);
    let reqPassword = req.body.password;
    let userPassword = decoded.user.password;
    // console.log(reqPassword, userPassword);

    const checkPassword = await bcrypt.compare(reqPassword, userPassword);
    // console.log(checkPassword);
    if (!checkPassword) {
      return res.status(403).json({ message: "Invalid password" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = auth;
