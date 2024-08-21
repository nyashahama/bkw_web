import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";
import ProfileCard from "./ProfileCard";
import BookingModal from "./BookingModal";
import ModalComponent from "./ModalComponent";

const ServiceModal = ({ show, onHide, service }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [modalStates, setModalStates] = useState({
    showBookingModal: {},
    showServiceModal: {},
  });

  const [isProfileCardVisible, setProfileCardVisible] = useState(false);

  const toggleModalState = (subcategoryName, modalType, isOpen) => {
    setModalStates((prev) => ({
      ...prev,
      [modalType]: {
        ...prev[modalType],
        [subcategoryName]: isOpen,
      },
    }));
  };

  const handleBookNow = async (serviceId, subcategoryName) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      throw new Error("User not found in local storage");
    }
    const userId = user.id;
    if (!userId) {
      console.error("User ID is not available in local storage");
      return;
    }
    toast.success("Booking submitted successfully");
  };

  if (!service) return null;

  const getImageUrl = (title, fileName) => {
    const folder = title.toLowerCase().replace(/\s+/g, "").trim();
    return `${process.env.PUBLIC_URL}/${folder}/${fileName}`;
  };

  const toggleProfileCardVisibility = () => {
    setProfileCardVisible((prev) => !prev);
  };

  return (
    <Modal show={show} size="xl" onHide={onHide}>
      <Modal.Header closeButton className="bg-[#bfb59f] text-white">
        <Modal.Title>{service.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-[#eff5f7] text-gray-300">
        {service.subcategories && (
          <div className="row">
            {service.subcategories.map((subcategory) => (
              <div key={subcategory.name} className="col-md-6 mb-4">
                <Card className="h-100 bg-gray-200 rounded-lg shadow-md">
                  <Card.Img
                    variant="top"
                    src={getImageUrl(service?.title, subcategory.file_url)}
                    className="w-full h-48 object-cover"
                    alt={subcategory.name}
                  />

                  <Card.Body>
                    <Card.Title className="font-extrabold text-gray-600">
                      {subcategory.name}
                    </Card.Title>
                    <Card.Text className="text-gray-500">
                      {subcategory.short_description}
                    </Card.Text>
                    <Card.Text className="font-extrabold text-gray-600 mt-2">
                      R{subcategory.price}
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="mt-2 text-xs"
                      onClick={() =>
                        toggleModalState(
                          subcategory.name,
                          "showServiceModal",
                          true
                        )
                      }
                    >
                      <i className="fas fa-calendar-check mr-2"></i>
                      Book Now
                    </Button>
                    <Button
                      variant="secondary"
                      className="mt-2 text-xs ml-2"
                      onClick={() =>
                        toggleModalState(
                          subcategory.name,
                          "showBookingModal",
                          true
                        )
                      }
                    >
                      <i className="fas fa-calendar-alt mr-2"></i>
                      Book Viewing
                    </Button>
                  </Card.Body>
                </Card>
                <BookingModal
                  show={modalStates.showBookingModal[subcategory.name] || false}
                  handleClose={() =>
                    toggleModalState(
                      subcategory.name,
                      "showBookingModal",
                      false
                    )
                  }
                  subcategory={subcategory}
                  userId={service.user_id}
                />
                <ModalComponent
                  isOpen={
                    modalStates.showServiceModal[subcategory.name] || false
                  }
                  onRequestClose={() =>
                    toggleModalState(
                      subcategory.name,
                      "showServiceModal",
                      false
                    )
                  }
                  service={service}
                  subcategory={subcategory}
                />
              </div>
            ))}
          </div>
        )}

        <Button
          variant="info"
          onClick={toggleProfileCardVisibility}
          className="mb-3 text-white "
        >
          {isProfileCardVisible ? (
            <>
              <i className="fas fa-eye-slash mr-2"></i> Hide Vendor
            </>
          ) : (
            <>
              <i className="fas fa-eye mr-2"></i> Show Vendor
            </>
          )}
        </Button>

        {isProfileCardVisible && <ProfileCard user_id={service.user_id} />}
      </Modal.Body>
      <Modal.Footer className="bg-[#bfb59f] text-white">
        <Button variant="secondary" className="text-xs" onClick={onHide}>
          <i className="fas fa-times mr-2"></i> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;
