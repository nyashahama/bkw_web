import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ServiceModal from "./partials/ServiceModal";
import axios from "axios";

export default function Exploreservices() {
  const [services, setServicesWithSubcategories] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const itemsPerPage = 2;

  // Filter services based on search term
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate services
  const pageCount = Math.ceil(filteredServices.length / itemsPerPage);
  const displayedServices = filteredServices.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleServiceClick = (service) => {
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

        const response = await axios.get(`http://localhost:4000/services`);
        setServicesWithSubcategories(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="rounded">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search services..."
          className="p-3 rounded bg-[#d2c2b2] text-white border w-full text-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ol className="relative">
        {displayedServices.map((service) => (
          <ol className="pl-3" style={{ zIndex: 0 }}>
            <li
              key={service.id}
              className="mb-10 border shadow-inner rounded-lg relative"
            >
              <span
                onClick={() => handleServiceClick(service)}
                className="absolute flex text-white items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -left-4 ring-8 ring-[#eff5f7] cursor-pointer"
              >
                BK
              </span>
              <div
                className="p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-100 border-l-4 border-gray-200"
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center">
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg mb-4">
                    <img
                      src="https://imgs.search.brave.com/usoDBx--ei-hNOeY9dbTqJfx-Od9LdfN0NSivlu5Skc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8x/MS8yMC8yMC8xMi9o/ZWxpY29wdGVyLTI5/NjY1NjlfNjQwLmpw/Zw"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      alt="Service Image"
                    />
                    <h1 className="absolute bottom-0 left-0 p-3 text-xl font-bold text-white bg-black bg-opacity-50 rounded-tr-lg">
                      {service.title}
                    </h1>
                  </div>
                </div>

                <p className="text-normal ">{service.description}</p>
              </div>
            </li>
          </ol>
        ))}
      </ol>

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
        containerClassName="flex justify-center items-center space-x-2"
        pageClassName="page-item"
        pageLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        previousClassName="page-item"
        previousLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        nextClassName="page-item "
        nextLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        breakClassName="page-item"
        breakLinkClassName="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        activeClassName=" text-white border-blue-500"
      />

      <ServiceModal
        show={showModal}
        onHide={handleCloseModal}
        service={selectedService}
      />
    </div>
  );
}
