import React, { useState } from "react";
import AddNewService from "./partials/AddNewService";
import ViewAllServices from "./partials/ViewAllServices";

export default function ServicesManagement() {
  const [activeTab, setActiveTab] = useState("my-services");

  const renderContent = () => {
    switch (activeTab) {
      case "my-services":
        return <ViewAllServices />;
      case "add-services":
        return <AddNewService />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a
              href="#"
              onClick={() => setActiveTab("my-services")}
              className={`inline-block p-4 border-b-2 font-extrabold text-gray-400 rounded-t-lg ${
                activeTab === "my-services"
                  ? "text-[#bfb59f] border-[#bfb59f] "
                  : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
              aria-current={activeTab === "my-services" ? "page" : undefined}
            >
              my services
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              onClick={() => setActiveTab("add-services")}
              className={`inline-block p-4 border-b-2 font-extrabold text-gray-400 rounded-t-lg ${
                activeTab === "add-services"
                  ? "text-[#bfb59f] border-[#bfb59f] "
                  : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 "
              }`}
              aria-current={activeTab === "add-services" ? "page" : undefined}
            >
              add aervices
            </a>
          </li>
        </ul>
      </div>
      <div className="p-4">{renderContent()}</div>
    </div>
  );
}
