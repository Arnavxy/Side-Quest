import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import axios from "axios";
import Profile from "./Profile";
import "./CompanyDashboard.css";

function CompanyDashboard() {
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("current");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/company-projects",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleViewChange = (viewName) => {
    setView(viewName);
  };

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom>
        Company Dashboard
      </Typography>
      <Button onClick={() => handleViewChange("current")}>
        Current Projects
      </Button>
      <Button onClick={() => handleViewChange("upload")}>
        Upload Projects
      </Button>
      <Button onClick={() => handleViewChange("progress")}>Progress</Button>
      <Button onClick={() => handleViewChange("profile")}>Profile</Button>

      {view === "current" && (
        <div>
          <Typography variant="h6">Current Projects</Typography>
          {projects.length === 0 ? (
            <Typography>You don't have any current projects.</Typography>
          ) : (
            projects
              .filter((project) => project.status === "current")
              .map((project, index) => (
                <Paper key={index} className="project-card">
                  <Typography className="project-title">
                    {project.name}
                  </Typography>
                  <Typography>{project.description}</Typography>
                </Paper>
              ))
          )}
        </div>
      )}

      {view === "upload" && (
        <div>
          <Typography variant="h6">Upload Projects</Typography>
          <Typography>You can soon upload projects.</Typography>
        </div>
      )}

      {view === "progress" && (
        <div>
          <Typography variant="h6">Project Progress</Typography>
          {projects.length === 0 ? (
            <Typography>No projects to show progress for.</Typography>
          ) : (
            projects.map((project, index) => (
              <Paper key={index} className="project-card">
                <Typography className="project-title">
                  {project.name}
                </Typography>
                <Box className="progress-bar">
                  <Box
                    className="progress-bar-inner"
                    style={{ width: `${project.progress}%` }}
                  />
                </Box>
                <Typography>{project.progress}% Complete</Typography>
                <Typography>Students working on this project:</Typography>
                <ul>
                  {project.students.map((student, idx) => (
                    <li key={idx}>{student}</li>
                  ))}
                </ul>
              </Paper>
            ))
          )}
        </div>
      )}

      {view === "profile" && <Profile />}
    </Box>
  );
}

export default CompanyDashboard;
