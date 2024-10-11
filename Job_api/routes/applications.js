const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

router.post("/", (req, res) => {
    const { user_id, advertisement_id, message } = req.body;
    if (!user_id || !advertisement_id) {
        return res.status(400).send("User ID and Advertisement ID are required");
    }
    const query = "INSERT INTO applications (user_id, advertisement_id, message) VALUES (?, ?, ?)";
    db.query(query, [user_id, advertisement_id, message], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: results.insertId, user_id, advertisement_id, message });
    });
});

router.get("/", (req, res) => {
    const query = "SELECT * FROM applications";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM applications WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send("Application not found");
        }
        res.json(results[0]);
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    const query = "UPDATE applications SET message = ? WHERE id = ?";
    db.query(query, [message, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Application not found");
        }
        res.json({ message: "Application updated successfully" });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM applications WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send("Application not found");
        }
        res.json({ message: "Application deleted successfully" });
    });
});

module.exports = router;