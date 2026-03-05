import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault(); 
        
        
        if (note.title.length < 3 || note.description.length < 5) {
            alert("Title must be at least 3 characters and description at least 5 characters long");
            return;
        }

        
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" }); 
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {/* Notebook Text Section */}
            <div className="d-flex justify-content-center">
                <div
                    className="card mb-5 shadow-lg rounded"
                    style={{
                        width: "28rem",
                        borderLeft: "6px solid",
                        borderImage: "linear-gradient(to bottom, #FF9A8B, #FF6A88, #FF99AC) 1",
                        backgroundColor: "#FFF8F0",
                        transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = "scale(1.03)";
                        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                    }}
                >
                    {/*  IMPORTANT */}
                    <form onSubmit={handleClick}>
                        <div className="card-body p-4">
                            {/* Header */}
                            <div className="text-center mb-4">
                                <h2
                                    className="card-title mb-2"
                                    style={{ color: "#333", fontWeight: "600" }}
                                >
                                    Add Your Note
                                </h2>
                                <p className="text-muted">Create a new note</p>
                            </div>

                            {/* Title Field */}
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label fw-semibold" style={{ color: "#333" }}>
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={note.title}
                                    placeholder="Enter note title"
                                    required
                                    minLength={3}
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
                                    onChange={onChange}
                                />
                                {note.title.length < 3 && note.title.length > 0 && (
                                    <small className="text-danger">Title must be at least 3 characters</small>
                                )}
                            </div>

                            {/* Description Field */}
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label fw-semibold" style={{ color: "#333" }}>
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={note.description}
                                    placeholder="Enter note description"
                                    rows="3"
                                    required
                                    minLength={5}
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
                                    onChange={onChange}
                                />
                                {note.description.length < 5 && note.description.length > 0 && (
                                    <small className="text-danger">Description must be at least 5 characters</small>
                                )}
                            </div>

                            {/* Tag Field */}
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label fw-semibold" style={{ color: "#333" }}>
                                    Tag
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tag"
                                    name="tag"
                                    value={note.tag}
                                    placeholder="Enter tag"
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
                                    onChange={onChange}
                                />
                            </div>

                            {/* Add Note Button - GRADIENT DESIGN */}
                            <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className="btn"
                                    style={{
                                        background: "linear-gradient(to right, #6DD5FA, #2980B9)",
                                        color: "#fff",
                                        border: "none",
                                        fontWeight: "500",
                                        transition: "all 0.2s",
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "8px",
                                        fontSize: "1rem"
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = "linear-gradient(to right, #2980B9, #6DD5FA)";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 6px 15px rgba(41, 128, 185, 0.4)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = "linear-gradient(to right, #6DD5FA, #2980B9)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                    onMouseDown={e => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 2px 5px rgba(41, 128, 185, 0.4)";
                                    }}
                                    onMouseUp={e => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 6px 15px rgba(41, 128, 185, 0.4)";
                                    }}
                                    disabled={note.title.length < 3 || note.description.length < 5}
                                >
                                    📝 Add Note
                                </button> 
                            </div>

                            {/* Disabled State Styling */}
                            <style>
                                {`
                                    button:disabled {
                                        background: linear-gradient(to right, #cccccc, #999999) !important;
                                        color: #666666 !important;
                                        transform: none !important;
                                        box-shadow: none !important;
                                        cursor: not-allowed;
                                    }
                                `}
                            </style>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNote;