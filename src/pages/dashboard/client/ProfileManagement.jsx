import React, { useState, useEffect } from "react";

export default function ProfileManagement() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUsername(JSON.parse(user).full_name);
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="p-4 shadow-inner border rounded">
      <div className="max-w-4xl p-6">
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow-md hover:bg-blue-700 transition-colors duration-300">
              <i className="fas fa-user-edit"></i>
            </button>
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-800">{username}</h1>
            <p className="text-gray-600"></p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Account Settings
          </h2>
          <ul>
            <li className="flex items-center mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <i className="fas fa-lock text-xl text-blue-600 mr-4"></i>
              <span className="text-gray-700">Change Password</span>
            </li>
            <li className="flex items-center mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <i className="fas fa-user-edit text-xl text-green-600 mr-4"></i>
              <span className="text-gray-700">Edit Profile</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
