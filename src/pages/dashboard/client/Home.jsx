import React, { useState } from "react";
import PlanForm from "./partials/PlanForm";
import CheckList from "./partials/CheckList";
import Costs from "./partials/Costs";
import Appointments from "./partials/Appointments";

export default function Home() {
  const [activeTab, setActiveTab] = useState("CheckList");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <div className="mt-4 mx-4">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 font-extrabold border-b-2 rounded-t-lg ${
                  activeTab === "CheckList"
                    ? "text-[#bfb59f] border-[#bfb59f]"
                    : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                type="button"
                role="tab"
                aria-selected={activeTab === "CheckList"}
                onClick={() => handleTabChange("CheckList")}
              >
                Check list
              </button>
            </li>

            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 font-extrabold border-b-2 rounded-t-lg ${
                  activeTab === "Costs"
                    ? "text-[#bfb59f] border-[#bfb59f]"
                    : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                type="button"
                role="tab"
                aria-selected={activeTab === "Costs"}
                onClick={() => handleTabChange("Costs")}
              >
                Service costs
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 font-extrabold border-b-2 rounded-t-lg ${
                  activeTab === "Appointments"
                    ? "text-[#bfb59f] border-[#bfb59f]"
                    : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                type="button"
                role="tab"
                aria-selected={activeTab === "Appointments"}
                onClick={() => handleTabChange("Appointments")}
              >
                Appointments
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 font-extrabold border-b-2 rounded-t-lg ${
                  activeTab === "BudgetInfomation"
                    ? "text-[#bfb59f] border-[#bfb59f]"
                    : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                type="button"
                role="tab"
                aria-selected={activeTab === "BudgetInfomation"}
                onClick={() => handleTabChange("BudgetInfomation")}
              >
                Create plan
              </button>
            </li>
          </ul>
        </div>
        <div id="default-tab-content">
          {activeTab === "CheckList" && (
            <div className="p-4 rounded-lg border bg-gray-50 shadow-inner">
              <CheckList />
            </div>
          )}
          {activeTab === "Costs" && (
            <div className="p-4 rounded-lg border bg-gray-50 shadow-inner">
              <Costs />
            </div>
          )}
          {activeTab === "Appointments" && (
            <div className="p-4 rounded-lg border bg-gray-50 shadow-inner">
              <Appointments />
            </div>
          )}
          {activeTab === "BudgetInfomation" && (
            <div className="p-4 rounded-lg border bg-gray-50 shadow-inner ">
              <PlanForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
