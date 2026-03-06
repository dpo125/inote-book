import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password.trim(),
        }),
      });

      const json = await response.json();

      if (response.ok && (json.authToken || json.authtoken)) {
        const token = json.authToken || json.authtoken;

        if (rememberMe) {
          localStorage.setItem("auth-token", token);
        } else {
          sessionStorage.setItem("auth-token", token);
        }

        setSuccess("Login successful 🎉");

        setTimeout(() => {
          navigate("/");
        }, 1000);
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
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">Login to your account</p>
        </div>

        {success && (
          <div className="alert alert-success">{success}</div>
        )}

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
            <label className="form-label">Password</label>
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
            <label className="form-check-label">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <span>
            Don't have an account?{" "}
            <button
              className="btn btn-link p-0"
              onClick={() => navigate("/signup")}
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