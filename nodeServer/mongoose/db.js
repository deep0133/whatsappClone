const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  const url = process.env.DB_STRING
  // console.log("connected with db:" + url);
  return await mongoose.connect(url);
}

module.exports = connectDB;
