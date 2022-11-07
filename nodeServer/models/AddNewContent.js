const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");

//   name(required)   profilePic(not nessary)   phoneNumber(required)   date(defaut) ::  automatically _id generated:
const newContactSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `User`,
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
    required: true,
  },
  date: {
    type: String,
    default: new Date().getHours() + ":" + new Date().getMinutes(),
  },
});

const AddContent = mongoose.model("newContact", newContactSchema);
module.exports = AddContent;
