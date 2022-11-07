const mongoose = require("mongoose");
const { Schema } = mongoose;
//   phoneNumber*  :  sender
//   phoneNumber*  :  reciever
//   message       :  "hello i am sender"
//   time*
//   profilePic
//   automatically _id generated:

const MessageSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `User`,
  },

  senderNumber: { type: Number },
  recieverNumber: {
    type: Number,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: new Date().getHours() + ":" + new Date().getMinutes(),
  },
});

const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
