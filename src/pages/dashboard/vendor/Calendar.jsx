import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios"; // Ensure Axios is imported

export default function Calendar() {
  const [vendorId, setVendorId] = useState("");
  const [show, setShow] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [error, setError] = useState("");

  const handleShow = (details) => {
    setMeetingDetails(details);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const fetchAppointmentsByVendorId = async (vendorId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/appointments/vendor/${vendorId}`
      );
      const appointments = response.data;
      setMeetings(appointments);
    } catch (error) {
      console.error("Error fetching appointments by vendor_id:", error);
      setError("Failed to fetch appointments");
    }
  };

  const updateMeetingStatus = async (appointmentId, status) => {
    try {
      await axios.patch(
        `http://localhost:4000/appointments/${appointmentId}/status`,
        { status }
      );
      // Update the meetings list in the state
      setMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting.id === appointmentId ? { ...meeting, status } : meeting
        )
      );
    } catch (error) {
      console.error("Error updating meeting status:", error.message);
      setError("Failed to update meeting status");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setVendorId(JSON.parse(user).id);
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (vendorId) {
      fetchAppointmentsByVendorId(vendorId);
    }
  }, [vendorId]);

  return (
    <div className="shadow-inner border rounded-lg p-4 bg-gray-200">
      <h2 className="text-2xl text-gray-400 border-b-2 border-gray-400 p-2 font-extrabold mb-2">
        Client Meeting Requests
      </h2>
      <p className="text-gray-400 font-semibold mb-4">
        This table lists all the meetings requested by clients. You can view
        details and manage these requests from here.
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-gray-700 border-b">
            <th className="px-4 py-2 text-left">Client</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id} className="border-b hover:bg-gray-50">
              <td
                className="px-4 py-2 text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={() => handleShow(meeting)}
              >
                {meeting.client_id}
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
                  className="bg-green-100 text-green-500 text-xs hover:bg-green-200 hover:text-green-700 flex items-center rounded px-2 py-1"
                  aria-label="Approve"
                  onClick={() => updateMeetingStatus(meeting.id, true)}
                >
                  <i className="fas fa-check mr-2"></i>Approve
                </button>
                <button
                  className="bg-gray-100 text-gray-500 text-xs hover:bg-gray-200 hover:text-gray-700 flex items-center rounded px-2 py-1"
                  aria-label="Mark as Done"
                  onClick={() => updateMeetingStatus(meeting.id, true)}
                >
                  <i className="fas fa-check-circle mr-2"></i>Mark as Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {meetingDetails && (
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
              <strong>Client:</strong> {meetingDetails.client}
            </p>
            <p className="mb-2">
              <strong>Date:</strong> {meetingDetails.date}
            </p>
            <p className="mb-2">
              <strong>Time:</strong> {meetingDetails.time}
            </p>
            <p>
              <strong>Message:</strong> {meetingDetails.message}
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
