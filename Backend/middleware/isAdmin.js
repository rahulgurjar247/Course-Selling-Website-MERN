const jwt = require("jsonwebtoken");
const { Admin } = require("../model/model");

async function isAdmin(req, res, next) {
  const auth = req.headers.cookie;

  if (auth) {
    const cookie = auth.split("=")[1];
    const isVarified = await jwt.verify(cookie, process.env.JWT_Secret_key);
    console.log(isVarified);
    if (!isVarified || !isVarified.admin) {
      res.status(401).json({
        msg: "please login again something is wrong",
        success: false,
      });
      return;
    } else {
      req.email = isVarified.email 
      next();
    }
  } else {
    res.json({
      msg: "Bro you are not login",
      success: false,
    });
       return
  }
}

module.exports = isAdmin;
