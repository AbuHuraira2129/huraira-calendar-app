import React, { useState } from "react";

const TodoModal = ({ onSave, onClose }) => {
  const [taskName, setTaskName] = useState("");

  const handleSave = () => {
    if (taskName.trim()) {
      onSave({ name: taskName, completed: false });
      setTaskName("");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md">
        <h4 className="text-lg font-bold mb-2">Add New Task</h4>
        <input
          type="text"
          className="border p-2 w-full rounded-md"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
