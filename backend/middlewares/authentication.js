const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const user = req.user;
  console.log(user);
  const isAdmin = await User.findById(user.id);
  if (!isAdmin) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log(isAdmin);
  if (isAdmin.role == "admin") {
    next();
  }
  //   console.log("You are not an Admin, You can't access the route");
  //   return res
  //     .status(404)
  //     .json({ message: "You are not an Admin, You can't access the route" });
});

const authentication = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "Not Authorized, no token" });
  }
  jwt.verify(token, "secretme", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token verification failed, authorization denied" });
    }

    req.user = decoded;
    console.log(req.user, "req");
    next();
  });
});
module.exports = { isAdmin, authentication };
