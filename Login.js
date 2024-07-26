import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ goBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      const isCompany = response.data.isCompany;
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
    <div className="login-container">
      <button className="go-back-button" onClick={goBack}>
        Go to Previous Screen
      </button>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
