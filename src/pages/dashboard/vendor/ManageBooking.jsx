import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function ManageBooking() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0); // 0-based index for ReactPaginate
  const [searchQuery, setSearchQuery] = useState("");

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
        if (userId) {
          const response = await axios.get(
            `http://localhost:4000/vendor_bookings/${userId}`
          );
          setBookings(response.data);
          console.log(response.data);
        }
      } catch (error) {
        setError(error.response ? error.response.data.error : "Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const bookingsPerPage = 2;

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.title?.toLowerCase().includes(searchQuery.toLowerCase()) || // Adjust based on your actual data
      booking.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBooking = (currentPage + 1) * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset to first page on search
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 rounded">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 text-xs bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
        {currentBookings.map((booking) => (
          <ol key={booking.id} className="pl-3" style={{ zIndex: 0 }}>
            <li className="mb-10 shadow-inner rounded-lg relative">
              <span className="absolute flex text-white items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -left-4 ring-8 ring-[#eff5f7]">
                Bw
              </span>
              <div
                className="p-4 rounded-lg bg-white border-l-4 border-gray-200"
                style={{ cursor: "pointer" }}
              >
                <div className="flex flex-col p-2">
                  <div className="flex-1 border-b-2 p-1">
                    <h2 className="font-extrabold text-xl text-gray-400 leading-6 flex items-center">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      {booking.title || "No Title"}
                    </h2>
                  </div>
                  <div className="flex items-center mt-2">
                    <i className="fas fa-calendar-day mr-2 text-gray-500"></i>
                    <span className="text-gray-600">
                      {booking.date || "No Date"}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <i className="fas fa-map-marker-alt mr-2 text-gray-500"></i>
                    <span className="text-gray-600">
                      {booking.location || "No Location"}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <i className="fas fa-info-circle mr-2 text-gray-500"></i>
                    <span className="text-gray-600">
                      {booking.description || "No Description"}
                    </span>
                  </div>
                  <div className="flex justify-start mt-3">
                    <button className="bg-blue-500 btn-sm text-xs text-white py-2 px-4 rounded mr-2 hover:bg-blue-600 flex items-center">
                      <i className="fas fa-check mr-2"></i> Approve
                    </button>
                    <button className="bg-red-500 btn-sm text-xs text-white py-2 px-4 rounded hover:bg-red-600 flex items-center">
                      <i className="fas fa-times mr-2"></i> Reject
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        ))}
      </div>

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
