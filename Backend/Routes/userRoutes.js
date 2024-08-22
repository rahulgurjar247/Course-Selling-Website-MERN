const express = require("express");
const { userSignIn, userSignUp, handleCourse, handlePurchase, handleShowPurchase } = require("../controller/userControllar");
const isUserLogin = require("../middleware/isUserLogin");

const userRoutes = express.Router()

userRoutes.route("/signup").post(userSignUp)

userRoutes.route("/signin").post(userSignIn);

userRoutes.route("/courses").get(handleCourse);

userRoutes.route("/courses/:id").post(handlePurchase);

userRoutes.route("/purchased").post(handleShowPurchase);

userRoutes.route("/authentication").post(isUserLogin);




module.exports  = userRoutes