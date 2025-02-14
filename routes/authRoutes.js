const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// ✅ Register API (Storing password as plain text)
router.post("/register", async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;

  const sql =
    "INSERT INTO users (firstName, lastName, mobile, email, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, mobile, email, password], (err) => {
    if (err) {
      console.error("❌ Error inserting user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "User registered successfully" });
  });
});

// ✅ Login API (Compare password directly)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(400).json({ error: "Invalid credentials" });

    const storedPassword = results[0].password;
    console.log("🔹 Stored Password:", storedPassword);
    console.log("🔹 Entered Password:", password);

    if (storedPassword !== password) {
      console.log("❌ Passwords do not match");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });
});

module.exports = router;
