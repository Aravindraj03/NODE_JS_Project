require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '1930',
  database: 'project'
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
