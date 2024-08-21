import React from "react";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';


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

  const summaryData = [
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
      iconClass: "fa-music text-2xl text-purple-600",
    },
  ];

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Pie chart data
  const pieData = {
    labels: ['Completed', 'Pending', 'Canceled'],
    datasets: [
      {
        label: 'Event Status',
        data: [12, 7, 3], // Example data
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(255, 99, 132, 0.6)', // Red
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 shadow-inner rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-wider text-gray-500">
          Dashboard
        </h1>
        <div className="text-gray-600">
          <span className="text-lg">{currentDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-center space-x-4 border border-gray-200"
          >
            <div className="flex-shrink-0">
              <i className={`fas ${item.iconClass}`}></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                {item.title}
              </h2>
              <p className="text-2xl font-bold text-gray-900">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

     

   <div className="bg-gray-200 p-3 rounded-md">
   <div className="row">
        <div className="col-md-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Overview</h2>
        <Bar data={barData} options={barOptions} />
        </div>
        <div className="col-md-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Event Status</h2>
          <Pie data={pieData} />
        </div>
        </div>
      </div>
   </div>

   <div className="bg-gray-200 mt-4">
    <div className="row">
      <div className="col-md-12">
        

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase">
            <tr>
                <th scope="col" class="px-6 py-3">Service Name</th>
                <th scope="col" class="px-6 py-3">Vendor</th>
                <th scope="col" class="px-6 py-3">Category</th>
                <th scope="col" class="px-6 py-3">Price</th>
                <th scope="col" class="px-6 py-3">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Wedding Photography
                </th>
                <td class="px-6 py-4">John Doe Photography</td>
                <td class="px-6 py-4">Photography</td>
                <td class="px-6 py-4">R5000</td>
                <td class="px-6 py-4 flex space-x-2">
                    <a href="#" class="font-medium text-blue-600 hover:underline flex items-center">
                        <i class="fas fa-edit mr-2 fa-xs"></i>Edit
                    </a>
                    <a href="#" class="font-medium text-red-600 hover:underline flex items-center">
                        <i class="fas fa-trash-alt fa-xs mr-2"></i>Delete
                    </a>
                </td>
            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Floral Decorations
                </th>
                <td class="px-6 py-4">Bloom & Blossom</td>
                <td class="px-6 py-4">Decor</td>
                <td class="px-6 py-4">R3000</td>
                <td class="px-6 py-4 flex space-x-2">
                    <a href="#" class="font-medium text-blue-600 hover:underline flex items-center">
                        <i class="fas fa-edit mr-2 fa-xs"></i>Edit
                    </a>
                    <a href="#" class="font-medium text-red-600 hover:underline flex items-center">
                        <i class="fas fa-trash-alt fa-xs mr-2"></i>Delete
                    </a>
                </td>
            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Catering Service
                </th>
                <td class="px-6 py-4">Gourmet Delights</td>
                <td class="px-6 py-4">Catering</td>
                <td class="px-6 py-4">R8000</td>
                <td class="px-6 py-4 flex space-x-2">
                    <a href="#" class="font-medium text-blue-600 hover:underline flex items-center">
                        <i class="fas fa-edit mr-2 fa-xs"></i>Edit
                    </a>
                    <a href="#" class="font-medium text-red-600 hover:underline flex items-center">
                        <i class="fas fa-trash-alt fa-xs mr-2"></i>Delete
                    </a>
                </td>
            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    DJ Service
                </th>
                <td class="px-6 py-4">DJ Beats</td>
                <td class="px-6 py-4">Entertainment</td>
                <td class="px-6 py-4">R4000</td>
                <td class="px-6 py-4 flex space-x-2">
                    <a href="#" class="font-medium text-blue-600 hover:underline flex items-center">
                        <i class="fas fa-edit mr-2 fa-xs"></i>Edit
                    </a>
                    <a href="#" class="font-medium text-red-600 hover:underline flex items-center">
                        <i class="fas fa-trash-alt fa-xs mr-2"></i>Delete
                    </a>
                </td>
            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Wedding Cake
                </th>
                <td class="px-6 py-4">Sweet Treats Bakery</td>
                <td class="px-6 py-4">Cakes</td>
                <td class="px-6 py-4">R2500</td>
                <td class="px-6 py-4 flex space-x-2">
                    <a href="#" class="font-medium text-blue-600 hover:underline flex items-center">
                        <i class="fas fa-edit mr-2 fa-xs"></i>Edit
                    </a>
                    <a href="#" class="font-medium text-red-600 hover:underline flex items-center">
                        <i class="fas fa-trash-alt fa-xs mr-2"></i>Delete
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</div>


      </div>
    </div>
   </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button className="flex items-center px-4 py-1 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-300 ease-in-out">
          <i className="fas fa-cog text-lg mr-2 fa-xs"></i>
          Settings
        </button>
        <button className="flex items-center px-4 py-1 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition-colors duration-300 ease-in-out">
          <i className="fas fa-bell text-lg mr-2 fa-xs"></i>
          Notifications
        </button>
      </div>
    </div>
  );
};

export default Home;
