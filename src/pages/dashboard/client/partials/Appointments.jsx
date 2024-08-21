import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

export default function Appointments() {
  const [clientId, setClientId] = useState("");
  const [show, setShow] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [error, setError] = useState(null);
  const [vendorNames, setVendorNames] = useState({}); // Store vendor names by id

  const handleShow = (details) => {
    setSelectedMeeting(details);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // Fetch the vendor's name by vendorId and update the vendorNames state
  const fetchVendorName = async (vendorId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users/${vendorId}`
      );
      const vendorName = response.data.name;
      // Update the state to store the name of the vendor for the given id
      setVendorNames((prev) => ({
        ...prev,
        [vendorId]: vendorName,
      }));
    } catch (error) {
      console.error("Error fetching vendor name:", error);
      setError("Failed to fetch vendor name");
    }
  };

  // Fetch appointments by clientId and vendor names for each appointment
  const fetchAppointmentsByClientId = async (clientId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/appointments/client/${clientId}`
      );
      const appointments = response.data;
      setMeetings(appointments);

      // Fetch vendor names for each appointment
      appointments.forEach((meeting) => {
        if (!vendorNames[meeting.vendor_id]) {
          fetchVendorName(meeting.vendor_id); // Fetch only if not already fetched
        }
      });
    } catch (error) {
      console.error("Error fetching appointments by client_id:", error);
      setError("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setClientId(JSON.parse(user).id);
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (clientId) {
      fetchAppointmentsByClientId(clientId);
    }
  }, [clientId]);

  return (
    <div>
      <h2 className="text-2xl text-gray-400 border-b-2 border-gray-400 p-2 font-extrabold mb-2">
        Vendor Meeting Requests
      </h2>
      <p className="text-gray-400 font-semibold mb-4">
        This table lists all the appointments you’ve requested to view the
        services offered by vendors.
      </p>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-700 border-b">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Vendor</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{meeting.id}</td>
              <td
                className="px-4 py-2 text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={() => handleShow(meeting)}
              >
                {vendorNames[meeting.vendor_id] || "Loading..."}
              </td>
              <td className="px-4 py-2">
                {new Date(meeting.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                })}
              </td>
              <td className="px-4 py-2">{meeting.time}</td>
              <td className="px-4 py-2">
                {meeting.status === true ? (
                  <span className="text-green-500">
                    <i className="fas fa-check-circle mr-2"></i> Approved
                  </span>
                ) : meeting.status === false ? (
                  <span className="text-red-500">
                    <i className="fas fa-times-circle mr-2"></i> Declined
                  </span>
                ) : (
                  <span className="text-yellow-500">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Pending
                  </span>
                )}
              </td>

              <td className="px-4 py-2 flex space-x-2">
                <button
                  className="bg-gray-100 text-gray-500 text-xs hover:bg-gray-200 hover:text-gray-700 flex items-center rounded px-2 py-1"
                  aria-label="Mark as Done"
                >
                  <i className="fas fa-check-circle mr-2"></i>Mark as Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMeeting && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          size={"lg"}
          dialogClassName="modal-90w"
          contentClassName="bg-gray-100 rounded-lg"
        >
          <Modal.Header closeButton className="bg-gray-200 border-b-0">
            <Modal.Title className="text-lg font-semibold">
              Meeting Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-6">
            <p className="mb-2">
              <strong>Client:</strong> {selectedMeeting.client}
            </p>
            <p className="mb-2">
              <strong>Date:</strong> {selectedMeeting.date}
            </p>
            <p className="mb-2">
              <strong>Time:</strong> {selectedMeeting.time}
            </p>
            <p>
              <strong>Message:</strong> {selectedMeeting.additional_info}
            </p>
          </Modal.Body>
          <Modal.Footer className="bg-gray-200 border-t-0">
            <Button
              variant="secondary"
              onClick={handleClose}
              className="py-2 px-4 text-xs rounded-md"
            >
              <i className="fas fa-times fa-xs mr-2"></i> Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
