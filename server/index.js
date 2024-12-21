const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;
require("dotenv").config();

try {
  mongoose.connect(process.env.MONGODB_URL);
    console.log("ok")
} catch(error) {
  console.log(error);
}


app.listen(PORT, () => {
  console.log("localserver起動中");
});