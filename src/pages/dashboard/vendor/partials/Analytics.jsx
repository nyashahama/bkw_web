import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register the components with Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  // Example data for the charts
  const monthlyBookingsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Number of Bookings',
        data: [10, 20, 15, 25, 30, 18, 22], // Example data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const monthlyBookingsOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const bookingStatusData = {
    labels: ['Confirmed', 'Pending', 'Canceled'],
    datasets: [
      {
        label: 'Booking Status',
        data: [40, 10, 5], // Example data
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Teal
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(255, 99, 132, 0.6)', // Red
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 shadow-inner rounded">
      <h1 className="text-2xl font-bold tracking-wider text-gray-500 mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Monthly Bookings
          </h2>
          <Bar data={monthlyBookingsData} options={monthlyBookingsOptions} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Booking Status Distribution
          </h2>
          <Pie data={bookingStatusData} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
