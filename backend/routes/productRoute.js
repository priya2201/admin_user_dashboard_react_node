const express = require("express");
const {
  createProduct,
  getAProduct,
  addToWishList,
  rating,
  updateProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/productCtrl");
const { authentication, isAdmin } = require("../middlewares/authentication");

const router = express.Router();

router.post("/add", authentication, isAdmin, createProduct);
router.get("/:id", getAProduct);
router.put("/wishlist", authentication, addToWishList);
router.put("/rating", authentication, rating);

router.put("/:id", authentication, isAdmin, updateProduct);
router.delete("/:id", authentication, isAdmin, deleteProduct);

router.get("/", getAllProducts);

module.exports = router;
