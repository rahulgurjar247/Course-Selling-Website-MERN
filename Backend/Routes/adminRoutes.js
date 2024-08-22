const express = require("express");
const { adminSignUp, adminSignIn, handleshowCourses, handleCreateCourse } = require("../controller/adminControllar");
const isAdminLogin = require("../middleware/isAdminLogin");
const isAdmin = require("../middleware/isAdmin")


const adminRoutes = express.Router();
adminRoutes.route("/signup").post(adminSignUp);

adminRoutes.route("/signin").post(adminSignIn);

adminRoutes.route("/courses").get(handleshowCourses);

adminRoutes.route("/courses").post(isAdmin,handleCreateCourse);

adminRoutes.route("/authentication").post(isAdminLogin);


module.exports = adminRoutes;
