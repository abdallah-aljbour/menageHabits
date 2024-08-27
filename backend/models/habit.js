const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Habit schema
const habitSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false, // Make this field optional
    trim: true,
  },
  categories: {
    type: [String], // Array of strings
    required: true,
  },
  completionStatus: {
    type: Boolean,
    default: false, // Set default value to false
  },
});

// Create and export the model
const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
