// src/components/UpdateHabitForm.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHabitById, updateHabit } from "../services/habitService";

const UpdateHabitForm = () => {
  const { id } = useParams(); // Get the habit ID from URL
  const navigate = useNavigate(); // For navigation after updating
  const [habit, setHabit] = useState({
    name: "",
    description: "",
    categories: "",
    completionStatus: false,
  });
  const [loading, setLoading] = useState(true); // To handle the loading state

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const data = await getHabitById(id); // Fetch habit by ID
        setHabit({
          name: data.name,
          description: data.description,
          categories: data.categories.join(", "), // Join categories array into a comma-separated string
          completionStatus: data.completionStatus,
        });
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching habit:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchHabit(); // Fetch habit when component mounts
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHabit((prevHabit) => ({
      ...prevHabit,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriesArray = habit.categories
      .split(",")
      .map((category) => category.trim());

    try {
      await updateHabit(id, {
        ...habit,
        categories: categoriesArray,
      });
      alert("Habit updated successfully!");
      navigate("/"); // Redirect to home or list page after update
    } catch (error) {
      console.error("Error updating habit:", error);
      alert("Failed to update habit.");
    }
  };

  // Show loading message or form based on loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Habit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={habit.name}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Description:</label>
          <input
            type="text"
            name="description"
            value={habit.description}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">
            Categories (comma separated):
          </label>
          <input
            type="text"
            name="categories"
            value={habit.categories}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completionStatus"
            checked={habit.completionStatus}
            onChange={handleChange}
            className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-lg font-semibold">Completion Status</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Update Habit
        </button>
      </form>
    </div>
  );
};

export default UpdateHabitForm;
