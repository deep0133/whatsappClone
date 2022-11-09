import React, { useEffect } from "react";
import Picker from "emoji-picker-react";
import CryptoJS from "crypto-js";
import { useState, useContext } from "react";
import UserContext from "../context/userContext";

export default function Body2() {
  const { admin, selectedChat, allMessage, sendMessage } =
    useContext(UserContext);

  const [currentMessage, setCurrentMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(true);

  const cryptKey = process.env.REACT_APP_MESSAGE_CRYPT_KEY;

  const Encrypting = () => {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(currentMessage),
      cryptKey
    ).toString();

    sendMessage(ciphertext, currentMessage);
    setCurrentMessage("");
  };

  const onEmojiClick = (event, emojiObject) => {
    setCurrentMessage(currentMessage + emojiObject.emoji);
  };

  return (
    <div className="">
      {/* <ScrollToBottom>    */}
      <div
        className="relative h-[84vh] space-y-1 overflow-y-auto  bg-[#efeae2] lg:h-[77vh]"
        id="chatBox">
        <div></div>

        {/* SEND MESSAGES ::::  RECIEVE MESSAGES  ::::  ARE HERE */}
        {allMessage.length === 0
          ? ""
          : allMessage.map((ele, index) => {
              if (
                (ele.senderNumber === selectedChat.phoneNumber &&
                  ele.recieverNumber === admin.phoneNumber) ||
                (ele.senderNumber === admin.phoneNumber &&
                  ele.recieverNumber === selectedChat.phoneNumber)
              ) {
                return (
                  <div
                    key={index}
                    className={`relative ${
                      ele.senderNumber === admin.phoneNumber
                        ? "float-right bg-[#d9fdd3]"
                        : "float-left bg-white"
                    } clear-both  mx-5  mt-1 max-w-[75%] rounded-xl px-3 py-2`}>
                    <p className="text-xs">
                      {ele.senderNumber !== admin.phoneNumber
                        ? ele.senderNumber
                        : admin.phoneNumber}
                    </p>
                    <div className="msg pr-2 pb-3 text-sm">
                      {ele.message}
                      <p className="absolute bottom-1 right-2 text-xs text-slate-400">
                        {ele.date}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
      </div>
      {/* </ScrollToBottom> */}

      <div className="message relative  bottom-0 mb-2 flex h-[8vh] items-center justify-between rounded-br-md bg-[#f0f2f5] p-2 lg:h-[7vh]">
        {showEmoji ? (
          ""
        ) : (
          <div className="absolute bottom-[50px] left-0">
            {" "}
            <Picker
              onEmojiClick={onEmojiClick}
              pickerStyle={{ width: "350px" }}
            />{" "}
          </div>
        )}
        <span
          data-testid="smiley"
          data-icon="smiley"
          className=" hover:text-yellow-500"
          onClick={() => {
            setShowEmoji(showEmoji === true ? false : true);
          }}>
          <svg viewBox="0 0 24 24" width="24" height="24" className="font-thin">
            <path
              fill="currentColor"
              d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path>
          </svg>
        </span>

        <input
          type="text"
          className="border-1  w-[85%] rounded-xl border-black px-3 py-2"
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          placeholder="Type a message"
        />

        <button
          type="button"
          disabled={currentMessage === "" ? true : false}
          onClick={() => {
            Encrypting();
            // setCurrentMessage("");
          }}
          className="mx-2 inline-block rounded-full bg-green-500 px-6 py-2.5 text-xs font-medium leading-tight text-gray-700 shadow-md transition duration-150 ease-in-out hover:cursor-pointer hover:bg-gray-800 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg">
          Send
        </button>
      </div>
    </div>
  );
}
