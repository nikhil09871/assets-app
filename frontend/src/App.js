import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import UserProfile from "./components/UserProfile"; // Assuming you have this component
//import Dashboard from "./components/Dashboard";
import Dashboard from './components/Dashboard'; // ✅ Adjust the path if needed
import AddAssets from './components/AddAssets';


function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-assets" element={<AddAssets />} />
      </Routes>
    </Router>
  );
}

export default App;
