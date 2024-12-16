import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChartModal = ({ onClose, tasks }) => {
  const taskCounts = tasks.reduce((acc, task) => {
    if (new Date(task.date).getMonth() === new Date().getMonth()) {
      acc[task.type] = (acc[task.type] || 0) + (task.completed ? 1 : 0);
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(taskCounts),
    datasets: [
      {
        data: Object.values(taskCounts),
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#FF5252"],
        hoverBackgroundColor: ["#66BB6A", "#FFC107", "#42A5F5", "#FF867C"],
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h3 className="text-xl font-bold mb-4">Monthly Progress</h3>
        <Pie data={data} />
        <button
          className="mt-4 bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProgressChartModal;
