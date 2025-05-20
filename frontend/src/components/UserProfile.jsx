import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/UserProfile.css'; // Import CSS file

const UserProfile = () => {
  const [profileData, setProfileData] = useState({ name: "", wallet: "", email: "" });
  const [isProfileExists, setIsProfileExists] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fromLogin = location.state?.fromLogin || false;

  useEffect(() => {
  const checkUserProfile = async () => {
    const token = localStorage.getItem("token")?.trim();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User Profile Data Fetched: ", res.data);

      if (res.data?.wallet && res.data?.name && res.data?.email) {
  setIsProfileExists(true);
  if (fromLogin) {
  navigate("/dashboard", { state: { userEmail: res.data.email } });
}
} else {
  setProfileData({
    name: res.data.name || "",
    wallet: res.data.wallet || "",
    email: res.data.email || "",
  });
}

    } catch (err) {
      console.error("Error checking user profile", err);
      navigate("/login");
    }
  };

  checkUserProfile();
}, [navigate, fromLogin]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token")?.trim();
  if (!token) {
    alert("User not authenticated");
    navigate("/login");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/user/profile", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(res.data.message);
    navigate("/add-assets", { state: { userEmail: profileData.email } });
  } catch (err) {
    alert(err.response?.data?.message || "Profile setup failed");
  }
};

  const handleSkip = () => {
    navigate("/dashboard", { state: { userEmail: profileData.email } });

  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-content">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profileData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="wallet"
            placeholder="Wallet Address"
            value={profileData.wallet}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profileData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">Save Profile</button>
        </form>

        {isProfileExists && (
          <button onClick={handleSkip} className="skip-button">
            Skip — Already have an account? Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
