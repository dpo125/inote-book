import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";

function Navbar() {
  const location = useLocation();
  const context = useContext(noteContext);
  const { searchNotes, getNotes } = context;

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchNotes(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      getNotes(); // empty search = show all notes
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        backgroundColor: "#FFF8F0",
        borderBottom: "3px solid",
        borderImage: "linear-gradient(to right, #FF9A8B, #FF6A88, #FF99AC) 1",
        padding: "0.8rem 0",
        marginBottom: "2rem",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            background: "linear-gradient(45deg, #FF6A88, #FF99AC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.8rem",
            marginRight: "2rem",
          }}
        >
          Notebook
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold mx-2"
                to="/"
                style={{
                  color: location.pathname === "/" ? "#FF6A88" : "#333",
                  borderBottom:
                    location.pathname === "/"
                      ? "2px solid #FF6A88"
                      : "2px solid transparent",
                }}
              >
                Home
              </Link>
            </li>
          </ul>

          {/* Desktop View */}
          <div className="d-none d-lg-flex align-items-center w-100 justify-content-between">
            <div className="d-flex justify-content-center flex-grow-1">
              <div className="d-flex">
                <Link
                  to="/login"
                  className="btn me-3"
                  style={{
                    background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "0.5rem 1.5rem",
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn"
                  style={{
                    background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "0.5rem 1.5rem",
                  }}
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Desktop Search */}
            <form className="d-flex ms-3" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search notes..."
                value={query}
                onChange={handleChange}
                style={{ width: "200px" }}
              />
              <button
                className="btn"
                type="submit"
                style={{
                  background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                  color: "#fff",
                }}
              >
                Search
              </button>
            </form>
          </div>

          {/* Mobile View */}
          <div className="d-flex d-lg-none flex-column mt-3">
            <form className="d-flex mb-3" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search notes..."
                value={query}
                onChange={handleChange}
              />
              <button
                className="btn"
                type="submit"
                style={{
                  background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                  color: "#fff",
                }}
              >
                Search
              </button>
            </form>

            <div className="d-flex justify-content-between">
              <Link
                to="/login"
                className="btn me-2 flex-fill text-center"
                style={{
                  background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                  color: "#fff",
                }}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn flex-fill text-center"
                style={{
                  background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                  color: "#fff",
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;