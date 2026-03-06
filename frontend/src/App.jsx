import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  console.log("App component rendered");

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="This is an amazing React app" />
        <div className="container">
          <Routes>
            {/* Root/home route */}
            <Route path="/" element={<Home />} />

            {/* ✅ Use lowercase paths to avoid 404 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Optional: Catch-all route for unknown URLs */}
            <Route
              path="*"
              element={
                <div className="text-center mt-5">
                  <h2>404 - Page Not Found</h2>
                  <p>The page you are looking for does not exist.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;