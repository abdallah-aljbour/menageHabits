// app.js
const express = require("express");
const habitRoutes = require("./routes/habitRoutes");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

app.use(express.json());
app.use(cors());

// Use routes
app.use("/api", habitRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
