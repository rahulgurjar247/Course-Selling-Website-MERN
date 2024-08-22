const jsonwebtoken = require("jsonwebtoken");
const { Course, User } = require("../model/model");
const bcrypt = require("bcrypt");

async function userSignUp(req, res) {
  console.log("signup req ");
  console.table(req.body);

  const { email, password } = req.body.formdata;
  console.log(email, ":", password);

  const exitingUser = await User.findOne({ email });
  if (!exitingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
    });
    res.json({
      msg: "user Create successfully",
      success: true,
    });
  } else {
    if (await bcrypt.compare(password, exitingUser.password)) {
      res.json({
        msg: "user already exit ",
        success: true,
      });
      return;
    }
    res.json({
      msg: "user already exit but password is wrong ",
      success: false,
    });
  }
}

async function userSignIn(req, res) {
  const { email, password } = req.body.formdata;
  console.log(email, "-", password);

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = await jsonwebtoken.sign(
      { email, password },
      process.env.JWT_Secret_key
    );
    res.cookie("uid", token);
    res.status(200).json({
      token,
      msg: "login success",
      success: true,
    });
  } else {
    res.json({
      msg: "email or password is invalid",
      success: false,
    });
  }
}

function handleCourse(req, res) {
  Course.find().then((course) => {
    res.json({
      course,
    });
  });
}

async function handlePurchase(req, res) {
  const id = req.params.id;
  const course = await Course.findById(id);
  const user = await User.findOne({
    email: req.body.email,
  });
  const Exit = user.courses.includes(id);
  if (Exit) {
    res.json({
      msg: "You already purchase this course",
    });
    return;
  }
  user.courses.push(course._id);
  await user.save();
  res.json({
    msg: "bro you purchase successfully",
  });
}

async function handleShowPurchase(req, res) {
  console.log("purchase course request");
  const courses = [];
  userdata = await User.findOne({ email: req.body.email });

  for (let id of userdata.courses) {
    const course = await Course.findById(id);
    courses.push({ ...course._doc });
  }

  res.json({
    courses,
    success: true,
  });
}

module.exports = {
  userSignIn,
  userSignUp,
  handleCourse,
  handlePurchase,
  handleShowPurchase,
};
