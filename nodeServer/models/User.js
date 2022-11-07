const mongoose = require("mongoose");
const { Schema } = mongoose;

   //   name*   
   //   profilePic
   //   phoneNumber*
   //   password*
   //   date(defaut)
   //   automatically _id generated:
   
const Userschema = new Schema({
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
    require:true 
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().getHours()+":"+new Date().getMinutes(),
  },
});

const User = mongoose.model("user", Userschema);
module.exports = User;
