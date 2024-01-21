const mongoose = require("mongoose");
const { User } = require("./user");

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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Use the model name here
  },
});

// Set createdAt only when the document is created
editorSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

const Editor = mongoose.model("Editor", editorSchema);

module.exports = { Editor };
