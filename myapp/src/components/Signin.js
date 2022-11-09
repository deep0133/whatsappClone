import React, { useContext, useState } from "react";
import userContext from "../context/userContext";
export default function Signin({ setShowCreateAccountForm }) {
  const { setAdmin, setLoginShow, setDisplay } = useContext(userContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const host = process.env.REACT_APP_LOGIN;

  // Sign in function:
  const userSignin = async (e) => {
    e.preventDefault();

    // API Call:
    const response = await fetch(host, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      await setAdmin({
        name: json.name,
        phoneNumber: phoneNumber,
        dp: json.profilePic,
        success: true,
      });
      localStorage.setItem("token", JSON.stringify(json.authToken));

      setPhoneNumber("");
      setPassword("");

      setDisplay({ showContact: "flex" });
      setLoginShow({ display: "hidden", login: true });
      setShowCreateAccountForm("hidden");
    } else {
      alert("Invalid Credentials:");
    }
  };

  return (
    <>
      <div className="relative w-2/3 bg-white px-4 py-3 text-left shadow-lg sm:w-2/4 md:w-2/5">
        <div
          className="icon float-right hover:cursor-pointer"
          onClick={() => {
            setLoginShow({ display: "hidden" });
          }}>
          <svg
            className="text-black-500 h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            {" "}
            <circle cx="12" cy="12" r="10" />{" "}
            <line x1="15" y1="9" x2="9" y2="15" />{" "}
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h3 className="text-center text-2xl font-medium">Sign In</h3>

        <form onSubmit={userSignin}>
          <div className="mt-4">
            <div className="mt-4">
              <label className="block" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                required
                minLength={10}
                maxLength={10}
                value={phoneNumber}
                placeholder="Phone number"
                className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                minLength={5}
                required
                placeholder="Password"
                className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-900">
                Login
              </button>
            </div>
            <div className="text-grey-dark mt-6">
              Create new account?
              <a className="text-blue-600 hover:underline" href="#">
                here
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
