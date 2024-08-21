import React, { useState, useEffect } from "react";
import Manageaccount from "../admin/partials/Manageaccount";
import ServiceManager from "./partials/ServiceManager";
import Home from "./partials/Home";

export default function AdminDashboard() {
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
  let content = null;

  switch (activeLink) {
    case "Manageaccount":
      content = <Manageaccount />;
      break;

    case "Home":
      content = <Home />;
      break;

    case "ServiceManager":
      content = <ServiceManager />;
      break;
    default:
      content = <Manageaccount />;
  }

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div class="flex bg-gray-100">
      <aside class="h-screen  bg-[#bfb59f] fixed lg:sticky top-0 border-r-2 p-6 pt-10 whitespace-nowrap z-10 closed shadow-xl ">
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

        <ul class="text-gray-500 font-semibold flex flex-col gap-2">
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("Home")}
              className={`flex items-center text-white rounded px-3 py-2 hover:text-white hover:bg-[#d2c2b2] transition-all ${
                activeLink === "Home" ? "text-white bg-[#d2c2b2]" : ""
              }`}
            >
              <i class="fa fa-home mr-3"></i>
              <span class="flex-grow">Home</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("ServiceManager")}
              className={`flex items-center text-white rounded px-3 py-2 hover:text-white hover:bg-[#d2c2b2] transition-all ${
                activeLink === "ServiceManager" ? "text-white bg-[#d2c2b2]" : ""
              }`}
            >
              <span class="flex items-center gap-3">
                <i class="fa fa-bell"></i>
                Services Management
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleLinkClick("Manageaccount")}
              className={`flex items-center text-white rounded px-3 py-2 hover:text-white hover:bg-[#d2c2b2] transition-all ${
                activeLink === "Manageaccount" ? "text-white bg-[#d2c2b2]" : ""
              }`}
            >
              <span class="flex items-center gap-3">
                <i class="fa fa-rss"></i>
                Profile Management
              </span>
            </a>
          </li>
          <li class="border my-2"></li>
          <li>
            <a
              href="#"
              onClick={logout}
              class="flex items-center rounded px-3 py-2 hover:text-black hover:bg-gray-50 transition-all"
            >
              <i class="fa fa-user mr-3"></i>
              <span class="flex-grow">Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      <div class="w-full">
        <header className="px-6 lg:px-8 pb-4 lg:pb-6 pt-6 lg:pt-10 shadow bg-[#bfb59f] mb-1 sticky top-0 flex justify-between items-center">
          <div>
            <p className="text-2xl font-extrabold text-white">
              Butterfly Weddings
            </p>
          </div>

          <div className="flex items-center">
            <span className="mr-4 text-gray-700 dark:text-gray-300">
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

        <main class="px-6 py-8 lg:px-8 bg-gray-100 flex flex-col gap-6 ">
          {content}
        </main>
      </div>
    </div>
  );
}
