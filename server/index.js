const express = require("express");
const mongoose = require("mongoose");
const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("./src/v1/models/user");
const app = express();
const PORT = 8080;
require("dotenv").config();

try {
  mongoose.connect(process.env.MONGODB_URL);
    console.log("ok")
} catch(error) {
  console.log(error);
}

app.post("/register", async (req, res) => {
  const password = req.body.password;

  try {
    //crypto
    req.body.password = CryptoJs.AES.encrypt(password, process.env.SECRET_KEY);
    //new user create
    const user = await User.create(req.body);
    //jwt
    const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {expiresIn: "24h",});
    return res.status(200).json({user, token});
  } catch(err) {
    return res.status(500).json(err);
  }
});


app.listen(PORT, () => {
  console.log("localserver起動中");
});