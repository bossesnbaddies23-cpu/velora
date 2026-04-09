import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (useful for Render)
app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "velora-ai",
    timestamp: new Date().toISOString(),
  });
});

// Example API route
app.get("/api/status", (req, res) => {
  res.json({
    message: "Velora API is running.",
    env: process.env.NODE_ENV || "development",
  });
});

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Root route -> public/index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 for unknown API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// Catch-all (optional): serve index.html for non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Velora running on port ${PORT}`);
});
