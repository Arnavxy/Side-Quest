import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
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
          <p>Place a project and let students complete it for you.</p>
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
  );
}

export default LandingPage;
