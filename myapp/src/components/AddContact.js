import React, { useState } from "react";
import { useContext } from "react";
import userContext from "../context/userContext";
export default function AddContact() {
  const {
    admin,
    setNewFriend,
    contactList,
    showAddContactForm,
    setShowAddContactForm,
  } = useContext(userContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(false);

  const addNewContact = async (e) => {
    e.preventDefault();
    if (true) {
      // parseInt(string,base):  use to convert string into number:
      let num = parseInt(phone, 10);
      await setNewFriend({
        name: name,
        phoneNumber: phone,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        success: false,
      });

      // check validation:
      // 1.) diff user (not admin)
      if (admin.phoneNumber !== num) {
        // 2.) not added before:
        var found = await contactList.findIndex(function (post, index) {
          if (post && post.phoneNumber == phone) {
            return true;
          }
        });
        if (found === -1) {
          await setNewFriend({
            name: name,
            phoneNumber: phone,
            time: new Date().getHours() + ":" + new Date().getMinutes(),
            token: await JSON.parse(localStorage.getItem("token")),
            success: true,
          });

          setShowAddContactForm("hidden");
          setName("");
          setPhone("");
        } else {
          window.location.reload();
        }
      }
    }
  };

  return (
    <div
      className={`${showAddContactForm} container relative mx-auto min-h-screen w-[60%] flex-col overflow-hidden `}
      id="addContact">
      <div className="m-auto w-full rounded border border-purple-600 bg-white p-6 shadow-lg shadow-purple-800/50 lg:max-w-md">
        <div
          className="icon float-right hover:cursor-pointer"
          onClick={() => {
            setShowAddContactForm("hidden");
            setName("");
            setPhone("");
            document.getElementById("phoneError").innerHTML = "";
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
        <h1 className="text-center text-3xl font-semibold text-purple-700">
          Contact
        </h1>

        {/* <div className={`cross-icon hover:cursor-pointer`} onClick={addNewContact}>icon</div> */}
        <form className="mt-6" onSubmit={addNewContact}>
          <div>
            <label htmlFor="name" className="block text-sm text-gray-800">
              Name
            </label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
            />
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-800">
                Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={async (e) => {
                  setPhone(e.target.value);
                }}
                onBlur={() => {
                  let patrn = /^[6-9]{1}[0-9]{9}$/;
                  if (patrn.test(phone)) {
                    document.getElementById("phoneError").innerHTML = "";
                    setValid(true);
                  } else {
                    document.getElementById("phoneError").innerHTML =
                      "Invalid number.";
                    setValid(false);
                  }
                }}
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-purple-700 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-40"
              />
              <span id="phoneError" className="text-xs text-red-500"></span>
            </div>
            <div className="mt-6">
              <button
                type="onSubmit"
                className={`${
                  valid === false ? "cursor-not-allowed" : "hover:bg-purple-600"
                }  w-full transform rounded-md bg-purple-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 focus:bg-purple-600 focus:outline-none`}>
                Add Contant
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
