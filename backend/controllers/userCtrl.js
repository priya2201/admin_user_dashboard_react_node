const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const { generateRefreshToken, generateToken } = require("../authenrtication");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validateMongoDbId = require("../utils/validateMongodbId");
const expressAsyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  console.log(req.body, "r");
  const findUser = await User.findOne({ email });
  console.log(findUser);
  if (!findUser) {
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  console.log(findUser);
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      { refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid  Credentials");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    throw new Error(" no Refresh oken in Cookies");
  }
  const refreshToken = cookies.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in db or no matched");
  jwt.verify(refreshToken, "secretme", (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    console.log(accessToken);
    res.json({ accessToken });
  });
};

//add user cart
// const userCart = asyncHandler(async (req, res) => {
//   const { cart } = req.body;
//   console.log(req.body);
//   const { id } = req.user;
//   console.log(req.user);
//   validateMongoDbId(id);
//   try {
//     let products = [];
//     const user = await User.findById(id);
//     console.log(user);
//     const alredyExistCart = await Cart.findOne({ orderBy: user._id });
//     if (alredyExistCart) {
//       alredyExistCart.remove();
//     }
//     for (let i = 0; i < cart.length; i++) {
//       let object = {};
//       (object.product = cart[i]._id),
//         (object.count = cart[i].count),
//         (object.color = cart[i].color);
//       let getPrice = await Product.findById(cart[i]._id).select("price").exec();
//       object.price = getPrice.price;
//       products.push(object);
//       console.log(products, "p");
//     }
//     let cartTotl = 0;
//     for (let i = 0; i < products.length; i++) {
//       cartTotl = cartTotl + products[i].price * products[i].count;
//     }
//     let newCart = new Cart({ products, cartTotl, orderBy: user?._id }).save();
//     await res.json(newCart);
//     console.log(newCart, "n");
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    let products = [];
    const user = await User.findById(id);
    // check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      console.log(object.count);
      let getPrice = await Product.findById(cart[i]._id)
        .select("price quantity")
        .exec();
      console.log(getPrice, "gg");
      object.price = getPrice.price;
      console.log(object.count <= getPrice.quantity);
      console.log(getPrice.quantity, "q");
      if (object.count >= getPrice.quantity) {
        throw new Error("Out of order");
      }
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user?._id,
    }).save();
    console.log(newCart);
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  try {
    const { coupon } = req.body;
    console.log(req.body);
    const { id } = req.user;
    console.log(req.user);
    validateMongoDbId(id);
    console.log("me");
    const validateCoupon = await Coupon.findOne({ name: coupon });
    console.log(validateCoupon);
    if (validateCoupon == null) {
      throw new Error("Invalid Coupon");
    }
    const user = await User.findOne({ _id: req.user.id });
    console.log(user);
    let { cartTotal } = await Cart.findOne({ orderBy: user._id }).populate(
      "products.product"
    );
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validateCoupon.discount) / 100
    ).toFixed(2);
    // 1800 - (1800 * 80) /100
    //1800-
    await Cart.findOneAndUpdate(
      { orderBy: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json(totalAfterDiscount);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = expressAsyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  console.log(req.body);
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    if (!COD) {
      throw new Error("Create Cash Order Failed");
    }
    const user = await User.findById({ _id: id });
    let userCart = await Cart.findOne({ orderBy: user._id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }
    console.log(finalAmount);
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        createdAt: Date.now(),
        currency: "ind",
      },
      orderBy: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    console.log(newOrder, "new order");

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    console.log(updated, "update");
    res.json({ message: "success" });
  } catch (error) {}
});
module.exports = {
  createUser,
  loginUserCtrl,
  loginAdmin,
  handleRefreshToken,
  userCart,
  applyCoupon,
  createOrder,
};
