import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import loginImage from "../assets/Landing.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/users"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Admin" && password === "admin@123") {
      localStorage.setItem("authToken", "fake-token");
      navigate("/users"); // Redirect to dashboard
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="login-form-container">
        <div className="login-container">
          <h2>Admin Login</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
