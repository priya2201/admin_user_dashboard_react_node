const express = require("express");

const { authentication, isAdmin } = require("../middlewares/authentication");
const { createCoupon } = require("../controllers/couponCtrl");

const router = express.Router();
router.post("/add", authentication, isAdmin, createCoupon);
module.exports = router;
