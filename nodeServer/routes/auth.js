const User = require("../models/User");
const Message = require("../models/message");
const Newcontacts = require("../models/AddNewContent");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const s_key = process.env.S_KEY;

const multer = require("multer");
const fs = require("fs");

router.post("/", (req, res) => {
  res.send("API Running Fine :" + s_key);
});

// SET STORAGE FOR IMAGE:   STORE IMAGE IN FOLDER
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

//Route 1 :  creating ADMIN using : Post "/api/auth/createUser"     ==> without login
router.post("/createUser", upload.single("file"), async (req, res) => {
  try {
    // if there are errors return bad request and errors:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }

    // check : user exit with this Number or not.  => by  findOne function:
    let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "Sorry user with this number is alredy exit:",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const secPass = bcrypt.hashSync(req.body.password, salt);

    // create new user now and save it in data base:
    user = await User.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: secPass,
      profilePic: req.file.path,
    });

    const authToken = jwt.sign({ userId: user.id }, s_key);
    res.json({ success: true, authToken });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

//Route 1 :  Lognin using : Post "/api/auth/createUser"     ==> without login
router.post(
  "/login",
  [
    body("phoneNumber", "Enter the valid phone number:").isLength({
      min: 10,
      max: 10,
    }),
    body("password", "Enter the valid password:").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // if there are errors return bad request and errors:
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array() });
      }

      // check : user exit with this Number or not.  => by  findOne function:
      let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
      if (!user) {
        return res.status(400).json({
          success: false,
          error: "you number not exits:",
        });
      }

      const compareToPassword = await bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!compareToPassword) {
        return res.status(400).json({
          success: false,
          error: "Sorry please enter the correct informaiton:",
        });
      }

      const authToken = await jwt.sign({ userId: user._id }, s_key);
      res.json({
        success: true,
        authToken: authToken,
        name: user.name,
        progilePic: "",
      });
    } catch (err) {
      res.status(500).send({ success: false, error: err });
    }
  }
);

//Router 3 : fetch all channels(added friend):
router.get("/getContact", async (req, res) => {
  const token = req.header("authToken");

  if (!token) {
    return res.status(404).send({ error: "Please enter the valid token:" });
  }

  try {
    const data = await jwt.verify(token, s_key);
    req.user = data.userId;
  } catch (error) {
    return res.status(401).send({ error: "Please enter the valid token:" });
  }

  // check : user exit with this email or not.  => findOne  function match all email of document with given email.
  let contacts = await Newcontacts.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "phoneNumber",
        foreignField: "phoneNumber",
        as: "profile",
      },
    },
  ]);

  contacts = contacts.map((ele) => {
    if (ele && ele.admin == req.user) {
      // Profile Pic : converting in binaryData:
      let img;
      let final_img = "";
      if (ele.profile.length > 0) {
        img = ele.profile[0].profilePic;
        img = fs.readFileSync("./" + img);
        let encode_img = img.toString("base64");
        final_img = new Buffer(encode_img, "base64");
      }

      return {
        _id: ele._id,
        admin: ele.admin,
        name: ele.name,
        profilePic: final_img,
        phoneNumber: ele.phoneNumber,
        date: ele.date,
      };
    }
  });

  if (contacts == null || contacts.length == 0) {
    return res.json([]);
  } else {
    return res.send(contacts);
  }
});

//Router : 5 ==> Get Message :
router.get("/getMessages", async (req, res) => {
  // fetch admin _id
  const token = req.header("authToken");
  if (!token) {
    return res.status(404).send({ error: "Please enter the valid token:" });
  }

  try {
    const id = await jwt.verify(token, s_key);
    req.user = id.userId;
    const currentUser = await User.findOne({ _id: req.user });
    req.recieverNumber = currentUser.phoneNumber;
  } catch (error) {
    return res.status(401).send({ error: "Please enter the valid token:" });
    s;
  }

  try {
    let messages = await Message.find({
      $or: [
        { admin: req.user, recieverNumber: req.recieverNumber },
        { admin: req.user, senderNumber: req.recieverNumber },
      ],
    }).select("-_id");
    if (messages == null || messages.length == 0) {
      res.send([]);
    } else {
      return res.send(messages);
    }
  } catch (error) {
    res.send({ error: "Try Again" });
  }
});

module.exports = router;
