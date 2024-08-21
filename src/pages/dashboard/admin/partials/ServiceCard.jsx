
import React from 'react';

const ServiceCard = ({ service, onApprove, onDecline, onAddBooking }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200">
     
      <img
        src={service.imageUrl} 
        alt={service.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      
      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-gray-700 mb-4">{service.description}</p>
      <div className="">
        <button
          onClick={() => onApprove(service.id)}
          className="bg-green-500 text-white btn-sm py-2 mr-2 px-4 rounded-lg hover:bg-green-600"
        >
          Approve
        </button>
        <button
          onClick={() => onDecline(service.id)}
          className="bg-red-500 text-white py-2 px-4 btn-sm mr-2 rounded-lg hover:bg-red-600"
        >
          Decline
        </button>
        
      </div>
    </div>
  );
};

export default ServiceCard;
