import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/NoteContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    getNotes();
  }, []);

  // open modal + fill note data
  const updateNote = (currentNote) => {
    const modal = new window.bootstrap.Modal(ref.current);
    modal.show();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // handle input change
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // handle save
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    const modal = window.bootstrap.Modal.getInstance(ref.current);
    modal.hide();
  };

  return (
    <div className="container py-4">
      <AddNote />

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={ref}
      >
        <div className="modal-dialog">
          <div
            className="modal-content shadow-lg rounded"
            style={{
              backgroundColor: "#FFF8F0",
              borderLeft: "6px solid",
              borderImage:
                "linear-gradient(to bottom, #FF9A8B, #FF6A88, #FF99AC) 1",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "#333", fontWeight: "600" }}
              >
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>

            {/* Editable Form (Same Design) */}
            <div className="modal-body text-secondary">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label fw-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    required
                    style={{
                      backgroundColor: "#fff",
                      border: "2px solid",
                      borderImage: "linear-gradient(to right, #6DD5FA, #2980B9) 1",
                      transition: "all 0.2s"
                    }}
                    onFocus={e => {
                      e.target.style.boxShadow = "0 0 0 3px rgba(109, 213, 250, 0.3)";
                    }}
                    onBlur={e => {
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="edescription"
                    className="form-label fw-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    required
                    rows="3"
                    style={{
                      backgroundColor: "#fff",
                      border: "2px solid",
                      borderImage: "linear-gradient(to right, #6DD5FA, #2980B9) 1",
                      transition: "all 0.2s",
                      resize: "vertical"
                    }}
                    onFocus={e => {
                      e.target.style.boxShadow = "0 0 0 3px rgba(109, 213, 250, 0.3)";
                    }}
                    onBlur={e => {
                      e.target.style.boxShadow = "none";
                    }}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label fw-semibold">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    style={{
                      backgroundColor: "#fff",
                      border: "2px solid",
                      borderImage: "linear-gradient(to right, #6DD5FA, #2980B9) 1",
                      transition: "all 0.2s"
                    }}
                    onFocus={e => {
                      e.target.style.boxShadow = "0 0 0 3px rgba(109, 213, 250, 0.3)";
                    }}
                    onBlur={e => {
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              {/* Close Button - Red Gradient */}
              <button
                type="button"
                className="btn btn-sm me-2"
                data-bs-dismiss="modal"
                style={{
                  background: "linear-gradient(to right, #FF6A88, #FF99AC)",
                  color: "#fff",
                  border: "none",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  fontSize: "0.9rem",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  minWidth: "80px"
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
              >
                ❌ Close
              </button>

              {/* Save Button - Blue Gradient */}
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                  color: "#fff",
                  border: "none",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  fontSize: "0.9rem",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  minWidth: "100px"
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
                onClick={handleClick}
              >
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-5 text-center" style={{ 
        color: "#333", 
        fontWeight: "600",
        background: "linear-gradient(45deg, #FF6A88, #FF99AC)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        Your Notes
      </h2>

      <div className="row">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div className="col-md-4" key={note._id}>
              <NoteItem note={note} updateNote={updateNote} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No notes available</p>
        )}
      </div>
    </div>
  );
};

export default Notes;