import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        alert("Login successful!");
        console.log("JWT Token:", token);
        navigate("/user-profile", { state: { fromLogin: true } }); // Pass flag to UserProfile
      } else {
        alert("Token not received.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="signup-text">Don't have an account?</p>
        <button className="signup-button" onClick={() => navigate("/signup")}>
          Go to Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
