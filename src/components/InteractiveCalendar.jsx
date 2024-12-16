import React from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isToday,
} from "date-fns";

const InteractiveCalendar = ({ selectedDate, setSelectedDate, tasks }) => {
  const days = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  const tasksByDate = tasks.reduce((acc, task) => {
    const dateKey = new Date(task.date).toDateString();
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-white shadow-2xl p-6 rounded-3xl">
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-gray-600">
            {day}
          </div>
        ))}

        {/* Days of the Month */}
        {days.map((day) => {
          const isSelected = day.toDateString() === selectedDate.toDateString();
          const taskCount = tasksByDate[day.toDateString()] || 0;

          return (
            <div
              key={day}
              className={`relative p-2 rounded-lg cursor-pointer ${
                isToday(day)
                  ? "bg-indigo-100 border border-indigo-500"
                  : "bg-gray-50"
              } ${isSelected ? "bg-indigo-200" : ""} hover:bg-indigo-50`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-center font-bold text-gray-700">
                {format(day, "d")}
              </div>
              {taskCount > 0 && (
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveCalendar;
