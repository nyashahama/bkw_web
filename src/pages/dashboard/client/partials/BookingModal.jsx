import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const BookingModal = ({ show, handleClose, subcategory, userId }) => {
  const [client_id, setClientId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    additional_info: "",
    client_id: "",
    vendor_id: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      client_id: client_id,
      vendor_id: userId,
    }));
  }, [client_id, userId]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setClientId(parsedUser.id);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/appointments",
        formData
      );

      if (response.status === 201) {
        toast.success("Appointment submitted successfully!");
      } else {
        toast.error("There was an issue submitting the appointment.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("An error occurred while submitting the appointment.");
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Modal
      show={show}
      size={"lg"}
      onHide={handleClose}
      className="rounded-lg shadow-lg bg-gray-100"
      centered
    >
      <Modal.Header
        closeButton
        className="bg-[#bfb59f] text-white rounded-t-lg"
      >
        <Modal.Title className="text-xl font-extrabold">
          <i className="fas fa-calendar-check mr-2"></i>
          Book Viewing for {subcategory.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-[#eff5f7] p-3 text-gray-300">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDate" className="mb-4">
            <Form.Label className="font-medium text-gray-700">
              Date of Viewing
            </Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 transition duration-300"
              required
            />
          </Form.Group>

          <Form.Group controlId="formTime" className="mb-4">
            <Form.Label className="font-medium text-gray-700">
              Time of Viewing
            </Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 transition duration-300"
              required
            />
          </Form.Group>

          <Form.Group controlId="formadditional_info" className="mb-4">
            <Form.Label className="font-medium text-gray-700">
              Additional Information
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="additional_info"
              value={formData.additional_info}
              onChange={handleChange}
              className="rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 transition duration-300"
              placeholder="Optional"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-[#bfb59f] text-white rounded-t-lg">
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline-secondary"
            className="rounded-lg px-4 py-2 text-white text-sm"
            onClick={handleClose}
          >
            <i className="fas fa-times mr-2"></i> Cancel
          </Button>
          <Button
            variant="primary"
            className="rounded-lg px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-check mr-2"></i>
            )}
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
