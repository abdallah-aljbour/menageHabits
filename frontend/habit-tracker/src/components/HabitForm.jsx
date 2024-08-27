// src/components/HabitForm.jsx

import React, { useState, useEffect } from "react";
import { createHabit, updateHabit } from "../services/habitService";

const HabitForm = ({ habit, setSelectedHabit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [completionStatus, setCompletionStatus] = useState(false);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
      setCategories(habit.categories.join(", "));
      setCompletionStatus(habit.completionStatus);
    }
  }, [habit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriesArray = categories
      .split(",")
      .map((category) => category.trim());
    const habitData = {
      name,
      description,
      categories: categoriesArray,
      completionStatus,
    };

    try {
      if (habit) {
        await updateHabit(habit._id, habitData); // Update the existing habit
        setSelectedHabit(null); // Clear the selected habit
      } else {
        await createHabit(habitData); // Create a new habit
      }
      alert("Habit saved successfully!");
      setName("");
      setDescription("");
      setCategories("");
      setCompletionStatus(false);
    } catch (error) {
      console.error("Error saving habit:", error);
      alert("Failed to save habit.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {habit ? "Update Habit" : "Create Habit"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Categories (comma separated):
          </label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Completion Status:
            <input
              type="checkbox"
              checked={completionStatus}
              onChange={(e) => setCompletionStatus(e.target.checked)}
              className="ml-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {habit ? "Update Habit" : "Create Habit"}
        </button>
      </form>
    </div>
  );
};

export default HabitForm;
