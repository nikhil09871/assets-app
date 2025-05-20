import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../styles/Signup.css"; // ✅ Import CSS

const Signup = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Investor",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
    alert(res.data.message);

    if (res.data.token) {
      // Save token to localStorage
      localStorage.setItem("token", res.data.token);
      // Optionally save user info if needed
      navigate("/user-profile"); // or "/dashboard" depending on your flow
    } else {
      // If no token returned (unlikely with this fix), navigate to login
      navigate("/");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <select name="role" onChange={handleChange}>
            <option>Investor</option>
            <option>Admin</option>
            <option>Manager</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>

        {/* ✅ Button to go to Login page */}
        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <button className="redirect-button" onClick={() => navigate("/")}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
