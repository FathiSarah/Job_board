const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const authenticateJWT = require("C:/Users/eliot/Desktop/T-WEB-501-STG_15/Job_api/middleware/authMiddleware");

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
router.get("/:id", (req, res) => {
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

// Create a new user
router.post("/", (req, res) => {
    const { first_name, last_name, email, tel, city, zip_code, password } = req.body;
    
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "First name, last name, email, and password are required" });
    }

    const query = `
        INSERT INTO peoples (first_name, last_name, email, tel, city, zip_code, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [first_name, last_name, email, tel, city, zip_code, password], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({
            id: results.insertId,
            first_name,
            last_name,
            email,
            tel,
            city,
            zip_code,
            password
        });
    });
});

// Update an existing user
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, tel, city, zip_code, password } = req.body;

    const query = `
        UPDATE peoples 
        SET first_name = ?, last_name = ?, email = ?, tel = ?, city = ?, zip_code = ?, password = ?
        WHERE id = ?`;

    db.query(query, [first_name, last_name, email, tel, city, zip_code, password, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("User not found");
        }
        res.json({ message: "User updated successfully" });
    });
});

// Delete a user by ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM peoples WHERE id = ?";

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("User not found");
        }
        res.json({ message: "User deleted successfully" });
    });
});

module.exports = router;
