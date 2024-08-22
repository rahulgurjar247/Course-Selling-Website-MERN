const express = require('express');
const connectToMongo = require('./model/connectMongo');
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require('./Routes/adminRoutes');
const cors = require("cors");
const bodyParser = require('body-parser');

connectToMongo(process.env.mongo_url).then(() => {
  console.log("connect to mongoDb");  
}).catch(() => {
  console.log("mongo connection error")
})

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors(
  {
    origin: true,
    credentials: true
  }
))
app.use(bodyParser.json())

app.use("/admin",adminRoutes)
app.use("/users", userRoutes)

app.listen(port, () => {
    console.log(`server start at ${"localhost:"+port}`);
})