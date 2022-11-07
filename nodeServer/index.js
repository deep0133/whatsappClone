const express = require("express");
const User = require("./models/User");
const AddContact = require("./models/AddNewContent");
const app = express();
const http = require("http").Server(app);
let io = require("socket.io");
const cors = require("cors");
const connectDB = require("./mongoose/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const s_key = process.env.S_KEY;
const port = process.env.PORT;
const Message = require("./models/message");
const fs = require("fs");

app.use(cors());
app.use(express.json());

connectDB();

const url = process.env.F_E_URL;

const server = http.listen(port, () => {
  console.log("server listening: on port : " + port);
});

io = io(server, {
  cors: {
    origin: url,
    methods: ["GET", "POST"],
  },
});

app.use(`/api/auth`, require("./routes/auth"));

// fetching admin:
const decode = async (token) => {
  try {
    const data = await jwt.verify(token, s_key);
    const admin = await User.findOne({ _id: data.userId });
    if (!admin) {
      return "false";
    }

    // Profile Pic : converting in binaryData:
    let img = admin.profilePic.length;
    let final_img = "";
    if (img > 0) {
      img = await fs.readFileSync("./" + admin.profilePic);
      let encode_img = await img.toString("base64");
      final_img = await new Buffer(encode_img, "base64");
    }

    const dta = {
      id: admin._id,
      name: admin.name,
      phoneNumber: admin.phoneNumber,
      profilePic: final_img,
      success: true,
    };
    return dta;
  } catch (err) {
    console.log("Error : " + err);
    return "false";
  }
};

// fetch ADMIN (user) by deconding token:
app.get("/api/auth/getAdmin", async (req, res) => {
  try {
    const token = await req.header("authToken");
    // calling decode function:
    const data = await decode(token);
    if (data !== "false") {
      return res.status(200).send(data);
    } else {
      return res.status(200).send({ error: "Please enter the valid token:" });
    }
  } catch (err) {
    res.send({ error: "Nothing found" });
  }
});

// io connection come:
io.on("connection", (socket) => {
  // join with self:
  socket.on("join_self", (data) => {
    socket.join(data);
  });

  // join with friend:
  socket.on("join_room", (data) => {
    socket.join(data.admin, data.friend);
  });

  // add new contact:
  socket.on("addContact", async (data) => {
    const token = data.token;
    // calling decode function:
    const adminId = await decode(token);

    if (adminId !== "false") {
      // check user add other number:  all validation check in frontend:
      // add new contact in mongoose:
      await AddContact.create({
        admin: adminId.id,
        name: data.name,
        phoneNumber: data.phoneNumber,
      });
    }
  });

  // send message socket event:
  socket.on("send", async (data) => {
    const token = await data.token;
    // calling decode function:
    const adminId = await decode(token);
    if (data !== "false") {
      const currentMessage = await Message.create({
        admin: adminId.id,
        senderNumber: data.senderNumber,
        recieverNumber: data.recieverNumber,
        message: data.message,
        date: data.date,
        profilePic: data.profilePic,
      });

      const reciverData = await User.findOne({
        phoneNumber: data.recieverNumber,
      });

      const addRecivermsg = await Message.create({
        admin: reciverData._id,
        senderNumber: data.senderNumber,
        recieverNumber: data.recieverNumber,
        message: data.message,
        date: data.date,
        profilePic: data.profilePic,
      });

      // send to others:
      io.to(currentMessage.recieverNumber).emit("recieve", currentMessage);
    }
  });

  // send message socket event:
  socket.on("deleteAllChat", async (data) => {
    const token = await data.token;
    // calling decode function:
    const adminId = await decode(token);
    if (data !== "false") {
      const deletedData = await Message.deleteMany({
        $or: [
          { admin: adminId.id, recieverNumber: data.recieverNumber },
          { admin: adminId.id, senderNumber: data.recieverNumber },
        ],
      });
      io.to(data.senderNumber).emit("deletedAll", deletedData);
    }
  });
});
