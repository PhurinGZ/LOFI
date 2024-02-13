const express = require("express");
const cors = require("cors");
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

// Function to allow CORS
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// Function to handle the response with the current date
const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

// Create an Express app
const app = express();

// Middleware Ordering:
// Ensure correct middleware ordering
app.use(cors()); // Allow requests from all origins
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

// Apply CORS middleware globally
app.use(allowCors(handler));

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
