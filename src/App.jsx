import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import TaskModal from "./components/TaskModal";
import ProgressChartModal from "./components/ProgressChartModal";
import InteractiveCalendar from "./components/InteractiveCalendar";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Loaded tasks:", savedTasks); // Debugging log to verify task loading
    setTasks(savedTasks); // Set tasks from localStorage or an empty array if none exist
  }, []);

  // Save tasks to localStorage whenever tasks are updated
  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
    }
  }, [tasks]);

  const addTask = (task) => {
    if (editingTask) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...editingTask, ...task } : t
        )
      );
      setEditingTask(null);
    } else {
      // Add new task
      setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    }
    setShowTaskModal(false);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  // Helper function to compare dates (ignores time)
  const compareDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  // Filter tasks for the selected date
  const tasksForSelectedDate = tasks.filter((task) =>
    compareDates(task.date, selectedDate)
  );

  console.log("Filtered tasks for selected date:", tasksForSelectedDate); // Debugging log to verify task filtering

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
          Taskify Calendar - By Huraira
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Calendar */}
          <div className="col-span-1 lg:col-span-2">
            <InteractiveCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              tasks={tasks}
            />
          </div>

          {/* Task List Section */}
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
              Tasks for {selectedDate.toDateString()}
            </h2>
            <ul className="space-y-4">
              {tasksForSelectedDate.length === 0 ? (
                <li className="text-gray-500">No tasks for this date</li>
              ) : (
                tasksForSelectedDate.map((task) => (
                  <li
                    key={task.id}
                    className={`p-4 border rounded-lg flex justify-between items-center ${
                      task.completed
                        ? "bg-green-50 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    <span
                      className={`cursor-pointer ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.type}: {task.description}
                    </span>
                    <button
                      className="text-blue-500 underline"
                      onClick={() => editTask(task)}
                    >
                      Edit
                    </button>
                  </li>
                ))
              )}
            </ul>
            <button
              className="mt-6 w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              onClick={() => setShowTaskModal(true)}
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Progress Chart Button */}
        <button
          className="mt-12 mx-auto block bg-green-500 text-white px-6 py-3 rounded shadow-lg hover:bg-green-600"
          onClick={() => setShowProgressModal(true)}
        >
          Show Monthly Progress
        </button>

        {/* Modals */}
        {showTaskModal && (
          <TaskModal
            onClose={() => setShowTaskModal(false)}
            onAddTask={addTask}
            selectedDate={selectedDate}
            taskToEdit={editingTask}
          />
        )}
        {showProgressModal && (
          <ProgressChartModal
            onClose={() => setShowProgressModal(false)}
            tasks={tasks}
          />
        )}
      </div>
    </div>
  );
};

export default App;
