import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {AdminDashboard} from "./Home/AdminDashboard"
import {LoginPage} from "../src/LoginPage/LoginPage"

const StudentDashboard = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold">Student Dashboard</h2>
    <p>Welcome, Student!</p>
  </div>
);

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage  />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
    </Routes>
  </Router>
  );
};

export default App;
