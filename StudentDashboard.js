import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import axios from "axios";
import AvatarSelection from "./AvatarSelection";
import Profile from "./Profile";
import Leaderboard from "./Leaderboard";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("projects");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/projects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleAvatarSelect = () => {
    setView("profile");
  };

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Button onClick={() => setView("projects")}>Projects</Button>
      <Button onClick={() => setView("avatar")}>Avatar Selection</Button>
      <Button onClick={() => setView("profile")}>Profile</Button>
      <Button onClick={() => setView("leaderboard")}>Leaderboard</Button>
      {view === "projects" && (
        <div>
          {projects.map((project, index) => (
            <Paper key={index} className="project-card">
              <Typography className="project-title">{project.name}</Typography>
              <Box className="progress-bar">
                <Box
                  className="progress-bar-inner"
                  style={{ width: `${project.progress}%` }}
                />
              </Box>
              <Typography>{project.progress}% Complete</Typography>
            </Paper>
          ))}
        </div>
      )}
      {view === "avatar" && (
        <AvatarSelection onAvatarSelect={handleAvatarSelect} />
      )}
      {view === "profile" && <Profile />}
      {view === "leaderboard" && <Leaderboard />}
    </Box>
  );
}

export default StudentDashboard;
