const mongoose = require("mongoose");
const User = require("./User");
const { Schema } = mongoose;

//   admin*
//   name*
//   profilePic    (fetch from user Model)
//   phoneNumber*
//   date(defaut)
//   automatically _id generated:

const Userschema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `user`,
  },

  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  date: {
    type: String,
    default: new Date().getHours() + ":" + new Date().getMinutes(),
  },
});

const User = mongoose.model("user", Userschema);
module.exports = User;
