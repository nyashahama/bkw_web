import React, { useState, useEffect } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserId(JSON.parse(user).id);
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        fetch(`http://localhost:4000/bookings/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("Error:", data.error);
              if (data.details) {
                console.error("Details:", data.details);
              }
            } else {
              setBookings(data);
            }
          });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBookings();
  }, [userId]);

  useEffect(() => {
    async function fetchWeddingPlans() {
      try {
        const response = await fetch(
          `http://localhost:4000/wedding_plans/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setPlans(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    if (userId) {
      fetchWeddingPlans();
    }
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-5 bg-gray-50">
        <div className="text-center">
          <i className="fas fa-calendar-times text-gray-400 text-6xl"></i>
          <p className="text-lg font-extrabold mt-2 text-gray-400 mb-3">
            No bookings found
          </p>
          <p className="text-gray-500 font-semibold">
            You haven’t booked any services
          </p>
        </div>
      </div>
    );
  }

  const totalBudget = parseFloat(plans[0]?.budget || 0);
  let remainingBudget = totalBudget;

  const getColorCode = (remainingBudget) => {
    if (remainingBudget > totalBudget * 0.5) {
      return "text-green-500"; // Safe zone
    } else if (remainingBudget > totalBudget * 0.2) {
      return "text-yellow-500"; // Warning zone
    } else {
      return "text-red-500"; // Danger zone
    }
  };

  return (
    <div className="bg-background p-4">
      <div className="">
        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-400 p-2">
          <h2 className="text-2xl text-gray-400 font-extrabold">
            Estimated costs
          </h2>
          <div className="flex items-center text-2xl text-gray-400 font-extrabold">
            <i className="fas fa-briefcase mr-2"></i>
            <span>Budget:</span>
            <span className="ml-2">R{totalBudget.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-400 border-b-2 p-2 font-semibold mb-4">
        Below are the estimated costs for the services you’ve booked. Check to
        ensure you stay within your budget.
      </p>

      {bookings.map((booking) => {
        const servicePrice = parseFloat(booking.subcategory.price);
        remainingBudget -= servicePrice;

        return (
          <div key={booking.id} className="bg-card p-2 rounded-lg mb-4">
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl text-gray-400 font-bold">
                  {booking.service.title}
                </span>
                <span className="text-2xl text-gray-400 font-bold">
                  R{servicePrice.toFixed(2)}
                </span>
              </div>

              <div className="mt-2">
                <div className="flex justify-between">
                  <p className="font-extrabold text-gray-700">
                    <span>{booking.subcategory.name}</span>
                  </p>

                  <span>R{servicePrice.toFixed(2)}</span>
                </div>
                <div className="shadow-inner mt-2 pt-2 pl-2">
                  {booking.subcategory.short_description}
                </div>
              </div>
              <hr className="mt-4" />
              <div
                className={`flex justify-between mt-1 items-center ${getColorCode(
                  remainingBudget
                )}`}
              >
                <span className="text-xl font-bold">Balance:</span>
                <span className="text-xl font-bold">
                  R{remainingBudget.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
