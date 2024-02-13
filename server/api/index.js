const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("../db");
const userRoutes = require("../routes/user");
const authRoutes = require("../routes/auth");
const songsRoutes = require("../routes/songs");
const playlistRoutes = require("../routes/playList");
const searchRoutes = require("../routes/search");
const auth = require("../middleware/auth");
const editor = require("../routes/editor");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Middleware Ordering:
// Ensure correct middleware ordering
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(",");
app.use(cors({ credentials: true, origin: allowedOrigins })); // Allow requests from specified origins
app.options("*", cors()); // Handle preflight requests
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Database connection
connection();

// Default route
app.get("/", auth, (req, res) => {
  res.json({ data: req.user });
});

// API routes
app.use("/api/editor", editor);
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/", searchRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
