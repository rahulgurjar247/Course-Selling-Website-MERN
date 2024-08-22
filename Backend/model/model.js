const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    }
  ],
});

const AdminSchema = new mongoose.Schema({
  email: {
    type: String ,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  admin : Boolean
  ,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
});

const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  imgLink : String
});

const User = mongoose.model("users", userSchema);
const Admin = mongoose.model("admins", AdminSchema);
const Course = mongoose.model("courses", courseSchema);

module.exports = {
  User,
  Admin,
  Course,
};
