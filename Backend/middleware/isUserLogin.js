const jwt = require("jsonwebtoken")

async function isUserLogin(req, res) {
     const auth = req.headers.cookie;
     if (auth) {
               const cookie = auth.split("=")[1]
               const isVarified = await jwt.verify(cookie, process.env.JWT_Secret_key);
               console.log(isVarified);
               if (!isVarified) {
                    res.status(401).json({
                         msg: "please login again something is wrong",
                         success: false
                    })
                    return;
               }
               res.status(200).json({
                    msg: "you are login",
                    success: true,
                    user : isVarified.email
               });
     } else {
          res.json({
               msg: "Bro you are noy login",
               success:false               
          })
          
     }
}

module.exports = isUserLogin;