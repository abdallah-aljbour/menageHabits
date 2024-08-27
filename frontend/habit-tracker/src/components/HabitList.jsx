// src/components/HabitList.jsx

import React, { useState, useEffect } from "react";
import { getHabits } from "../services/habitService";
import HabitFilter from "./HabitFilter";
import HabitForm from "./HabitForm"; // Import the form component

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabits();
        setHabits(data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  const handleUpdateClick = (habit) => {
    setSelectedHabit(habit);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Habit List</h1>
      <HabitFilter setHabits={setHabits} />
      {selectedHabit && (
        <HabitForm habit={selectedHabit} setSelectedHabit={setSelectedHabit} />
      )}
      <div className="space-y-4 mt-8">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div key={habit._id} className="p-4 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">{habit.name}</h3>
              <p>{habit.description}</p>
              <p className="text-gray-600">
                Categories: {habit.categories.join(", ")}
              </p>
              <p className="text-gray-600">
                Completed: {habit.completionStatus ? "Yes" : "No"}
              </p>
              <button
                onClick={() => handleUpdateClick(habit)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
            </div>
          ))
        ) : (
          <p>No habits found</p>
        )}
      </div>
    </div>
  );
};

export default HabitList;
