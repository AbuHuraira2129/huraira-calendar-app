import React from "react";
import ProgressChart from "./ProgressChart";
import { FiPlusCircle } from "react-icons/fi";

const DayView = ({ date, tasks, onAddTask, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Tasks for {date.format("MMMM DD, YYYY")}
        </h2>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-gray-100 p-2 rounded-lg shadow-sm mb-2 flex justify-between"
            >
              <span>{task.name}</span>
              <span
                className={task.completed ? "text-green-500" : "text-red-500"}
              >
                {task.completed ? "✔" : "✖"}
              </span>
            </li>
          ))}
        </ul>
        <button
          className="flex items-center mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          onClick={() =>
            onAddTask({ name: `Task ${tasks.length + 1}`, completed: false })
          }
        >
          <FiPlusCircle className="mr-2" /> Add Task
        </button>
        <ProgressChart tasks={tasks} />
        <button
          className="mt-4 text-gray-500 underline hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DayView;
