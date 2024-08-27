// src/services/habitService.js

import axios from "axios";

const API_URL = "http://localhost:3000/api/habits"; // Update with your API URL

// Create a new habit
export const createHabit = async (habitData) => {
  try {
    const response = await axios.post(API_URL, habitData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

// Retrieve all habits
export const getAllHabits = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
};

// Retrieve a habit by ID
export const getHabitById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching habit by ID:", error);
    throw error;
  }
};

// Update an existing habit
export const updateHabit = async (id, habitData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, habitData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating habit:", error);
    throw error;
  }
};

// Get habits by category
export const getHabitsByCategory = async (category) => {
  const response = await axios.get(`${API_URL}/filter`, {
    params: { category },
  });
  return response.data;
};

// Get all habits
export const getHabits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
