import "dotenv/config";
import express from "express";
import cors from "cors";

import { handleDemo } from "./routes/demo.js";
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import notificationsRouter from "./routes/notifications.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root route
  app.get("/", (_req, res) => {
    res.send("Backend is running 🚀");
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.use("/api/auth", authRouter);

  // Products routes
  app.use("/api/products", productsRouter);

  // Notifications routes
  console.log("Notifications router mounted");
  app.use("/api/notifications", notificationsRouter);

  return app;
}
