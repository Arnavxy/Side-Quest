import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register({ isCompany, goBack }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        email,
        password,
        isCompany,
      });
      alert(response.data.message);
      handleLogin(); // Automatically login after registration
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      if (isCompany) {
        navigate("/company-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={`register-container ${isCompany ? "company" : "student"}`}>
      <button className="go-back-button" onClick={goBack}>
        Go to Previous Screen
      </button>
      {isRegistering ? (
        <form onSubmit={handleSubmit} className="register-form">
          <h2>{isCompany ? "Company Registration" : "Student Registration"}</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="register-button">
            Register
          </button>
          <button
            type="button"
            className="switch-button"
            onClick={() => setIsRegistering(false)}
          >
            Already have an account? Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="register-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                localStorage.setItem("rememberMe", e.target.checked)
              }
            />{" "}
            Remember Me
          </label>
          <button type="submit" className="register-button">
            Login
          </button>
          <button
            type="button"
            className="switch-button"
            onClick={() => setIsRegistering(true)}
          >
            New user? Register
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
