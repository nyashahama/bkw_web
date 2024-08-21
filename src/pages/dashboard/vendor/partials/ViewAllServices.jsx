import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import ServiceModal from "./ServiceModal ";

export default function ViewAllServices() {
  const [services, setServicesWithSubcategories] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 2;

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredServices.length / itemsPerPage);
  const displayedServices = filteredServices.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          throw new Error("User not found in local storage");
        }

        const userId = user.id;

        const response = await axios.get(
          `http://localhost:4000/services/${userId}`
        );
        setServicesWithSubcategories(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="rounded text-white">
      {services.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full p-3 rounded-lg bg-[#d2c2b2] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {displayedServices.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          {displayedServices.map((service) => (
            <li
              key={service.title}
              className="bg-gradient-to-r from-gray-200 to-gray-200 rounded-lg  hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleOpenModal(service)}
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg mb-4">
                <img
                  src="https://imgs.search.brave.com/usoDBx--ei-hNOeY9dbTqJfx-Od9LdfN0NSivlu5Skc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8x/MS8yMC8yMC8xMi9o/ZWxpY29wdGVyLTI5/NjY1NjlfNjQwLmpw/Zw"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  alt="Service Image"
                />
                <h1 className="absolute bottom-0 left-0 p-3 text-xl font-bold text-white bg-black bg-opacity-50 rounded-tr-lg">
                  {service.title}
                </h1>
              </div>
              <p className="text-gray-800 mb-2 px-2">{service.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 mt-20 mb-20">
          <i className="fas fa-info-circle fa-3x mb-4"></i>
          <p className="text-lg font-bold">No services found</p>
        </div>
      )}

      {services.length > 0 && (
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
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center space-x-2 mt-8"
          pageClassName="page-item"
          pageLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          previousClassName="page-item"
          previousLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          nextClassName="page-item"
          nextLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          breakClassName="page-item"
          breakLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
          activeClassName="text-white   rounded-md"
        />
      )}

      {selectedService && (
        <ServiceModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          selectedService={selectedService}
        />
      )}
    </div>
  );
}
