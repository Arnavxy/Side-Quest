import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import CompanyDashboard from "./components/CompanyDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import AvatarSelection from "./components/AvatarSelection";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(false); // Simulate loading complete
  }, []);

  const requireAuth = (element) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Login goBack={() => navigate("/")} />;
    }
    return element;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="landing-container">
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route
              path="/register-company"
              element={
                <Register isCompany={true} goBack={() => navigate("/")} />
              }
            />
            <Route
              path="/register-student"
              element={
                <Register isCompany={false} goBack={() => navigate("/")} />
              }
            />
            <Route
              path="/login"
              element={<Login goBack={() => navigate("/")} />}
            />
            <Route
              path="/company-dashboard"
              element={requireAuth(<CompanyDashboard />)}
            />
            <Route
              path="/student-dashboard"
              element={requireAuth(<StudentDashboard />)}
            />
            <Route path="/profile" element={requireAuth(<Profile />)} />
            <Route path="/leaderboard" element={requireAuth(<Leaderboard />)} />
            <Route
              path="/avatar-selection"
              element={requireAuth(<AvatarSelection />)}
            />
            <Route
              path="/"
              element={
                <div className="container">
                  <div className="half red-half">
                    <button
                      className="button"
                      onClick={() => navigate("/register-company")}
                    >
                      Place a Bounty
                    </button>
                    <div className="info">
                      <h2>For Companies</h2>
                      <p>
                        Place a project and let students complete it for you.
                      </p>
                    </div>
                  </div>
                  <div className="half blue-half">
                    <button
                      className="button"
                      onClick={() => navigate("/register-student")}
                    >
                      Hunt the Bounty
                    </button>
                    <div className="info">
                      <h2>For Students</h2>
                      <p>Register to hunt bounties and complete projects.</p>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <div className="content">
        <h2>About Side Quest</h2>
        <p>
          Side Quest is a platform where companies can place bounties (projects)
          and students can hunt them (finish the project for the company). We
          gamify the experience for students with professional animations and a
          seamless user experience.
        </p>
      </div>
    </div>
  );
}

export default App;
