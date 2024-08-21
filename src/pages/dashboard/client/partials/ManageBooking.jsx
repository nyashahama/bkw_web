import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import BookingModal from "../BookingModal";

export default function ManageBooking() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedBooking(null);
  };

  const bookingsPerPage = 2;

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

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
        const response = await axios.get(
          `http://localhost:4000/bookings/${userId}`
        );
        setBookings(response.data); // Set bookings data
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error || "Error fetching bookings");
        } else {
          setError("Network error");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      // Only fetch if userId is set
      fetchBookings();
    }
  }, [userId]);

  return (
    <div className="p-4 shadow-inner border bg-white rounded">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or event..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-xs rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && currentBookings.length === 0 && (
          <p>No bookings found.</p>
        )}
        {currentBookings.map((booking) => (
          <ol key={booking.id} className="pl-3" style={{ zIndex: 0 }}>
            <li className="mb-10 border shadow-inner rounded-lg relative">
              {/* <span
                // onClick={() => handleOpenModal(booking)}
                style={{ cursor: "pointer" }}
                className="absolute flex text-white items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -left-4 ring-8 ring-gray-50"
              >
                BK
              </span> */}
              <div
                className="p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-100 border-l-4 border-gray-200"
                style={{ cursor: "pointer" }}
              >
                <div className="flex justify-between border-b-2 items-center">
                  <h2 className="font-extrabold text-gray-400 mb-2 leading-6">
                    <i className="fas fa-book mr-1"></i>
                    {booking.service.title}
                  </h2>
                  <span className="text-gray-700">
                    <i className="fas fa-check-circle py-2 fa-xs text-success">
                      <span className="ml-2 mr-2">Paid</span>
                    </i>
                  </span>
                </div>
                <p className="text-gray-500 mt-2 text-xs mb-2 flex items-center">
                  <i className="far fa-calendar mr-2"></i>
                  Date booked:{" "}
                  {new Date(booking.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-500 mt-2 text-xs mb-2 flex items-center">
                  <i className="fas fa-cogs mr-2"></i>
                  {booking.service.title}: {booking.subcategory.name}
                </p>

                <p className="text-gray-500 mb-2 text-xs flex items-center">
                  <i className="fas fa-wallet mr-2"></i>
                  Deposit: R{booking.payment?.deposit || "0.00"}
                </p>
              </div>
            </li>
          </ol>
        ))}
      </div>

      <BookingModal
        show={modalShow}
        handleClose={handleCloseModal}
        booking={selectedBooking}
      />

      <div className="flex justify-center mt-6">
        <ReactPaginate
          previousLabel={
            <span className="text-gray-700 text-xs">
              <i className="fas fa-chevron-left mr-2"></i>
              prev
            </span>
          }
          nextLabel={
            <span className="text-gray-700 text-xs">
              next
              <i className="fas fa-chevron-right ml-2"></i>
            </span>
          }
          breakLabel={<span className="text-gray-500">...</span>}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center space-x-2"
          pageClassName="page-item"
          pageLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          previousClassName="page-item"
          previousLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          nextClassName="page-item"
          nextLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          breakClassName="page-item"
          breakLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          activeClassName="text-white border-blue-500"
        />
      </div>
    </div>
  );
}
