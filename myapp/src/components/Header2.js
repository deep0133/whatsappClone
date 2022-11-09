import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/userContext";
export default function Header() {
  const { selectedChat, deleteAllMessage } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);
  const mouserEnterShowMenu = () => {
    setShowMenu(true);
  };
  const mouserLeaveShowMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className="rounded-tr-md bg-[#f0f2f5] p-1">
        <div className="header flex items-center justify-between px-2">
          <div className="friend-dp friend-name flex items-center justify-center space-x-3">
            <div></div>
            {selectedChat.profilePic ? (
              <img
                className="logo h-9 w-9 rounded-3xl border-white"
                alt="dp"
                src={`data:image/jpeg;base64,${btoa(selectedChat.profilePic)}`}
                loading="lazy"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-8 w-8">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}

            <div>
              <h1 className="text-lg">{selectedChat.name}</h1>
              <div className="last-seen text-xs font-[400] text-slate-500">
                last seen today at 12:00
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-7">
            <span
              data-testid="search-alt"
              data-icon="search-alt"
              className="p-0">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path>
              </svg>
            </span>

            <span
              onMouseEnter={mouserEnterShowMenu}
              onMouseLeave={mouserLeaveShowMenu}
              className="relative z-50 hover:cursor-pointer"
              data-testid="menu"
              data-icon="menu">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
              </svg>
              <div className="absolute top-[22px] right-[8px]">
                <ul
                  className={`menu-item ${
                    showMenu ? "block" : "hidden"
                  } my-3 space-x-3 space-y-3 rounded bg-white py-1`}>
                  <li
                    onClick={deleteAllMessage}
                    className="my-2 w-28 px-3 hover:cursor-pointer">
                    Clear Chat
                  </li>
                </ul>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
