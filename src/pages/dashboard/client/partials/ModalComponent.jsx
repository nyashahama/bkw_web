import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { initializePaystackPayment } from "../../../../api/payment_processing";

const ModalComponent = ({ isOpen, onRequestClose, service, subcategory }) => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const depositAmount = (subcategory.price * 0.5).toFixed(2);
  const sub_id = subcategory.id;
  const referenceNumber = `REF-${Date.now()}`;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserId(userData.id);
      setEmail(userData.email);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const onSuccess = async (response) => {
    try {
      const paymentResponse = await axios.post(
        "http://localhost:4000/payments",
        {
          booking_id: bookingId,
          deposit: depositAmount,
          reference_number: referenceNumber,
        }
      );

      if (paymentResponse.status === 201) {
        toast.success("Payment successful! Service has been booked.");
      }
    } catch (error) {
      console.error("Error occurred during payment/booking: ", error);
      toast.error("An error occurred while processing your payment.");
    } finally {
      setIsLoading(false);
      onRequestClose();
    }
  };

  const onClose = () => {
    toast.info("Payment was canceled.");
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/addbooking", {
        user_id: userId,
        service_id: service.id,
        sub_id: sub_id,
      });

      const bookingIdFromResponse = response.data.booking.id;
      setBookingId(bookingIdFromResponse);

      // initializePaystackPayment({
      //   email,
      //   amount: depositAmount * 100,
      //   reference: referenceNumber,
      //   onSuccess: (response) => {
      //     onSuccess(response);
      //   },
      //   onClose: () => {
      //     onClose();
      //   },
      // });
    } catch (error) {
      console.error("Error adding booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      size="lg"
      onHide={onRequestClose}
      centered
      className="rounded-lg shadow-lg bg-gray-100"
    >
      <Modal.Header closeButton className="bg-gray-800 text-white rounded-t-lg">
        <Modal.Title className="text-xl font-bold">
          <i className="fas fa-shopping-cart mr-2"></i> Book {subcategory.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            <i className="fas fa-concierge-bell mr-2"></i> Service:{" "}
            {service.title}
          </h2>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            <i className="fas fa-dollar-sign mr-2"></i> Total Price: R
            {subcategory.price}
          </h3>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            <i className="fas fa-align-left mr-2"></i> Description:{" "}
            {subcategory.short_description}
          </h3>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-green-600">
            <i className="fas fa-money-check-alt mr-2"></i> Deposit (50%): R
            {depositAmount}
          </h4>
        </div>

        <div className="text-center mt-6">
          <Button
            variant="success"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-credit-card mr-2"></i>
            )}
            {isLoading ? "Processing..." : "Pay Deposit Now"}
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-gray-200 rounded-b-lg">
        <Button
          variant="secondary"
          className="text-gray-800 hover:bg-gray-300"
          onClick={onRequestClose}
        >
          <i className="fas fa-times mr-2"></i> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
