import React, { useContext, useState } from "react";
import userContext from "../context/userContext";
export default function CreateAccount({ setShowCreateAccountForm }) {
  const { setAdmin, setLoginShow, admin, setDisplay } = useContext(userContext);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");

  const host = process.env.REACT_APP_CREATE_USER;

  // createUser function:
  const createUser = async (e) => {
    e.preventDefault();

    const inpFile = await document.getElementById("file").files[0];

    let formData = new FormData();
    await formData.append("file", inpFile);
    await formData.append("name", name);
    await formData.append("phoneNumber", phoneNumber);
    await formData.append("password", password);

    // API Call:
    const response = await fetch(host, {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    if (json.success) {
      await setAdmin({
        name: name,
        phoneNumber: phoneNumber,
        dp: "",
        password: password,
        success: true,
      });
      localStorage.setItem("token", JSON.stringify(json.authToken));

      setName("");
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
      <div className="mx-auto mt-4 h-fit w-2/3 rounded-sm border-2 bg-white p-5 text-left shadow-2xl sm:w-2/4 md:w-2/5 ">
        <div
          className="icon float-right hover:cursor-pointer"
          onClick={() => {
            setShowCreateAccountForm("hidden");
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

        <h3 className="text-center text-2xl font-medium">Create New Account</h3>

        <form onSubmit={createUser} encType="multipart/form-data">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="Name">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder="Name"
                minLength={2}
                required
                className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
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
              <label className="block" htmlFor="phoneNumber">
                Add Profile Pic
              </label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => {
                  setProfilePic(e.target.value);
                }}
                required
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
                Create Account
              </button>
            </div>
            <div className="text-grey-dark mt-6">
              Already have an account?
              <a className="text-blue-600 hover:underline" href="#">
                Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
