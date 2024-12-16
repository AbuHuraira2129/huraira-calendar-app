import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ tasks }) => {
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["#4CAF50", "#FF5252"],
        hoverBackgroundColor: ["#66BB6A", "#FF867C"],
      },
    ],
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Task Progress</h3>
      <Pie data={data} />
    </div>
  );
};

export default ProgressChart;
