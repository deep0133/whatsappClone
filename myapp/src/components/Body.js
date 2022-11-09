import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import { useContext } from "react";
import userContext from "../context/userContext";

export default function Body() {
  const { contactList } = useContext(userContext);

  return (
    <div className="relative h-[92vh] overflow-auto rounded-bl-md bg-[#ffffff] lg:h-[84vh]">
      {contactList.length == 0 ? (
        <div>
          <p className="m-auto p-4 font-serif text-xl text-gray-500">
            No Contact present in your list:
          </p>{" "}
        </div>
      ) : (
        contactList.map((ele, index) => {
          if (ele) {
            return (
              <Contact key={index} id={ele._id} index={index} contact={ele} />
            );
          }
        })
      )}
    </div>
  );
}
