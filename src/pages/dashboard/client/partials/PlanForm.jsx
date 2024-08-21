import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function PlanForm() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    budget: "",
    venue: false,
    decor: false,
    catering: false,
    entertainment: false,
    photographer: false,
    weddingCake: false,
    transportation: false,
    user_id: "", // Add user_id to formData
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUsername(JSON.parse(user).id);
      setFormData((prevData) => ({
        ...prevData,
        user_id: JSON.parse(user).id,
      }));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/wedding_plans",
        formData
      );

      console.log("Plan created successfully:", response.data);

      // Resetting form data
      setFormData({
        budget: "",
        venue: false,
        decor: false,
        catering: false,
        entertainment: false,
        photographer: false,
        weddingCake: false,
        transportation: false,
        user_id: username,
      });

      toast.success("Plan created successfully!");
    } catch (error) {
      console.error("Error creating wedding plan:", error);
      toast.error("Failed to create the plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="budget"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            What's your budget?
          </label>
          <input
            type="number"
            id="budget"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="R50000"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <h2 className="text-sm font-semibold mb-2 text-gray-900">
          Select all the services you require for your wedding:
        </h2>

        <hr className="py-2 " />

        {[
          "venue",
          "decor",
          "catering",
          "entertainment",
          "photographer",
          "weddingCake",
          "transportation",
        ].map((service) => (
          <div key={service} className="flex items-start mb-3">
            <div className="flex items-center h-5">
              <input
                id={service}
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                checked={formData[service]}
                onChange={handleChange}
              />
            </div>
            <label
              htmlFor={service}
              className="ms-2 text-sm font-medium text-gray-900"
            >
              {service.charAt(0).toUpperCase() +
                service.slice(1).replace(/([A-Z])/g, " $1")}
              : {getDescription(service)}
            </label>
          </div>
        ))}

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin mr-2"></i>
          ) : (
            <i className="fas fa-tasks mr-2"></i>
          )}
          {loading ? "Submitting..." : "Plan your wedding"}
        </button>
      </form>
    </div>
  );
}

const getDescription = (service) => {
  switch (service) {
    case "venue":
      return "Includes location rental, seating arrangements, and lighting.";
    case "decor":
      return "Includes flowers, table settings, and everything needed for decoration.";
    case "catering":
      return "Includes food, drinks, and table service.";
    case "entertainment":
      return "Includes DJ, sound equipment, and lighting effects.";
    case "photographer":
      return "Includes professional photography and videography services.";
    case "weddingCake":
      return "Includes design, preparation, and delivery of the wedding cake.";
    case "transportation":
      return "Includes transport services for the couple and guests.";
    default:
      return "";
  }
};
