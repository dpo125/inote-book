import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card mb-4 shadow-lg rounded"
        style={{
          width: "24rem",
          margin: "1.5rem",
          borderLeft: "6px solid",
          borderImage: "linear-gradient(to bottom, #FF9A8B, #FF6A88, #FF99AC) 1",
          backgroundColor: "#FFF8F0",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
        }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5
              className="card-title mb-0"
              style={{ color: "#333", fontWeight: "600" }}
            >
              {note.title}
            </h5>
            <small className="text-muted">
              {note.date ? new Date(note.date).toLocaleDateString() : "No date"}
            </small>
          </div>

          <p className="card-text text-secondary mb-3">
            {note.description}
          </p>

          <div className="d-flex justify-content-end">
            {/* Edit Button - Blue Gradient */}
            <button
              className="btn btn-sm me-2"
              style={{
                background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                color: "#fff",
                border: "none",
                fontWeight: "500",
                transition: "all 0.2s",
                fontSize: "0.8rem",
                padding: "6px 16px",
                borderRadius: "6px",
                minWidth: "70px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(to right, #2980B9, #6DD5FA)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(41, 128, 185, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(to right, #6DD5FA, #2980B9)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => updateNote(note)}
            >
              ✏️ Edit
            </button>

            {/* Delete Button - Red Gradient */}
            <button
              className="btn btn-sm"
              style={{
                background: "linear-gradient(to right, #FF6A88, #FF99AC)",
                color: "#fff",
                border: "none",
                fontWeight: "500",
                transition: "all 0.2s",
                fontSize: "0.8rem",
                padding: "6px 16px",
                borderRadius: "6px",
                minWidth: "70px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(to right, #FF99AC, #FF6A88)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(255, 106, 136, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(to right, #FF6A88, #FF99AC)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => {
                if (note._id) deleteNote(note._id);
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;