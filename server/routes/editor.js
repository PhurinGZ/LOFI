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

// API endpoint to update the editor content
router.put("/update-content/:userId/:editorId", auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const editorId = req.params.editorId;
    const { content, title } = req.body;

    // Find the existing content in the database
    const existingContent = await Editor.findOne({
      user: userId,
      _id: editorId,
    });

    if (!existingContent) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found." });
    }

    // Update the content fields
    existingContent.content = content;
    existingContent.title = title;

    // Save the updated content
    await existingContent.save();

    res.status(200).json({
      success: true,
      message: "Content updated successfully.",
      updatedContent: existingContent,
    });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// API endpoint to delete the editor content based on user ID and editor ID
router.delete("/delete-content/:userId/:editorId", auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const editorId = req.params.editorId;

    // Delete the content from the database based on user ID and editor ID
    const deletedContent = await Editor.findOneAndDelete({
      user: userId,
      _id: editorId,
    });

    if (!deletedContent) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found." });
    }

    res.status(200).json({
      success: true,
      message: "Content deleted successfully.",
      deletedContent,
    });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
