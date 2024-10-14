import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'],
    datasets: [
      {
        label: 'Percentage Marks',
        data: [85, 90, 75, 80, 95],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: 'transparent', // Set border color to transparent
        borderWidth: 0, // Set border width to 0
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        max: 100,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4">Department Percentage Marks</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
