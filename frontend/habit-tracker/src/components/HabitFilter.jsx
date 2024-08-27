// src/components/HabitFilter.jsx

import React, { useState } from "react";
import { getHabitsByCategory } from "../services/habitService";

const HabitFilter = ({ setHabits }) => {
  const [category, setCategory] = useState("");

  const handleFilter = async () => {
    try {
      const filteredHabits = await getHabitsByCategory(category);
      setHabits(filteredHabits); // Set the filtered habits in the parent component
    } catch (error) {
      console.error("Error filtering habits:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Filter Habits</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleFilter}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Filter Habits
        </button>
      </div>
    </div>
  );
};

export default HabitFilter;
