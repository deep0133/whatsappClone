import React from "react";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import UserContext from "./userContext";
var CryptoJS = require("crypto-js");

export default function UserState(props) {
  const socket_url = process.env.REACT_APP_SOCKET_URL;
  const socket = io.connect(socket_url, {
    transports: ["websocket"],
  });
  const [selectedChat, setSelectedChat] = useState({
    name: "",
    profilePic: "",
    phoneNumber: "",
    time: "",
  });
  const [display, setDisplay] = useState({
    showContact: "hidden",
    showChat: "hidden",
  });
  const [admin, setAdmin] = useState({
    name: "",
    phoneNumber: "",
    dp: "",
    password: "",
    success: false,
  });
  const [loginShow, setLoginShow] = useState({
    display: "hidden",
    login: false,
  });

  const [contactList, setContactList] = useState([]);
  const [showAddContactForm, setShowAddContactForm] = useState("hidden");
  const [allMessage, setAllMessage] = useState([]);
  const [newFriend, setNewFriend] = useState({
    name: "",
    phoneNumber: "",
    success: false,
  });

  const [recieveMsg, setRecieveMsg] = useState(false);
  const cryptKey = process.env.REACT_APP_MESSAGE_CRYPT_KEY;

  // if user successfully register or login :  then fetch all contacts and messages:
  useEffect(() => {
    if (loginShow.login) {
      socket.emit("join_self", { admin: admin.phoneNumber });
      fetchData();
    }
  }, [loginShow.login]);

  // new contact added
  useEffect(async () => {
    if (newFriend.success) {
      setContactList(contactList.concat(newFriend));
      setNewFriend({
        name: newFriend.name,
        phoneNumber: newFriend.phoneNumber,
        profilePic: "",
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        success: false,
      });

      socket.emit("addContact", newFriend);
      setNewFriend({ success: false });
    }
  }, [newFriend]);

  // join a room:
  useEffect(() => {
    socket.emit("join_room", {
      admin: admin.phoneNumber,
      friend: selectedChat.phoneNumber,
    });
  }, [selectedChat]);

  // fetch contacts and messages:
  async function fetchData() {
    const urlContact = process.env.REACT_APP_ADMIN_CONTACT;
    const urlMessage = process.env.REACT_APP_ADMIN_MESSAGE;

    const authToken = await JSON.parse(localStorage.getItem(`token`));
    // API Call:   get all added contacts:
    let response = await fetch(urlContact, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    });

    let json = await response.json();

    json = await json.map((ele) => {
      if (ele) {
        // file Binary Data: converting
        const pic = ele.profilePic.data;
        let binary = "";
        let bytes = new Uint8Array(pic);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        return {
          id: ele._id,
          admin: ele.admin,
          name: ele.name,
          profilePic: binary,
          phoneNumber: ele.phoneNumber,
          date: ele.date,
        };
      }
    });

    setContactList(json);
    // API Call:   get all pre messages:
    let getAllMessage = await fetch(urlMessage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    });

    let msg = await getAllMessage.json();
    let msgArray = [];

    msg.forEach((element) => {
      // Decrypt
      var bytes = CryptoJS.AES.decrypt(element.message, cryptKey);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      const msgFormat = {
        senderNumber: element.senderNumber,
        recieverNumber: element.recieverNumber,
        message: decryptedData,
        date: element.date,
        profilePic: element.profilePic,
      };
      msgArray.push(msgFormat);
    });

    setAllMessage(msgArray);
  }

  // send message:
  const sendMessage = async (ciphertext, msg) => {
    const time = new Date().getHours() + ":" + new Date().getMinutes();
    const msgFormat = {
      senderNumber: admin.phoneNumber,
      recieverNumber: selectedChat.phoneNumber,
      message: msg,
      date: time,
      profilePic: "",
    };

    await setAllMessage([...allMessage, msgFormat]);

    const data = {
      senderNumber: admin.phoneNumber,
      recieverNumber: selectedChat.phoneNumber,
      message: ciphertext,
      date: time,
      token: await JSON.parse(localStorage.getItem("token")),
      profilePic: "",
    };

    socket.emit("send", data);
  };

  // recieve message:
  socket.on("recieve", (data) => {
    setRecieveMsg(data);
  });

  useEffect(() => {
    if (recieveMsg) {
      // Decrypt
      var bytes = CryptoJS.AES.decrypt(recieveMsg.message, cryptKey);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      const msgFormat = {
        senderNumber: recieveMsg.senderNumber,
        recieverNumber: recieveMsg.recieverNumber,
        message: decryptedData,
        date: recieveMsg.date,
        profilePic: recieveMsg.profilePic,
      };

      setAllMessage([...allMessage, msgFormat]);
      setRecieveMsg(false);
    }
  }, [recieveMsg]);

  // Select new chat:
  const setUser = async (id) => {
    for (let index = 0; index < contactList.length; index++) {
      const element = contactList[index];

      if (element && element.id === id) {
        setSelectedChat({
          phoneNumber: element.phoneNumber,
          name: element.name,
          profilePic: element.profilePic,
        });
        setDisplay({ showChat: "flex" });
        break;
      }
    }
  };

  // Delete all messages of specific chat:
  const deleteAllMessage = () => {
    const data = {
      recieverNumber: selectedChat.phoneNumber,
      senderNumber: admin.phoneNumber,
      token: JSON.parse(localStorage.getItem("token")),
    };
    socket.emit("deleteAllChat", data);
    fetchData();
  };

  return (
    <UserContext.Provider
      value={{
        loginShow,
        display,
        setDisplay,
        showAddContactForm,
        setShowAddContactForm,
        admin,
        setAdmin,
        setLoginShow,
        newFriend,
        setNewFriend,
        contactList,
        setUser,
        setContactList,
        selectedChat,
        setSelectedChat,
        allMessage,
        sendMessage,
        deleteAllMessage,
      }}>
      {props.children}
    </UserContext.Provider>
  );
}
