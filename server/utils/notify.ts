import pool from "../db/connection.js";

export async function notifyUser(title: string, message: string, type: string) {
  await pool.query(
    "INSERT INTO notifications (title, message, type) VALUES ($1, $2, $3)",
    [title, message, type]
  );
}
