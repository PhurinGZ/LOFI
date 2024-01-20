const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Correct type for ObjectId
    ref: "User", // Reference to the User model
  },
});

// Export the model directly
const Editor = mongoose.model("Editor", editorSchema);

module.exports = { Editor };
