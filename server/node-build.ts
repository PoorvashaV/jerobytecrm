import path from "path";
import express from "express";
import { createServer } from "./index";

const app = createServer();
// Render uses the PORT environment variable, defaulting to 10000 if not set
const port = process.env.PORT || 10000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;

/**
 * PATH FIX: 
 * Your server file is at: /dist/server/node-build.mjs
 * Your frontend files are at: /dist/spa/
 */
const distPath = path.resolve(__dirname, "../../dist/spa");

// Serve static files
app.use(express.static(distPath));

// Handle React Router - serve index.html for non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

/**
 * HOST FIX:
 * We add "0.0.0.0" to ensure the server listens on all network interfaces.
 * This is a requirement for Render deployments.
 */
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 Static files being served from: ${distPath}`);
});

// Optional graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
