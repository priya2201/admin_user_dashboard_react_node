const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/admin_dashboard"
    );
    console.log("mongodb connect");
  } catch (error) {
    console.log("error of database connection");
  }
};

module.exports = dbConnect;
