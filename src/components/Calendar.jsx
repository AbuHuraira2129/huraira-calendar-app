import React, { useState } from "react";
import dayjs from "dayjs";
import { FiPlusCircle } from "react-icons/fi";
import DayView from "./DayView";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasksByDate, setTasksByDate] = useState({});

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("month").day();

  const days = Array(firstDayOfMonth)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));

  const addTask = (date, task) => {
    const dateKey = date.format("YYYY-MM-DD");
    const tasks = tasksByDate[dateKey] || [];
    setTasksByDate({ ...tasksByDate, [dateKey]: [...tasks, task] });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-gray-500 hover:text-blue-600 transition"
        >
          &larr; Previous
        </button>
        <h2 className="text-xl font-bold text-gray-700">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-gray-500 hover:text-blue-600 transition"
        >
          Next &rarr;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-gray-600 font-medium">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const date = day && currentMonth.date(day);
          const dateKey = date?.format("YYYY-MM-DD");
          const tasks = tasksByDate[dateKey] || [];

          return (
            <div
              key={index}
              className={`relative p-4 border rounded-md cursor-pointer transition ${
                day ? "hover:bg-blue-100" : "bg-gray-200"
              }`}
              onClick={() => day && setSelectedDate(date)}
            >
              {/* Day Number */}
              {day && (
                <span className="block font-bold text-gray-800">{day}</span>
              )}

              {/* Task Indicator */}
              {tasks.length > 0 && (
                <div className="absolute bottom-1 right-1 bg-green-500 text-white text-xs rounded-full px-2">
                  {tasks.length} task{tasks.length > 1 ? "s" : ""}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Day View Modal */}
      {selectedDate && (
        <DayView
          date={selectedDate}
          tasks={tasksByDate[selectedDate.format("YYYY-MM-DD")] || []}
          onAddTask={(task) => addTask(selectedDate, task)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
