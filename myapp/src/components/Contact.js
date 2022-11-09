import React from "react";
import { useContext } from "react";
import userContext from "../context/userContext";
function Contact(props) {
  const { setUser } = useContext(userContext);

  return (
    <>
      <div
        className="contact-card m-3 flex items-center rounded-md p-3 transition-all hover:cursor-pointer hover:bg-[#dbcccc]"
        onClick={async () => {
          await setUser(props.contact.id);
        }}
        id={props.index}>
        <div className="dp">
          {props.contact.profilePic ? (
            <img
              className="logo h-9 w-9 rounded-3xl border-white"
              src={`data:image/jpeg;base64,${btoa(props.contact.profilePic)}`}
              alt="dp"
              loading="lazy"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="h-10 w-10">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
        <div className="user-name ml-3 h-12 w-[95%] ">
          <div className="name mr-1 flex justify-between text-xl">
            <div className="title">{props.contact.name}</div>
            <div className="time  mt-1 text-xs text-slate-500">
              {props.contact.date}
            </div>
          </div>
          <div className="message-piece-and-numbe mr-1 flex w-[100%] justify-between">
            <div className="msgPiece text-xs font-medium text-slate-500">
              {props.contact.phoneNumber}
            </div>
          </div>
          <hr className="my-2" />
        </div>
      </div>
    </>
  );
}

export default Contact;
