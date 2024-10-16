const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = require("mysql").createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Middleware to check if the user is authenticated and an admin
function isAdmin(req, res, next) {
    const { authToken } = req.headers; // Get token or user ID from headers or session

    if (!authToken) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Check if the user is an admin
    const query = "SELECT role FROM users WHERE id = ?";
    db.query(query, [authToken], (err, results) => {
        if (err || results.length === 0) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        const user = results[0];
        if (user.role === 'admin') {
            next(); // Proceed if the user is an admin
        } else {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
    });
}

// Get all users
router.get("/", (req, res) => {
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
