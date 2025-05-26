const isAuth = (req, res, next) => {
  if (false) {
    next();
  } else {
    res.send("unauthoraized");
  }
};

module.exports = isAuth;
