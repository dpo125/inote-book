const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTER 1: Fetch all notes for logged-in user
// GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// ROUTER 2: Add a new note
// POST "/api/notes/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

// ROUTER 3: Update a note
// PUT "/api/notes/updatenote/:id"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ success: "Note updated successfully", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// ROUTER 4: Delete a note
// DELETE "/api/notes/deletenote/:id"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not Found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// ROUTER 5: Delete all notes for logged-in user (optional)
// DELETE "/api/notes/deleteallnotes"
router.delete("/deleteallnotes", fetchuser, async (req, res) => {
  try {
    
    const result = await Notes.deleteMany({ user: req.user.id });
    res.json({ success: "All notes deleted successfully", deletedCount: result.deletedCount });
  }
  
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

// ROUTER 6: Search notes by title or description
// GET "/api/notes/search?q=keyword"
router.get("/search", fetchuser, async (req, res) => {
  try {
    const keyword = req.query.q;

    if (!keyword) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const notes = await Notes.find({
      user: req.user.id,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});


module.exports = router;
