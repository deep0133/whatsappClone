import Header1 from "./components/Header";
import Header2 from "./components/Header2";
import Body from "./components/Body";
import Body2 from "./components/Body2";
import AddContact from "./components/AddContact";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import { useContext } from "react";
import userContext from "./context/userContext";
import CreateAccount from "./components/CreateAccount";
import FirstRightPage from "./components/FirstRightPage";
import Signin from "./components/Signin";

function App() {
  const { setAdmin, loginShow, setLoginShow, display, setDisplay } =
    useContext(userContext);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState("hidden");

  // get admin first:
  useEffect(async () => {
    try {
      if (typeof localStorage === `undefined`) {
        return;
      }
      const urlGetAdmin = await process.env.REACT_APP_ADMIN_URL;
      const authToken = await JSON.parse(localStorage.getItem(`token`));

      if (authToken) {
        // API Call:   get admin:
        let getadmin = await fetch(urlGetAdmin, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authToken: authToken,
          },
        });
        let getUser = await getadmin.json();
        if (getUser.success) {
          var binary = "";
          var bytes = new Uint8Array(getUser.profilePic.data);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          setAdmin({
            name: getUser.name,
            phoneNumber: getUser.phoneNumber,
            profilePic: binary,
            success: true,
          });

          setDisplay({ showContact: "flex" });
          setLoginShow({ display: "hidden", login: true });
        }
      }
    } catch (err) {
      console.log("Error : " + err);
    }
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center overflow-auto bg-[#dfdedb] md:justify-center">
      {/* Before login page: */}
      <div className="green-part top-0 flex w-full bg-[#00a884] py-[28px] md:absolute md:flex md:items-center md:py-16">
        <div className="flex w-full md:-ml-72 md:justify-center lg:-ml-96">
          <span className="icon pl-8 pr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="39"
              viewBox="0 0 39 39">
              <path
                fill="#00E676"
                d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path>
              <path
                fill="#FFF"
                d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path>
            </svg>
          </span>
          <span className="z-10 mt-2 text-sm font-medium uppercase text-white">
            Whatsapp web
          </span>
        </div>
      </div>

      {/* QR Code : Section */}
      <div
        className={`login-by-qr-code z-20 flex-col items-center justify-center bg-white p-8 shadow-md sm:p-6 md:-mt-20 md:flex-row md:p-8 ${
          display.showChat === "hidden" ? "flex" : "hidden"
        }  `}>
        <div className="basic-login-info w-[450px]">
          <h1 className="my-0 text-2xl font-thin text-gray-500">
            To use WhatsApp on your computer:
          </h1>
          <ol className="mt-6 space-y-4 text-[16px] font-normal text-gray-600 md:text-lg">
            <li className="order-1">1. Open WhatsApp on your phone</li>
            <li className="order-2">
              2.Tap <span className="font-medium">Menu</span> or{" "}
              <span className="font-medium">Setting</span> and select{" "}
              <span className="font-medium">Linked Devices</span>
            </li>
            <li className="order-3 flex">
              3. Tap on <div className="ml-1 font-medium"> Link a Device </div>
            </li>
            <li className="order-4">
              4. Point your phone to this screen to capture the code
            </li>
          </ol>

          <h6 className="my-4 text-sm text-slate-500 hover:cursor-pointer md:my-10">
            Need help to get started?
          </h6>
          <div className="createAccount loginAccount flex hover:cursor-pointer">
            <h1
              className="hover:underline"
              onClick={() => {
                setShowCreateAccountForm("flex");
              }}>
              Create New Account
            </h1>
            <h1
              className="ml-6 hover:underline"
              onClick={() => {
                setLoginShow({ display: "flex" });
              }}>
              Sign In
            </h1>
          </div>
        </div>

        {/*  qr code */}
        <div className="qr-input mt-8 hover:cursor-pointer">
          <QRCode
            id="qrCodeEl"
            size={200}
            value={
              "2@1faX3spYvk6nLQBbA9RQ9nZ0+4JGIVjjYLfHrUclU9NVpdfu5wHYTpm0GZbG8P8DYC/1XAdfPlgA4g==,ChNnJqqt+GHxjpvnRwb37CvHDA6yRYErg8I604zLeRY=,k8YZtvcuppaNrWQ/6hGI8bKCSubymTYPdsq4fpVQEgc=,HkFTozztBBX9/Mq5Ecl2ccv7iRl0pZY44Ntm+YGVL8E="
            }
          />
        </div>
      </div>

      {/* Create Account : */}
      <div
        className={`${showCreateAccountForm} absolute z-30 box-border h-screen w-full`}>
        <div className="component relative flex w-full items-center justify-center">
          <CreateAccount
            setShowCreateAccountForm={setShowCreateAccountForm}
            showCreateAccountForm={showCreateAccountForm}
          />
        </div>
      </div>

      {/* Login Account : */}
      <div
        className={`${loginShow.display} absolute z-30 box-border h-screen w-full`}>
        <div className="component relative flex w-full items-center justify-center">
          <Signin setShowCreateAccountForm={setShowCreateAccountForm} />
        </div>
      </div>

      {/* Add Contact page: */}
      <div className={`absolute top-0 z-40 w-full`}>
        <AddContact />
      </div>

      {/* Chat Container: */}
      <div
        className="chat-container -mt-[98px] flex w-full justify-center overflow-auto md:-mt-1
       lg:w-[95%]">
        <div className="flex w-[800px] overflow-auto md:w-full">
          <div
            className={`content-list z-30 min-w-[350px] flex-col md:basis-1/3 ${display.showContact} `}>
            <Header1 />
            <Body />
          </div>

          <div
            className={`chat-box z-30 min-w-[450px] md:basis-2/3  ${display.showContact}`}>
            {display.showChat === "flex" ? (
              <div>
                <Header2 /> <Body2 />
              </div>
            ) : (
              <FirstRightPage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
