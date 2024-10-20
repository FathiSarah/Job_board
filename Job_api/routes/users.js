const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const authenticateJWT = require("../middleware/middleware.js");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Get all users
router.get("/", authenticateJWT, (req, res) => {
    const query = "SELECT * FROM peoples";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Get a specific user by ID
router.get("/:id", authenticateJWT, (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM peoples WHERE id = ?";
    
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("User not found");
        }
        res.json(results[0]);
    });
});

module.exports = router;