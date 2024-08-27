// routes/habitRoutes.js

const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");

// Define routes
router.post("/habits", habitController.createHabit);
router.get("/habits", habitController.getAllHabits);
router.get("/habits/filter", habitController.getHabitsByCategory); // New route for filtering
router.put("/habits/:id", habitController.updateHabit);
router.delete("/habits/:id", habitController.deleteHabit);

module.exports = router;
