const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = res.cookie("jwt");
  if (token) {
    jwt.verify(token, "token", async (err, decodedToken) => {
      if (err) {
        res.json({ ststus: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          res.json({ status: true, user: user.email });
        } else {
          res.json({ ststus: false });
          next();
        }
      }
    });
  } else {
    res.json({ ststus: false });
    next();
  }
};
