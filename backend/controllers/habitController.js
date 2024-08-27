// controllers/habitController.js

const Habit = require("../models/habit");

// Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const habit = new Habit(req.body);
    const savedHabit = await habit.save();
    res.status(201).json(savedHabit); // Return the created habit as JSON
  } catch (err) {
    res.status(400).json({ error: err.message }); // Return error message as JSON
  }
};

// Get all habits
exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits); // Return JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return error message as JSON
  }
};

// Get habits by category
exports.getHabitsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category)
      return res.status(400).json({ error: "Category is required" });

    const habits = await Habit.find({ categories: category });
    res.json(habits); // Return JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return error message as JSON
  }
};

// Update a habit
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json(habit); // Return updated habit as JSON
  } catch (err) {
    res.status(400).json({ error: err.message }); // Return error message as JSON
  }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.status(200).json({ message: "Habit deleted successfully" }); // Return success message as JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return error message as JSON
  }
};
