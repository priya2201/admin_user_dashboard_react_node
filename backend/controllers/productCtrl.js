const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const productModel = require("../models/productModel");
const expressAsyncHandler = require("express-async-handler");
const { Cursor } = require("mongoose");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.tile) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = async (req, res, next) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.json(updateProduct);
    console.log(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (ree, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json(deleteProduct);
    console.log(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
};

const getAProduct = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
};
const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(exxcludeFields);
    let queryStr = JSON.stringify(queryObj);
    console.log(queryStr);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr, "qs");
    let query = Product.find(JSON.parse(queryStr));
    console.log(query, "q");
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy, "s");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limit fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      console.log(fields);
      query = query.select(fields);
    }

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = (await query.skip(skip)).limit(limit);
    console.log(query, "q");
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("this page does not exist");
      }
      const product = await query;
      res.json(product);
      console.log(product);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishList = async (req, res) => {
  const { id } = req.user;
  const { prodId } = req.body;
  const user = await User.findOne({ _id: id });
  const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
  if (alreadyAdded) {
    let user = await User.findByIdAndUpdate(
      id,
      { $pull: { wishlist: prodId } },
      { new: true }
    );
    res.json(user);
  } else {
    let user = await User.findByIdAndUpdate(
      id,
      { $push: { wishlist: prodId } },
      { new: true }
    );
    res.json(user);
    console.log(user, "user");
  }
};

const rating = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    console.log(id.toString());
    let alreadyRated = product.ratings.find(
      (rating) =>
        rating.postedby && rating.postedby.toString() === id.toString()
    );

    console.log(alreadyRated, "al");
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: id,
            },
          },
        },
        {
          new: true,
        }
      );
      console.log(rateProduct, "re");
    }
    const getAllRatings = await Product.findById(prodId);
    console.log(getAllRatings);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, cur) => prev + cur, 0);
    console.log(ratingSum);
    let actualRating = Math.round(ratingSum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      { totalrating: actualRating },
      { new: true }
    );
    console.log(finalProduct);
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports = {
  createProduct,
  updateProduct,
  getAProduct,
  getAllProducts,
  addToWishList,
  rating,
  deleteProduct,
};
