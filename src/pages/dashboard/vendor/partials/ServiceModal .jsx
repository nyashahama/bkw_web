import React from "react";
import { Modal, Button } from "react-bootstrap";

const getImageUrl = (title, fileName) => {
  const folder = title.toLowerCase().replace(/\s+/g, "").trim();
  return `${process.env.PUBLIC_URL}/${folder}/${fileName}`;
};

const ServiceModal = ({ showModal, handleCloseModal, selectedService }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} size={"xl"} centered>
      <Modal.Header closeButton className="bg-[#bfb59f] text-white">
        <Modal.Title>{selectedService?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-[#eff5f7] text-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {selectedService?.subcategories.map((sub, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg shadow-md p-2 flex flex-col"
            >
              <img
                src={getImageUrl(selectedService?.title, sub.file_url)}
                alt={sub.name}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg text-gray-500 font-semibold mb-2">
                {sub.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {sub.short_description}
              </p>
              <p className="text-sm font-medium text-gray-500">
                Price: R{sub.price}
              </p>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-[#bfb59f] text-white">
        <Button
          variant="secondary"
          onClick={handleCloseModal}
          className="d-flex align-items-center"
        >
          <i className="fa fa-times me-2"></i> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;
