const express = require("express");
const {
  createUser,
  loginUserCtrl,
  loginAdmin,
  handleRefreshToken,
  userCart,
  applyCoupon,
  createOrder,
} = require("../controllers/userCtrl");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/refresh", handleRefreshToken);
router.post("/userCart", authentication, userCart);
router.post("/cart/applycoupon", authentication, applyCoupon);
router.post("/order", authentication, createOrder);
module.exports = router;
