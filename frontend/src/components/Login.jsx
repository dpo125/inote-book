import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Use environment variable for backend
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password.trim(),
        }),
      });

      const json = await response.json();

      if (response.ok && (json.authToken || json.authtoken)) {
        const token = json.authToken || json.authtoken;

        // ✅ Remember me: localStorage or sessionStorage
        if (rememberMe) {
          localStorage.setItem("auth-token", token);
        } else {
          sessionStorage.setItem("auth-token", token);
        }

        setSuccess("Login successful 🎉");

        setTimeout(() => navigate("/"), 1000);
      } else {
        setError(json.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg rounded p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#FFF8F0",
          borderLeft: "6px solid",
          borderImage: "linear-gradient(to bottom, #FF9A8B, #FF6A88, #FF99AC) 1",
        }}
      >
        <div className="text-center mb-4">
          <h2
            className="fw-bold"
            style={{
              background: "linear-gradient(45deg, #FF6A88, #FF99AC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back
          </h2>
          <p className="text-muted">Login to your account</p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="alert alert-success d-flex align-items-center">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger d-flex align-items-center">
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
            <label className="form-check-label fw-semibold">Remember me</label>
          </div>

          <button
            type="submit"
            className="btn w-100 py-2"
            style={{
              background: loading
                ? "#ccc"
                : "linear-gradient(to right, #6DD5FA, #2980B9)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "🚀 Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted" style={{ fontSize: "0.9rem" }}>
            Don't have an account?{" "}
            <button
              className="btn btn-link fw-bold text-decoration-none p-0"
              onClick={() => navigate("/signup")}
              disabled={loading}
            >
              Sign Up
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;