import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import ServiceModal from "./ServiceModal";

export default function CheckList() {
  const [plans, setPlans] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBookedModal, setShowBookedModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServicesWithSubcategories] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserId(JSON.parse(user).id);
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    async function fetchWeddingPlans() {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
    if (userId) {
      fetchWeddingPlans();
    }
  }, [userId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/bookings/${userId}`
        );
        const data = await response.json();
        if (data.error) {
          console.error("Error:", data.error);
          if (data.details) {
            console.error("Details:", data.details);
          }
        } else {
          console.log("Bookings data:", data);
          setBookings(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBookings();
  }, [userId]);

  const handleOpenModal = (service) => {
    const booked = isServiceBooked(service.title);
    if (booked) {
      setShowBookedModal(true);
    } else {
      setSelectedService(service);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleCloseBookedModal = () => {
    setShowBookedModal(false);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/services`);
        setServicesWithSubcategories(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServices();
  }, []);

  const serviceToPlanFieldMap = {
    Venues: "venue",
    Cakes: "wedding_cake",
    Transport: "transportation",
    Catering: "catering",
    Decor: "decor",
    Entertainment: "entertainment",
    Photographer: "photographer",
  };

  const isServiceBooked = (serviceTitle) => {
    return bookings.some((booking) => booking.service.title === serviceTitle);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <div>
          <i
            className="fas fa-spinner fa-spin text-gray-500"
            style={{ fontSize: "24px" }}
          ></i>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4 border-b-2 border-gray-400 p-2">
            <h2 className="text-2xl text-gray-400 font-extrabold">
              Your Wedding Plan Tracker
            </h2>
          </div>

          {plans.length > 0 ? (
            <ul>
              <ol className="flex items-center w-full space-x-2 text-sm font-medium text-center text-gray-500 rounded-lg  sm:space-x-4 rtl:space-x-reverse">
                {services
                  .map((service, index) => {
                    const planField = serviceToPlanFieldMap[service.title];
                    if (planField && plans[0][planField]) {
                      const booked = isServiceBooked(service.title);
                      return (
                        <li
                          key={service.id}
                          onClick={() => handleOpenModal(service)}
                          className={`flex items-center hover:cursor-pointer ${
                            booked ? "text-green-500" : "text-blue-600"
                          }`}
                        >
                          <span
                            className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${
                              booked ? "border-green-500" : "border-blue-600"
                            } rounded-full shrink-0 dark:border-blue-500`}
                          >
                            {booked ? (
                              <i className="fas fa-check"></i>
                            ) : (
                              index + 1
                            )}
                          </span>
                          {service.title}
                          <svg
                            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 12 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m7 9 4-4-4-4M1 9l4-4-4-4"
                            />
                          </svg>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })
                  .filter(Boolean)
                  .map((item, index) =>
                    React.cloneElement(item, {
                      children: [
                        React.cloneElement(item.props.children[0], {
                          children:
                            item.props.children[0].props.children === index + 1
                              ? index + 1
                              : item.props.children[0].props.children,
                        }),
                        ...item.props.children.slice(1),
                      ],
                    })
                  )}
                <li>
                  <img
                    src="../../../../../couple/7988241.jpg"
                    alt="Avatar"
                    className="h-20 w-auto rounded-full"
                  />
                </li>
              </ol>
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center p-5 bg-gray-50">
              <div className="text-center">
                <i className="fas fa-calendar-times text-gray-400 text-6xl "></i>
                <p className="text-lg font-extrabold mt-2 text-gray-400 mb-3">
                  No Plans Available
                </p>
                <p className="text-gray-500 font-semibold">
                  It looks like you haven't created your plan. We advise you to
                  do so before making any booking.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <ServiceModal
        show={showModal}
        onHide={handleCloseModal}
        service={selectedService}
      />

      <Modal show={showBookedModal} size={"lg"} onHide={handleCloseBookedModal}>
        <Modal.Header closeButton className="bg-[#bfb59f] text-white">
          <Modal.Title className="font-extrabold">
            Service Already Booked
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-[#eff5f7] font-semibold text-gray-500">
          You have already made a booking for this service. Please check your
          bookings for more details.
        </Modal.Body>
        <Modal.Footer className="bg-[#bfb59f] text-white">
          <Button variant="secondary" onClick={handleCloseBookedModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
