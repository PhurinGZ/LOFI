const nodemailer = require("nodemailer");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/admin");
const validObjectID = require("../middleware/validObjectId");
const crypto = require("crypto");
const { Editor } = require("../models/editor");

// API endpoint to save the editor content
router.post("/save-content", auth, async (req, res) => {
  try {
    const { content, title } = req.body;

    // Save the content to the database, associating it with the user's ID
    const newContent = new Editor({
      title,
      content,
      user: req.body._id,
    });
    await newContent.save();

    res
      .status(200)
      .json({ success: true, message: "Content saved successfully." });
  } catch (error) {
    console.error(error);

    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation errors (e.g., content is missing)
      res.status(400).json({ success: false, message: "Validation error." });
    } else if (error instanceof mongoose.Error.CastError) {
      // Handle invalid ObjectId error
      res.status(400).json({ success: false, message: "Invalid ObjectId." });
    } else {
      // Handle other errors (e.g., database connection issues)
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }
});

module.exports = router;
