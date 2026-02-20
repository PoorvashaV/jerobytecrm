import { Router } from "express";
// FIX: Remove .js extensions
import pool from "../db/connection";       
import { notifyUser } from "../utils/notify"; 

const router = Router();

// Fetch all notifications
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, title, message, type, read, created_at FROM notifications ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Create a new notification
router.post("/", async (req, res) => {
  const { title, message, type } = req.body;
  try {
    await notifyUser(title, message, type);
    res.status(201).json({ success: true, message: "Notification created" });
  } catch (err) {
    console.error("Error creating notification:", err);
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// Mark a notification as read
router.put("/:id/read", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("UPDATE notifications SET read = true WHERE id = $1", [id]);
    res.json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
});

export default router;
