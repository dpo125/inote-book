import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Password match check
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    // ✅ Terms & conditions check
    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name.trim(),
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password.trim(),
        }),
      });

      const json = await response.json();

      if (response.ok && (json.authToken || json.authtoken)) {
        const token = json.authToken || json.authtoken;
        localStorage.setItem("auth-token", token);

        alert("Account created successfully 🎉");
        navigate("/"); // Redirect to homepage
      } else {
        setError(json.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
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
          maxWidth: "450px",
          backgroundColor: "#FFF8F0",
          borderLeft: "6px solid",
          borderImage: "linear-gradient(to bottom, #6DD5FA, #2980B9, #6DD5FA) 1",
        }}
      >
        <div className="text-center mb-4">
          <h2 style={{ marginBottom: "0.5rem", fontWeight: "700" }}>
            Create Account
          </h2>
          <p className="text-muted">Join us and get started today</p>
        </div>

        {error && (
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={credentials.name}
              onChange={onChange}
              required
              disabled={loading}
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={credentials.confirmPassword}
              onChange={onChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              disabled={loading}
            />
            <label className="form-check-label fw-semibold">
              I agree to the <a href="#terms">Terms & Conditions</a>
            </label>
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
            {loading ? "Creating Account..." : "🎉 Create Account"}
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">
            Already have an account?{" "}
            <button
              className="btn btn-link fw-bold p-0"
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Sign in
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;