const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, "secretme", { expiresIn: "1d" });
};

const generateRefreshToken = (id) => {
  console.log(id, "i");
  return jwt.sign({ id }, "secretme", { expiresIn: "3d" });
};
module.exports = { generateToken, generateRefreshToken };
