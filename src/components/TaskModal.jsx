import React, { useState, useEffect } from "react";

const TaskModal = ({ onClose, onAddTask, selectedDate, taskToEdit }) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  // Set the modal's form fields when editing an existing task
  useEffect(() => {
    if (taskToEdit) {
      setType(taskToEdit.type || "");
      setDescription(taskToEdit.description || "");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type && description) {
      onAddTask({ type, description, date: selectedDate });
      setType("");
      setDescription("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {taskToEdit ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Task Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {taskToEdit ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
