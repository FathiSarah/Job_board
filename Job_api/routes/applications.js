const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Create a new application
router.post("/", (req, res) => {
    const { user_id, advertisement_id, message, email, complet_name } = req.body;

    if (!user_id || !advertisement_id || !complet_name || !email || !message) {
        return res.status(400).send("All fields are required");
    }

    const query = "INSERT INTO applications (user_id, advertisement_id, message, email, complet_name) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [user_id, advertisement_id, message, email, complet_name], (err, results) => {
        if (err) {
            return handleDbError(err, res);
        }
        res.status(201).json({
            id: results.insertId,
            user_id,
            advertisement_id,
            message,
            email,
            complet_name,
        });
    });
});

// Retrieve a specific application by ID
router.get("/:id", (req, res) => {
    const applicationId = req.params.id;
    const query = "SELECT * FROM applications WHERE id = ?";
    db.query(query, [applicationId], (err, results) => {
        if (err) {
            return handleDbError(err, res);
        }
        if (results.length === 0) {
            return res.status(404).send("Application not found");
        }
        res.json(results[0]);
    });
});

// Retrieve all applications
router.get("/", (req, res) => {
    const query = "SELECT * FROM applications";
    db.query(query, (err, results) => {
        if (err) {
            return handleDbError(err, res);
        }
        res.json(results);
    });
});

// Update an application by ID
router.put("/:id", (req, res) => {
    const applicationId = req.params.id;
    const { message, email, complet_name } = req.body;

    const query = "UPDATE applications SET message = ?, email = ?, complet_name = ? WHERE id = ?";
    db.query(query, [message, email, complet_name, applicationId], (err, results) => {
        if (err) {
            return handleDbError(err, res);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Application not found");
        }
        res.send("Application updated successfully");
    });
});

// Delete an application by ID
router.delete("/:id", (req, res) => {
    const applicationId = req.params.id;
    const query = "DELETE FROM applications WHERE id = ?";
    db.query(query, [applicationId], (err, results) => {
        if (err) {
            return handleDbError(err, res);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Application not found");
        }
        res.send("Application deleted successfully");
    });
});

module.exports = router;