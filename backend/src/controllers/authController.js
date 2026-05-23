import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

export async function login(req, res) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const result = await pool.query("SELECT * FROM admin_users WHERE username = $1", [username.trim()]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    return res.json({ data: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error." });
  }
}

export async function me(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  try {
    const result = await pool.query("SELECT id, username FROM admin_users WHERE id = $1", [req.session.userId]);
    const user = result.rows[0];

    if (!user) {
      req.session.destroy();
      return res.status(401).json({ message: "User not found." });
    }

    return res.json({ data: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Me error:", error);
    return res.status(500).json({ message: "Server error." });
  }
}

export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed." });
    }
    res.clearCookie("connect.sid");
    return res.json({ message: "Logged out." });
  });
}
