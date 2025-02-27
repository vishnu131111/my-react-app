import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import "./LoginPage.css";

// Hardcoded Users
const USERS = {
  "aisat2025@gmail.com": { password: "aisat@123", role: "admin" },
  "student@gmail.com": { password: "student123", role: "student" },
};

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState("admin"); // Default to Admin Login
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (USERS[email] && USERS[email].password === password) {
      if (USERS[email].role === userRole) {
        navigate(userRole === "admin" ? "/admin-dashboard" : "/student-dashboard");
      } else {
        showError("Invalid role selection for this email.");
      }
    } else {
      showError("Invalid email or password.");
    }
  };

  const showError = (message) => {
    setError(message);
    setOpenSnackbar(true);
  };

  return (
    <div>
      <div className={`container ${userRole === "student" ? "right-panel-active" : ""}`} id="container">
        {/* Admin Login Form - Default */}
        <div className="form-container sign-in-container" style={{ display: userRole === "admin" ? "block" : "none" }}>
          <form onSubmit={handleLogin}>
            <h1>Admin Login</h1>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <VisibilityOff className="eye-icon" onClick={() => setShowPassword(false)} />
              ) : (
                <Visibility className="eye-icon" onClick={() => setShowPassword(true)} />
              )}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        {/* Student Login Form */}
        <div className="form-container sign-up-container" style={{ display: userRole === "student" ? "block" : "none" }}>
          <form onSubmit={handleLogin}>
            <h1>Student Login</h1>
            <input
              type="email"
              placeholder="Student Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Student Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <VisibilityOff className="eye-icon" onClick={() => setShowPassword(false)} />
              ) : (
                <Visibility className="eye-icon" onClick={() => setShowPassword(true)} />
              )}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        {/* Role Selection Buttons */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Admin Login</h1>
              <p>Login to the Admin Portal</p>
              <button className="ghost" onClick={() => setUserRole("admin")}>
                Admin Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Student Login</h1>
              <p>Login to Student Portal</p>
              <button className="ghost" onClick={() => setUserRole("student")}>
                Student Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar for Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
