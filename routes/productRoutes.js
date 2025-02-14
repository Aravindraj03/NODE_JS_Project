const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Fetch all products
router.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
