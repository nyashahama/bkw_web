import React, { useState, useEffect } from "react";
import Home from "./Home";
import ManageBooking from "../client/partials/ManageBooking";
import Exploreservices from "../client/Exploreservices";
import ProfileManagement from "./ProfileManagement";
import { ToastContainer } from "react-toastify";

export default function ClientDashboard() {
  const [activeLink, setActiveLink] = useState("Home");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUsername(JSON.parse(user).full_name);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  let content = null;

  switch (activeLink) {
    case "Home":
      content = <Home />;
      break;
    case "ManageBooking":
      content = <ManageBooking />;
      break;
    case "ProfileManagement":
      content = <ProfileManagement />;
      break;

    case "Exploreservices":
      content = <Exploreservices />;
      break;
  }

  return (
    <div class="flex bg-gray-100">
      <ToastContainer />
      <aside class="h-screen bg-[#bfb59f] fixed lg:sticky top-0 border-r-2 p-6 pt-10 whitespace-nowrap z-10 closed shadow-xl ">
        <div class="mb-10 flex items-center justify-between ">
          <div class="p-2 text-white ">
            <img
              src="../../../../logo.png"
              alt="Logo"
              className="h-20 border-white border-1 p-2"
            />
          </div>

          <button class="lg:hidden bg-gray-200 text-gray-500 rounded leading-none p-1 btn-close-menu">
            <i data-feather="chevron-left"></i>
          </button>
        </div>
        <p className="mb-1 text-sm font-semibold text-white">Navigation</p>
        <div className="border border-white my-2"></div>

        <ul className="text-gray-500 font-semibold flex flex-col gap-2">
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("Home")}
              className={`flex items-center text-white rounded px-3 py-2 hover:text-white hover:bg-[#d2c2b2] transition-all ${
                activeLink === "Home" ? "text-white bg-[#d2c2b2]" : ""
              }`}
            >
              <i className="fa fa-home mr-3"></i>
              <span className="flex-grow">Home</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("ManageBooking")}
              className={`flex items-center text-white rounded px-3 py-2 hover:text-white hover:bg-[#d2c2b2] transition-all ${
                activeLink === "ManageBooking" ? "text-white bg-[#d2c2b2]" : ""
              }`}
            >
              <i className="fa fa-columns mr-3"></i>
              <span className="flex-grow">Manage Services</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("Exploreservices")}
              className={`flex items-center text-white rounded px-3 py-2 hover:text-white hover:bg-[#d2c2b2] transition-all ${
                activeLink === "Exploreservices"
                  ? "text-white bg-[#d2c2b2]"
                  : ""
              }`}
            >
              <span className="flex items-center gap-3">
                <i className="fa fa-bell"></i>
                Explore Services
              </span>
            </a>
          </li>

          <li className="border my-2 border-white"></li>
          <li>
            <a
              href="#"
              onClick={logout}
              className="flex items-center text-white rounded px-3 py-2 hover:text-white hover:bg-[#d2c2b2] transition-all"
            >
              <i className="fa fa-user mr-3"></i>
              <span className="flex-grow">Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      <div class="w-full">
        <header class="px-6 lg:px-8 pb-4 lg:pb-6 pt-6 lg:pt-10 shadow bg-[#bfb59f] mb-1 sticky top-0 flex justify-between items-center">
          <div>
            <p class="text-2xl font-extrabold text-white">Butterfly weddings</p>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-white font-semibold tracking-wide text-xl">
              {username || "Username"}
            </span>

            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </header>

        <main class="px-6 py-8 lg:px-8 bg-[#eff5f7] flex flex-col gap-6 z-20 ">
          {content}
        </main>
      </div>
    </div>
  );
}
