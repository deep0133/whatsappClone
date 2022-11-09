import React, { useState } from "react";
import { useContext } from "react";
import userContext from "../context/userContext";
export default function Header() {
  const {
    admin,
    setAdmin,
    setDisplay,
    setLoginShow,
    setShowAddContactForm,
    showAddContactForm,
  } = useContext(userContext);
  const [clickThreeDot, setClickThreeDot] = useState("hidden");

  const showMenu = () => {
    const show =
      clickThreeDot !== "hidden"
        ? setClickThreeDot("hidden")
        : setClickThreeDot("block");
  };

  const makeGroup = () => {
    console.log("make Group clicked");
  };

  const logOut = () => {
    localStorage.clear();
    setAdmin({
      name: "",
      phoneNumber: "",
      success: false,
    });

    setDisplay({ showContact: "hidden", showChat: "hidden" });
    setLoginShow({ display: "hidden", login: false });
  };

  return (
    <>
      <div className="rounded-tl-md border-[#dde1e5] bg-[#f0f2f5] p-1 py-[6px]">
        <div className="header  flex items-center justify-between py-1 px-2">
          {admin.profilePic ? (
            <img
              className="logo h-9 w-9 rounded-3xl border-white"
              alt="dp"
              src={`data:image/jpeg;base64,${btoa(admin.profilePic)}`}
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

          <div className="admin">{admin.name}</div>

          <div className="icons flex">
            <span
              data-testid="status-v3-unread"
              data-icon="status-v3-unread"
              className="mr-6">
              <svg
                version="1.1"
                id="df9d3429-f0ef-48b5-b5eb-f9d27b2deba6"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                width="24"
                height="24">
                <path
                  fill="currentColor"
                  d="M12.072 1.761a10.05 10.05 0 0 0-9.303 5.65.977.977 0 0 0 1.756.855 8.098 8.098 0 0 1 7.496-4.553.977.977 0 1 0 .051-1.952zM1.926 13.64a10.052 10.052 0 0 0 7.461 7.925.977.977 0 0 0 .471-1.895 8.097 8.097 0 0 1-6.012-6.386.977.977 0 0 0-1.92.356zm13.729 7.454a10.053 10.053 0 0 0 6.201-8.946.976.976 0 1 0-1.951-.081v.014a8.097 8.097 0 0 1-4.997 7.209.977.977 0 0 0 .727 1.813l.02-.009z"></path>
                <path
                  fill="#009588"
                  d="M19 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"></path>
              </svg>
            </span>

            <span data-testid="chat" data-icon="chat">
              <svg viewBox="0 0 24 24" width="24" height="24" className="mr-6">
                <path
                  fill="currentColor"
                  d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path>
              </svg>
            </span>

            <span
              data-testid="menu"
              data-icon="menu"
              onClick={showMenu}
              className="hover:cursor-pointer">
              <div className="list relative">
                <ul
                  className={`absolute ${clickThreeDot} right-0 top-10 z-20 cursor-pointer rounded-md bg-[#f3f3f3] px-5 font-normal`}>
                  <li
                    className="my-3 mx-1 box-border border-black py-1 transition-all hover:border-b-2"
                    onClick={() => {
                      setShowAddContactForm(
                        showAddContactForm === "hidden" ? "flex" : "hidden"
                      );
                    }}>
                    Add
                  </li>
                  <li
                    className="my-3 mx-1 box-border border-black py-1 transition-all hover:border-b-2"
                    onClick={() => {
                      makeGroup();
                    }}>
                    <abbr title="Pending" className="no-underline">
                      Group
                    </abbr>
                  </li>
                  <li
                    className="my-3 mx-1 box-border border-black py-1 transition-all hover:border-b-2"
                    onClick={() => {
                      makeGroup();
                    }}>
                    <abbr title="Pending" className="no-underline">
                      Update
                    </abbr>
                  </li>
                  <li
                    className="my-3 mx-1 box-border border-black py-1 transition-all hover:border-b-2"
                    onClick={logOut}>
                    LogOut
                  </li>
                </ul>
              </div>
              <svg viewBox="0 0 24 24" width="24" height="24" className="mr-0">
                <path
                  fill="currentColor"
                  d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
