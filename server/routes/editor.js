// editorRoutes.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Editor } = require("../models/editor");

// API endpoint to get the editor content based on user ID and editor ID
router.get("/get-content/:userId/:editorId", auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const editorId = req.params.editorId;

    // Fetch the content from the database based on user ID and editor ID
    const content = await Editor.findOne({ user: userId, _id: editorId });

    if (!content) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found." });
    }

    res.status(200).json({
      success: true,
      content: content.content,
      title: content.title,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// API endpoint to save the editor content
router.post("/save-content", auth, async (req, res) => {
  try {
    const { content, title, userId } = req.body;

    // Save the content to the database, associating it with the user's ID
    const newContent = new Editor({
      content,
      title,
      user: userId, // Use the provided userId
    });
    await newContent.save();

    res
      .status(200)
      .json({ success: true, message: "Content saved successfully." });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Endpoint to get notes for a specific user
router.get("/:userId/notes", auth, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch notes for the specified user
    const notes = await Editor.find({ user: userId });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
