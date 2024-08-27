// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import UpdateHabitForm from "./components/UpdateHabitForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HabitList />} />
        <Route path="/create" element={<HabitForm />} />
        <Route path="/update/:id" element={<UpdateHabitForm />} />
      </Routes>
    </Router>
  );
};

export default App;
