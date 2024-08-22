const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../model/model");
const bcrypt = require("bcrypt");

async function adminSignUp(req, res) {
  const { email, password } = req.body;
  const exitingUser = await Admin.findOne({ email });
  if (!exitingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      email,
      password: hashedPassword,
      admin: true,
    });
    res.json({ msg: "admin create successfully" });
  } else {
    res.status(400).json({
      message: "admin already exits",
    });
  }
}

async function adminSignIn(req, res) {
  const { email, password } = req.body;
  const searchedUser = await Admin.findOne({ email });
  console.log(searchedUser);
  if (
    searchedUser &&
    (await bcrypt.compare(password, searchedUser.password)) &&
    searchedUser.admin
  ) {
    const token = await jwt.sign(
      { email, password, admin: true },
      process.env.JWT_Secret_key
    );

    res.cookie("uid", token);
    res.status(200).json({
      token,
      msg: "login successfully",
      success: true,
    });
  } else {
    res.json({
      msg: "email or password is wrong ",
    });
  }
}

async function handleCreateCourse(req, res) {
  const { title, description, price, imgLink } = req.body;
  const course = await Course.create({
    title,
    description,
    price,
    imgLink,
  });

 const admin = await Admin.findOne({ email: req.email });
  if (admin) {
    admin.courses.push(course._id);
    await admin.save();
    res.status(200).json({
      message: "course create successfully",
      courseId: course._id,
    });
  } else {
    res.status(400).json({
      msg: "user not found",
    });
  }
}

async function handleshowCourses(req, res) {
  let courses = [];
  // Course.find().then(courses => {
  //      res.json({
  //           courses
  //      })
  // })
  const admin = await Admin.findOne({
    email: req.email,
  });
  console.log(admin);

  for (let courseId of admin.courses) {
    const course = await Course.findById(courseId);
    console.log(course);
    courses.push({ ...course._doc, published: true });
  }
  res.json({
    courses,
  });
}

module.exports = {
  adminSignUp,
  adminSignIn,
  handleCreateCourse,
  handleshowCourses,
};
