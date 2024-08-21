import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Home = () => {
  const currentDate = format(new Date(), "MMMM dd, yyyy");

  const [summaryData, setSummaryData] = useState([
    {
      title: "Today's Bookings",
      count: 12,
      iconClass: "fa-calendar-day text-2xl text-blue-600",
    },
    {
      title: "Total Revenue",
      count: "R2000",
      iconClass: "fa-dollar-sign text-2xl text-green-600",
    },
    {
      title: "Upcoming Events",
      count: 8,
      iconClass: "fa-calendar-check text-2xl text-purple-600",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      serviceName: "Wedding Photography",
      clientName: "Alice Johnson",
      eventDate: "2024-09-12",
      status: "Confirmed",
    },
    {
      serviceName: "Floral Decorations",
      clientName: "Mark Lee",
      eventDate: "2024-10-05",
      status: "Pending",
    },
    {
      serviceName: "Catering Service",
      clientName: "Emily Davis",
      eventDate: "2024-08-22",
      status: "In Progress",
    },
    {
      serviceName: "DJ Service",
      clientName: "Michael Brown",
      eventDate: "2024-11-30",
      status: "Pending",
    },
    {
      serviceName: "Wedding Cake",
      clientName: "Sarah Wilson",
      eventDate: "2024-12-15",
      status: "Confirmed",
    },
  ]);

  const [barData, setBarData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  });

  const [pieData, setPieData] = useState({
    labels: ["Completed", "Pending", "Canceled"],
    datasets: [
      {
        label: "Event Status",
        data: [12, 7, 3],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [showModal, setShowModal] = useState(false); // Define showModal state
  const [currentOrderIndex, setCurrentOrderIndex] = useState(null); // Define currentOrderIndex state
  const [selectedStatus, setSelectedStatus] = useState(""); // Define selectedStatus state

  useEffect(() => {
    // Update the summary data counts based on the orders
    const totalBookings = orders.length;
    const totalRevenue = `R${orders.length * 200}`; // Assuming each order contributes R200 to revenue
    const upcomingEvents = orders.filter(
      (order) => new Date(order.eventDate) >= new Date()
    ).length;

    setSummaryData([
      {
        title: "Total Bookings",
        count: totalBookings,
        iconClass: "fa-calendar-day text-2xl text-[#d2c2b2]",
      },
      {
        title: "Total Revenue",
        count: totalRevenue,
        iconClass: "fa-dollar-sign text-2xl text-[#d2c2b2]",
      },
      {
        title: "Upcoming appoitments",
        count: upcomingEvents,
        iconClass: "fa-calendar-check text-2xl text-[#d2c2b2]",
      },
    ]);

    // Update the Pie chart data based on the order status
    const completed = orders.filter(
      (order) => order.status === "Completed"
    ).length;
    const pending = orders.filter((order) => order.status === "Pending").length;
    const canceled = orders.filter(
      (order) => order.status === "Cancelled"
    ).length;

    setPieData({
      labels: ["Completed", "Pending", "Canceled"],
      datasets: [
        {
          label: "Event Status",
          data: [completed, pending, canceled],
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [orders]);

  const openModal = (index) => {
    setCurrentOrderIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStatus("");
  };

  const updateOrderStatus = () => {
    if (currentOrderIndex !== null) {
      const updatedOrders = [...orders];
      updatedOrders[currentOrderIndex].status = selectedStatus;
      setOrders(updatedOrders);
    }
    closeModal();
  };

  const cancelOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  return (
    <div className="p-4 shadow-inner bg-gray-200 border rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold tracking-wider text-gray-500">
          Dashboard
        </h1>
        <div className="text-gray-600">
          <span className="text-lg">{currentDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b-2 pb-4 border-gray-300 mb-6">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-120 p-4 rounded-lg shadow-inner hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-center space-x-4 border border-gray-200"
          >
            <div className="flex-shrink-0">
              <i className={`fas  ${item.iconClass} text-5xl`}></i>
            </div>
            <div>
              <h2 className="text-medium font-extrabold text-gray-500">
                {item.title}
              </h2>
              <p className="text-medium font-extrabold text-gray-500">
                {item.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-gray-200 p-3 rounded-md">
        <div className="row">
          <div className="col-md-8">
            <h2 className="text-xl font-extrabold text-gray-500 mb-4">
              Sales Overview
            </h2>
            <Bar
              data={barData}
              options={{ scales: { y: { beginAtZero: true } } }}
              className="shadow-inner p-3 border"
            />
          </div>
          <div className="col-md-4">
            <div>
              <h2 className="text-xl font-extrabold text-gray-500 mb-4">
                Services Status
              </h2>
              <Pie data={pieData} className="shadow-inner p-3 border" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 shadow-inner mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Service Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Client Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Event Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {order.serviceName}
                      </th>
                      <td className="px-6 py-4">{order.clientName}</td>
                      <td className="px-6 py-4">{order.eventDate}</td>
                      <td className="px-6 py-4">{order.status}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button
                          onClick={() => openModal(index)}
                          className="font-medium text-blue-600 hover:underline flex items-center"
                        >
                          <i className="fas fa-edit mr-2 fa-xs"></i>Update
                          Status
                        </button>
                        <button
                          onClick={() => cancelOrder(index)}
                          className="font-medium text-red-600 hover:underline flex items-center"
                        >
                          <i className="fas fa-times-circle fa-xs mr-2"></i>
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal for Updating Status */}
            {showModal && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Update Order Status
                  </h2>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      onClick={closeModal}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={updateOrderStatus}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
