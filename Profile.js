import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        console.log("Token:", token); // Logging the token
        const response = await axios.get("http://localhost:3001/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Profile response:", response.data); // Logging the response
        setUser(response.data.user);
      } catch (error) {
        console.error("Profile fetch error:", error); // Logging the error
        alert("Failed to fetch profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Points: {user.points}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
