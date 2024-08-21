// BookingModal.js
import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingModal = ({ show, handleClose, booking }) => {
  if (!booking) return null; // Ensure booking is not null before rendering

  const { service, payment, subcategory_name, created_at } = booking;

  // Convert created_at to a more readable format
  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <Modal show={show} onHide={handleClose} size={"xl"} centered>
      <Modal.Header closeButton>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="p-2 rounded-lg ">
          <Row className="mb-4">
            <Col md={6} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h5 className="text-xl font-semibold text-gray-700 flex items-center">
                <i className="fas fa-tag mr-2 text-blue-500"></i> Service
              </h5>
              <p className="mt-2 text-gray-600">
                <strong className="font-medium">Title:</strong> {service.title}
              </p>
              <p className="mt-2 text-gray-600">
                <strong className="font-medium">Description:</strong>{" "}
                {service.description}
              </p>
            </Col>
            <Col md={6} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h5 className="text-xl font-semibold text-gray-700 flex items-center">
                <i className="fas fa-dollar-sign mr-2 text-green-500"></i>{" "}
                Payment Information
              </h5>
              <p className="mt-2 text-gray-600">
                <strong className="font-medium">Deposit:</strong> R
                {payment.deposit}
              </p>
              <p className="mt-2 text-gray-600">
                <strong className="font-medium">Oustanding payment:</strong> R
                {payment.deposit}
              </p>
              <p className="mt-2 text-gray-600">
                <strong className="font-medium">Reference Number:</strong>{" "}
                {payment.reference_number}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h5 className="text-xl font-semibold text-gray-700 flex items-center">
                <i className="fas fa-calendar-alt mr-2 text-purple-500"></i>{" "}
                Booked service
              </h5>
              <p className="mt-2 text-gray-600">
                <strong className="font-medium">Service:</strong>{" "}
                {subcategory_name}
              </p>
              <p className="mt-2 text-gray-600">
                <strong className="font-medium">Date:</strong> {formattedDate}
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
